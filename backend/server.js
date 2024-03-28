require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const route = require("./routes/routes");
const cors = require("cors");

const PORT = 5000 || process.env.port;

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("You are on backend server");
})

app.use("/api/v1", route);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
});
