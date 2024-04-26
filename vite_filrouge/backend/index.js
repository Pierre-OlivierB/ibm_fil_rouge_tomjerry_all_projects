const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const lightRoutes = require("./routes/r_light_client.js");
// * allow request from

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// * connexion on 3001
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// *redirect in routes
app.use("/", lightRoutes);

app.listen(3001, () => {
  console.log("3001, ok");
});
