document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const expenseDateInput = document.getElementById('expense-date');

    const monthForm = document.getElementById('month-form');
    const monthlyExpenseList = document.getElementById('monthly-expense-list');
    const monthlyTotalAmount = document.getElementById('monthly-total-amount');
    const monthSelectInput = document.getElementById('month-select');

    let expenses = getExpenses();

    if (!expenseDateInput.value) {
        const todayDate = new Date().toISOString().split('T')[0];
        expenseDateInput.value = todayDate;
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = expenseDateInput.value;
        const name = document.getElementById('expense-name').value.trim();
        const amount = parseFloat(document.getElementById('expense-amount').value);

        if (!name || isNaN(amount) || amount <= 0) {
            alert('Please enter valid details.');
            return;
        }

        const expense = { date, name, amount, time: new Date().toLocaleTimeString() };
        expenses.push(expense);

        saveExpenses(expenses);
        updateExpenseList();
        updateTotalAmount();

        // Clear name and amount fields after submission
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
    });

    monthForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const month = monthSelectInput.value;
        if (!month) {
            alert('Please select a valid month.');
            return;
        }

        const monthlyExpenses = expenses.filter(expense => expense.date.startsWith(month));
        updateMonthlyExpenseList(monthlyExpenses);
        updateMonthlyTotalAmount(monthlyExpenses);
    });

    const clearExpensesBtn = document.getElementById('clear-expenses-btn');
    clearExpensesBtn.addEventListener('click', () => {
        clearExpenses();
        updateExpenseList();
        updateTotalAmount();
    });

    const clearMonthlyExpensesBtn = document.getElementById('clear-monthly-expenses-btn');
    clearMonthlyExpensesBtn.addEventListener('click', () => {
        if (monthSelectInput.value) {
            clearMonthlyExpenses(monthSelectInput.value);
        } else {
            clearAllExpenses();
        }
    });

    function getExpenses() {
        const storedExpenses = localStorage.getItem('expenses');
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    }

    function saveExpenses(expenses) {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function clearExpenses() {
        localStorage.removeItem('expenses');
    }

    function updateExpenseList() {
        const today = expenseDateInput.value;
        const todayExpenses = expenses.filter(expense => expense.date === today);

        expenseList.innerHTML = '';
        todayExpenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${expense.time} - ${expense.name}</span><span>₹${expense.amount.toFixed(2)}</span>`;
            expenseList.appendChild(li);
        });
    }

    function updateTotalAmount() {
        const today = expenseDateInput.value;
        const todayExpenses = expenses.filter(expense => expense.date === today);

        const total = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = `₹${total.toFixed(2)}`;
    }

    function updateMonthlyExpenseList(monthlyExpenses) {
        monthlyExpenseList.innerHTML = '';
        monthlyExpenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${expense.date} - ${expense.time} - ${expense.name}</span><span>₹${expense.amount.toFixed(2)}</span>`;
            monthlyExpenseList.appendChild(li);
        });
    }

    function updateMonthlyTotalAmount(monthlyExpenses) {
        const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        monthlyTotalAmount.textContent = `₹${total.toFixed(2)}`;
    }

    function clearMonthlyExpenses(month) {
        expenses = expenses.filter(expense => !expense.date.startsWith(month));
        saveExpenses(expenses);
        updateMonthlyExpenseList([]);
        updateMonthlyTotalAmount([]);
    }

    function clearAllExpenses() {
        clearExpenses();
        updateExpenseList();
        updateTotalAmount();
        updateMonthlyExpenseList([]);
        updateMonthlyTotalAmount([]);
    }

    updateExpenseList();
    updateTotalAmount();
});
