import Contact from "../models/Contact.js";
import { errorHandler } from "../utils/error.js";

export const createContact = async (req, res, next) => {
  const { firstName, lastName, phone } = req.body;
  try {
    const newContact = await Contact({
      firstName,
      lastName,
      phone,
      userRef: req.user._id,
    });
    // console.log(req.body);
    const result = await newContact.save();
    return res.status(201).json({ ...result._doc });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(errorHandler(404, "Contact not found"));
  }
  // if (req.user.id !== contact.userRef) {
  //   return next(errorHandler(401, "You can only delete your own contacts"));
  // }
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json("Contact has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(errorHandler(404, "Contact not found"));
  }
  // if (req.user.id !== contact.userRef) {
  //   return next(errorHandler(401, "You can only update your own contacts"));
  // }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return next(errorHandler(404, "Contact not found"));
    }
    res.status(200).json({ ...contact._doc });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    // const limit = parseInt(req.query.limit) || 9;
    // const startIndex = req.query.startIndex || 0;

    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
