from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);
CREATE TABLE IF NOT EXISTS "application" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "code" INT NOT NULL,
    "date" DATE NOT NULL,
    "area" VARCHAR(250) NOT NULL,
    "river" VARCHAR(250) NOT NULL,
    "plot" VARCHAR(250) NOT NULL,
    "address" VARCHAR(250) NOT NULL,
    "stir" BIGINT NOT NULL,
    "dsi" VARCHAR(250) NOT NULL,
    "subject_name" VARCHAR(250) NOT NULL,
    "count" INT NOT NULL,
    "diff_count" VARCHAR(450) NOT NULL  DEFAULT 'Олинмаган',
    "status" VARCHAR(450) NOT NULL  DEFAULT 'Юборилмаган',
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR(100),
    "phone" VARCHAR(20) NOT NULL UNIQUE,
    "password" VARCHAR(100) NOT NULL,
    "superuser" BOOL NOT NULL  DEFAULT False,
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
