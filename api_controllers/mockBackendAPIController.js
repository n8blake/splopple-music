const axios = require('axios');
const testData = require('./testData.json');
module.exports = { 
    fetchPlaylist: async function(request, response) {
        // send test data to mock backend API calls
        response.json(testData);
    }
}