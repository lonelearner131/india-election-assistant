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
    
    // Using RegExp with \b (word boundaries) ensures we only match whole words.
    // This stops "recipe" from triggering the "eci" keyword!
    return electionKeywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(query);
    });
}
