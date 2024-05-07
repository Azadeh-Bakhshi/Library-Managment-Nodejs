import User from "../models/user.js";
import bcrypt from 'bcrypt';



//// authenticate user
export const authenticateUser = async function (username, password, role) {
    try {
        
        const user = await User.findOne({ username, role });

        if (user && user.active) {
            
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                console.log('User authenticated successfully:', user);
                return user;
            }
        }

        console.log('Authentication failed. User:', user);
        return null; 
    } catch (error) {
        console.error('Error during authentication:', error);
        throw new Error('System is down');
    }
};







//// register user
export const registerUser = async function (username, password, email, firstname, lastname, phonenumber, role) {
    try {
        
        let existingUser = await User.findOne({ username });

        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, firstname, lastname, phonenumber, role });
        await newUser.save();
        const savedUser = await User.findById(newUser._id, { password: 0 });
        console.log(newUser);
        console.log(`user created: ${username}`);
        return newUser;
    } catch (error) {
        throw new Error('!!SORRY, SYSTEM IS DOWN!!');
    }
}




////find user
export const FindAllUsers = async function () {
    try {
        const users = await User.find({}, {'firstname': 1,'lastname': 1,'email': 1, 'role': 1  });
        return users;
    } catch (error) {
        throw new Error('System is down');
    }
}





//// require admin login
export const requireAdminLogin = (req, res, next) => {
    
    
    if (req.session.loggedIn && req.session.role === 'admin') {
        next(); 
    } else {
        res.redirect('/profile/not-authorized'); 
    }
};





//// require member login
export const requireMemberLogin = (req, res, next) => {
    
    
    if (req.session.loggedIn && req.session.role === 'member') {
        next(); 
    } else {
        res.redirect('/profile/not-authorized');
    }
};







////delete user
export const deleteUser = async function (userId) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }

       
        return deletedUser;
    } catch (error) {
        throw new Error('Failed to delete the user');
    }
};





//// Update user by admin
export const updateUser = async function (userId, firstname, lastname, email, phonenumber) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstname, lastname, email, phonenumber },
            { new: true } 
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }
        console.log('Profile updated successfully:', updatedUser);

        return updatedUser;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};






//// Deactivate user
export const deactivateUser = async function (userId) {
    try {
        const deactivatedUser = await User.findByIdAndUpdate(
            userId,
            { active: false }, 
            { new: true }
        );

        if (!deactivatedUser) {
            throw new Error('User not found');
        }

        console.log('User deactivated successfully:', deactivatedUser);

        return deactivatedUser;
    } catch (error) {
        throw new Error('Failed to deactivate user');
    }
};

  





//// Reactivate user
export const reactivateUser = async function (userId) {
    try {
        const reactivatedUser = await User.findByIdAndUpdate(
            userId,
            { active: true }, 
            { new: true }
        );

        if (!reactivatedUser) {
            throw new Error('User not found');
        }

        console.log('User reactivated successfully:', reactivatedUser);

        return reactivatedUser;
    } catch (error) {
        throw new Error('Failed to reactivate user');
    }
};





//// update user in profile

export const updateUserProfile = async function (userId, oldPassword, newPassword, username, firstname, lastname, email, phonenumber) {
    try {
        //// Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        
        if (oldPassword) {
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);

            if (!passwordMatch) {
                throw new Error('Old password is incorrect');
            }
        }

        
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

       
        user.username = username; 
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.phonenumber = phonenumber;

        
        const updatedUser = await user.save();
        console.log('Profile updated successfully:', updatedUser);

        return updatedUser;
    } catch (error) {
        console.error('Failed to update user:', error);
        throw new Error('Failed to update user');
    }
};
