import express from "express"
import dotenv from 'dotenv';
import "./db/db.js"

dotenv.config();

//routes
import { cartRoute } from "./routes/cartRouter.js"
import { productRoute } from "./routes/productRouter.js"
import { authRoute } from "./routes/authRouter.js"

const app = express()

//application middlewares
app.use(express.json())


//routes
app.use("/products", productRoute)
app.use("/cart", cartRoute)
app.use("/auth", authRoute)


app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port : ", process.env.PORT || 3000);

})