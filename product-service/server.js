import express from "express";
import { env } from "./lib/env.js";
import productRoutes from "./routes/product.route.js";
import { connectToDB } from "./lib/db.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    return res.status(200).json({ message: "Server running" }); 
});

app.use("/api/products", productRoutes);

app.listen(env.PORT, () => {
    console.log(`Server is listening on port: ${env.PORT}`);
});