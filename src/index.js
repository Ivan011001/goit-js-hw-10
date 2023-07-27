import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const API_KEY =
  'live_jIpBhOLZCJMrOZK9Vqsh3tFsJRzS75IpGGWt84EFOIMIrSclngGSUEo7U8VNY3rm';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const selectRef = document.querySelector('.breed-select');
const catInfoDivRef = document.querySelector('.cat-info');

fetchBreeds().then(createOptions);

selectRef.addEventListener('change', e => {
  fetchCatByBreed(e.currentTarget.value).then(renderMarkup).catch(console.warn);
});

function renderMarkup(data) {
  const markup = data.map(info => {
    return `<img src="${info.url}" />`;
  });

  catInfoDivRef.innerHTML = markup;
}

function createOptions(data) {
  const options = data.map(cat => {
    return `<option value="${cat.id}">${cat.name}</option>`;
  });

  selectRef.innerHTML = options;
}
