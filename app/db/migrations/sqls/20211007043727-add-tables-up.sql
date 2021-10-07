/* Replace with your SQL commands */


CREATE TYPE like_decision AS ENUM (
'like',
'dislike',
'neutral'
);

CREATE TABLE IF NOT EXISTS "user_info" (
  "id" varchar PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "salt" varchar NOT NULL,
  "phone_number" varchar UNIQUE NOT NULL,
  "email_verified" boolean DEFAULT false,
  "coil_id" varchar,
  "created_at" TIMESTAMPTZ DEFAULT now(),
  "updated_at" TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "content" (
    "id" varchar PRIMARY KEY,
    "user_id" varchar REFERENCES user_info(id) NOT NULL,
    "content_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100),
    "link" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "content_likes" (
    "id" varchar PRIMARY KEY,
    "user_id" varchar REFERENCES user_info(id) NOT NULL,
    "content_id" varchar REFERENCES content(id) NOT NULL,
    "decision" like_decision DEFAULT 'neutral',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "personal_content" (
    "id" varchar PRIMARY KEY,
    "user_id" varchar REFERENCES user_info(id) NOT NULL,
    "content_id" varchar REFERENCES content(id) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);