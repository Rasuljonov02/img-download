import axios from 'axios';

const getImages = async (link: string) => {
  const config = {
    method: 'get',
    url: `https://api.pexels.com/v1/search/?page=1&per_page=50&query=${link}`,
    headers: {
      'Authorization': 'Z0lnTOuDR7xtjtxV5kaF3hs5me6HnJJz0rCwtKdCAKeY1Btx6ErBeMHk',
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export default getImages;
