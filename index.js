import{a as p,S as g,i as a}from"./assets/vendor-CrlV4O_2.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const m="50702962-7cd53856c0773f25b2e4cfafa",y="https://pixabay.com/api/";async function h(n){const t={key:m,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await p.get(y,{params:t})).data.hits}const u=document.querySelector(".gallery"),d=document.querySelector(".loader"),L=new g(".gallery a",{captionsData:"alt",captionDelay:250});function v(n){return n.map(({webformatURL:t,largeImageURL:s,tags:o,likes:e,views:r,comments:i,downloads:f})=>`
        <div class="card">
          <a href="${s}">
            <img src="${t}" alt="${o}" loading="lazy" />
          </a>
          <div class="info">
            <p><strong>Likes</strong> ${e}</p>
            <p><strong>Views</strong> ${r}</p>
            <p><strong>Comments</strong> ${i}</p>
            <p><strong>Downloads</strong> ${f}</p>
          </div>
        </div>
      `).join("")}function q(){u.innerHTML=""}function S(){d.classList.remove("hidden")}function l(){d.classList.add("hidden")}function b(n){u.innerHTML=v(n),L.refresh()}const c=document.querySelector("form");document.querySelector(".gallery");c.addEventListener("submit",n=>{var s;n.preventDefault();const t=(s=c.elements["search-text"])==null?void 0:s.value.trim();if(!t){a.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}S(),q(),h(t).then(o=>{if(l(),!o.length){a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"});return}b(o),c.reset()}).catch(o=>{l(),a.error({title:"Error",message:"Failed to fetch images.",position:"topRight"}),console.error("Error fetching images:",o)})});
//# sourceMappingURL=index.js.map
