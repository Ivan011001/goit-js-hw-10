const BASE_URL = 'https://api.thecatapi.com';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/v1/breeds`).then(response => response.json());
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/v1/images/search?breed_ids=${breedId}`).then(
    response => {
      if (!response.ok) {
        throw new Error(
          'Ooops... Something went wrong. Please, try to reload th page and try one more time'
        );
      }

    return  response.json();
    }
  );
}
