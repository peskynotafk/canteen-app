const { z } = require("zod");

const updateOrderStatusSchema = z
  .object({
    status: z.enum([
      "ACCEPTED",
      "PREPARING",
      "READY",
      "COLLECTED",
      "REJECTED"
    ])
  })
  .strict();

module.exports = { updateOrderStatusSchema };