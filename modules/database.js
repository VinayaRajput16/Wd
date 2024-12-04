const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});


module.exports = { connectToDatabase };
