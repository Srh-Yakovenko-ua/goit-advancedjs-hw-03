import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const TOAST_CONFIG = {
  position: 'topRight',
  timeout: 5000
};
iziToast.settings(TOAST_CONFIG);



const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  input: document.querySelector('input[name="query"]'),

}
const UI = {
  showLoader: () => refs.loader.classList.remove('hidden'),
  hideLoader: () => refs.loader.classList.add('hidden'),
  clearGallery: () => refs.gallery.innerHTML = '',
  resetForm: () => refs.input.value = '',
  showError: (message) => iziToast.error({ message })
};


const processSearch = (query) => {
  UI.showLoader();
  UI.clearGallery();

  fetchImages(query)
    .then(data => {
      if (!data.hits.length) {
        UI.showError('No images found. Try another query!');
        return;
      }
      renderGallery(data.hits);
    })
    .catch(error => {
      UI.showError(error.message || 'Search failed');
    })
    .finally(() => {
      UI.hideLoader();
    });
};


const handleSubmit = (event) => {
  event.preventDefault();
  const query = refs.input.value.trim();
  
  if (!query.length) {
    UI.showError('Please enter search term');
    return;
  }

  processSearch(query);
};


refs.form.addEventListener('submit', handleSubmit);