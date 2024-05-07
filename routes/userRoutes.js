import express from 'express';
import { FindAllUsers } from '../service/UserService.js'; 
const router = express.Router();





////view all users
router.get('/', async (req, res) => {
    const users = await FindAllUsers(); 
    res.render('view-all-users', { users }); 
});



router.post('/', async (req, res) => {
    const {action ,selectedUsers} =req.body;
    console.log (action,selectedUsers);
    const users = await FindAllUsers();
    res.render('view-all-users', { users }); 
});

export default router;
