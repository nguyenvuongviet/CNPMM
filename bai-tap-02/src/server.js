import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sequelize from "../config/db.js";
import webRoutes from "./routes/web.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối MySQL thành công");
  })
  .catch((err) => {
    console.error("Lỗi kết nối MySQL:", err);
  });

webRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
