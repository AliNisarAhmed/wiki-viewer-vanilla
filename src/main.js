const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const loadingIcon = document.querySelector('.loading-icon-parent');
const resultList = document.querySelector('.result-list');

loadingIcon.style.display = "none";

function generateResponseHtml (title, snippet, pageid) {
  return `
    <a href="https://en.wikipedia.org/wiki?curid=${pageid}" class="result">
      <h3 class="result-title">${title}</h3>
      <p class="result-text">${snippet}</p>
    </a>
  `;
}

// Adding input field focus and blur event
input.addEventListener('focus', () => {
  form.classList.add('active');
})

input.addEventListener('blur', () => {
  form.classList.remove('active');
})

// Adding form Submit Event

form.addEventListener('submit', onSubmit);

function onSubmit (e) {
  e.preventDefault();
  let value = input.value;
  loadingIcon.style.display = "block";
  resultList.innerHTML = "";
  input.value = "";
  fetch(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${encodeURI(value)}`)
    .then(res => res.json())
    .then(data => {
      loadingIcon.style.display = "none";
      let results = data.query.search;
      results.forEach(result => {
        resultList.insertAdjacentHTML('beforeend', generateResponseHtml(result.title, result.snippet, result.pageid));
      })
    })
    .catch(err => console.log(err));
}