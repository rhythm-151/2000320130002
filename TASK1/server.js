const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT =  5000;

mongoose.connect('mongodb+srv://rhythmy082:RU3zYWI5eHpR67V8@cluster.wazyi1l.mongodb.net/REAL-TIME?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mergedNumbersSchema = new mongoose.Schema({
  numbers: [Number],
});

const MergedNumbers = mongoose.model('MergedNumbers', mergedNumbersSchema);

app.use(cors());
app.use(express.json());

app.get('/Numbers', async (req, res) => {
    const { urls } = req.query; 
    const validUrls = urls.split(',').filter(url => isValidURL(url)); 
  
    try {
      const numbers = await fetchAndMergeNumbers(validUrls);
      const mergedNumbers = new MergedNumbers({ numbers });
      await mergedNumbers.save();
  
      res.json({ numbers });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
async function fetchAndMergeNumbers(urls) {
  const responses = await Promise.all(urls.map(url => axios.get(url)));
  const numbersSet = new Set();

  responses.forEach(response => {
    if (response.status === 200 && response.data.numbers) {
      response.data.numbers.forEach(number => numbersSet.add(number));
    }
  });

  return Array.from(numbersSet).sort((a, b) => a - b);
}

function isValidURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
    '((\\d{1,3}\\.){3}\\d{1,3}))' + 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
    '(\\?[;&a-z\\d%_.~+=-]*)?' + 
    '(\\#[-a-z\\d_]*)?$','i'); 

  return !!pattern.test(str);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
