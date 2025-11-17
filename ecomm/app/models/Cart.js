import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imgSrc: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Prevent Overwriting Model in Next.js (VERY IMPORTANT)
export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
