let expenses = [];

function addExpense() {

    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;
    let category = document.getElementById("expense-category").value;
    let date = document.getElementById("expense-date").value;

    // Validation
    if (name === "" || amount === "" || category === "" || date === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create expense object
    let expense = {
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    // Add to array
    expenses.push(expense);

    // Show expenses
    displayExpenses();

    // Clear inputs
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-category").selectedIndex = 0;
    document.getElementById("expense-date").value = "";
}

// Display all expenses
function displayExpenses() {

    let expenseList = document.getElementById("expense-list");

    expenseList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {

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

// Delete expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    displayExpenses();
}

