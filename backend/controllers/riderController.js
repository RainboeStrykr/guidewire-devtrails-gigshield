const Rider = require('../models/Rider');

const onboarding = async (req, res) => {
    try {
        const { name, phone, zone, platform } = req.body;
        
        if (!name || !phone || !zone || !platform) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if rider already exists
        let existingRider = await Rider.findOne({ phone });
        if (existingRider) {
            return res.status(400).json({ message: 'Rider with this phone already exists', rider: existingRider });
        }

        const newRider = new Rider({
            name,
            phone,
            zone,
            platform
        });

        await newRider.save();

        res.status(201).json({ message: 'Rider onboarded successfully', rider: {
            id: newRider._id,
            name: newRider.name,
            phone: newRider.phone,
            zone: newRider.zone,
            platform: newRider.platform
        } });
    } catch (error) {
        console.error('Error in onboarding:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getRiderProfile = async (req, res) => {
    try {
        const riderId = req.params.id;
        const rider = await Rider.findById(riderId);

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }

        res.json({
            id: rider._id,
            name: rider.name,
            phone: rider.phone,
            zone: rider.zone,
            platform: rider.platform
        });
    } catch (error) {
        console.error('Error fetching rider:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    onboarding,
    getRiderProfile
};
