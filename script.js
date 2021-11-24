const form = document.getElementById("form");

 form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let TransactionFormData = new FormData(form);
    let miObject = combertFormData(TransactionFormData);
    saveObject(miObject)
    transactionRow(miObject);
    form.reset();
    
 });

 function transactionRow(miObject){
    let table = document.getElementById("transactionTable");
    let tableRow = table.insertRow(-1);
    tableRow.setAttribute("data-id", miObject["transactionId"])

    let tableCell = tableRow.insertCell(0);
    tableCell.textContent = miObject["transactionType"];

     tableCell = tableRow.insertCell(1);
    tableCell.textContent = miObject["transactionDescription"];

     tableCell = tableRow.insertCell(2);
    tableCell.textContent = miObject["transactionAmount"];

     tableCell = tableRow.insertCell(3);
    tableCell.textContent = miObject["transactionCategory"];

    let deleteRow = tableRow.insertCell(4);
    let deleteButtom = document.createElement("button");
    deleteButtom.classList = "btn btn-secondary"
    deleteButtom.textContent = "Eliminar";
    deleteRow.appendChild(deleteButtom);
  
   deleteButtom.addEventListener("click", (event)=>{
      let transactionRow = event.target.parentElement.parentElement;
      let transactionId = transactionRow.getAttribute("data-id");
      transactionRow.remove();
      deleteArray(transactionId);
   })
};

function transactionId(){
   let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
   let newTransactionId = JSON.parse(lastTransactionId) + 1;
   localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
   return newTransactionId;
};

function combertFormData(TransactionFormData){
  let transactionType = TransactionFormData.get("transactionType");
  let transactionDescription = TransactionFormData.get("transactionDescription");
  let transactionAmount = TransactionFormData.get("transactionAmount");
  let transactionCategory = TransactionFormData.get("transactionCategory");
  let TransactionId = transactionId();
  return  {
     "transactionType": transactionType,
     "transactionDescription": transactionDescription,
     "transactionAmount": transactionAmount,
     "transactionCategory": transactionCategory,
     "transactionId": TransactionId
  }
}

function deleteArray(transactionId){ 
    let transactionObjArray = JSON.parse(localStorage.getItem("transactionData"));
    let transactionIndex = transactionObjArray.findIndex(element => element.transactionId == transactionId);
    transactionObjArray.splice(transactionIndex, 1);
    let myArrayJson = JSON.stringify(transactionObjArray);
   localStorage.setItem("transactionData", myArrayJson);
};



function saveObject(miObject){
   let myArray = JSON.parse(localStorage.getItem("transactionData")) || [];
   myArray.push(miObject);
   let myArrayJson = JSON.stringify(myArray);
   localStorage.setItem("transactionData", myArrayJson);
}



document.addEventListener("DOMContentLoaded", ()=>{
   allCategory();
    let myArrayLoad = JSON.parse(localStorage.getItem("transactionData"));
    myArrayLoad.forEach(element => {
    transactionRow(element);
 });
})

// agregar option

function allCategory(){
   let arrOption = ["alquiler", "limpieza", "comida", "tecnologia", "transporte"];
   for(let i = 0; i < arrOption.length; i++){
      insertCategory(arrOption[i]);
  }
}

function insertCategory(categoryName){
   let selectElement = document.getElementById("transactionCategory")
   let htmlOptions = `<option>${categoryName}</option>`;
   selectElement.insertAdjacentHTML("beforeend", htmlOptions);
}







