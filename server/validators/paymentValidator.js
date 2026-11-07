const { z } = require("zod");

const simulatePaymentSchema = z.object({
  method: z.enum(["UPI", "CARD"]),
  outcome: z.enum(["SUCCESS", "FAILED"])
}).strict();

module.exports = { simulatePaymentSchema };