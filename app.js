import dotenv from "dotenv"
import express from  "express"
import userRoutes from "./routes/UserRoutes.js"
import {database} from "./config/dbConnect.js"

dotenv.config();
database();
const app = express();
app.use(express)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

const PORT = process.env.PORT || 8080;
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/label", labelRoutes)


app.listen(PORT, console.log(`Omor we are back  at port ${PORT} server don set.`))