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


export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export { lightbox };

export function renderGallery(images) {
  galleryContainer.innerHTML = createGallery(images);
  lightbox.refresh();
}