
import express from 'express';
import { findAllBooks,updateBook,deleteBook} from '../service/BookService.js';
const router = express.Router();


/// View all books
router.get('/', async (req, res) => {
  const books = await findAllBooks();
  res.render('viewAllBook', { books }); 
});

router.post('/', async (req, res) => {
  const {action ,selectedBooks} =req.body;
  console.log (action,selectedBooks);
  const books = await findAllBooks();
  res.render('viewAllBook', { books }); 
});



/// Delete a book
router.post('/delete', async (req, res) => {
  const { bookId } = req.body;

  try {
    console.log('Deleting book with ID:', bookId);
    const deletedBook = await deleteBook(bookId);

    res.render('bookOperationResult', {
      message: 'Book deleted successfully',
      messageData: {
        name: deletedBook.name,
        title: deletedBook.title,
        quantity: deletedBook.quantity
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});








/// Update a book
router.post('/update', async (req, res) => {
  const { bookId, updateName, updateTitle, updateQuantity } = req.body;

  try {
      console.log('Updating book with ID:', bookId);
      const updatedBook = await updateBook(bookId, updateName, updateTitle, updateQuantity);
      console.log('Book updated successfully');

      res.render('bookOperationResult', {
        message: 'Book updated successfully',
        messageData: {
          name: updatedBook.name,
          title: updatedBook.title,
          quantity: updatedBook.quantity
        }
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});





export default router;
