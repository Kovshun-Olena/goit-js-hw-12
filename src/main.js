import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  lightbox,
  renderGallery,
} from './js/render-functions.js';

import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', e => {
  e.preventDefault();
  const query = form.elements['search-text']?.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(images => {
      hideLoader();
      if (!images.length) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
        });
        return;
      }
      renderGallery(images);
      form.reset();
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images.',
        position: 'topRight',
      });
      console.error('Error fetching images:', error);
    });
});