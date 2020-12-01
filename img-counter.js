const  message  = require("discord.js");
const mongoose = require("./mongoose.js");
//const mongoose = require("mongoose");
const imgSchema = require("./schemas/imgSchema");
const Discord = require("discord.js");

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
      mongoose.connection.close();
    }
  });
};

module.exports.addDesc2 = async (guildID, userID, description2) => {
  return await mongoose().then(async (mongoose) => {
    try{

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
      mongoose.connection.close();
    }
  });
};

module.exports.addDesc3 = async (guildID, userID, description3) => {
  return await mongoose().then(async (mongoose) => {
    try{

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
      mongoose.connection.close();
    }
  });
};

module.exports.addBGColor = async (guildID, userID, BGcolor) => {
  return await mongoose().then(async (mongoose) => {
    try{

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
      mongoose.connection.close();
    }
  });
};

module.exports.addBG = async (guildID, userID, background) => {
  return await mongoose().then(async (mongoose) => {
    try{

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
      mongoose.connection.close();
    }
  });
};

module.exports.checkRole = async (guildID, userID, member) => {
  return await mongoose().then(async (mongoose) => {
    if (member.roles.cache.has("")) {
    //try { 

      imgSchema.findOneAndUpdate(userID,
      {$set: {isArk: true}});

      console.log("meme")
   // }
  } else {
    console.log("member is not a dokutah.")
  }})
};

module.exports.imgPars = async (guildID, userID) => {

  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOne({
        guildID,
        userID,
      });

      let description = "description 1";
      if (result) {
        description = result.description;
      } else {
        await new imgSchema({
          guildID,
          userID,
          description,
        });
      
      }
      return description
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.imgPars2 = async (guildID, userID) => {

  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOne({
        guildID,
        userID,
      });

      let description2 = "description 2";
      if (result) {
        description2 = result.description2;
      } else {
        await new imgSchema({
          guildID,
          userID,
          description2,
        });
      
      }
      return description2
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.imgPars3 = async (guildID, userID) => {

  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOne({
        guildID,
        userID,
      });

      let description3 = "description 3";
      if (result) {
        description3 = result.description3;
      } else {
        await new imgSchema({
          guildID,
          userID,
          description3,
        });
      
      }
      return description3
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.BGPars = async (guildID, userID) => {

  return await mongoose().then(async (mongoose) => {
    try {

      const result = await imgSchema.findOne({
        guildID,
        userID,
      });

      let background = "https://i.imgur.com/PBmXfo8.jpeg";
      if (result) {
        background = result.background;
      } else {
        await new imgSchema({
          guildID,
          userID,
          background,
        });
      
      }
      return background
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.BGcolorPars = async (guildID, userID) => {
  return await mongoose().then(async (mongoose) => {
    try {
      const result = await imgSchema.findOne({
        guildID,
        userID,
      });

      let BGcolor = "#edeadd";
      if (result) {
        BGcolor = result.BGcolor;
      } else {
        await new imgSchema({
          guildID,
          userID,
          BGcolor,
        });

      }
      return BGcolor
    } finally {
      mongoose.connection.close();
    }
  });
};
