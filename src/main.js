import { getImagesByQuery } from './js/pixabay-api.js';
import {
  appendToGallery,
  clearGallery,
  showLoader,
  hideLoader,
  renderGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
  lightbox,
} from './js/render-functions.js';

import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalImagesAvailable = 0;
let imagesLoaded = 0;


form.addEventListener('submit', async e => {
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

  currentQuery = query;
  currentPage = 1;
  imagesLoaded = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

    try {
      const { images, total } = await getImagesByQuery(currentQuery, currentPage, perPage);
      hideLoader();

      totalImagesAvailable = Math.min(total, 500)

      if (!images.length) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
        });
        return;
      }

      renderGallery(images);
      imagesLoaded = images.length;
      form.reset();

       checkEndOfCollection(images.length);

    } catch (error) {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images.',
        position: 'topRight',
      });
      console.error('Error fetching images:', error);
    }
  });

document.querySelector('.load-more').addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const { images } = await getImagesByQuery(currentQuery, currentPage, perPage);
    hideLoader();

      if (!images.length) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    appendToGallery(images);

    lightbox.refresh();

    imagesLoaded += images.length;
    smoothScrollAfterLoad();
    checkEndOfCollection(images.length);

  } catch (error) {
    hideLoader();
    showLoadMoreButton(); 
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
    console.error('Load more error:', error);
  }
});

function smoothScrollAfterLoad() {
  const firstCard = document.querySelector('.gallery .card');
  if (!firstCard) return;
  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function checkEndOfCollection(lastBatchLength) {
  if (imagesLoaded >= totalImagesAvailable || lastBatchLength < perPage) {
    hideLoadMoreButton();
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreButton();
  }
}

