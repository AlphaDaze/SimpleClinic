const express = require('express');
const connectDB = require('./db');
const auth = require('./middleware/auth');

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('API Running'));


// Define routes

if (process.env.PRODUCTION === 'true') {
  port = 9199;
} else {
  port = 8199
  app.use('/api/users', require('./routes/api/users')); // enable registeration
}

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/patient', auth, require('./routes/api/patient'));
app.use('/api/patient/visit', auth, require('./routes/api/visit'));
app.use('/api/patient/prescription', auth, require('./routes/api/prescription'));


// Serve static assets in production - not being used!
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || port;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));