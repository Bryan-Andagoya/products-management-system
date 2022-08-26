import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({});

export const productModel = mongoose.model("Product", ProductSchema);
