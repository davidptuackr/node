const axios = require('axios');
const cheerio = require('cheerio');

const get_html = async () => {
    try {
        return await axios.get(
            'https://roadbook.co.kr/category/%EC%8B%A0%EA%B0%84%EC%86%8C%EA%B0%9C'
        );
    } catch (error) {
        console.error(error);
    }
};

get_html().then(
    html => {
        let ul_list = [];
        const $ = cheerio.load(html.data);
        const $body_list = $("div#searchList ol").children("li");

        $body_list.each(
            function (i, elem) {
                ul_list[i] = {
                    book_list: $(this).find('a').text(),
                    url: $(this).find('a').attr('href'),
                };
            }
        );
        const data = ul_list.filter(n => n.book_list);
        return data;
    }
).then(
    res => console.log(res)
);