import express from "express";
import cors from "cors";
import config from "./config.js";
import bodyParser from "body-parser";
import router from "./routes/userRoutes.js"

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());


app.use("/user", router);
 
app.get("/", (req, res) => {
    res.send("SoleDBX  DB Express Server");
  });


app.listen(config.port, console.log(`Server says hi while running on ${config.port}`));
