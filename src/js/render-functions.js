import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="card">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><strong>Likes</strong> ${likes}</p>
            <p><strong>Views</strong> ${views}</p>
            <p><strong>Comments</strong> ${comments}</p>
            <p><strong>Downloads</strong> ${downloads}</p>
          </div>
        </div>
      `
    )
    .join('');
}

export function renderGallery(images) {
  galleryContainer.innerHTML = createGallery(images);
  lightbox.refresh();
}

export function appendToGallery(images) {
  galleryContainer.insertAdjacentHTML('beforeend', createGallery(images));
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader-backdrop').classList.add('is-visible');
}
export function hideLoader() {
  document.querySelector('.loader-backdrop').classList.remove('is-visible');
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').hidden = false;
}
export function hideLoadMoreButton() {
  document.querySelector('.load-more').hidden = true;
}

export { lightbox };

