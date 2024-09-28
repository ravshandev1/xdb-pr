from fastapi import APIRouter, Depends, responses, Request, UploadFile, File
from .schemas import RegisterSchema, ChangePasswordSchema, LoginSchema, UserSchema, ApplicationSchema, \
    ApplicationUpdateSchema, UserUpdateSchema, ApplicationPeriodQuery
from .models import User, Application
from utils import get_jwt_token, hashed_password, verify_password, JWTAuth, paginate
from tasks import send_data_to_tax_task
from openpyxl import load_workbook
from io import BytesIO
from datetime import datetime, date
from calendar import monthrange
from pytz import timezone

router = APIRouter()


@router.post("/register")
async def register_user(data: RegisterSchema, user: User = Depends(JWTAuth())):
    if user.superuser:
        if await User.exists(phone=data.phone):
            return responses.JSONResponse({'success': False, 'message': 'User already exists'}, status_code=400)
        if data.password != data.confirm_password:
            return responses.JSONResponse({'success': False, 'message': 'Passwords do not match'}, status_code=400)
        data.password = hashed_password(data.password)
        del data.confirm_password
        await User.create(**data.__dict__)
        return {"success": True}
    return responses.JSONResponse({'success': False, 'message': 'Only admin creates a user'}, status_code=403)


@router.delete("/user/{pk}")
async def delete_user(pk: int, user: User = Depends(JWTAuth())):
    if user.superuser:
        user = await User.get_or_none(id=pk)
        if user.superuser:
            return responses.JSONResponse({'success': False, 'message': 'Superuser can not delete'}, status_code=400)
        if user is None:
            return responses.JSONResponse({'success': False, 'message': 'User does not exist'}, status_code=400)
        await user.delete()
        return {"success": True}
    return responses.JSONResponse({'success': False, 'message': 'Only admin deletes a user'}, status_code=403)


@router.get("/users")
async def get_users(user: User = Depends(JWTAuth())):
    if user.superuser:
        ls = list()
        for i in await User.exclude(superuser=True):
            ls.append(UserSchema.to_dict(i))
        return ls
    return responses.JSONResponse({'success': False, 'message': 'Only admin deletes a user'}, status_code=403)


@router.post("/login")
async def login_user(data: LoginSchema):
    user = await User.get_or_none(phone=data.phone)
    if not user:
        return responses.JSONResponse({'message': 'Username not found'}, status_code=404)
    if not verify_password(data.password, user.password):
        return responses.JSONResponse({'message': 'Password is incorrect'}, status_code=400)
    token = get_jwt_token(user.id)
    return {'access_token': token}


@router.get("/user")
async def get_user(user: User = Depends(JWTAuth())):
    return UserSchema.to_dict(user)


@router.patch("/change-password")
async def change_password(data: ChangePasswordSchema, user: User = Depends(JWTAuth())):
    if data.new_password != data.confirm_password:
        return responses.JSONResponse({"message": "Passwords have not the same"}, status_code=400)
    if not verify_password(data.old_password, user.password):
        return responses.JSONResponse({'message': 'Old password is incorrect'}, status_code=400)
    user.password = hashed_password(data.new_password)
    await user.save()
    return {'message': 'Passwords have changed successfully'}


@router.patch("/user/{pk}", dependencies=[Depends(JWTAuth())])
async def update_user(pk: int, data: UserUpdateSchema):
    user = await User.get_or_none(id=pk)
    if not user:
        return responses.JSONResponse({'message': 'User not found'}, status_code=404)
    if data.password:
        data.password = hashed_password(data.password)
    data = {k: v for k, v in data.__dict__.items() if v is not None}
    await user.update_from_dict(data)
    await user.save()
    return UserSchema.to_dict(user)


@router.get("/applications", dependencies=[Depends(JWTAuth())])
async def get_applications(request: Request, query: ApplicationPeriodQuery = Depends()):
    ls = list()
    if query.year is not None and query.month is not None:
        qs = await Application.filter(
            date__range=[date(query.year, query.month, 1),
                         date(query.year, query.month, monthrange(query.year, query.month)[1])]).order_by('-id')
    else:
        qs = await Application.all().order_by('-id')
    for i in qs:
        ls.append(ApplicationSchema.to_dict(i))
    return paginate(ls, request.url.path, query.limit, query.offset)


@router.post("/applications", dependencies=[Depends(JWTAuth())])
async def root(file: UploadFile = File(...)):
    if file.content_type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return responses.JSONResponse({"success": False, "message": "Invalid file type. Please upload an Excel file."},
                                      status_code=400)
    content = await file.read()
    workbook = load_workbook(filename=BytesIO(content))
    sheet = workbook.active
    ls = list()
    ids = list()
    for row in sheet.iter_rows(min_row=2, values_only=True):
        data = dict()
        dt = date(int(row[1].split('.')[2]), int(row[1].split('.')[1]), int(row[1].split('.')[0]))
        app = await Application.create(code=row[0], address=f"{row[2]} {row[3]} {row[5]}", count=row[9], date=dt,
                                       stir=row[6], name=row[8])
        data['send_id'] = row[0]
        data['send_date'] = f"{row[1]} {datetime.now().astimezone(timezone('Asia/Tashkent')).strftime('%H:%M:%S')}"
        data['ns10'] = row[7].split('/')[0]
        data['ns11'] = row[7].split('/')[1]
        data['address'] = row[5]
        data['tin'] = row[6]
        data['count'] = row[9]
        ls.append(data)
        ids.append({"id": app.id, "year": dt.year, "month": dt.month})
    send_data_to_tax_task.delay(ls, ids)
    return {'success': True}


@router.patch("/application/{pk}")
async def update_application(pk: int, data: ApplicationUpdateSchema):
    obj = await Application.get_or_none(id=pk)
    if not obj:
        return responses.JSONResponse({"message": "Application not found"}, status_code=404)
    if data.status:
        obj.status = data.status
    if data.diff_count:
        obj.diffCount = data.diff_count
    await obj.save()
    return {"success": True}
