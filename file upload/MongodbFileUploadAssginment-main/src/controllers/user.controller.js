
const express = require("express");

const User1 = require("../models/user.model");

const {UploadFiles} = require("../middlewares/uploads");

const router = express.Router();

router.get("", async(req,res)=>
{
    try 
    {
        const User = await User1.find({}).lean().exec();

        return res.status(200).send({User : User});
    } 
    catch(error) 
    {
        return res.status(500).send({message : error.message});
    }    
})

router.post("", UploadFiles("profile_pic", "single"), async(req,res)=>
{
    try 
    {
        const Users = await User1.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : req.file.path,
        })
        return res.status(201).send({Users : Users});
    } 
    catch(error) 
    {
        return res.status(500).send({message : error.message});
    }
});

router.post("/multiples", UploadFiles("profile_pic", "multiple"), async(req,res)=>
{
    try 
    {
        const filePath = req.files.map((file) =>
        {
            return file.path;
        })
        const Users = await User1.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : filePath,
        })
        return res.status(201).send({Users : Users});
    } 
    catch(error) 
    {
        return res.status(500).send({message : error.message});
    }
});

router.patch("/:id",async (req,res)=>
{
    try 
    {
        const Users = await User1.findByIdAndUpdate(req.params.id,
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path,
        },{new : true})
        .lean().exec();



        return res.status(200).send({Users : Users});
    } 
    catch(error) 
    {
        return res.status(500).send({message : error.message});
    }
})

router.delete("/:id",async (req,res)=>
{
    try
    {
        const User = await User1.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send({User : User});
    }
    catch(error)
    {
        return res.status(500).send({message : error.message});
    }
});

module.exports = router