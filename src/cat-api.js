import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com';
export const API_KEY =
  'live_jIpBhOLZCJMrOZK9Vqsh3tFsJRzS75IpGGWt84EFOIMIrSclngGSUEo7U8VNY3rm';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/v1/breeds?${API_KEY}`);
}

export function fetchCatByBreed(breedId) {
  return axios.get(
    `${BASE_URL}/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  );
}
