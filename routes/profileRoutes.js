
import express from 'express';
import { requireAdminLogin, requireMemberLogin, updateUserProfile } from '../service/UserService.js';

const router = express.Router();

/// Admin profile route
router.get('/admin', requireAdminLogin, (req, res) => {
    res.render('adminProfile', {
        role: req.session.role,
        username: req.session.username, 
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        email: req.session.email,
        phonenumber: req.session.phonenumber,
        message: req.query.message 
    });
});

/// Update admin profile route
router.post('/admin/update', requireAdminLogin, async (req, res) => {
    const { oldPassword, newPassword, username, firstname, lastname, email, phonenumber } = req.body;
    const userId = req.session._id;

    try {
        
        if (newPassword) {
            
            const updatedUser = await updateUserProfile(userId, oldPassword, newPassword, username, firstname, lastname, email, phonenumber);
            
            
            req.session.username = updatedUser.username; 
            req.session.firstname = updatedUser.firstname;
            req.session.lastname = updatedUser.lastname;
            req.session.email = updatedUser.email;
            req.session.phonenumber = updatedUser.phonenumber;
        } else {
            
            const updatedUser = await updateUserProfile(userId, oldPassword, undefined, username, firstname, lastname, email, phonenumber);
            
            
            req.session.username = updatedUser.username; 
            req.session.firstname = updatedUser.firstname;
            req.session.lastname = updatedUser.lastname;
            req.session.email = updatedUser.email;
            req.session.phonenumber = updatedUser.phonenumber;
        }

        res.redirect('/profile/admin?message=Profile updated successfully');
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Failed to update profile' });
    }
});

/// Member profile route
router.get('/member', requireMemberLogin, (req, res) => {
    res.render('memberProfile', {
        role: req.session.role,
        username: req.session.username, 
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        email: req.session.email,
        phonenumber: req.session.phonenumber,
        message: req.query.message 
    });
});

/// Update member profile route
router.post('/member/update', requireMemberLogin, async (req, res) => {
    const { oldPassword, newPassword, username, firstname, lastname, email, phonenumber } = req.body;
    const userId = req.session._id;

    try {
        
        if (newPassword) {
            
            const updatedUser = await updateUserProfile(userId, oldPassword, newPassword, username, firstname, lastname, email, phonenumber);
            
            
            req.session.username = updatedUser.username; 
            req.session.firstname = updatedUser.firstname;
            req.session.lastname = updatedUser.lastname;
            req.session.email = updatedUser.email;
            req.session.phonenumber = updatedUser.phonenumber;
        } else {
            
            const updatedUser = await updateUserProfile(userId, oldPassword, undefined, username, firstname, lastname, email, phonenumber);
            
            
            req.session.username = updatedUser.username; 
            req.session.firstname = updatedUser.firstname;
            req.session.lastname = updatedUser.lastname;
            req.session.email = updatedUser.email;
            req.session.phonenumber = updatedUser.phonenumber;
        }

        res.redirect('/profile/member?message=Profile updated successfully');
    } catch (error) {
        console.error(error);
        res.render('error', { error: 'Failed to update profile' });
    }
});

export default router;
