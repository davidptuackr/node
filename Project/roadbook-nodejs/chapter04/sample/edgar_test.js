const axios = require('axios');
const cheerio = require('cheerio');

const get_edgar = async () => {
    try {
        return await axios.get("https://www.sec.gov/Archives/edgar/data/51143/")
    } catch (error) {
        console.error(error);
    }
};

get_edgar().then(
    html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
    }
)