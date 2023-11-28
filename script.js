function calculateEmi() {
    const principalAmount = parseFloat(document.getElementById('principalAmount').value);
    const rateOfInterest = parseFloat(document.getElementById('rateOfInterest').value);
    const duration = parseInt(document.getElementById('duration').value);

    const monthlyRate = rateOfInterest / 12 / 100;
    const emi = (principalAmount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / (Math.pow(1 + monthlyRate, duration) - 1);

    const emiArray = [];
    for (let i = 1; i <= duration; i++) {
      emiArray.push({
        month: i,
        amount: emi.toFixed(2),
      });
    }

    const calculation = {
      principalAmount,
      rateOfInterest,
      duration,
      emiArray
    };

    const calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    calculationHistory.push(calculation);
    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));

    displayCalculationHistory();
  }

  function displayCalculationHistory() {
    const calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    const emiResults = document.getElementById('emiResults');
    emiResults.innerHTML = '';

    if (calculationHistory.length > 0) {
      const historyDiv = document.createElement('div');
      historyDiv.className = 'history';
      const h3 = document.createElement('h3');
      h3.textContent = 'Calculation History';
      const ul = document.createElement('ul');

      calculationHistory.forEach((calculation, index) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = `Search ${index + 1}`;
        button.onclick = () => displayEmiArray(calculation.emiArray);
        li.appendChild(button);
        ul.appendChild(li);
      });

      historyDiv.appendChild(h3);
      historyDiv.appendChild(ul);
      emiResults.appendChild(historyDiv);
    }
  }

  function displayEmiArray(emiArray) {
    const emiResults = document.getElementById('emiResults');
    emiResults.innerHTML = '';

    if (emiArray.length > 0) {
      const table = document.createElement('table');
      table.border = '2';

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const thMonth = document.createElement('th');
      thMonth.textContent = 'Month';
      const thEmi = document.createElement('th');
      thEmi.textContent = 'EMI';
      headerRow.appendChild(thMonth);
      headerRow.appendChild(thEmi);
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      emiArray.forEach(emi => {
        const row = document.createElement('tr');
        const tdMonth = document.createElement('td');
        tdMonth.textContent = emi.month;
        const tdEmi = document.createElement('td');
        tdEmi.textContent = emi.amount;
        row.appendChild(tdMonth);
        row.appendChild(tdEmi);
        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      emiResults.appendChild(table);
    }
  }

  // Display calculation history on page load
  displayCalculationHistory();