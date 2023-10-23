export type QueryParams = Record<string, any>;

export enum Language {
  EN = "en",
  ES = "es",
}

export interface Recipe {
  id: number;
  externalId: string;
  title: string;
  description: string;
  ingredients: string[];
  preparation: string[];
  servings: number;
  duration: string;
  nutrition: string[];
}

export type Recipes = Recipe[];

export enum Category {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Snack = "Snack",
  Dessert = "Dessert",
}

export enum Diet {
  Healthy = "Healthy",
  Vegetarian = "Vegetarian",
  Vegan = "Vegan",
  LowCarb = "LowCarb",
}

export interface Article {
  id: number;
  externalId: string;
  title: string;
  description: string;
  body: string;
  readTime: string;
  createdAt: string;
  updatedAt?: string;
}

export type Articles = Article[];
