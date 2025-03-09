let table = document.getElementById('table');

function deleteRow(row, amount, type) {
  // Remove row from the DOM
  row.remove();

  // Retrieve current totals from localStorage
  let totalIncome = parseInt(localStorage.getItem('totalIncome')) || 0;
  let totalExpense = parseInt(localStorage.getItem('totalExpense')) || 0;
  let balance = parseInt(localStorage.getItem('balance')) || 0;

  // Update totals based on the transaction type
  if (type === 'Income') {
    totalIncome -= parseInt(amount);
    balance -= parseInt(amount);
  } else if (type === 'Expence') {
    totalExpense -= parseInt(amount);
    balance += parseInt(amount);
  }

  // Save updated totals to localStorage
  localStorage.setItem('totalIncome', totalIncome);
  localStorage.setItem('totalExpense', totalExpense);
  localStorage.setItem('balance', balance);

  // Update displayed values in the UI
  document.getElementById('totalIncome').innerText = totalIncome;
  document.getElementById('totaelExpens').innerText = totalExpense;
  document.getElementById('balance').innerText = balance;

  // Save the updated table data to localStorage
  saveTableToLocalStorage();
}

function addRow() {
  let date = document.getElementsByClassName('Date-input')[0].value;
  let amount = document.getElementsByClassName('Amount-input')[0].value;
  let type = document.getElementsByClassName('Transaction-type')[0].value;

  if (!date || !amount || type === "Transaction Type") {
    alert("Please fill in all fields before adding a new row.");
    return;
  }

  let row = document.createElement("tr");

  let amountCell = document.createElement("td");
  amountCell.innerText = amount;

  let transactionCell = document.createElement("td");
  transactionCell.innerText = type;

  let dateCell = document.createElement("td");
  dateCell.innerText = date;

  let deleteCell = document.createElement("td");
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<img src="bin.jpg" style="width: 25px; height: 25px;">';
  deleteButton.classList.add('delete-button');
  deleteButton.onclick = () => deleteRow(row, amount, type);

  deleteCell.appendChild(deleteButton);

  row.appendChild(amountCell);
  row.appendChild(transactionCell);
  row.appendChild(dateCell);
  row.appendChild(deleteCell);

  table.appendChild(row);

  // Retrieve and update totals
  let totalIncome = parseInt(localStorage.getItem('totalIncome')) || 0;
  let totalExpense = parseInt(localStorage.getItem('totalExpense')) || 0;
  let balance = parseInt(localStorage.getItem('balance')) || 0;

  if (type === 'Income') {
    totalIncome += parseInt(amount);
    balance += parseInt(amount);
  } else if (type === 'Expence') {
    totalExpense += parseInt(amount);
    balance -= parseInt(amount);
  }

  // Save updated totals to localStorage
  localStorage.setItem('totalIncome', totalIncome);
  localStorage.setItem('totalExpense', totalExpense);
  localStorage.setItem('balance', balance);

  // Update displayed totals
  document.getElementById('totalIncome').innerText = totalIncome;
  document.getElementById('totaelExpens').innerText = totalExpense;
  document.getElementById('balance').innerText = balance;

  // Save table data to localStorage
  saveTableToLocalStorage();

  // Clear input fields
  document.getElementsByClassName('Date-input')[0].value = '';
  document.getElementsByClassName('Amount-input')[0].value = '';
  document.getElementsByClassName('Transaction-type')[0].value = 'Transaction Type';
}

function saveTableToLocalStorage() {
  let rows = Array.from(document.querySelectorAll('#table tr')).slice(1); // Exclude header row
  let tableData = rows.map(row => {
    let cells = row.querySelectorAll('td');
    return {
      amount: cells[0].innerText,
      type: cells[1].innerText,
      date: cells[2].innerText
    };
  });
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

function loadTableFromLocalStorage() {
  let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
  tableData.forEach(data => {
    let row = document.createElement("tr");

    let amountCell = document.createElement("td");
    amountCell.innerText = data.amount;

    let transactionCell = document.createElement("td");
    transactionCell.innerText = data.type;

    let dateCell = document.createElement("td");
    dateCell.innerText = data.date;

    let deleteCell = document.createElement("td");
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<img src="bin.jpg" style="width: 25px; height: 25px;">';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = () => deleteRow(row, data.amount, data.type);

    deleteCell.appendChild(deleteButton);

    row.appendChild(amountCell);
    row.appendChild(transactionCell);
    row.appendChild(dateCell);
    row.appendChild(deleteCell);

    table.appendChild(row);
  });

  // Load totals
  document.getElementById('totalIncome').innerText = localStorage.getItem('totalIncome') || '0';
  document.getElementById('totaelExpens').innerText = localStorage.getItem('totalExpense') || '0';
  document.getElementById('balance').innerText = localStorage.getItem('balance') || '0';
}

// Initialize the table and totals on page load
loadTableFromLocalStorage();
