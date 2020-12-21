const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const imgSchema = mongoose.Schema({
  guildID: reqString,
  username: reqString,
  userID: reqString,
  isArk: {
    type: Boolean,
    default: false
  },
  description: {
    type: [],
    default: "description 1",
    required: true,
  },
  description2: {
    type: [],
    default: "description 2",
    required: true,
  },
  description3: {
    type: [],
    default: "description 3",
    required: true,
  },
    background: {
      type: [],
      default: "profile-system\image\raintrain.jpg",
      required: true,
    },
    BGcolor: {
      type: [],
      deafult: "#e2e8d8",
      required: true,
    },
    assign: {
      type: [],
      required: true,
    }
});

module.exports = mongoose.model("user-info", imgSchema);
