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
    date = fields.DateField()
    area = fields.CharField(max_length=250)
    river = fields.CharField(max_length=250)
    plot = fields.CharField(max_length=250)
    address = fields.CharField(max_length=250)
    stir = fields.BigIntField()
    dsi = fields.CharField(max_length=250)
    subject_name = fields.CharField(max_length=250)
    count = fields.IntField()
    diff_count = fields.CharField(default="Olinmagan", max_length=450)
    status = fields.CharField(max_length=450, default="Yuborilmagan")
    created_at = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return self.subject_name
