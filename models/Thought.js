const { Schema, model } = require('mongoose');

//reactionSchema is not a model 
const reactionSchema = new Schema(
  {
    reactionID:{

    },
    reactionBody: {

    },
    username: {

    },
    createdAt: {
      type: Date, 
      default: Date.now,
      //use a getter method to format the timestamp on query
    },
  },
   { 
    toJSON: {
      virtuals: true,
      getters: true,
  },
  id: false,

})

const thoughtSchema = new Schema(
  {
   thoughtText: {
    type: String,
    required: true, 
    minLength: 1,
    maxLength: 280,
   } ,
   createdAt: {
    type: Date, 
    default: Date.now,
    //Use a getter method to format the timestamp on query
   },
    //Username - User that created this thought
   username: {
    type: String,
    required: true,
   },
    //Reactions -- Array of nested documents created with the Reaaction Schema 
   reactions: [
      reactionSchema
   ]
   
  },
  { 
    toJSON: {
      virtuals: true,
      getters: true,
  },
  id: false,

});

  thoughtSchema
    .virtual('reactionCount')
    .get(function(){
      return this.reactions.length;
    })

const Thought = model('application', thoughtSchema);

module.exports = Thought;
