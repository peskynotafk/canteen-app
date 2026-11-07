const { z } = require("zod");

const createOrderSchema = z
  .object({
    items: z
      .array(
        z
          .object({
            foodId: z
              .string()
              .regex(
                /^[0-9a-fA-F]{24}$/,
                "Invalid food ID"
              ),

            quantity: z
              .number()
              .int("Quantity must be a whole number")
              .min(1, "Quantity must be at least 1")
          })
          .strict()
      )
      .min(1, "An order must contain at least one item")
  })
  .strict();

module.exports = { createOrderSchema };