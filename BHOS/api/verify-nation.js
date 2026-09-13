export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        verified: false,
        message: "Method not allowed"
      });
    }

    const apiKey = process.env.PNW_API_KEY;

    const { nationId, nationName } = req.body;

    if (!nationId || !nationName) {
      return res.status(400).json({
        verified: false,
        message: "Nation ID and nation name are required"
      });
    }

    const query = `
      query {
        nations(id: [${Number(nationId)}], first: 1) {
          data {
            id
            nation_name
          }
        }
      }
    `;

    const response = await fetch(
      "https://api.politicsandwar.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ query })
      }
    );

    const data = await response.json();

    // Check whether Politics & War returned a GraphQL error
    if (data.errors) {
      return res.status(502).json({
        verified: false,
        message: "Politics & War API returned an error",
        errors: data.errors
      });
    }

    const nation = data?.data?.nations?.data?.[0];

    if (!nation) {
      return res.status(404).json({
        verified: false,
        message: "Nation not found"
      });
    }

    const verified =
      Number(nation.id) === Number(nationId) &&
      nation.nation_name.trim().toLowerCase() ===
        nationName.trim().toLowerCase();

    return res.status(200).json({
      verified,
      nation: {
        id: nation.id,
        nation_name: nation.nation_name
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      verified: false,
      message: "Server error",
      error: error.message
    });
  }
}