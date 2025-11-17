import { addToCart, clearCart, getCartItems } from "@/app/controllers/cart";
import connectDB from "@/app/utils/database";

// http://localhost:3000/api/cart

export async function POST(req) {
  await connectDB();
  return await addToCart(req);
}

// http://localhost:3000/api/cart

export async function GET(req) {
  await connectDB();
  return await getCartItems(req);
}

export async function DELETE(req) {
  await connectDB();
  return await clearCart(req);
}
