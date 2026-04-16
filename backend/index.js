const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gigshield';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
const riderRoutes = require('./routes/riderRoutes');
const policyRoutes = require('./routes/policyRoutes');
const triggerRoutes = require('./routes/triggerRoutes');

app.use('/api/riders', riderRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/triggers', triggerRoutes);

app.get('/', (req, res) => {
    res.send('GigShield Backend API');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
