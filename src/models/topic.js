var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var TopicSchema = new Schema({
  title: { type: String },
  content: { type: String },
  //authorId: { type: ObjectId },
  create: { type: Date, default: Date.now },
  update: { type: Date, default: Date.now },
  reply:  { type: Date, default: Date.now },
  top: { type: Boolean, default: false },
  deleted: {type: Boolean, default: false},
});

TopicSchema.index({top: -1, reply: -1});
TopicSchema.index({authorId: 1, create: -1});

mongoose.model('Topic', TopicSchema);
