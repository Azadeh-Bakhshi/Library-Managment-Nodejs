
import express from 'express';
import { findAllBooks, registerBook } from '../service/BookService.js';
const router = express.Router();

router.get('/', async (req, res) => {
    const books = await findAllBooks();
    res.render('registerBook', { books });
});

router.post('/register', async (req, res) => {
    const { name, title, quantity } = req.body;

    try {
        const newBook = await registerBook(name, title, quantity);

        res.render('registeredBook', {
            message: 'New book registered',
            newBook: {
                name: newBook.name,
                title: newBook.title,
                quantity: newBook.quantity
            }
        });
    } catch (error) {
        res.render('registeredBook', { error: error.message });
    }
});

export default router;
