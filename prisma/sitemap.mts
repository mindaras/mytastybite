import { PrismaClient } from "@prisma/client";
import fs from "fs";

const client = new PrismaClient();
const pageLimit = 32;
const languages = ["en", "es"];
const origin = "https://mytastybite.com";
const urlTemplate = `
<url>
<loc>%loc%</loc>
</url>`;

const generateUrls = (paths: Array<string | number>) => {
  return paths
    .map((path) => {
      return languages.map((lang) =>
        urlTemplate.replace("%loc%", `${origin}/${lang}/${path}`)
      );
    })
    .flat()
    .join("");
};

const generate = async () => {
  try {
    const template = fs
      .readFileSync("./assets/sitemap-template.xml")
      .toString();
    const staticPaths = ["", "categories", "diets", "articles", "contact"];
    const recipes = await client.recipe_en.findMany({ select: { id: true } });
    const recipePaths = recipes.map(({ id }) => `recipes/${id}`);
    const articles = await client.article_en.findMany({ select: { id: true } });
    const articlePaths = articles.map(({ id }) => `articles/${id}`);
    const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
    const categoryPaths = categories.map((category) => `?category=${category}`);
    const diets = ["Healthy", "Vegetarian", "Vegan", "LowCarb"];
    const dietPaths = diets.map((diet) => `?diet=${diet}`);
    const pageCount = Math.floor(recipes.length / pageLimit);
    const pagePaths = Array.from(new Array(pageCount)).map(
      (_, i) => `?page=${i + 1}`
    );
    const staticUrls = generateUrls(staticPaths);
    const recipeUrls = generateUrls(recipePaths);
    const articleUrls = generateUrls(articlePaths);
    const categoryUrls = generateUrls(categoryPaths);
    const dietUrls = generateUrls(dietPaths);
    const pageUrls = generateUrls(pagePaths);
    const sitemap = template.replace(
      "<!-- urls -->",
      `${staticUrls}${pageUrls}${categoryUrls}${dietUrls}${recipeUrls}${articleUrls}`.trim()
    );

    fs.writeFileSync("./public/sitemap.xml", sitemap);
    console.log("Sitemap generated");
  } catch (err) {
    console.error("Sitemap generation error:", err);
  }
};

generate()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
