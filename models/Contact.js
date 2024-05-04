// import Joi from "joi";
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  userRef: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

// const validateContact = (data) => {
//   const schema = Joi.object({
//     firstName: Joi.string().min(4).max(25).required(),
//     lastName: Joi.string().min(4).max(25).required(),
//     phone: Joi.string().min(8).max(13).required(),
//   });

//   return schema.validate(data);
// };

export default Contact;
