import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/mongodb.js";

import routes from "./routes/index.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.static("public"));
app.use(express.json());
// api v1.0
//handle route for api
routes(app);

app.get("/", (req, res) => {
  res.send(
    `Welcome to TPBookstore API, <a href='${
      process.env.WEB_CLIENT_URL || 3000
    }'>Click here to visit the shopping page</a><br>Made by Nguyễn Khắc Tuấn & Nguyễn Viết Phú & Nguyễn Anh Tuấn & Hồ Ngọc Tài 01/10/2022`
  );
});

const PORT = process.env.PORT || 1025;
app.listen(PORT, console.log(`Server run in port ${PORT}`));
