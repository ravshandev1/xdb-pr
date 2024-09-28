from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from utils import ENV
from fastapi.middleware.cors import CORSMiddleware
from apps.main.views import router

app = FastAPI(docs_url='/', title='Xavfsiz Daryo API')

app.include_router(router, tags=['main'])
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
TORTOISE_ORM = {
    "connections": {
        "default": f"postgres://{ENV.get('DB_USER')}:{ENV.get('DB_PASSWORD')}@{ENV.get('DB_HOST')}:{ENV.get('DB_PORT')}/{ENV.get('DB_NAME')}"
    },
    "apps": {
        "models": {
            "models": ['aerich.models', 'apps.main.models'],
            "default_connection": "default",
        },
    },
}

register_tortoise(
    app,
    config=TORTOISE_ORM,
    add_exception_handlers=True
)
