from celery import Celery, shared_task
from dotenv import dotenv_values
from requests import post, patch, get

ENV = dotenv_values(".env")
app = Celery(__name__)
app.conf.broker_url = f"redis://xdb_redis:6379/0"
app.conf.result_backend = f"redis://xdb_redis:6379/0"
app.conf.broker_connection_retry_on_startup = True
app.conf.enable_utc = False
app.conf.update(timezone='Asia/Tashkent')
app.autodiscover_tasks()


@shared_task
def send_data_to_tax_task(ls: list[dict], ids: list[dict]):
    token = post(f"{ENV.get('TAX_API')}/water-supply/api/authenticate/login", json={"username": "WaterSupply", "password": "Pa$$w0rd"})
    for i, j in zip(ls, ids):
        res = post(f"{ENV['TAX_API']}/xdduk-api/xdduk-api/involved-businessman", json=i,
                   headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {token.json()}'})
        if res.status_code >= 400:
            patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", json={"status": "Soliqni API si ishlamadi!"})
        elif res.status_code >= 400:
            patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", json={"status": res.json()["text"]})
        else:
            patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", json={"status": "Muvofiqiyatli"})
        res = get(f"{ENV.get('TAX_API')}/water-supply/api/water-supply/get-gravel-info",
                  headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {token.json()}'},
                  json={"tin": i['tin'], "periodYear": j['year'], "periodMonth": j['month']})
        if res.status_code >= 400:
            patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", json={"diff_count": "Soliqni API si ishlamadi!"})
        elif res.status_code >= 400:
            patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", json={"diff_count": res.json()["text"]})
        else:
            patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", json={"diff_count": res.json()["count"]})
    return "Got the response"
