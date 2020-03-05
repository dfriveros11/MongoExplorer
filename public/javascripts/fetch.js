console.log("cargo");

const formSearch = document.querySelector("#search");

const populateCollection = collection => {
  const collectionUl = document.querySelector("#colectionsInfo");
  collectionUl.innerHTML = "";

  collection.forEach(data => {
    const collectionLi = document.createElement("li");
    console.log("data", collectionLi);
    collectionLi.textContent = `${data}`;

    collectionUl.appendChild(collectionLi);
  });
};

const onSearch = evt => {
  const query = document.querySelector("#search option").value;
  fetch(`/collection/${query}`)
    .then(res => res.json())
    .then(populateCollection);

  evt.preventDefault();
};

formSearch.addEventListener("submit", onSearch);
