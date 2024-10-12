const fetch = require('node-fetch');

export default async function handler(req, res) {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Missing query' });
    }

    const googleApiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDsBD1TTAoh-oqKcCg-MkHw2NP5T1IKeDA&cx=c2caa56dc1b6e45d9&q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(googleApiUrl);
        const data = await response.json();
        const results = data.items.map(item => ({
            title: item.title,
            link: item.link,
        }));
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
