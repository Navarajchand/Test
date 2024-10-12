export default async function handler(req, res) {
    const query = req.query.q;

    // Check if the query parameter is provided
    if (!query) {
        return res.status(400).json({ error: 'Missing query' });
    }

    // Construct the Google API URL with your API key and custom search engine ID
    const googleApiUrl = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDsBD1TTAoh-oqKcCg-MkHw2NP5T1IKeDA&cx=c2caa56dc1b6e45d9&q=${encodeURIComponent(query)}`;

    try {
        // Make the fetch request to the Google API
        const response = await fetch(googleApiUrl);

        // Check if the response is ok (status 200)
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Google API error:', errorData); // Log the error response for debugging
            return res.status(response.status).json({ error: errorData.error.message });
        }

        // Parse the response data
        const data = await response.json();
        const results = data.items.map(item => ({
            title: item.title,
            link: item.link,
        }));

        // Return the search results
        res.status(200).json(results);
    } catch (error) {
        console.error('Fetch error:', error); // Log any fetch errors
        res.status(500).json({ error: 'Something went wrong' });
    }
}
