import express from "express"
import { Product } from "../models/product.model.js"
export const productRoute = express.Router()

//get all products

productRoute.get("/", async (req, res) => {
  const products = await Product.find({})
  if (!products) {
    return res.status(404).json({ message: "No Products Available" })
  }
  return res.status(200).json(products)
})

//get single product

productRoute.get("/:id", async (req, res) => {
  const { id } = req.params
  const products = await Product.find({ _id: id })
  if (!products) {
    return res.status(404).json({ message: "No Product Found" })
  }
  return res.status(200).json(products)
})


//delete product

productRoute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params
  const products = await Product.deleteOne({ _id: id })
  if (!products) {
    return res.status(404).json({ message: "No Product Found" })
  }
  return res.status(200).json({ message: "Product Deleted", products })
})


//add new products

productRoute.post("/add", async (req, res) => {
  const { name, price, description, stock, imageUrl } = req.body
  try {
    const newProduct = new Product({ name, price, description, stock, imageUrl })
    const product = await newProduct.save()
    res.status(200).json({ message: "New Product Added", product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})