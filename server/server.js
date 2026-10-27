require("./config/env");

const dbConnection = require("./db");
const app = require("./app");

const PORT = 3000;

dbConnection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    process.exitCode = 1;
  });
