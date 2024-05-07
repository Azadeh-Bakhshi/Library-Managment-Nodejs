// reportRoutes.js code:

import express from 'express';
import {
  findMaxCheckoutBooks,
  getNumberOfMembers,
  getNumberOfAdmins,
  getTotalNumberOfBooks,
  getNumberOfActiveUsers, 
} from '../service/ReportService.js';

const router = express.Router();

/// Admin report route
router.get('/', async (req, res) => {
  try {
    const mostCheckoutBooks = await findMaxCheckoutBooks();
    const numberOfMembers = await getNumberOfMembers();
    const numberOfAdmins = await getNumberOfAdmins();
    const totalNumberOfBooks = await getTotalNumberOfBooks();
    const numberOfActiveUsers = await getNumberOfActiveUsers(); 

    res.render('adminReport', {
      mostCheckoutBooks,
      numberOfMembers,
      numberOfAdmins,
      totalNumberOfBooks,
      numberOfActiveUsers, 
    });
  } catch (error) {
    console.error(error);
    res.render('error', { error: 'Failed to generate admin report. Please try again later.' });
  }
});

export default router;
