const formUpdate = document.querySelector("#formUpdate");

const onUpdateCollection = evt => {
  const oldName = document.querySelectorAll("#formUpdate input")[0].value;
  const newName = document.querySelectorAll("#formUpdate input")[1].value;
  const selectDatabase = document.querySelector("#searchDatabase");
  const databaseName =
    selectDatabase.options[selectDatabase.selectedIndex].value;
  const selectCollection = document.querySelector("#searchCollection");
  const collectionName =
    selectCollection.options[selectCollection.selectedIndex].value;

  const query = {
    databaseName: databaseName,
    collectionName: collectionName,
    oldName: oldName,
    newName: newName
  };

  fetch("/collection/update", {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  });

  const msg = new SpeechSynthesisUtterance(
    "You have updated a data with name " +
      oldName +
      " to a new name " +
      newName +
      "in the collection name " +
      collectionName +
      " and in the database name " +
      databaseName
  );
  msg.rate = 0.7;
  window.speechSynthesis.speak(msg);

  evt.preventDefault();
};

formUpdate.addEventListener("submit", onUpdateCollection);
