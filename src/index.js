import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed, API_KEY } from './cat-api';

axios.defaults.headers.common['x-api-key'] = API_KEY;

const selectRef = document.querySelector('.breed-select');
const catInfoDivRef = document.querySelector('.cat-info');

fetchBreeds()
  .then(createOptions)
  .catch(() =>
    Notify.failure('Sorry, something went wrong. Reload the page and try again')
  );

selectRef.addEventListener('change', e => {
  fetchCatByBreed(e.currentTarget.value)
    .then(renderMarkup)
    .catch(() => {
      Notify.failure('Sorry, we cannot find information about this cat');
    });
});

function renderMarkup(response) {
  const markup = response.data.map(info => {
    const { name, temperament, description } = info.breeds[0];
    return `<img src="${info.url}"/><div class="description-wrapper"><h3>${name}</h3><p>${description}</p><p>Temperament: ${temperament}</p></divdiv>`;
  });

  catInfoDivRef.innerHTML = markup;
}

function createOptions(response) {
  const options = response.data
    .map(cat => {
      return `<option value="${cat.id}">${cat.name}</option>`;
    })
    .join('');

  selectRef.innerHTML += options;

  new SlimSelect({
    select: '.breed-select',
    settings: {
      placeholderText: "Select your cat's breed",
    },
  });
}
