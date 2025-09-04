import { Product } from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ message: "Products fetched successfully", products });
  } catch (err) {
    console.error("Error Fetching Products: ", err);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
}

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, brand, stock, category, imageUrl } = req.body;
    if(!name || !description || !price || !brand || !stock || !category || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      color,
      description,
      price,
      brand,
      stock,
      category,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json({ message: "Product added successfully", savedProduct });
  } catch (err) {
    console.error("Error Adding Product: ", err);
    return res.status(500).json({ message: "Failed to add product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if(!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product fetched successfully", product });
    
  } catch (err) {
    console.error("Error Fetching Product: ", err);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
}