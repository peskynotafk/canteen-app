const { z } = require("zod");

const createFoodSchema = z.object({
  name: z.string().trim().min(1, "Food name is required"),

  description: z.string().optional().default(""),

  pricePaise: z
    .number()
    .int("Price must be a whole number of paise")
    .nonnegative("Price cannot be negative"),

  category: z.string().trim().min(1).optional().default("Other"),

  isAvailable: z.boolean().optional().default(true)
});

module.exports = {
  createFoodSchema
};
