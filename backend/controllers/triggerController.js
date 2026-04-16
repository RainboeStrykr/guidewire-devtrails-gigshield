const supabase = require('../lib/supabase');

const getTriggerAlerts = async (request, reply) => {
    try {
        const { data: alerts, error } = await supabase
            .from('trigger_alerts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

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

        const { data: newAlert, error } = await supabase
            .from('trigger_alerts')
            .insert({
                zone,
                intensity,
                trigger_type: triggerType || 'Rainfall',
                status: 'Active'
            })
            .select()
            .single();

        if (error) throw error;

        reply.code(201).send({ message: 'Trigger simulated successfully', alert: newAlert });
    } catch (error) {
        request.log.error('Error simulating trigger:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

module.exports = { getTriggerAlerts, simulateTrigger };
