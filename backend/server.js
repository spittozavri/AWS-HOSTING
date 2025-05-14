const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

// Helper to read latest data
function getLatestData() {
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content);
  } catch {
    return { data: '' };
  }
}

// POST endpoint
app.post('/api/create-answer', (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ error: 'Missing "data" field' });

  fs.writeFileSync(DATA_FILE, JSON.stringify({ data }), 'utf8');
  res.json({ message: 'Data stored' });
});

// GET endpoint
app.get('/api/get-answer', (req, res) => {
  const data = getLatestData();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});