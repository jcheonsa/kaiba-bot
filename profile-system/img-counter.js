// handles all requests to change values in the user profile card
const mongoose = require("../mongoose");
const imgSchema = require("../schemas/imgSchema");

module.exports.addDesc = async (guildID, userID, description) => {
  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOneAndUpdate(
        {
          guildID, // static values/unique identifiers
          userID,
        },
        {
          guildID, // things to update/overwrite
          userID,
          description,
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log("RESULT: ", result);
      return result.description;
    } finally {
      // mongoose.connection.close();
    }
  });
};

module.exports.addDesc2 = async (guildID, userID, description2) => {
  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOneAndUpdate(
        {
          guildID,
          userID,
        },
        {
          description2
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log("RESULT: ", result);
      return result.description2;

    } finally {
      // mongoose.connection.close();
    }
  });
};

module.exports.addDesc3 = async (guildID, userID, description3) => {
  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOneAndUpdate(
        {
          guildID,
          userID,
        },
        {
          description3
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log("RESULT: ", result);
      return result.description3;

    } finally {
      // mongoose.connection.close();
    }
  });
};

module.exports.addBGColor = async (guildID, userID, BGcolor) => {
  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOneAndUpdate(
        {
          guildID,
          userID,
        },
        {
          BGcolor
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log("RESULT: ", result);
      return result.BGcolor;

    } finally {
      // mongoose.connection.close();
    }
  });
};

module.exports.addBG = async (guildID, userID, background) => {
  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOneAndUpdate(
        {
          guildID,
          userID,
        },
        {
          background
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log("RESULT: ", result);
      return result.background;

    } finally {
      // mongoose.connection.close();
    }
  });
};

module.exports.checkRole = async (guildID, userID, member) => {
  return await mongoose().then(async (mongoose) => {
    if (member.roles.cache.has("")) {
      //try { 

      imgSchema.findOneAndUpdate(userID,
        { $set: { isArk: true } });

      console.log("meme")
      // }
    } else {
      console.log("member is not a dokutah.")
    }
  })
};
