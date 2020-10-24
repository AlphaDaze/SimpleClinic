const express = require('express');
const connectDB = require('./db');

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/patient', require('./routes/api/patient'));
app.use('/api/patient/visit', require('./routes/api/visit'));
app.use('/api/patient/prescription', require('./routes/api/prescription'));

const PORT = process.env.PORT || 8199;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
