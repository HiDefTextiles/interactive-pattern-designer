// Grid Creation and Management

function createHeaderRow(cols) {
    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';

    const emptyHeaderCell = document.createElement('div');
    emptyHeaderCell.className = 'header-cell';
    headerRow.appendChild(emptyHeaderCell);

    for (let c = 0; c < cols; c++) {
        const headerCell = document.createElement('div');
        headerCell.className = 'header-cell';
        headerCell.textContent = c + 1;
        addEventListenerToElement(headerCell, 'click', () => colorColumn(c));
        headerRow.appendChild(headerCell);
    }

    return headerRow;
}

function createRow(r, cols) {
    const row = document.createElement('div');
    row.className = 'row';

    const headerCell = document.createElement('div');
    headerCell.className = 'header-cell';
    headerCell.textContent = r + 1;
    addEventListenerToElement(headerCell, 'click', () => colorRow(r));
    row.appendChild(headerCell);

    for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell na';
        addEventListenerToElement(cell, 'click', () => colorCell(cell));
        row.appendChild(cell);
    }

    return row;
}

function createGrid() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);

    clearElementContent('grid');

    const gridContainer = document.getElementById('grid');
    gridContainer.appendChild(createHeaderRow(cols));

    for (let r = 0; r < rows; r++) {
        gridContainer.appendChild(createRow(r, cols));
    }

    updateEncodedOutput();
}

function updateEncodedOutput() {
    const rows = document.getElementsByClassName('row');
    let encodedOutput = '';

    for (let row of rows) {
        const cells = Array.from(row.getElementsByClassName('cell'));
        let currentColor = cells[0].className.split(' ')[1];
        let count = 0;
        let encodedRow = [];

        for (let cell of cells) {
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

function clearGrid() {
    const rows = document.getElementsByClassName('row');
    for (let row of rows) {
        const cells = row.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.className = 'cell na';
        }
    }

    updateEncodedOutput();
}
