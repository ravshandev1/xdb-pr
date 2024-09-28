from jose import jwt, JWTError
from datetime import datetime, timedelta
from pytz import timezone
from dotenv import dotenv_values
from fastapi.security import APIKeyHeader
from fastapi import HTTPException, Request
from pydantic import ValidationError
from apps.main.models import User
import hashlib

ENV = dotenv_values(".env")


def get_jwt_token(user_id: int) -> str:
    encode = {'id': user_id,
              'exp': datetime.now(tz=timezone('Asia/Tashkent')) + timedelta(hours=int(ENV.get('JWT_EXP')))}
    return jwt.encode(encode, ENV.get('SECRET_KEY'))


class JWTAuth(APIKeyHeader):
    def __init__(self):
        super().__init__(name='Authorization')

    async def __call__(self, request: Request):
        authorization = request.headers.get("Authorization")
        if not authorization:
            raise HTTPException(status_code=401, detail="Authorization header missing")
        scheme, _, token = authorization.partition(" ")
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication scheme. Use 'Bearer'.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if not token:
            raise HTTPException(status_code=403, detail='Unauthorized')
        try:
            payload = jwt.decode(token, ENV.get('SECRET_KEY'), algorithms=['HS256'])
        except (JWTError, ValidationError):
            raise HTTPException(status_code=401, detail="Token is invalid")
        user_id = payload.get("id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token payload invalid")
        user = await User.get_or_none(id=user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user


def hashed_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


def verify_password(data_password: str, user_password: str) -> bool:
    return hashlib.sha256(data_password.encode('utf-8')).hexdigest() == user_password


def paginate(queryset: list, path: str, limit: int, offset: int, additional_data: dict = None):
    start = (offset - 1) * limit
    end = start + limit
    response = {
        "results": queryset[start:end],
        "count": len(queryset),
        "next": None,
        "previous": None
    }
    if additional_data:
        response.update(additional_data)
    if end >= len(queryset):
        if offset > 1:
            response["previous"] = f"{path}?limit={limit}&offset={offset - 1}"
    else:
        if offset > 1:
            response["previous"] = f"{path}?limit={limit}&offset={offset - 1}"
        response["next"] = f"{path}?limit={limit}&offset={offset + 1}"
    return response
