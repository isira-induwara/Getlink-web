exports.handler = async function(event, context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const videoUrl = body.url;

        if (!videoUrl) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'URL එකක් ලබා දෙන්න' }) };
        }

        const apiUrl = `https://pornhub-downloader-api.p.rapidapi.com/api/pornhub/get?url=${encodeURIComponent(videoUrl)}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'pornhub-downloader-api.p.rapidapi.com',
                'x-rapidapi-key': '327f35aa89msh4f1b6f953992db3p1c7b81jsnf477e7de51c3'
            }
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: error.message })
        };
    }
};
