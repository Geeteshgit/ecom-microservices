import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    color: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    },
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    }
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
