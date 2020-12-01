//MongoDB

const mongoose = require("mongoose");
const mongoPath =
  "mongodb+srv://jchonsa:hikakin123@rose.3tfiv.mongodb.net/discordjs_test?retryWrites=true&w=majority";

module.exports = async () => {
  await mongoose.connect(
    mongoPath,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  );
  return mongoose;
},
mongoPath;
