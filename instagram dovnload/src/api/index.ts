import axios from 'axios'

// const getINS = async (link: string) => {
//   const options = {
//     method: 'GET',
//     url: link,
//     headers: {
//       'x-rapidapi-key': 'a4190b5426mshe46583b9c044cb6p136b48jsn839770809808',
//       'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com'
//     }
//   };
//
//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }


const getImages = async (link:string) => {
  const config = {
    method: 'get',

    url: `https://api.pexels.com/v1/search/?page=1&per_page=100&query=${link}`,
    headers: {
      'Authorization': 'Z0lnTOuDR7xtjtxV5kaF3hs5me6HnJJz0rCwtKdCAKeY1Btx6ErBeMHk',
      'Cookie': '__cf_bm=e3.axVB6jyWpBzUKafcfX4nXO0VDq03GhE2Y0hCs2Ks-1719210327-1.0.1.1-jMH7TDWsqJvJWiQE7B_BF56g3FM4fgihnozIRQe76NcdmG_9zKBqjyVdX59FHUigKzzp9SVJSBRXGKMlZZA7tw'
    }
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export default getImages