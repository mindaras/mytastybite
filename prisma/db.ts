import { getLanguage } from "@common/utils/server/getLanguage";
import { PrismaClient } from "@prisma/client";
import { Language } from "@types";

const cache = global as unknown as {
  db: PrismaClient | undefined;
};

const db = cache.db ?? new PrismaClient();

// Node.js cache is cleared on hot reload, this prevents new instance creation
if (process.env.NODE_ENV !== "production") cache.db = db;

const getRecipeDb = (): typeof db.recipe_en => {
  const language = getLanguage();

  switch (language) {
    case Language.ES:
      return db.recipe_es as any;
    default:
      return db.recipe_en;
  }
};

const getArticleDb = (language = getLanguage()): typeof db.article_en => {
  switch (language) {
    case Language.ES:
      return db.article_es as any;
    default:
      return db.article_en;
  }
};

interface DeleteProps {
  table: string;
  where: object;
}

const deleteAcrossAllLanguages = ({ table, where }: DeleteProps) => {
  const languages = Object.values(Language);
  return Promise.all(
    languages.map((lang) =>
      (db[`${table}_${lang}` as any] as any).delete({ where })
    )
  );
};

export { db, getRecipeDb, getArticleDb, deleteAcrossAllLanguages };
