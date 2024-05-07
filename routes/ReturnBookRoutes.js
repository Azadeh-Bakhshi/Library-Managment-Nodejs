
import express from 'express';
import Book from '../models/book.js';
import { findAllBooks, addBookQuantity } from '../service/BookService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('Reached /ReturnBook route');
  const books = await findAllBooks();
  res.render('ReturnBook', { books });
});

router.post('/', async (req, res) => {
  console.log('Form Data:', req.body);

  const { name, title } = req.body;

  try {
    //// Find the book by name and title
    const book = await Book.findOne({ name, title });

    if (!book) {
      throw new Error('Book not found');
    }

    ///// add the book quantity 
    await addBookQuantity(book._id, 1);

   
    res.render('bookReturnResult', {
      message: 'Book returned successfully',
      messageData: {
        name: book.name,
        title: book.title,
        
      },
    });
  } catch (error) {
    console.error('Error returning book:', error);
    
    res.render('bookReturnResult', { message: 'Failed to return book' });
  }
});

export default router;
