from tortoise import fields, models


class User(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100, null=True)
    phone = fields.CharField(max_length=20, unique=True)
    password = fields.CharField(max_length=100)
    superuser = fields.BooleanField(default=False)
    created_at = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return self.phone


class Application(models.Model):
    id = fields.IntField(pk=True)
    code = fields.IntField()
    name = fields.CharField(max_length=250)
    stir = fields.BigIntField()
    address = fields.CharField(max_length=450)
    date = fields.DateField()
    count = fields.IntField()
    diff_count = fields.CharField(default="Hali olinmadi", max_length=450)
    status = fields.CharField(max_length=450, default="Yuborilmagan")
    created_at = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return self.name
