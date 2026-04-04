const policies = [];

const issuePolicy = (req, res) => {
    const { riderId, tier } = req.body;

    if (!riderId || !tier) {
        return res.status(400).json({ message: 'Rider ID and tier are required' });
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

    const newPolicy = {
        id: `GS-${Date.now().toString().slice(-6)}`,
        riderId,
        tier,
        premium,
        maxCoverage,
        status: 'Active',
        issuedAt: new Date().toISOString()
    };

    policies.push(newPolicy);

    res.status(201).json({ message: 'Policy issued successfully', policy: newPolicy });
};

const getPolicyDetails = (req, res) => {
    const policyId = req.params.policyId;
    const policy = policies.find(p => p.id === policyId);

    if (!policy) {
        return res.status(404).json({ message: 'Policy not found' });
    }

    res.json(policy);
};

module.exports = {
    issuePolicy,
    getPolicyDetails
};
