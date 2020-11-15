const mongoose = require('mongoose');
const connectDB = async () => {
    const db = "mongodb://localhost/clinic";
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB: ');
        console.error(error.message);
        process.exit(1); // exit process with failiure
    }
};

module.exports = connectDB;


// old server
//"mongoURI": "mongodb+srv://patients:153624.co.uk@firstclinic.uraqu.mongodb.net/<dbname>?retryWrites=true&w=majority"