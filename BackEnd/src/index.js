const app = require("./config/app");
const data = require("./database/firebase");

const PORT = process.env.PORT || 4000;
app.listen(PORT);

console.log("Running server on port " + PORT);
