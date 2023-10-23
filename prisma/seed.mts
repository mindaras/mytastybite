import { Article_en, PrismaClient, Recipe_en } from "@prisma/client";
import recipes_en from "../src/data/recipes/recipes_en.json" assert { type: "json" };
import recipes_es from "../src/data/recipes/recipes_es.json" assert { type: "json" };
import recipes_lt from "../src/data/recipes/recipes_lt.json" assert { type: "json" };
import articles_en from "../src/data/articles/articles_en.json" assert { type: "json" };
import articles_es from "../src/data/articles/articles_es.json" assert { type: "json" };
import articles_lt from "../src/data/articles/articles_lt.json" assert { type: "json" };
import { createClient } from "redis";

const client = new PrismaClient();
const redis = createClient({
  url: `redis://default:${process.env.CACHE_PASSWORD}@${process.env.CACHE_HOST}:${process.env.CACHE_PORT}`,
});

const getCacheClient = async () => {
  if (!redis.isOpen) await redis.connect();
  return redis;
};

const createRecipeTranslation = (original: Recipe_en, translation: any) => {
  return { ...translation, externalId: original.externalId, id: original.id };
};

const seedRecipes = async () => {
  for (const recipe of recipes_en.recipes) {
    const original = await client.recipe_en.create({
      data: {
        externalId: recipe.id,
        title: recipe.title,
        titleWithoutAccents: recipe.titleWithoutAccents,
        description: recipe.description,
        preparation: recipe.preparation,
        ingredients: recipe.ingredients,
        servings: recipe.servings,
        duration: recipe.duration,
        nutrition: recipe.nutrition,
        category: recipe.category as any,
        diet: recipe.diet as any,
      },
    });
    const esRecipe = recipes_es.recipes.find((item) => item.id === recipe.id);
    await client.recipe_es.create({
      data: createRecipeTranslation(original, esRecipe),
    });
    const ltRecipe = recipes_lt.recipes.find((item) => item.id === recipe.id);
    await client.recipe_lt.create({
      data: createRecipeTranslation(original, ltRecipe),
    });
  }
};

const createArticleTranslation = (original: Article_en, translation: any) => {
  return { ...translation, externalId: original.externalId, id: original.id };
};

const seedArticles = async () => {
  for (const article of articles_en.articles) {
    const original = await client.article_en.create({
      data: {
        externalId: article.id,
        title: article.title,
        titleWithoutAccents: article.titleWithoutAccents,
        description: article.description,
        body: article.body,
        readTime: article.readTime,
      },
    });
    const esArticle = articles_es.articles.find(
      (item) => item.id === article.id
    );
    await client.article_es.create({
      data: createArticleTranslation(original, esArticle),
    });
    const ltArticle = articles_lt.articles.find(
      (item) => item.id === article.id
    );
    await client.article_lt.create({
      data: createArticleTranslation(original, ltArticle),
    });
  }
};

const seedRateLimitData = async () => {
  const cache = await getCacheClient();
  cache.set(
    "mytastybite:rateLimit:blocklist",
    JSON.stringify({
      "66.249.65.203": 18,
      "18.222.31.23": 37,
      "152.32.220.16": 2,
      "104.164.143.67": 3,
      "68.183.53.131": 2,
      "83.181.102.109": 6,
      "68.183.147.129": 1,
      "154.28.228.201": 14,
      "104.164.172.64": 2,
      "104.164.178.27": 4,
      "68.183.154.22": 1,
    })
  );
  cache.set(
    "mytastybite:rateLimit:crawlers",
    JSON.stringify({
      googlebot: 3732,
      "google-inspectiontool": 2,
      bingbot: 3383,
    })
  );
  cache.set(
    "mytastybite:rateLimit:crawlers",
    JSON.stringify({
      googlebot: 3732,
      "google-inspectiontool": 2,
      bingbot: 3383,
    })
  );
  cache.set("mytastybite:rateLimit:noIpCount", "468");
};

const seed = async () => {
  try {
    await seedRecipes();
    await seedArticles();
    await seedRateLimitData();

    if (redis.isOpen) await redis.quit();

    console.log("Seeding done");
  } catch (err) {
    console.error("Seeding error:", err);
  }
};

seed()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
