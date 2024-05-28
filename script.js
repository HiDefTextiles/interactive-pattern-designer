function createGrid() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);

    // Create header row for columns
    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';
    const emptyHeaderCell = document.createElement('div');
    emptyHeaderCell.className = 'header-cell';
    headerRow.appendChild(emptyHeaderCell);
    for (let c = 0; c < cols; c++) {
        const headerCell = document.createElement('div');
        headerCell.className = 'header-cell';
        headerCell.textContent = c + 1;
        headerCell.addEventListener('click', () => colorColumn(c));
        headerRow.appendChild(headerCell);
    }
    gridContainer.appendChild(headerRow);

    // Create rows
    for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.className = 'row';
        const headerCell = document.createElement('div');
        headerCell.className = 'header-cell';
        headerCell.textContent = r + 1;
        headerCell.addEventListener('click', () => colorRow(r));
        row.appendChild(headerCell);
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell na';
            cell.addEventListener('click', () => colorCell(cell));
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }

    updateEncodedOutput();
}

function colorCell(cell) {
    const colorValue = document.getElementById('color').value;
    cell.className = 'cell ' + getColorClass(colorValue);
    updateEncodedOutput();
}

function colorRow(rowIndex) {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    const colorValue = document.getElementById('color').value;
    const cells = rows[rowIndex].getElementsByClassName('cell'); // No offset needed now
    for (let cell of cells) {
        cell.className = 'cell ' + getColorClass(colorValue);
    }
    updateEncodedOutput();
}

function colorColumn(colIndex) {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    const colorValue = document.getElementById('color').value;
    for (let i = 0; i < rows.length; i++) { // No offset needed now
        const cells = rows[i].getElementsByClassName('cell');
        cells[colIndex].className = 'cell ' + getColorClass(colorValue);
    }
    updateEncodedOutput();
}

function getColorClass(colorValue) {
    switch (colorValue) {
        case '1': return 'red';
        case '2': return 'green';
        case '3': return 'blue';
        case '4': return 'yellow';
        default: return 'na';
    }
}

function updateEncodedOutput() {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    let encodedOutput = '';

    for (let i = 0; i < rows.length; i++) { // Start at 0 since headers are not included in rows
        const row = rows[i];
        let currentColor = row.children[1].className.split(' ')[1]; // Offset by 1 for header cell
        let count = 0;
        let encodedRow = [];

        for (let j = 1; j < row.children.length; j++) { // Start at 1 to skip header cell
            const cell = row.children[j];
            const color = cell.className.split(' ')[1];
            if (color === currentColor) {
                count++;
            } else {
                encodedRow.push(`(${getColorValue(currentColor)},${count})`);
                currentColor = color;
                count = 1;
            }
        }
        encodedRow.push(`(${getColorValue(currentColor)},${count})`);
        encodedOutput += encodedRow.join(' ') + '\n';
    }

    document.getElementById('encodedOutput').textContent = encodedOutput;
}

function getColorValue(colorClass) {
    switch (colorClass) {
        case 'red': return 1;
        case 'green': return 2;
        case 'blue': return 3;
        case 'yellow': return 4;
        default: return 0;
    }
}

function clearGrid() {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    for (let i = 0; i < rows.length; i++) { // Start at 0 since headers are not included in rows
        const cells = rows[i].getElementsByClassName('cell');
        for (let cell of cells) {
            cell.className = 'cell na';
        }
    }
    updateEncodedOutput();
}

window.onload = createGrid;
