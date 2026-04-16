const supabase = require('../lib/supabase');

const issuePolicy = async (request, reply) => {
    try {
        const { riderId, tier } = request.body;

        if (!riderId || !tier) {
            return reply.code(400).send({ message: 'Rider ID and tier are required' });
        }

        // Verify rider exists
        const { data: rider, error: riderErr } = await supabase
            .from('riders')
            .select('id')
            .eq('id', riderId)
            .single();

        if (riderErr || !rider) {
            return reply.code(404).send({ message: 'Rider not found' });
        }

        let premium = 0;
        let max_coverage = 0;

        switch (tier) {
            case 'Basic':
                premium = 29;
                max_coverage = 500;
                break;
            case 'Standard':
                premium = 49;
                max_coverage = 900;
                break;
            case 'Pro':
                premium = 79;
                max_coverage = 1500;
                break;
            default:
                return reply.code(400).send({ message: 'Invalid tier' });
        }

        const policy_id = `GS-${Date.now().toString().slice(-6)}`;

        const { data: newPolicy, error } = await supabase
            .from('policies')
            .insert({
                policy_id,
                rider_id: riderId,
                tier,
                premium,
                max_coverage,
                status: 'Active'
            })
            .select()
            .single();

        if (error) throw error;

        reply.code(201).send({ message: 'Policy issued successfully', policy: {
            id: newPolicy.policy_id,
            tier: newPolicy.tier,
            premium: newPolicy.premium,
            maxCoverage: newPolicy.max_coverage
        } });
    } catch (error) {
         request.log.error('Error issuing policy:', error);
         reply.code(500).send({ message: 'Server error' });
    }
};

const getPolicyDetails = async (request, reply) => {
    try {
        const policyId = request.params.policyId;

        const { data: policy, error } = await supabase
            .from('policies')
            .select('*')
            .eq('policy_id', policyId)
            .single();

        if (error || !policy) {
            return reply.code(404).send({ message: 'Policy not found' });
        }

        reply.send({
            id: policy.policy_id,
            tier: policy.tier,
            premium: policy.premium,
            maxCoverage: policy.max_coverage,
            status: policy.status
        });
    } catch (error) {
        request.log.error('Error fetching policy:', error);
        reply.code(500).send({ message: 'Server error' });
    }
};

module.exports = { issuePolicy, getPolicyDetails };
