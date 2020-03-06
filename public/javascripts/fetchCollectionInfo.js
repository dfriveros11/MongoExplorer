const searchCollection = document.querySelector("#searchCollection");

const populateInfo = collection => {
  const collectionDiv = document.querySelector("#collectionInfo");
  collectionDiv.innerHTML = "";

  //Create attributes for table
  const table = document.createElement("table");
  table.setAttribute("class", "table table-hover");
  const thead = document.createElement("thead");
  thead.setAttribute("class", "thead-dark");
  const tbody = document.createElement("tbody");

  //Create table structure
  table.appendChild(thead);
  table.appendChild(tbody);

  const th1 = document.createElement("th");
  th1.setAttribute("scope", "col");
  th1.textContent = "#";

  const thId = document.createElement("th");
  thId.setAttribute("scope", "col");
  thId.textContent = "ID";

  const thName = document.createElement("th");
  thName.setAttribute("scope", "col");
  thName.textContent = "Name";

  thead.appendChild(th1);
  thead.appendChild(thId);
  thead.appendChild(thName);

  collectionDiv.appendChild(table);

  let i = 1;
  collection.forEach(data => {
    const collectionTr = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.setAttribute("scope", "row");
    th1.textContent = i;

    const thId = document.createElement("th");
    thId.setAttribute("scope", "row");
    thId.textContent = `${data._id}`;

    const thName = document.createElement("th");
    thName.setAttribute("scope", "row");
    thName.textContent = `${data.name}`;

    //Append Info
    collectionTr.appendChild(th1);
    collectionTr.appendChild(thId);
    collectionTr.appendChild(thName);

    //Added to de body og the tale
    tbody.appendChild(collectionTr);
    i++;
  });
};

const onUpdate = evt => {
  const selectDatabase = document.querySelector("#searchDatabase");
  const databaseName =
    selectDatabase.options[selectDatabase.selectedIndex].value;
  const selectCollection = document.querySelector("#searchCollection");
  const collectionName =
    selectCollection.options[selectCollection.selectedIndex].value;
  fetch(`/collection/${databaseName}/${collectionName}`)
    .then(res => res.json())
    .then(populateInfo);

  const msg = new SpeechSynthesisUtterance(
    "You have selected the database with name " +
      databaseName +
      " and the collection name " +
      collectionName
  );
  msg.rate = 0.7;
  window.speechSynthesis.speak(msg);
  evt.preventDefault();
};

searchCollection.addEventListener("change", onUpdate);
