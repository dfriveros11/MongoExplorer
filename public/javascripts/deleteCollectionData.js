const formDelete = document.querySelector("#formDelete");

const onDelete = evt => {
  const name = document.querySelector("#formDelete input").value;
  const selectDatabase = document.querySelector("#searchDatabase");
  const databaseName =
    selectDatabase.options[selectDatabase.selectedIndex].value;
  const selectCollection = document.querySelector("#searchCollection");
  const collectionName =
    selectCollection.options[selectCollection.selectedIndex].value;

  const query = {
    databaseName: databaseName,
    collectionName: collectionName,
    name: name
  };

  console.log("query", query);
  fetch("/collection/delete", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  });

  const msg = new SpeechSynthesisUtterance(
    "You have deleted a data with name " +
      name +
      "in the collection name " +
      collectionName +
      " and in the database name " +
      databaseName
  );
  msg.rate = 0.7;
  window.speechSynthesis.speak(msg);

  evt.preventDefault();
};

formDelete.addEventListener("submit", onDelete);
