const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //must match valid email address?? 
      maxlength: 50,
    },
    //Need to reference _id values to thought model
    //Need to reference _id values to user model 
      thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
      },
      { 
        toJSON: {
          virtuals: true,
          getters: true,
      },
      id: false,
    
    });
    //Create a virtual 
    userSchema
      .virtual('friendCount')
      .get(function(){
        return this.thoughts.length;
      });
const User  = model('user', userSchema);

module.exports = User;
