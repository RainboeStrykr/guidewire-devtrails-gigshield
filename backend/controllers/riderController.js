const supabase = require('../lib/supabase');

const onboarding = async (request, reply) => {
    try {
        const { name, phone, zone, platform } = request.body;
        
        if (!name || !phone || !zone || !platform) {
            return reply.code(400).send({ message: 'All fields are required' });
        }

        // Check if rider already exists
        const { data: existing } = await supabase
            .from('riders')
            .select('*')
            .eq('phone', phone)
            .single();

        if (existing) {
            return reply.code(400).send({ message: 'Rider with this phone already exists', rider: existing });
        }

        const { data: newRider, error } = await supabase
            .from('riders')
            .insert({ name, phone, zone, platform, fraud_score: 12 })
            .select()
            .single();

        if (error) throw error;

        reply.code(201).send({ message: 'Rider onboarded successfully', rider: newRider });
    } catch (error) {
        request.log.error('Error in onboarding:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

const getRiderProfile = async (request, reply) => {
    try {
        const riderId = request.params.id;

        const { data: rider, error } = await supabase
            .from('riders')
            .select('*')
            .eq('id', riderId)
            .single();

        if (error || !rider) {
            return reply.code(404).send({ message: 'Rider not found' });
        }

        reply.send(rider);
    } catch (error) {
        request.log.error('Error fetching rider:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

module.exports = { onboarding, getRiderProfile };
