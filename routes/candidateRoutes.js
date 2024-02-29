const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const Candidate = require('./../models/candidate');

const checkAdminRole = async (userId) =>{
    try{
        const user = await User.findById(userId);
        if(user.role === 'admin'){
            return true;
        }
    }catch(err){
        return false;
    }
}

//post route to add a candidate 
router.post('/', jwtAuthMiddleware,async (req, res) => {
    try {

        if(!(await checkAdminRole(req.user.id))){
            return res.status(403).json({message: 'User has not admin role'});
        }
        const data = req.body; // Assuming the request body contains the candidate data

        const newCandidate = new Candidate(data);   //directly setting data

        //save the new candidate to the database
        const response = await newCandidate.save();
        console.log('data saved succesfully...');

        res.status(200).json({response : response});
    }
    catch (err) {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//password route
router.put('/:candidateId',jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!checkAdminRole(req.user.candidateId)){
            return res.status(403).json({message: 'User has not admin role'});
        }

        const candidateId = req.params.candidateId;
        const updatecandidateData = req.body;

        const responce = await Candidate.findByIdAndUpdate(candidateId, updatecandidateData, {
            new: true,
            runValidators : true,
        })

        if(!responce){
            res.status(404).json({error: 'Candidate not found'});
        }

        console.log('candidate data updated');
        res.status(200).json(responce);
    }catch (err){
        console.log('Error update candidate:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:candidateId',jwtAuthMiddleware, async (req, res)=> {
    try{
        
        if(!checkAdminRole(req.user.candidateId)){
            return res.status(403).json({message: 'User has not admin role'});
        }

        const candidateId = req.params.candidateId;
        const responce = await Candidate.findByIdAndDelete(candidateId);
        if(!responce){
            return res.status(404).json({error: 'Candidate not found'});
        }

        console.log('candidate data delete');
        res.status(200).json({message: 'Candidate deleted succesfully'})
    }catch (err){
        console.log('Error delete candidate', err);
        res.status(500).json({error: 'Internal server error'});
    }
});

//let's start voting 
router.post('/vote/:candidateId', jwtAuthMiddleware,async (req, res)=>{
    //no admin can vote
    //user can only vote once

    candidateId = req.params.candidateId;
    userId = req.user.id;

    try{
        //find the candidate document with the specified candidateId
        const candidate = await Candidate.findById(candidateId);
        if(!candidate){
            return res.status(404).json({message : 'Candidate not found'});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message : 'User not found'});
        }

        if(user.isVoted){
            return res.status(400).json({message : 'You have already voted '});
        }

        if(user.role === 'admin'){
            return res.status(403).json({message : 'admin is not allowed to vote '});
        }

        //update the candidate document to record vote
        candidate.votes.push({user: userId});
        candidate.voteCount++;
        await candidate.save();

        //update the user document
        user.isVoted = true;
        await user.save();
        res.status(200).json({message: 'Vote recorded Succesfully'});
    }catch(err){
        console.log('Error detected', err);
        res.status(500).json({error: 'Internal server error'});
    }
})

//vote count
router.get('/vote/count', async (req, res) =>{
    try{
        //Find all candidate and sort them by votecount in desending order
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        //Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data)=>{
            return{
                party: data.party,
                count: data.voteCount
            }
        });
        return res.status(200).json(voteRecord);
    }catch(err){
        console.log('Error detected', err);
        res.status(500).json({error: 'Internal server error'});
    }
});

//list of candidate
router.get('/', async (req, res) => {
    try {
        const data = await Candidate.find();
        console.log('data saved');
        res.status(200).json(data);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;