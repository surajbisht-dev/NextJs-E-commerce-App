import connectDB from "@/app/utils/database";
import { createProduct, getProducts } from "@/app/controllers/product";

// http://localhost:3000/api/products

export async function POST(req) {
  await connectDB();
  return await createProduct(req);
}

// http://localhost:3000/api/products
export async function GET(req) {
  await connectDB();
  // const { getProducts } = await import("@/app/controllers/product");
  return await getProducts(req);
}
