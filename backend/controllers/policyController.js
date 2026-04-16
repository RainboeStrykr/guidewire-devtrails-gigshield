const Policy = require('../models/Policy');
const Rider = require('../models/Rider');

const issuePolicy = async (req, res) => {
    try {
        const { riderId, tier } = req.body;

        if (!riderId || !tier) {
            return res.status(400).json({ message: 'Rider ID and tier are required' });
        }

        const rider = await Rider.findById(riderId);
        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
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
                return res.status(400).json({ message: 'Invalid tier' });
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

        res.status(201).json({ message: 'Policy issued successfully', policy: {
            id: newPolicy.policyId,
            tier: newPolicy.tier,
            premium: newPolicy.premium,
            maxCoverage: newPolicy.maxCoverage
        } });
    } catch (error) {
         console.error('Error issuing policy:', error);
         res.status(500).json({ message: 'Server error' });
    }
};

const getPolicyDetails = async (req, res) => {
    try {
        const policyId = req.params.policyId;
        const policy = await Policy.findOne({ policyId });

        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }

        res.json({
            id: policy.policyId,
            tier: policy.tier,
            premium: policy.premium,
            maxCoverage: policy.maxCoverage,
            status: policy.status
        });
    } catch (error) {
        console.error('Error fetching policy:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    issuePolicy,
    getPolicyDetails
};
