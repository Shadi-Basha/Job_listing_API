const axios = require('axios');

const encodedParams = new URLSearchParams();

const options = {
  method: 'POST',
  url: 'https://community-neutrino-email-validate.p.rapidapi.com/email-validate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': '8dc817162cmsh531870020fea4c8p1fa83ejsnbc3711046c92',
    'X-RapidAPI-Host': 'community-neutrino-email-validate.p.rapidapi.com'
  },
  data: encodedParams,
};


exports.checkEmail = async (email) => {
    try {
        encodedParams.set('email', email);
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}