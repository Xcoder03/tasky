import dotenv from "dotenv"
import express from  "express"
import {database} from "./config/dbConnect.js"

dotenv.config();
database();
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Omor we are back  at port ${PORT} server don set.`))