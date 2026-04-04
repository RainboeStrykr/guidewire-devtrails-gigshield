const TriggerAlert = require('../models/TriggerAlert');

const getTriggerAlerts = async (req, res) => {
    try {
        // Get last 10 alerts
        const alerts = await TriggerAlert.find().sort({ createdAt: -1 }).limit(10);
        res.json(alerts);
    } catch (error) {
        console.error('Error fetching alerts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const simulateTrigger = async (req, res) => {
    try {
        const { zone, intensity, triggerType } = req.body;
        
        if (!zone || !intensity) {
            return res.status(400).json({ message: 'Zone and intensity are required' });
        }

        const newAlert = new TriggerAlert({
            zone,
            intensity,
            triggerType: triggerType || 'Rainfall',
            status: 'Active'
        });

        await newAlert.save();

        res.status(201).json({ message: 'Trigger simulated successfully', alert: newAlert });
    } catch (error) {
        console.error('Error simulating trigger:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getTriggerAlerts,
    simulateTrigger
};
