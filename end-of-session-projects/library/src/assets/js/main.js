//DOM NODES

const root = document.getElementById("root");
const filter = document.getElementById("filter");
const favouriteContainer = document.querySelector(".fav");
const favouriteButton = document.getElementById("favBtn");
const selectedAuthors = [];
let selectedGenres = [];
let selectedLanguage = [];
const savedFavBooks = JSON.parse(localStorage.getItem("favourite"));
let favBooks = savedFavBooks;

if (!savedFavBooks) {
  favBooks = [];
}
showFaveBooks();

//FUNCTIONS

function showBooks(list) {
  const template = list
    .map((book) => {
      return `
        <div class = "card">
        <img class = "card__img" src = "./src/assets/imgs/${book.imgSrc}"/>
        <div class = "card__desc">
        <h3>${book.title}</h3>
        <span>${book.author}</span>
        <span>${book.published_date}</span>
        ${
          favBooks.includes(book.id)
            ? ""
            : `<button class="card__btn" onclick="handleAddToFaves(${book.id})">افزودن به علاقه مندی ها</button>`
        }
        </div>
        </div>`;
    })
    .join("");
  root.innerHTML = template;
}
showBooks(BOOKS);

function renderFilters(list) {
  //UNIQUE AUTHORS

  const uniqueAuthors = [];
  for (const item of list) {
    if (!uniqueAuthors.includes(item.author)) {
      uniqueAuthors.push(item.author);
    }
  }
  const authorTemplate = uniqueAuthors
    .map((item) => {
      return `
        <div class="flters-div">
        <lable class="filters-item" for ="${item}">${item}</lable>
        <input onchange="handleAuthorClick(event)" id = "${item}" type = "checkbox" value = "${item}"></input>
        </div>
        `;
    })
    .join("");
  filter.innerHTML += '<h2 id="title">:نویسنده کتاب</h2>';
  filter.innerHTML += authorTemplate;

  //UNIQUE GENRES
  const allGenres = list.map((item) => item.genre);
  const uniqueGenres = new Set(allGenres);
  let genreTemp = "";
  for (const genre of uniqueGenres) {
    genreTemp += `
            <div class="flters-div">
        <lable class="filters-item" for ="${genre}">${genre}</lable>
        <input onchange="handleGenreClick(event)" id = "${genre}" type = "checkbox" value = "${genre}"></input>
        </div>
    `;
  }
  filter.innerHTML += '<h2 id="title">:ژانر کتاب</h2>';
  filter.innerHTML += genreTemp;

  //UNIQUE LANGUAGES
  const allLanguage = list.map((item) => item.language);
  const uniqueLanguage = new Set(allLanguage);
  let languageTemp = "";
  for (const language of uniqueLanguage) {
    languageTemp += `
                <div class="flters-div">
        <lable class="filters-item" for ="${language}">${language}</lable>
        <input onchange="handleLanguageClick(event)" id = "${language}" type = "checkbox" value = "${language}"></input>
        </div>
    `;
  }
  filter.innerHTML += '<h2 id="title">:زبان کتاب</h2>';
  filter.innerHTML += languageTemp;
}
renderFilters(BOOKS);

function handleAuthorClick(event) {
  if (event.target.checked) {
    selectedAuthors.push(event.target.value);
  } else {
    const targetIndex = selectedAuthors.findIndex(
      (item) => item === event.target.value
    );
    selectedAuthors.splice(targetIndex, 1);
  }
  handleFilters();
}

function handleGenreClick(event) {
  if (event.target.checked) {
    selectedGenres.push(event.target.value);
  } else {
    selectedGenres = selectedGenres.filter(
      (item) => item != event.target.value
    );
  }
  handleFilters();
}

function handleLanguageClick(event) {
  if (event.target.checked) {
    selectedLanguage.push(event.target.value);
  } else {
    selectedLanguage = selectedLanguage.filter(
      (item) => item != event.target.value
    );
  }
  handleFilters();
}

function handleFilters() {
  let result = BOOKS;

  if (selectedAuthors.length) {
    result = result.filter((book) => selectedAuthors.includes(book.author));
  }

  if (selectedGenres.length) {
    result = result.filter((book) => selectedGenres.includes(book.genre));
  }

  if (selectedLanguage.length) {
    result = result.filter((book) => selectedLanguage.includes(book.language));
  }

  showBooks(result);
}

function showFaveBooks() {
  const favs = BOOKS.filter((item) => favBooks.includes(item.id));
  const favTemplate = favs
    .map((book) => {
      return `
    <div class="fav-card">
    <img src="./src/assets/imgs/${book.imgSrc}" width="200px"/>
    <div class="fav-card__desc">
    <h4>${book.title}</h4>
            ${
              favBooks.includes(book.id)
                ? `<button class="fav-card__btn" onclick="handleRemoveFromFaves(${book.id})">حذف از علاقه مندی ها</button>`
                : ""
            }
    </div>
    </div>

    `;
    })
    .join("");
  favouriteContainer.innerHTML = favTemplate;
}

function handleAddToFaves(bookId) {
  if (!favBooks.includes(bookId)) {
    favBooks.push(bookId);
  }
  window.localStorage.setItem("favourite", JSON.stringify(favBooks));
  showFaveBooks();
  showBooks(BOOKS);
}

function handleRemoveFromFaves(bookId) {
  debugger;
  if (favBooks.includes(bookId)) {
    favBooks.splice(bookId);
  }
  window.localStorage.setItem("favourite", JSON.stringify(favBooks));
  showFaveBooks();
  showBooks(BOOKS);
}

//EVENT
favouriteButton.addEventListener("click", function () {
  favouriteContainer.classList.toggle("hidden");
});
