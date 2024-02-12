function renderResponse(response) {
  const list = document.getElementById("film-list"); // busca o elemento da lista no Html
  list.innerHTML = "";
  response.forEach((films, index) => {
    // faz uma interação dentro do arrays de filmes, percorrendo elemento
    const filmCard = document.createElement("div"); // cria uma div para cada filme
    filmCard.style.backgroundImage = `url(${films.image_url})`; // coloca a imagem de fundo
    filmCard.className = "film-card"; // estiliza o film card
    filmCard.onclick = function () {
      // função executada quendo clica no card
      const modal = document.getElementById("modal"); //busca um modal no HTML
      modal.style.visibility = "visible"; // coloca o modal visivel
      const modalContent = document.getElementById("modal-content"); // busca o conteudo do modal HTML
      modalContent.innerHTML = ""; // limpa tudo que esiver dentro

      const filmTitle = document.createTextNode(film.title); //cria um node texte com o title do film
      const filmTitleElement = document.createElement("h1"); // cria um elemento para o titulo
      filmTitleElement.appendChild(filmTitle); // coloca texto dentro do elemento do titulo
      modalContent.appendChild(filmTitleElement); // coloca o elemento do titulo dentro do modal content

      const filmSubTitle = document.createTextNode(film.subtitle);
      const filmSubTitleElement = document.createElement("h3");
      filmSubTitleElement.appendChild(filmSubTitle);
      modalContent.appendChild(filmSubTitleElement);

      const filmDescription = document.createTextNode(film.description);
      const filmDescriptionElement = document.createElement("p");
      filmDescriptionElement.appendChild(filmDescription);
      modalContent.appendChild(filmDescriptionElement);
    };
    list.appendChild(filmCard);
  });
}

window.onload = function () {
  //busca todos os filmes na api
  fetch("https://sevencoders-starwars-wiki.herokuapp.com/films")
    .then(async (data) => {
      const response = await data.json(); // pega o resultado, transforma  json
      renderResponse(response);
    })
    .catch((error) => {
      console.log({ error });
      alert("Erro ao carregar os filmes");
    });
};

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function onSearch() {
  const searchValue = document.getElementById("searchInput").value;

  fetch(
    searchValue.length === 0
      ? "https://sevencoders-starwars-wiki.herokuapp.com/films"
      : `https://sevencoders-starwars-wiki.herokuapp.com/search?query=${searchValue}`
  )
    .then(async (data) => {
      const response = await data.json();
      renderResponse(response);
    })
    .catch((error) => {
      alert("Falha ao realizar a busca");
    });
}
