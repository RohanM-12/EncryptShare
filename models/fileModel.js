const mongoose = require("mongoose");
const { Schema } = mongoose;

const File = new Schema({
  content: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("File", File);
