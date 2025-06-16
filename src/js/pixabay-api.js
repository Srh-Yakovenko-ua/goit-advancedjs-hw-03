const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50891107-566f278151ee6a9d75cddbbab';

export function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const url = `${BASE_URL}?${new URLSearchParams(params)}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
}
