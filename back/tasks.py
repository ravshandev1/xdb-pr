from celery import Celery, shared_task
from dotenv import dotenv_values
from requests import post, patch
import json


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
    for i, j in zip(ls, ids):
        res = post( f"{ENV['TAX_API']}", data=i)
        if res.status_code >= 500:
            patch( f"{ENV.get('BASE_URL')}/application/{j['id']}", data=json.dumps({"status": "Soliqni API si ishlamadi!"}))
        patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", data=json.dumps({"status": "Muvofiqiyatli"}))
        res = post(f"{ENV.get('TAX_API')}", data=json.dumps({"tin": i['tin'], "periodYear": j['year'], "periodMonth": j['month']}))
        if res.status_code >= 500:
            patch( f"{ENV.get('BASE_URL')}/application/{j['id']}", data=json.dumps({"diff_count": "Soliqni API si ishlamadi!"}))
        patch(f"{ENV.get('BASE_URL')}/application/{j['id']}", data=json.dumps({"diff_count": res.json()["count"]}))
    return "Got the response"
