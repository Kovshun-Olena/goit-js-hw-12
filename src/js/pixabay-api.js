import axios from 'axios';

const API_KEY = '50702962-7cd53856c0773f25b2e4cfafa';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return {
      images: response.data.hits,
      total: response.data.totalHits,
    };
  } catch (error) {
    console.error('Pixabay API error:', error);
    throw new Error('Failed to fetch images from Pixabay');
  }
}

