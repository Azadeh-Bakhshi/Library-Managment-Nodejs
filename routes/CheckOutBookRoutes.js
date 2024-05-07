
import mongoose from 'mongoose';
import express from 'express';
import { updateBookQuantity, findAllBooks, findById, getBookCheckedOutMessage } from '../service/BookService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await findAllBooks();
  res.render('CheckOutBook', { books });
});

router.post('/', async (req, res) => {
  console.log('Form Data:', req.body);

  const { selectedBook } = req.body;

  if (!mongoose.isValidObjectId(selectedBook)) {
    console.error('Invalid ObjectId:', selectedBook);
    return res.render('CheckOutBook', { message: 'Invalid form data' });
  }

  try {
    const checkedOutBook = await findById(selectedBook);

    if (checkedOutBook.quantity === 0) {
      
      return res.render('CheckOutBookResult', { message: 'The book is not available.' });
    }

    await updateBookQuantity(selectedBook, -1);

    
    checkedOutBook.checkoutCount += 1;

    
    await checkedOutBook.save();

    console.log('Book checked out successfully:', checkedOutBook);
    res.render('CheckOutBookResult', { message: getBookCheckedOutMessage(checkedOutBook) });
  } catch (error) {
    console.error('Error checking out book:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;
