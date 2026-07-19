//get saved expenses from local storage
let expenses=JSON.parse(localStorage.getItem("expenses"))||[];

let editIndex = -1;
let deleteIndex = -1;

let expenseChart;

//display saved expenses when page loads
window.onload=function(){
    displayExpenses();
    updateChart();
};

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
  localStorage.setItem("expenses",JSON.stringify(expenses));  

//show expenses
displayExpenses();
    updateChart();

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
                    <button onclick="openEditModal(${i})">Edit</button>
                   <button onclick="showDeleteModal(${i})">Delete</button>
            </td>
        </tr>
        `;

        expenseList.innerHTML += row;
}
}

// delete expenses changed
document.getElementById("confirm-delete").onclick = function(){

    expenses.splice(deleteIndex,1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
    updateChart();

    closeModal("delete-modal");

};
// NEW
function showDeleteModal(index){

    deleteIndex = index;

    document.getElementById("delete-modal").style.display = "flex";

}

// NEW
function closeModal(modalId){

    document.getElementById(modalId).style.display = "none";

}

// NEW
function openEditModal(index){

    editIndex = index;

    document.getElementById("edit-expense-name").value =
    expenses[index].name;

    document.getElementById("edit-expense-amount").value =
    expenses[index].amount;

    document.getElementById("edit-expense-category").value =
    expenses[index].category;

    document.getElementById("edit-expense-date").value =
    expenses[index].date;

    document.getElementById("edit-modal").style.display = "flex";

}

// NEW
document.getElementById("confirm-edit").onclick = function(){

    expenses[editIndex].name =
    document.getElementById("edit-expense-name").value;

    expenses[editIndex].amount =
    document.getElementById("edit-expense-amount").value;

    expenses[editIndex].category =
    document.getElementById("edit-expense-category").value;

    expenses[editIndex].date =
    document.getElementById("edit-expense-date").value;

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
    updateChart();

    closeModal("edit-modal");

};

function updateChart(){

    // Total expenses for each month
    let monthlyTotals = [0,0,0,0,0,0,0,0,0,0,0,0];

    expenses.forEach(expense => {

        let month = new Date(expense.date).getMonth();

        monthlyTotals[month] += Number(expense.amount);

    });

    let ctx = document.getElementById("expenseChart").getContext("2d");

    // Destroy old chart before creating a new one
    if(expenseChart){
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx,{
        type:"bar",

        data:{
            labels:[
                "Jan","Feb","Mar","Apr","May","Jun",
                "Jul","Aug","Sep","Oct","Nov","Dec"
            ],

            datasets:[{
                label:"Monthly Expenses (Rs.)",
                data:monthlyTotals,
                backgroundColor:"#2563EB",
                borderRadius:8
            }]
        },

        options:{
            responsive:true,

            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }

    });

}



