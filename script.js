function calculateExpenditure() {
    // Get the values from the form inputs
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const groceries = parseFloat(document.getElementById('groceries').value) || 0;
    const transportation = parseFloat(document.getElementById('transportation').value) || 0;
    const other = parseFloat(document.getElementById('other').value) || 0;

    // Calculate the total expenditure
    const total = rent + utilities + groceries + transportation + other;

    // Display the total expenditure
    document.getElementById('total').textContent = total.toFixed(2);
}
