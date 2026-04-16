const Policy = require('../models/Policy');
const Rider = require('../models/Rider');

const issuePolicy = async (request, reply) => {
    try {
        const { riderId, tier } = request.body;

        if (!riderId || !tier) {
            return reply.code(400).send({ message: 'Rider ID and tier are required' });
        }

        const rider = await Rider.findById(riderId);
        if (!rider) {
            return reply.code(404).send({ message: 'Rider not found' });
        }

        let premium = 0;
        let maxCoverage = 0;

        switch (tier) {
            case 'Basic':
                premium = 29;
                maxCoverage = 500;
                break;
            case 'Standard':
                premium = 49;
                maxCoverage = 900;
                break;
            case 'Pro':
                premium = 79;
                maxCoverage = 1500;
                break;
            default:
                return reply.code(400).send({ message: 'Invalid tier' });
        }

        const policyId = `GS-${Date.now().toString().slice(-6)}`;

        const newPolicy = new Policy({
            policyId,
            riderId,
            tier,
            premium,
            maxCoverage,
            status: 'Active'
        });

        await newPolicy.save();

        reply.code(201).send({ message: 'Policy issued successfully', policy: {
            id: newPolicy.policyId,
            tier: newPolicy.tier,
            premium: newPolicy.premium,
            maxCoverage: newPolicy.maxCoverage
        } });
    } catch (error) {
         request.log.error('Error issuing policy:', error);
         reply.code(500).send({ message: 'Server error' });
    }
};

const getPolicyDetails = async (request, reply) => {
    try {
        const policyId = request.params.policyId;
        const policy = await Policy.findOne({ policyId });

        if (!policy) {
            return reply.code(404).send({ message: 'Policy not found' });
        }

        reply.send({
            id: policy.policyId,
            tier: policy.tier,
            premium: policy.premium,
            maxCoverage: policy.maxCoverage,
            status: policy.status
        });
    } catch (error) {
        request.log.error('Error fetching policy:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

module.exports = { issuePolicy, getPolicyDetails };
