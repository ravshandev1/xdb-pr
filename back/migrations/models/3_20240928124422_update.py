from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "application" ADD "diff_count" VARCHAR(100)   DEFAULT '0';"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "application" DROP COLUMN "diff_count";"""
