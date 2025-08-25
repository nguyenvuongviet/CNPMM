import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sequelize from "./config/db";
import webRoutes from "./routes/web";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Kết nối MySQL thành công");
  })
  .catch((err: unknown) => {
    console.error("❌ Lỗi kết nối MySQL:", err);
  });

webRoutes(app);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
