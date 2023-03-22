const express = require("express");
const app = express();
const tasks = require("./routes/todoRoute");
const port = process.env.PORT || 8080;
const connectDB = require("./db/connection");
const cors = require("cors");
const user = require("./routes/user");
const bodyParser = require("body-parser");
const verifyToken = require("./middleware/authJwt");
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/v1", user);
app.use("/api/v1", verifyToken, tasks);

app.listen(port, console.log(`server in running on port ${port}`));
