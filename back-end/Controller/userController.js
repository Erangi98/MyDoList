const User = require("../Model/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../Utils/generateToken");


const signUpUser = asyncHandler(async (req, res) => {
    const { username, useremail, userpassword } = req.body;

    const userAlreadyExists = await User.findOne({ useremail });

    if(userAlreadyExists){
        res.status(400);
        throw new Error("Error! User Already Exists!");
    }

    const user = await User.create({
        username,
        useremail,
        userpassword,
    });

    if(user) {
        res.status(201).json({

            _id: user._id,
            username: user.username,
            useremail: user.useremail,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Error...Something Worng! ");
    }
}); 


const authUser = asyncHandler(async (req, res) => {
    const { useremail, userpassword } = req.body;

    const user = await User.findOne({ useremail });

    if(user && (await user.matchThePasswords(userpassword))){

        res.json({
            _id: user._id,
            username: user.username,
            useremail: user.useremail,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Error...Invalid Email or Password! ");
    }
});

const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.username = req.body.username || user.username;
        user.useremail = req.body.useremail || user.useremail;

        if (req.body.userpassword) {
            user.userpassword = req.body.userpassword;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            username: updateUser.username,
            useremail: updateUser.useremail,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),
        });
    }else{
        res.status(404);
        throw new Error("User not found...");
    }
});

module.exports = { signUpUser, authUser, updateUserProfile };

