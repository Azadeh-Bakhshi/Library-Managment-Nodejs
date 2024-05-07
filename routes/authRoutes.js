
import express from 'express';
import { authenticateUser, registerUser } from '../service/UserService.js';
import {findMaxCheckoutBooks } from '../service/BookService.js';
import jwt from 'jsonwebtoken';
const router = express.Router();





/// Login route
router.get('/login', async (req, res) => {
    try {
        ////find the book with max checkout count
    const maxCheckoutBooks = await findMaxCheckoutBooks();

    
    res.render('login', { maxCheckoutBooks });

        
    
    } catch (error) {
      console.error(error);
      res.render('error', { error: 'Something went wrong. Please try again later.' });
    }
  });
  

  router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await authenticateUser(username, password, role);

        if (user) {
            if (user.active) {

               {
            req.session.loggedIn = true;
            req.session._id= user._id;
            req.session.firstname= user.firstname;
			req.session.lastname = user.lastname; 
			req.session.email = user.email;
			req.session.phonenumber = user.phonenumber;
            req.session.role = user.role;
            req.session.status = user.status;
			req.session.username=user.username;
			req.session.password=user.password;
            };
           
            console.log(user)
            const optionData = {
            _id: user && user._id,
            firstname:user.firstname,
			lastname:user.lastname,
			email:user.email,
			phonenumber:user.phonenumber,
			role:user.role,
			status:user.status,
			username:user.username,
			password:user.password,
		    sessionID: req.sessionID
            };  

            const options = {
                expiresIn: '30m', 
            };
            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign(optionData, secretKey, options);
            req.session.token=token;    
                console.log('User authenticated successfully:', user);

                
                if (user.role.toLowerCase() === 'admin') {
                    res.redirect('/adminDashboard');
                } else if (user.role.toLowerCase() === 'member') {
                    res.redirect('/memberDashboard');
                } else {
                    console.log('Invalid Role:', user.role);
                    res.render('login', { error: 'Invalid login credentials or account deactivated.' });
                }
            } else {
                console.log('User is not active:', user);
                res.render('login', { error: 'Account is deactivated.' });
            }
        } else {
            console.log('Authentication failed. User:', user);
            res.render('login', { error: 'Invalid login credentials or account is deactivated.' });
        }
    } catch (e) {
        console.error(e);
        res.render('error', { error: 'Something went wrong. Please try again later.' });
    }
});






/// Registration route
router.get('/registerUser', (req, res) => {
    res.render('registerUser');
});

router.post('/registerUser', async (req, res) => {
    const { username, password, email, firstname, lastname, phonenumber, role } = req.body;

    try {
        
        const existingUser = await registerUser(username, password, email, firstname, lastname, phonenumber, role);

        if (existingUser) {
            req.session.loggedIn = true;
            res.redirect('/login'); 
            
        } else {
            res.render('registerUser', { error: 'Username already taken' });
        }
    } catch (error) {
        console.error(error);
        res.render('registerUser', { error: 'Something went wrong. Please try again later.' });
    }
});








/// logout Route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});





export default router;
