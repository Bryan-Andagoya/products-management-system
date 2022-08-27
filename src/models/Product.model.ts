import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor ingrese el nombre del producto."],
      trim: true,
      minLength: [1, "Campo requerido."],
    },
    description: {
      type: String,
      required: [true, "Por favor ingrese la descripción del producto."],
      trim: true,
      minLength: [1, "Campo requerido."],
    },
    price: {
      type: Number,
      min: [0.01, "Precio inválido."],
      required: [true, "Por favor ingrese el precio del producto."],
    },
    unitsInStock: {
      type: Number,
      min: [0, "Stock inválido."],
      required: [true, "Por favor ingrese las unidades en stock del producto."],
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    brand: {
      type: String,
      required: [true, "Por favor ingrese la marca del producto."],
      trim: true,
      minLength: [1, "Campo requerido."],
    },
    category: {
      type: String,
      enum: [
        "Computadoras",
        "Celulares",
        "Tablets",
        "Laptops",
        "Accesorios",
        "Consolas",
      ],
      required: [true, "Por favor elija la categoría del producto."],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
