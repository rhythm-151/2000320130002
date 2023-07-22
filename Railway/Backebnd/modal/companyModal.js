const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  rollNo: { type: String, required: true },
  secretCode: { type: String, required: true },
});

const Company = mongoose.model('Company', companySchema);



module.exports = Company;
