import express from 'express';
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/', (req, res) => {
    const firstname=req.session.firstname;
    const token= req.session.token;
    const decodeToken=jwt.verify(token,'Mydogname%Puma');
    console.log("decodeToken: ", decodeToken);
    if (req.sessionID === decodeToken.sessionID) {
        res.render('memberDashboard',{firstname});
        console.log('Member name is',firstname);
    } else {
        res.render('login');
    }
});
export default router;