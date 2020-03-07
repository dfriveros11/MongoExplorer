const seacrchDatabase = document.querySelector("#searchDatabase");

const populateCollection = collection => {
  const collectionSelector = document.querySelector("#searchCollection");
  collectionSelector.innerHTML = "";

  const collectionEmpty = document.createElement("option");
  collectionEmpty.textContent = "Select a collection";
  collectionSelector.appendChild(collectionEmpty);

  collection.forEach(data => {
    const collectionOption = document.createElement("option");
    collectionOption.textContent = `${data.name}`;
    collectionSelector.appendChild(collectionOption);
  });
};

const onSearch = evt => {
  const select = document.querySelector("#searchDatabase");
  const databaseName = select.options[select.selectedIndex].value;
  fetch(`/collection/${databaseName}`)
    .then(res => res.json())
    .then(populateCollection);

  const msg = new SpeechSynthesisUtterance(
    "You have selected the database with name " + databaseName
  );
  msg.rate = 0.7;
  window.speechSynthesis.speak(msg);
  evt.preventDefault();
};

seacrchDatabase.addEventListener("change", onSearch);
