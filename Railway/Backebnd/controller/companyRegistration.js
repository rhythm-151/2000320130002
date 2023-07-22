// 
const jwt = require("jsonwebtoken");
const Company = require('../modal/companyModal');
const registerCompany = async (req, res) => {
  const {
    companyName,
    ownerName,
    ownerEmail,
    rollNo,
    secretCode,
  } = req.body;

  try {
   
    const clientSecret = generateSecretCode();
    const clientId = generateClientId();

    const company = new Company({
      companyName,
      ownerName,
      ownerEmail,
      rollNo,
      secretCode,
      clients: [{
        clientName: companyName,
        clientEmail: ownerEmail,
        secretCode: clientSecret,
        _id: clientId
      }]
    });

    await company.save();
    res.status(201).json({
      companyName: company.companyName,
      clientSecret,
      clientId,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

function generateSecretCode() {
  
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateClientId() {
 
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let clientId = '';
  for (let i = 0; i < 8; i++) {
    clientId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return clientId;
}




module.exports = {
  registerCompany,
  getAuthorizationToken,
};