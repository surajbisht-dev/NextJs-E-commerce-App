import mongoose from "mongoose";
import Product from "./app/models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not defined in .env file");
  process.exit(1);
}

const products = [
  {
    category: "mobiles",
    title: "Apple iPhone 14",
    imgSrc: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg",
    price: 89999,
    description: "Apple iPhone 14 (128 GB) - Blue",
  },
  {
    category: "laptops",
    title: "Xiaomi Notebook Pro",
    imgSrc: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
    description: "Xiaomi Notebook Pro",
    price: 49999,
  },
  {
    category: "tablets",
    title: "Xiaomi Pad 6",
    imgSrc: "https://m.media-amazon.com/images/I/51b9LjzmPCL._SL1080_.jpg",
    description: "Snapdragon 870",
    price: 29999,
  },
  {
    category: "mobiles",
    title: "iPhone 11",
    imgSrc: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg",
    description: "iPhone 11 White",
    price: 79999,
  },
  {
    category: "tablets",
    title: "Lenovo Tab P12",
    imgSrc: "https://m.media-amazon.com/images/I/51b9LjzmPCL._SL1080_.jpg",
    description: "AMOLED Display",
    price: 19999,
  },
  {
    category: "mobiles",
    title: "iPhone 13",
    imgSrc: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg",
    description: "128GB Blue",
    price: 69999,
  },
  {
    category: "laptops",
    title: "Lenovo IdeaPad Slim 5",
    imgSrc: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
    description: "Intel i5",
    price: 29999,
  },
  {
    category: "tablets",
    title: "Samsung Tab A8",
    imgSrc: "https://m.media-amazon.com/images/I/51b9LjzmPCL._SL1080_.jpg",
    description: "10.5 inch Display",
    price: 49999,
  },
  {
    category: "laptops",
    title: "MacBook Air M1",
    imgSrc: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg",
    description: "Apple M1",
    price: 89999,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    await Product.deleteMany();
    const result = await Product.insertMany(products);

    console.log(`✅ Inserted ${result.length} products`);

    await mongoose.connection.close();
    console.log("✅ MongoDB Connection Closed");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
    process.exit(1);
  }
}

seed();
