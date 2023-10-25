const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Schema to create Student model
const studentSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      //trimmed?? 
      max_length: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //must match valid email address?? 
      max_length: 50,
    },
    //Need to reference _id values to thought model
    //Need to reference _id values to user model 
    assignments: [assignmentSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Student = model('student', studentSchema);

module.exports = Student;
