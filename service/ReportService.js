
import User from "../models/user.js";
import Book from "../models/book.js";




//// find the books with the most checkouts
export async function findMaxCheckoutBooks() {
  try {
    const maxCheckoutCount = await Book.find().sort({ checkoutCount: -1 }).limit(1).exec();
    const maxCheckoutBooks = await Book.find({ checkoutCount: maxCheckoutCount[0].checkoutCount }).exec();
    return maxCheckoutBooks;
  } catch (error) {
    throw new Error(`Error finding books with maximum checkout count: ${error.message}`);
  }
}



////  get the number of members registered in the system
export async function getNumberOfMembers() {
  try {
    const result = await User.countDocuments({ role: "member" }).exec();
    return result;
  } catch (error) {
    throw new Error(`Error getting the number of members: ${error.message}`);
  }
}

//// get the number of admins registered in the system
export async function getNumberOfAdmins() {
  try {
    const result = await User.countDocuments({ role: "admin" }).exec();
    return result;
  } catch (error) {
    throw new Error(`Error getting the number of admins: ${error.message}`);
  }
}

////  get the total number of books in the library
export async function getTotalNumberOfBooks() {
  try {
    const result = await Book.countDocuments().exec();
    return result;
  } catch (error) {
    throw new Error(`Error getting the total number of books: ${error.message}`);
  }
}

//// get the number of active users
export async function getNumberOfActiveUsers() {
  try {
    const result = await User.countDocuments({ active: true }).exec();
    return result;
  } catch (error) {
    throw new Error(`Error getting the number of active users: ${error.message}`);
  }
}




