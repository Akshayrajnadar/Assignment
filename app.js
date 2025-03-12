const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 20; // Increase limit

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const schoolRoutes = require('./src/routes/schoolRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('🚀 School Management API is Running!');
});

app.use('/api', schoolRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
