
require("dotenv").config();

const requiredVariables = ["MONGO_URI", "JWT_SECRET"];

const missingVariables = requiredVariables.filter(
  (name) => !process.env[name]
);

if (missingVariables.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVariables.join(", ")}`
  );

  process.exit(1);
}

console.log("Environment configuration validated.");
