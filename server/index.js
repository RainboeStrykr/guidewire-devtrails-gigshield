const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
// const riderRoutes = require('./routes/riderRoutes');
// const policyRoutes = require('./routes/policyRoutes');
const triggerRoutes = require('./routes/triggerRoutes');

// app.use('/api/riders', riderRoutes);
// app.use('/api/policies', policyRoutes);
app.use('/api/triggers', triggerRoutes);

app.get('/', (req, res) => {
    res.send('GigShield Backend API');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
