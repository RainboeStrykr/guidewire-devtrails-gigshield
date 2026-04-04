const triggerAlerts = [];

const getTriggerAlerts = (req, res) => {
    res.json(triggerAlerts);
};

const simulateTrigger = (req, res) => {
    const { zone, intensity, triggerType } = req.body;
    
    if (!zone || !intensity) {
        return res.status(400).json({ message: 'Zone and intensity are required' });
    }

    const newAlert = {
        id: Date.now(),
        zone,
        intensity,
        triggerType: triggerType || 'Rainfall',
        timestamp: new Date().toISOString(),
        status: 'Active'
    };

    triggerAlerts.unshift(newAlert);
    
    // Keep only last 10 alerts for simulation
    if (triggerAlerts.length > 10) {
        triggerAlerts.pop();
    }

    res.status(201).json({ message: 'Trigger simulated successfully', alert: newAlert });
};

module.exports = {
    getTriggerAlerts,
    simulateTrigger
};
