import express from 'express';
import session from 'express-session';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import registerBookRoutes from './routes/registerBookRoutes.js';
import CheckOutBookRoutes from './routes/CheckOutBookRoutes.js';
import ReturnBookRoutes from './routes/ReturnBookRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
const app = express();

//// Connect to  MongoDB 

mongoose.connect('mongodb+srv://azadeh:12144660@cluster0.tlzzjv8.mongodb.net/library',{
    dbName:'library'
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.error.bind(console, 'MongoDB connection error:')
})

database.once('connected', () => {
    console.log('Database Connected');
})

//// Configure session middleware
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    })
);

//// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


//// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

//// Set the view engine to Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', 'views');


//// Middleware to check if the admin is already logged in as an admin
const requireAdminLogin = (req, res, next) => {
    
    if (req.session && req.session.role && req.session.role === 'admin') {
        next(); 
    } else {
        res.redirect('/'); 
    }
};





//// Middleware to check if the member is already logged in as an admin
const requireMemberLogin = (req, res, next) => {
    
    if (req.session && req.session.role && req.session.role === 'member') {
        next(); 
    } else {
        res.redirect('/'); 
    }
};








const requireLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        next(); 
    } else {
        res.redirect('/'); 
    }
};



//// Use the authRoutes for login-related routes
app.use('/', authRoutes);
app.use('/adminDashboard',requireAdminLogin, adminRoutes);
app.use('/memberDashboard',requireMemberLogin, memberRoutes);
app.use('/users',requireLogin, userRoutes);
app.use('/books',requireLogin,registerBookRoutes);
app.use('/viewAllBook',requireLogin,bookRoutes);
app.use('/books',requireLogin,bookRoutes);
app.use('/users',requireLogin, adminRoutes);
app.use('/CheckOutBook',requireLogin,CheckOutBookRoutes);
app.use('/ReturnBook',requireLogin,ReturnBookRoutes);
app.use('/profile',requireLogin,profileRoutes);
app.use('/report',requireLogin,reportRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});






app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
