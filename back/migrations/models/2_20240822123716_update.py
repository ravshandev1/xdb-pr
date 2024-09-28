from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "application" ALTER COLUMN "status" SET DEFAULT 'Yuborilmagan';
        ALTER TABLE "user" ADD "superuser" BOOL NOT NULL  DEFAULT False;
        ALTER TABLE "user" ADD "name" VARCHAR(100);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" DROP COLUMN "superuser";
        ALTER TABLE "user" DROP COLUMN "name";
        ALTER TABLE "application" ALTER COLUMN "status" DROP DEFAULT;"""
