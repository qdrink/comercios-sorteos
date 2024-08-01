const PDFDocument = require('pdfkit');
const fs = require('fs');
const ErrorResponse = require("../utils/errorResponse");
const Commerce = require("../models/Commerce");
const {
  commerceAlreadyExistsMessage,
  commerceNotFoundMessage
} = require("../utils/messages.json");


// Controller for commerce registration
const registerCommerce = async (req, res, next) => {
  const { nameCommerce, cuit, nameOwner, email, department, phone } = req.body;  // Extract commerce registration data from the request body

  let commerce = await Commerce.findOne({ cuit });  // Check if a commerce with the provided cuit already exists
  if (commerce) return next(new ErrorResponse(commerceAlreadyExistsMessage, 409));


  // Create a new commerce object
  const newCommerce = new Commerce({
    nameCommerce,
    cuit,
    nameOwner,
    email,
    department,
    phone
  });
  commerce = await newCommerce.save();  // Save the user to the database
  res.status(201).json({
    success: true,
    data: {
      message: "Comercio añadido"
    }
  });
};

// Controller for commerce validation
const validationCommerce = async (req, res, next) => {

  const { cuit , status } = req.body;
  let commerce = await Commerce.findOne({ cuit , deleted: false });  // Chequeo si existe el comercio y que no este borrado
  if (!commerce) return next(new ErrorResponse(commerceNotFoundMessage, 409));

  await Commerce.updateOne({ cuit }, { $set: { validated: status } }) // el await puede ir solo????
  res.status(201).json({
    success: true,
    data: {
      message: "Comercio validado"
    }
  });

  //Si el comercio es validado OK deberia generarse un PDF

  if (status==="1"){
    const {nameCommerce} = commerce;
    console.log(nameCommerce);
    /*const doc = new PDFDocument();
    
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.fontSize(35).text('Hola mundo!', 100, 100);
    doc.end();*/
  }

};

// Controller for commerce delete
const deleteCommerce = async (req, res, next) => {

  const { cuit } = req.body;
  let commerce = await Commerce.findOne({ cuit , deleted: false });  // Chequeo si existe el comercio y que no este borrado
  if (!commerce) return next(new ErrorResponse(commerceNotFoundMessage, 409));

  commerce = await Commerce.updateOne({ cuit }, { $set: { validated: "0", deleted: true } })
  res.status(201).json({
    success: true,
    data: {
      message: "Comercio borrado"
    }
  });

};

// Controller for commerce list
const listCommerce = async (req, res, next) => {

  const status = req.query.status;
  let commerces = await Commerce.find({ validated:status }); 
  
  res.status(201).json(commerces);

};

module.exports = { registerCommerce, validationCommerce, deleteCommerce, listCommerce }