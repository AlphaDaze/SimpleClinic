const express = require('express');
const connectDB = require('./db');
const auth = require('./middleware/auth');

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/patient', auth, require('./routes/api/patient'));
app.use('/api/patient/visit', auth, require('./routes/api/visit'));
app.use('/api/patient/prescription', auth, require('./routes/api/prescription'));

const PORT = process.env.PORT || 8199;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));