import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    imgSrc: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent Overwriting Model in Next.js (VERY IMPORTANT)
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
