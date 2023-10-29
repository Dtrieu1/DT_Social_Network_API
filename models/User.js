const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (email) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
        },
        message: email => `${email.value} is not a valid email!`
      },
      maxlength: 50,
    },
    //thoughts - Need to reference _id values to thought model
    //friends - Need to reference _id values to user model 
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
