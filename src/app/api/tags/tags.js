import axios from 'axios';

export default async function handler(req, res) {
  const { inname } = req.query; // Get the input value for filtering the tags

  try {
    // Make the request to the Stack Exchange API via the server (proxy)
    const response = await axios.get('https://api.stackexchange.com/2.3/tags', {
      params: {
        order: 'desc',
        sort: 'popular',
        inname: inname,  // Filter tags by the user input
        site: 'stackoverflow',
      },
    });

    // Return the list of tags to the frontend
    res.status(200).json(response.data.items);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Error fetching tags from Stack Exchange' });
  }
}
