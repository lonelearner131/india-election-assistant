/**
 * Efficiency & Security Layer: 
 * We pre-validate user inputs locally to prevent unnecessary API calls 
 * and protect against prompt injection or off-topic spam.
 */

const electionKeywords = [
    "vote", "election", "voter", "eci", "register", "polling",
    "booth", "candidate", "ballot", "evm", "mla", "mp", "lok sabha",
    "rajya sabha", "panchayat", "process", "timeline", "phase"
];

export function isElectionQuery(query) {
    if (!query || typeof query !== 'string') return false;

    const normalizedQuery = query.toLowerCase();

    // Check if the query contains at least one relevant keyword
    return electionKeywords.some(keyword => normalizedQuery.includes(keyword));
}