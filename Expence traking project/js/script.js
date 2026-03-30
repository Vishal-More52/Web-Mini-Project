document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    if (expenseName && !isNaN(expenseAmount)) {
        addExpense(expenseName, expenseAmount);
        updateTotal();
        this.reset(); // Reset the form fields
    }
});

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(name, amount) {
    expenses.push({ name, amount });
    saveExpenses();
    displayExpenses();
}

function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.name} - ₹${expense.amount.toFixed(2)}`; // Changed to INR
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeExpense(index);
        li.appendChild(removeButton);
        expenseList.appendChild(li);
    });
}

function removeExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    displayExpenses();
    updateTotal();
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateTotal() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2); // Keep formatting
}

// Load expenses from local storage when the page loads
window.onload = function() {
    displayExpenses();
    updateTotal();
};