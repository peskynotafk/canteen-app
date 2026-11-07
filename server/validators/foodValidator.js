const { z } = require("zod");

const createFoodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Food name is required"),

  description: z
    .string()
    .optional()
    .default(""),

  pricePaise: z
    .number()
    .int("Price must be a whole number of paise")
    .nonnegative("Price cannot be negative"),

  category: z
    .string()
    .trim()
    .min(1, "Category cannot be empty")
    .optional()
    .default("Other"),

  isAvailable: z
    .boolean()
    .optional()
    .default(true)
});

const updateFoodSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Food name cannot be empty")
      .optional(),

    description: z
      .string()
      .optional(),

    pricePaise: z
      .number()
      .int("Price must be a whole number of paise")
      .nonnegative("Price cannot be negative")
      .optional(),

    category: z
      .string()
      .trim()
      .min(1, "Category cannot be empty")
      .optional(),

    isAvailable: z
      .boolean()
      .optional()
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "Provide at least one field to update"
    }
  );

// Validation for search, filters and pagination
const foodQuerySchema = z.object({
  q: z.string().trim().optional(),

  category: z
    .string()
    .trim()
    .optional(),

  isAvailable: z
    .enum(["true", "false"])
    .optional(),

  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10)
});

module.exports = {
  createFoodSchema,
  updateFoodSchema,
  foodQuerySchema
};