// mongodb schemas definitions
var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    firstName: { type: String },
    lastName: { type: String }
  });
  
  startup.mongoose.model('User', UserSchema);
  user = require('mongoose').model('User');

  