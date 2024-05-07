
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    checkoutCount: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
Book.createIndexes();

export default Book;
