const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// Define Routes

app.get("/", (req, res) => {
    res.send("Root is working");
    console.log("Root is working");
});


// Connect to MongoDB
(async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp', {

        });
        console.log("Connection successful");

    } catch (err) {
        console.error("Database connection error:", err);
    }
})();

// index route

app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        //console.log(chats);
        res.render("index.ejs", {chats}) // Send the retrieved chats as response
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching chats"); // Send error response
    }
});

app.get("/chats/new" , (req,res) =>{
   try{
    res.render("new.ejs");
   } catch (err){
    console.error(err);
   }

});





//create route 
app.post("/chats", async (req, res) => {
    try {
        let { from, to, msg } = req.body;

        // Create and save the chat message
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date(),
        });

        await newChat.save(); // Save the message in MongoDB

        res.redirect("/chats"); // Redirect to the chats page after saving
    } catch (err) {
        console.error("Error saving chat:", err);
        res.status(500).send("Error saving chat");
    }
});


//edit route

app.get("/chats/:id/edit",async (req,res) => {
    try{
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs", {chat});
    
}
catch(err){
    console.error(err);
    res.status(404).send("Chat not found");
    }});
    

//update route

app.put("/chats/:id", async (req, res) => {
    try {
        let updatedChat = await Chat.findByIdAndUpdate(
            req.params.id,
            { msg: req.body.msg },
            { runValidators: true, new: true }
        );
        if (!updatedChat) return res.status(404).send("Chat not found");

        res.redirect("/chats");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//delete route

app.delete("/chats/:id", async (req, res) => {
    try {
        let deletedChat = await Chat.findByIdAndDelete(req.params.id);
        if (!deletedChat) return res.status(404).send("Chat not found");
        res.redirect("/chats");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
            }
            });
















































// Start Server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
