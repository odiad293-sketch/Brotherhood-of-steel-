export default async function handler(req, res) {
  const apiKey = process.env.PNW_API_KEY;

  const { nationId, nationName } = req.body;

  const query = `
    query {
      nations(id: [${nationId}], first: 1) {
        data {
          id
          nation_name
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.politicsandwar.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}