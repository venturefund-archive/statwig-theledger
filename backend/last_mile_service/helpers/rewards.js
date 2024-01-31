const axios = require('axios');
const REWARDS_SERVICE_URL = process.env.REWARDS_SERVICE_URL || 'https://test.vaccineledger.com/rewardmanagement/api';
const REWARDS_API_KEY = process.env.REWARDS_API_KEY || "testApiKey";
// Queue to store failed requests
const requestQueue = [];

// Function to send HTTP request
async function addReward(data, role) {
    try {
        axios.defaults.headers.common['x-api-key'] = REWARDS_API_KEY;
        axios.defaults.headers.common['role'] = role;
        await axios.post(REWARDS_SERVICE_URL + "/rewards", data);
    } catch (error) {
        console.log('Failed to send request:', error);
        // Add request to the queue for later retry
        requestQueue.push(data);
    }
}

async function deleteReward(data, role) {
    try {
        axios.defaults.headers.common['x-api-key'] = REWARDS_API_KEY;
        axios.defaults.headers.common['role'] = role;
        await axios.post(REWARDS_SERVICE_URL + "/deleteReward", data);
    } catch (error) {
        console.log('Failed to send request:', error);
        // Add request to the queue for later retry
        requestQueue.push(data);
    }
}

// Function to retry failed requests from the queue
async function retryFailedRequests() {
    while (requestQueue.length > 0) {
        const requestData = requestQueue.shift();
        if (requestData?.type === "DELETE") {
            await deleteReward(requestData);
        } else {
            await addReward(requestData);
        }
    }
}

// Start retrying failed requests when the microservice is available
microserviceAvailabilityCheck()
    .then(() => {
        retryFailedRequests();
    })
    .catch((error) => {
        console.error('Failed to check microservice availability:', error);
    });

// Function to periodically check microservice availability
async function microserviceAvailabilityCheck() {
    try {
        // Check microservice availability (e.g., ping or health endpoint)
        const response = await axios.get(REWARDS_SERVICE_URL + "/health");
        if (response.status === 200) {
            console.log('Microservice is available');
            return;
        }
    } catch (error) {
        console.error('Microservice is unavailable:', error);
    }

    // Retry after a delay
    await delay(600);
    await microserviceAvailabilityCheck();
}

// Helper function to introduce a delay using promises
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
    addReward,
    deleteReward
}