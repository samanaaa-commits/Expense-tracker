//get saved expenses from local storage
let expenses=JSON.parse(localStorage.getItem("expenses"))||[];

//display saved expenses when page loads
window.onload=function(){
    displayExpenses();
}

function addExpense(){
    let name=document.getElementById("expense-name").value;
    let amount=document.getElementById("expense-amount").value;
    let category=document.getElementById("expense-category").value;
    let date=document.getElementById("expense-date").value;

//validation
if( name==""|| amount==""|| category==""|| date==""){
    alert("Please fill in all the fields.");
    return;
}
    
if (amount <= 0) {
    alert("Enter a valid amount.");
    return;
}
    
//create expense object
let expense={
    name,
    amount,
    category,
    date
};

//add  to array
expenses.push(expense);

//saved updated array to local storage
  localstorage.setItem("expenses",JSON.stringify(expenses));  

//show expenses
displayExpenses();

//clear inputs
document.getElementById("expense-name").value="";
document.getElementById("expense-amount").value="";
document.getElementById("expense-category").selectedIndex=0;
document.getElementById("expense-date").value="";
}

//dispplay expenses
function displayExpenses(){

    let expenseList=document.getElementById("expense-list");

expenseList.innerHTML="";

  for(let i=0;i<expenses.length;i++){

      let row = `
        <tr>
            <td>${expenses[i].name}</td>
            <td>Rs. ${expenses[i].amount}</td>
            <td>${expenses[i].category}</td>
            <td>${expenses[i].date}</td>
            <td>
                <button onclick="deleteExpense(${i})">Delete</button>
            </td>
        </tr>
        `;

        expenseList.innerHTML += row;
}
}

//delete expenses
function deleteExpense(index){

    expenses.splice(index,1);

 //updating local storage
 localstorage.setItem("expenses",JSON.stringify(expenses));  


    displayExpenses();
}
