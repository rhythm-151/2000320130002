

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const fetchNumbersFromUrl = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 500 });
    if (response.status === 200) {
      const data = response.data;
      return data.numbers || [];
    }
  } catch (error) {
    console.error(`Error fetching data from URL: ${url}`);
  }
  return [];
};

app.get('/numbers', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  const urls = Array.isArray(url) ? url : [url];
  const uniqueIntegers = new Set();

  try {
    const fetchPromises = urls.map(fetchNumbersFromUrl);
    const responses = await Promise.all(fetchPromises);

    for (const numbers of responses) {
      uniqueIntegers.add(...numbers);
    }

    const sortedNumbers = Array.from(uniqueIntegers).sort((a, b) => a - b);
    return res.json({ numbers: sortedNumbers });
  } catch (error) {
    console.error('Error processing URLs:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
