const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the user data

        const newUser = new User(data);   //directly setting data
        if(newUser.role === 'admin'){
            return res.status(403).json({message : 'admin is already present'});
        }

        //save the new user to the database
        const response = await newUser.save();
        console.log('data saved succesfully...');

        const payload = {
            id: response.id,
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("token is : ", token);

        res.status(200).json({response : response, token: token});
    }
    catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//login Route
router.post('/login', async (req, res)=>{
    try{
        //Extract the username and password from request body
        const {aadharCardNumber, password} = req.body;

        //find the user by aadharCardNumber
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        //if user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate token
        const payload = {
            id: user.id,
        }

        const token = generateToken(payload);

        //return token as response
        res.json({token});
    }catch (err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});


//GET method to get the user
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await User.find();
        console.log('data saved');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/profile/password',jwtAuthMiddleware, async (req, res)=>{
    try{
        const userid = req.user;       //Extract the id from the token 
        const {currentPassword, newPassword} = req.body;      //Extract current and new passwords from the request body

        //find the user by userId
        const user = await User.findById(userId);
        
        //if password does not matches return error
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //Update the user's password
        user.password = newPassword;
        await user.save();

        console.log('Password updated');
        res.status(200).json({message: 'Password Updated'});
    }catch (err){
        console.log('Error update person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;