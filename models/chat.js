const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    msg: { type: String, maxLength: 50, required: true },
    created_at: { type: Date, default: Date.now, required: true } // Auto-generated timestamp
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
