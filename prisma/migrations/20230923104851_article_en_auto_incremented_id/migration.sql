-- AlterTable
CREATE SEQUENCE article_en_id_seq;
ALTER TABLE "Article_en" ALTER COLUMN "id" SET DEFAULT nextval('article_en_id_seq');
ALTER SEQUENCE article_en_id_seq OWNED BY "Article_en"."id";
