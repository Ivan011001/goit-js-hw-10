import { Spinner } from 'spin.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed, API_KEY } from './cat-api';
axios.defaults.headers.common['x-api-key'] = API_KEY;

const selectRef = document.querySelector('.breed-select');
const catInfoDivRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.js-loader');
const spinner = new Spinner({
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
});
spinner.spin(loaderRef);

fetchBreeds()
  .then(data => {
    createOptions(data);
    spinner.stop(loaderRef);
  })
  .catch(() =>
    Notify.failure('Sorry, something went wrong. Reload the page and try again')
  );

selectRef.addEventListener('change', e => {
  spinner.spin(loaderRef);
  fetchCatByBreed(e.currentTarget.value)
    .then(data => {
      renderMarkup(data);
      spinner.stop(loaderRef);
      Notify.success('Here is your cat!');
    })
    .catch(() => {
      Report.failure('Sorry, we cannot find information about this cat');
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
