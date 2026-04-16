const TriggerAlert = require('../models/TriggerAlert');

const getTriggerAlerts = async (request, reply) => {
    try {
        const alerts = await TriggerAlert.find().sort({ createdAt: -1 }).limit(10);
        reply.send(alerts);
    } catch (error) {
        request.log.error('Error fetching alerts:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

const simulateTrigger = async (request, reply) => {
    try {
        const { zone, intensity, triggerType } = request.body;
        
        if (!zone || !intensity) {
            return reply.code(400).send({ message: 'Zone and intensity are required' });
        }

        const newAlert = new TriggerAlert({
            zone,
            intensity,
            triggerType: triggerType || 'Rainfall',
            status: 'Active'
        });

        await newAlert.save();

        reply.code(201).send({ message: 'Trigger simulated successfully', alert: newAlert });
    } catch (error) {
        request.log.error('Error simulating trigger:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

module.exports = { getTriggerAlerts, simulateTrigger };
