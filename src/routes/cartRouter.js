import express from "express"
import { verifyToken } from "../middlewares/verifyToken.middleware.js"
import { Cart } from "../models/cart.model.js"
export const cartRoute = express.Router()

//get all cart
cartRoute.get("", verifyToken, async (req, res) => {
  const { userId } = req.user
  const cart = await Cart.findOne({ user: userId }).populate("product");

  if (!cart) {
    return res.status(404).json({ message: "No Item in found" });
  }
  if (cart.length === 0) {
    return res.status(200).json({ message: "Empty Cart" });
  }
  res.status(200).json(cart);
})


//add item to cart
cartRoute.post("/add", verifyToken, async (req, res) => {
  const { userId } = req.user
  const { productId, quantity } = req.body;
  try {
    let cartItem = await Cart.findOne({ user: userId, product: productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart({
        user: userId,
        product: productId,
        quantity
      });
    }
    await cartItem.save();
    res.status(201).json({ message: "Item Added to Cart ", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error: error.message });
  }
})

//update cart quantity
cartRoute.put("/update/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {

    const updatedCartItem = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "cart item updated", updatedCartItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error: error.message });
  }
})

cartRoute.delete("/delete/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCartItem = await Cart.findByIdAndDelete(id);

    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error: error.message });
  }

})

