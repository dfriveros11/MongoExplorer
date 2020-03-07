const nextPage = document.querySelector("#nextPagination");

let page = 1;

let isNextPage = 1;

//Click on next button
const onNextPage = evt => {
  if (isNextPage === 1) {
    page++;

    //get all the information for the fetch
    const selectDatabase = document.querySelector("#searchDatabase");
    const databaseName =
      selectDatabase.options[selectDatabase.selectedIndex].value;
    const selectCollection = document.querySelector("#searchCollection");
    const collectionName =
      selectCollection.options[selectCollection.selectedIndex].value;
    fetch(`/collection/${databaseName}/${collectionName}/${page}`)
      .then(res => res.json())
      .then(collection => {
        //to know if there is no more data
        if (collection.length > 0) {
          populateInfoPagination(collection);

          //The machine will talk!! :)
          const msg = new SpeechSynthesisUtterance(
            "You have click on the next button and move to the page " + page
          );
          msg.rate = 0.7;
          window.speechSynthesis.speak(msg);
        } else {
          //CTo know which is the current page
          isNextPage = 0;
          page--;

          //The machine will talk!! :)
          const msg = new SpeechSynthesisUtterance(
            "You are in the last page, you can't got foward"
          );
          msg.rate = 0.7;
          window.speechSynthesis.speak(msg);
        }
      });
    //With out this there is an error de network!!!
    evt.preventDefault();
  } else {
    const msg = new SpeechSynthesisUtterance(
      "You are in the last page, you can't got foward"
    );
    msg.rate = 0.7;
    window.speechSynthesis.speak(msg);
    evt.preventDefault();
  }
};

nextPage.addEventListener("submit", onNextPage);

const backPage = document.querySelector("#backPagination");

//Click on back button
const onBackPage = evt => {
  if (page > 1) {
    isNextPage = 1;
    page--;
    //get all the information for the fetch
    const selectDatabase = document.querySelector("#searchDatabase");
    const databaseName =
      selectDatabase.options[selectDatabase.selectedIndex].value;
    const selectCollection = document.querySelector("#searchCollection");
    const collectionName =
      selectCollection.options[selectCollection.selectedIndex].value;
    fetch(`/collection/${databaseName}/${collectionName}/${page}`)
      .then(res => res.json())
      .then(populateInfoPagination);

    //The machine will talk!! :)
    const msg = new SpeechSynthesisUtterance(
      "You have click on back button and move to the page " + page
    );
    msg.rate = 0.7;
    window.speechSynthesis.speak(msg);
  } else {
    const msg = new SpeechSynthesisUtterance(
      "You are in the first page, you can't got back"
    );
    msg.rate = 0.7;
    window.speechSynthesis.speak(msg);
  }
  //With out this there is an error de network!!!
  evt.preventDefault();
};

backPage.addEventListener("submit", onBackPage);

const populateInfoPagination = collection => {
  console.log("POPULATE");
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
