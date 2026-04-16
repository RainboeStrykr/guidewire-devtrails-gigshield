const Rider = require('../models/Rider');

const onboarding = async (request, reply) => {
    try {
        const { name, phone, zone, platform } = request.body;
        
        if (!name || !phone || !zone || !platform) {
            return reply.code(400).send({ message: 'All fields are required' });
        }

        let existingRider = await Rider.findOne({ phone });
        if (existingRider) {
            return reply.code(400).send({ message: 'Rider with this phone already exists', rider: existingRider });
        }

        const newRider = new Rider({ name, phone, zone, platform });
        await newRider.save();

        reply.code(201).send({ message: 'Rider onboarded successfully', rider: {
            id: newRider._id,
            name: newRider.name,
            phone: newRider.phone,
            zone: newRider.zone,
            platform: newRider.platform
        } });
    } catch (error) {
        request.log.error('Error in onboarding:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

const getRiderProfile = async (request, reply) => {
    try {
        const riderId = request.params.id;
        const rider = await Rider.findById(riderId);

        if (!rider) {
            return reply.code(404).send({ message: 'Rider not found' });
        }

        reply.send({
            id: rider._id,
            name: rider.name,
            phone: rider.phone,
            zone: rider.zone,
            platform: rider.platform
        });
    } catch (error) {
        request.log.error('Error fetching rider:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

module.exports = { onboarding, getRiderProfile };
