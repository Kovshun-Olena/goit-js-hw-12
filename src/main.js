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
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

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
  loadMoreBtn.hidden = true;

  showLoaderBelowBtn();

    try {
      const { images, total } = await getImagesByQuery(currentQuery, currentPage, perPage);
      hideLoaderBelowBtn();
      totalImagesAvailable = total;
      renderGallery(images);
      imagesLoaded = images.length;

      if (!images.length) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
        });
        return;
      }

      renderGallery(images);
      imagesLoaded += images.length;
      form.reset();

      if (imagesLoaded >= totalImagesAvailable) {
        loadMoreBtn.hidden = true;
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      } else {
        loadMoreBtn.hidden = false;
      }

    } catch (error) {
      hideLoaderBelowBtn();
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images.',
        position: 'topRight',
      });
      console.error('Error fetching images:', error);
    }
  });


function showLoaderBelowBtn() {
  loader.hidden = false;
  loadMoreBtn.after(loader);
}

function hideLoaderBelowBtn() {
  loader.hidden = true;
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoaderBelowBtn();

  try {
    const { images } = await getImagesByQuery(currentQuery, currentPage, perPage);
    hideLoaderBelowBtn();
    renderGallery(images);
    imagesLoaded += images.length;
    smoothScrollAfterLoad();

    if (imagesLoaded >= totalImagesAvailable) {
      loadMoreBtn.hidden = true;
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

  } catch (error) {
    hideLoaderBelowBtn();
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
