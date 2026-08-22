exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const body = JSON.parse(event.body);
        const videoUrl = body.url;

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
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
