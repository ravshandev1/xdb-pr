from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class RegisterSchema(BaseModel):
    name: Optional[str] = None
    phone: str
    password: str
    confirm_password: str


class LoginSchema(BaseModel):
    phone: str
    password: str


class ChangePasswordSchema(BaseModel):
    old_password: str
    new_password: str
    confirm_password: str


class UserSchema(BaseModel):
    id: int
    name: Optional[str] = None
    phone: str
    superuser: bool
    created_at: datetime

    @classmethod
    def to_dict(cls, item):
        return {
            "id": item.id,
            "name": item.name,
            "phone": item.phone,
            "superuser": item.superuser,
            "created_at": item.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class UserUpdateSchema(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    password: Optional[str] = None


class ApplicationSchema(BaseModel):
    id: int
    code: int
    name: str
    stir: int
    address: str
    date: date
    count: int
    status: str
    diff_count: str
    created_at: datetime

    @classmethod
    def to_dict(cls, item):
        return {
            "id": item.id,
            "code": item.code,
            "name": item.name,
            "stir": item.stir,
            "address": item.address,
            "date": item.date.strftime("%Y-%m-%d"),
            "count": item.count,
            "status": item.status,
            "diff_count": item.diff_count,
            "created_at": item.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }


class ApplicationUpdateSchema(BaseModel):
    status: str = None
    diff_count: str = None


class ApplicationPeriodQuery(BaseModel):
    limit: int = 50
    offset: int = 1
    year: Optional[int] = None
    month: Optional[int] = None
