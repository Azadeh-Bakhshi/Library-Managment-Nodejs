import Book from '../models/book.js';




////register book
export const registerBook = async function (name, title, quantity) {
    try {
      
      const existingBook = await Book.findOne({ title });
      if (existingBook) {
        throw new Error('Book has already been taken');
      }
  
      const newBook = new Book({ name, title, quantity });
      await newBook.save();
      console.log('New book registered' );
      console.log('Name:', newBook.name);
      console.log('Title:', newBook.title);
      console.log('Quantity:', newBook.quantity);
      
      return newBook;
      
    } catch (error) {
      throw new Error('Failed to register the book: ' + error.message);
    }
  };
  
  
  export const findAllBooks = async function () {
      try {
        const books = await Book.find({ }, {'name': 1,'title': 1,'quantity': 1});
        return books;
      } catch (error) {
        throw new Error('System is down');
      }
    };




//// Delete a book by ID
export const deleteBook = async function (bookId) {
  try {
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      throw new Error('Book not found');
    }

    const deletedBook = { ...existingBook._doc }; 
    await Book.findByIdAndDelete(bookId);

    console.log('Book deleted successfully:', deletedBook);
    return deletedBook;
  } catch (error) {
    console.error('Failed to delete the book:', error);
    throw new Error('Failed to delete the book: ' + error.message);
  }
};

   



//// update book quantity
export const updateBookQuantity = async function (bookId, quantityChange) {
  try {
    const existingBook = await Book.findById(bookId);
    if (!existingBook) {
      throw new Error('Book not found');
    }

    ///// make sure the quantity won't go below 0
    const newQuantity = Math.max(existingBook.quantity + quantityChange, 0);

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { quantity: newQuantity },
      { new: true }
    );

    if (!updatedBook) {
      throw new Error('Book not found');
    }

    return updatedBook;
  } catch (error) {
    console.error('Error updating book quantity:', error);
    throw new Error('Failed to update book quantity');
  }
};




//// Function to generate a message for book checkout
export const getBookCheckedOutMessage = (book) => {
  return {
    message: 'Book checked out successfully:',
    messageData: {
      name: book.name,
      title: book.title,
      
    },
  };
};






export const findById = async function (bookId) {
  try {
    const book = await Book.findById(bookId);
    return book;
  } catch (error) {
    console.error('Error finding book by ID:', error);
    throw new Error('Failed to find book by ID');
  }
};



    

     ////add book by ID
    export const addBookQuantity = async function (bookId) {
      try {
        const existingBook = await Book.findById(bookId);
        if (!existingBook) {
          throw new Error('Book not found');
        }
    
       
        const newQuantity = Math.max(existingBook.quantity + 1, 0);
    
        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { quantity: newQuantity },
          { new: true }
        );
    
        if (!updatedBook) {
          throw new Error('Book not found');
        }
    
        return updatedBook;
      } catch (error) {
        console.error('Error updating book quantity:', error);
        throw new Error('Failed to update book quantity');
      }
    };
    




    //// Update book by ID
export const updateBook = async function (bookId, newName, newTitle, newQuantity) {
  try {
      const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { name: newName, title: newTitle, quantity: newQuantity },
          { new: true }
      );

      if (!updatedBook) {
          throw new Error('Book not found');
      }

      console.log('Book updated successfully:', updatedBook);
      return updatedBook;
  } catch (error) {
      console.error('Error updating book:', error);
      throw new Error('Failed to update book');
  }
};



//// find max checkout book
export async function findMaxCheckoutBooks() {
  try {
    const maxCheckoutCount = await Book.find().sort({ checkoutCount: -1 }).limit(1).exec();
    const maxCheckoutBooks = await Book.find({ checkoutCount: maxCheckoutCount[0].checkoutCount }).exec();
    return maxCheckoutBooks;
  } catch (error) {
    throw new Error(`Error finding books with maximum checkout count: ${error.message}`);
  }
}