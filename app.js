import dotenv from "dotenv"
import express from  "express"
import userRoutes from "./routes/UserRoutes.js"
import labelRoutes from "./routes/LabelRoutes.js"
import taskRoutes from "./routes/TaskRoutes.js"
import {database} from "./config/dbConnect.js"

dotenv.config();
database();
const app = express();
app.use(express.json())



const PORT = process.env.PORT || 8080;
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/label", labelRoutes)
app.use("/api/v1/tasks", taskRoutes)


app.listen(PORT, console.log(`Omor we are back  at port ${PORT} server don set.`))