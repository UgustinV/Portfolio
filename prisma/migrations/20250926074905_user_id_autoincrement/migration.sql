-- AlterTable
CREATE SEQUENCE "public".user_id_seq;
ALTER TABLE "public"."User" ALTER COLUMN "id" SET DEFAULT nextval('"public".user_id_seq');
ALTER SEQUENCE "public".user_id_seq OWNED BY "public"."User"."id";
