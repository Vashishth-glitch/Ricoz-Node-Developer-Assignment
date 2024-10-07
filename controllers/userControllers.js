// const { MongoClient } = require('mongodb');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../models/userModels');

const uri = "mongodb+srv://vjpmongodb:vjpmongodb@cluster0.pakwt.mongodb.net/todo?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    

const postData = (req, res) => {


async function run() {
    let query = require('url').parse(req.url,true).query;
    console.log(query)

    const newUser = new User({
        firstName: query.fname,
        lastName: query.lname,
        email: query.email,
        comment: query.comment
    });

    try {
        const savedUser = await newUser.save();
        // res.status(201).json(savedUser); // Send the saved user as the response
        console.log("User data stored");

        const users = await User.find().lean(); // Use lean() to get plain objects
        // res.status(200).json(users); // Send the list of users as the response

        // console.log(users);

        if(users == ""){
            usersData = null;
            res.render("homepage", {data : usersData});
        }

        else{

        const usersArray = users;

        // Variable to store user data
        const usersData = [];

        // Loop through the users array and extract data
        for (const user of usersArray) {
            // Store the desired data in a variable (excluding __v)
            const { _id, firstName, lastName, email, comment } = user;
            usersData.push([ _id, firstName, lastName, email, comment ]);
        }
        console.log(usersData);
        res.render("homepage", {data : usersData});

    }





    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

run().catch(console.dir);


}; 




const addDataPage = (req, res) => {
    res.render("adddata")
    }; 



const geteditdata = (req, res) => {

    let query = require('url').parse(req.url,true).query;
    let data = {
        id: query.id,
        fname: query.fname,
        lname: query.lname,
        email: query.email,
        comment: query.comment

    }
    console.log(data);
    res.render("updatedata", {data : data})
    }; 



const homepage = (req, res) => {

    async function run() {
      
            const users = await User.find().lean(); // Use lean() to get plain objects
            // res.status(200).json(users); // Send the list of users as the response

            // console.log(users);

            if(users == ""){
                usersData = null;
                res.render("homepage", {data : usersData});
            }

            else{

            const usersArray = users;

            // Variable to store user data
            const usersData = [];

            // Loop through the users array and extract data
            for (const user of usersArray) {
                // Store the desired data in a variable (excluding __v)
                const { _id, firstName, lastName, email, comment } = user;
                usersData.push([ _id, firstName, lastName, email, comment ]);
            }
            console.log(usersData);
            res.render("homepage", {data : usersData});

        }

    }
    
    run().catch(console.dir);
        
    }; 
    



const getData = (req, res) => {
    
    async function run() {
        try {
            const users = await User.find().lean(); // Use lean() to get plain objects
            res.status(200).json(users); // Send the list of users as the response

            // console.log(users)

            const usersArray = users;

            // Variable to store user data
            const usersData = [];

            // Loop through the users array and extract data
            for (const user of usersArray) {
                // Store the desired data in a variable (excluding __v)
                const { _id, firstName, lastName, email, comment } = user;
                usersData.push([ _id, firstName, lastName, email, comment ]);
            }

            // Output the stored data
            console.log(usersData);
            res.render("homepage", {data : usersData});



        } catch (error) {
            res.status(500);
        }
    }
    
    run().catch(console.dir);

    }; 



    const putUpdateData = (req, res) => {
    
        async function run() {
            try {

                let query = require('url').parse(req.url,true).query;
                const userId = query.id; // Get user ID from the request parameters
                console.log(userId)

                let data = {
                    firstName: query.fname,
                    lastName: query.lname,
                    email: query.email,
                    comment: query.comment
                }

                    const updatedUser = await User.findByIdAndUpdate(userId, data, {
                        new: true, // Returns the updated document
                        runValidators: true // Runs schema validations for the updated data
                    });
            
                    if (!updatedUser) {
                        return res.status(404).json({ message: 'User not found' });
                    }

                    const users = await User.find().lean(); // Use lean() to get plain objects
                    // res.status(200).json(users); // Send the list of users as the response
        
                    // console.log(users);
        
                    if(users == ""){
                        usersData = null;
                        res.render("homepage", {data : usersData});
                    }
        
                    else{
        
                    const usersArray = users;
        
                    // Variable to store user data
                    const usersData = [];
        
                    // Loop through the users array and extract data
                    for (const user of usersArray) {
                        // Store the desired data in a variable (excluding __v)
                        const { _id, firstName, lastName, email, comment } = user;
                        usersData.push([ _id, firstName, lastName, email, comment ]);
                    }
                    console.log(usersData);
                    res.render("homepage", {data : usersData});
        
                }
            
                    res.status(200).json(updatedUser); // Send the updated user data as the response
    
            } catch (error) {
                res.status(500);
            }
        }
        
        run().catch(console.dir);
    
        }; 
    


module.exports = {postData, addDataPage, getData, homepage, geteditdata, putUpdateData}