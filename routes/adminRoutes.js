import express from 'express';
import jwt from "jsonwebtoken";
import {deleteUser,updateUser,deactivateUser,reactivateUser } from '../service/UserService.js'; 


const router = express.Router();

router.get('/', (req, res) => {
    const firstname=req.session.firstname;
    const token = req.session.token;
    const decodeToken=jwt.verify(token,'Mydogname%Puma');
    console.log("decodeToken: ", decodeToken);
    if (req.sessionID === decodeToken.sessionID) {
        res.render('adminDashboard',{firstname});
        console.log('Admin name is',firstname);
    } else {
        res.render('login');
    }
});





/// Delete a user
router.post('/delete', async (req, res) => {
    const { userId } = req.body;

    try {
        
        const deletedUser = await deleteUser(userId);

        
        res.render('view-all-users-result', {
            message: 'User deleted successfully',
            messageData: {
                firstname: deletedUser.firstname,
                lastname: deletedUser.lastname,
                role: deletedUser.role,
                email: deletedUser.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});






/// Update a user
router.post('/update', async (req, res) => {
    const { userId, firstname, lastname, email } = req.body;

    try {
        
        const updatedUser = await updateUser(userId, firstname, lastname, email);

        
        res.render('view-all-users-result', {
            message: 'User updated successfully',
            messageData: {
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                role: updatedUser.role,
                email: updatedUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});







/// Deactivate a user
router.post('/deactivate', async (req, res) => {
    const { userId } = req.body;

    try {
        
        const deactivatedUser = await deactivateUser(userId);

        
        res.render('view-all-users-result', {
            message: 'User deactivated successfully',
            messageData: {
                firstname: deactivatedUser.firstname,
                lastname: deactivatedUser.lastname,
                role: deactivatedUser.role,
                email: deactivatedUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});






/// Reactivate a user
router.post('/reactivate', async (req, res) => {
    const { userId } = req.body;

    try {
        
        const reactivatedUser = await reactivateUser(userId);

        
        res.render('view-all-users-result', {
            message: 'User reactivated successfully',
            messageData: {
                firstname: reactivatedUser.firstname,
                lastname: reactivatedUser.lastname,
                role: reactivatedUser.role,
                email: reactivatedUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});





export default router;