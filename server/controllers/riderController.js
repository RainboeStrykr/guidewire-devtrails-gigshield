const riders = [];

const onboarding = (req, res) => {
    const { name, phone, zone, platform } = req.body;
    
    if (!name || !phone || !zone || !platform) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newRider = {
        id: riders.length + 1,
        name,
        phone,
        zone,
        platform,
        createdAt: new Date().toISOString()
    };

    riders.push(newRider);

    res.status(201).json({ message: 'Rider onboarded successfully', rider: newRider });
};

const getRiderProfile = (req, res) => {
    const riderId = parseInt(req.params.id);
    const rider = riders.find(r => r.id === riderId);

    if (!rider) {
        return res.status(404).json({ message: 'Rider not found' });
    }

    res.json(rider);
};

module.exports = {
    onboarding,
    getRiderProfile
};
