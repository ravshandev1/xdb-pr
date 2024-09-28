from apps.main.models import User
from utils import hashed_password
from tortoise import Tortoise
from main import TORTOISE_ORM
import asyncio


async def create_superuser():
    await Tortoise.init(config=TORTOISE_ORM)
    password = hashed_password('Pass@123')
    await User.create(phone='+998900000000', password=password, superuser=True)
    print("Admin created successfully")
    await Tortoise.close_connections()


asyncio.run(create_superuser())
