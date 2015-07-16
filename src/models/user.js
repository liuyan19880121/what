var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  nickname: { type: String },
  email: { type: String },
  imageUrl: {type: String},
  signature: { type: String },
  create: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now },
  isLock: { type: Boolean, default: false }
});

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

mongoose.model('User', UserSchema);
