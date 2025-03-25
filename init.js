const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
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



const letchats = [
    { from: "bunny", to: "neha", msg: "Hi Neha, how are you!", created_at: new Date() },
    { from: "neha", to: "bunny", msg: "Hey Bunny, I'm good. How about you?", created_at: new Date() },
    { from: "bunny", to: "neha", msg: "I'm great, thanks for asking!", created_at: new Date() },
    { from: "neha", to: "bunny", msg: "What are you up to?", created_at: new Date() },
    { from: "bunny", to: "neha", msg: "Just working on a project.", created_at: new Date() },
    { from: "neha", to: "bunny", msg: "That sounds interesting!", created_at: new Date() },
    { from: "bunny", to: "neha", msg: "Yeah! It's about chat applications.", created_at: new Date() },
    { from: "neha", to: "bunny", msg: "Cool! Let me know if I can help.", created_at: new Date() },
    { from: "bunny", to: "neha", msg: "Sure, I'll reach out if needed.", created_at: new Date() },
    { from: "neha", to: "bunny", msg: "Looking forward to it!", created_at: new Date() }
];

Chat.insertMany(letchats)
    .then(res => console.log("Chats saved:", res))
    .catch(err => console.error("Error saving chats:", err));





// // Create & Save a Chat Document
// let chat1 = new Chat({
//     from: "bunny",
//     to: "neha",
//     msg: "hi Neha, how are you!",
//     created_at: new Date()
// });

// chat1.save()
//     .then(res => console.log("Saved chat:", res))
//     .catch(err => console.error("Error saving chat:", err));