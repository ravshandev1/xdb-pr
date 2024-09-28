from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "application" ALTER COLUMN "status" DROP DEFAULT;
        ALTER TABLE "application" ALTER COLUMN "status" TYPE VARCHAR(450) USING "status"::VARCHAR(450);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "application" ALTER COLUMN "status" TYPE INT USING "status"::INT;
        ALTER TABLE "application" ALTER COLUMN "status" SET DEFAULT 0;"""
