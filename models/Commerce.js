const mongoose = require("mongoose");
const crypto = require("crypto");

const { Schema } = mongoose;

const userSchema = new Schema({
  nameCommerce: {
    type: String,
    required: true,
  },
  cuit: {
    type: String,
    required: true,
    unique: true,
  },
  nameOwner: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  validated: {
    type: String,
    required: false,
    default: "0"
    //0=pendiente de validar, 1= validado ok, 2= invalido
  },
  deleted: {
    type: Boolean,
    required: false,
    default: false
  },
}, {
  timestamps: true, // Add createdAt and updatedAt fields
});

module.exports = new mongoose.model("commerce", userSchema) 