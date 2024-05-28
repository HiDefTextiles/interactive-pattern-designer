// Grid Handling Functions

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
            cell.style.backgroundColor = getColorClass(0);
            cell.setAttribute('data-color-id', 0); // Initialize with color-0
            cell.addEventListener('click', () => colorCell(cell));
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }

    updateEncodedOutput();
}

function colorRow(rowIndex) {
    const rows = document.getElementsByClassName('row');
    const cells = rows[rowIndex].getElementsByClassName('cell');

    const newColorClass = getColorClass(selectedColor);
    const newColorId = selectedColor;
    for (let cell of cells) {
        cell.style.backgroundColor = newColorClass;
        cell.setAttribute('data-color-id', newColorId);
    }

    updateEncodedOutput();
}

function colorColumn(colIndex) {
    const rows = document.getElementsByClassName('row');
    const newColorClass = getColorClass(selectedColor);
    const newColorId = selectedColor;

    for (let row of rows) {
        const cells = row.getElementsByClassName('cell');
        cells[colIndex].style.backgroundColor = newColorClass;
        cells[colIndex].setAttribute('data-color-id', newColorId);
    }

    updateEncodedOutput();
}

function getColorValue(colorClass) {
    const colorPickers = document.querySelectorAll('input[type="color"]');
    for (let i = 0; i < colorPickers.length; i++) {
        if (colorPickers[i].value === colorClass) {
            return i;
        }
    }
    return 0;
}

function updateEncodedOutput() {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    let encodedOutput = '';

    for (let i = 0; i < rows.length; i++) { // Start at 0 since headers are not included in rows
        const row = rows[i];
        let currentColorId = row.children[1].getAttribute('data-color-id'); // Offset by 1 for header cell
        let count = 0;
        let encodedRow = [];

        for (let j = 1; j < row.children.length; j++) { // Start at 1 to skip header cell
            const cell = row.children[j];
            const colorId = cell.getAttribute('data-color-id');
            if (colorId === currentColorId) {
                count++;
            } else {
                encodedRow.push(`(${currentColorId},${count})`);
                currentColorId = colorId;
                count = 1;
            }
        }
        encodedRow.push(`(${currentColorId},${count})`);
        encodedOutput += encodedRow.join(' ') + '\n';
    }

    document.getElementById('encodedOutput').textContent = encodedOutput;
}

function clearGrid() {
    const rows = document.getElementsByClassName('row');
    for (let row of rows) {
        const cells = row.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.style.backgroundColor = getColorClass(0);
            cell.setAttribute('data-color-id', 0);
        }
    }

    updateEncodedOutput();
}

function initColorPickers() {
    const colorLabels = document.querySelectorAll('.color-label');
    colorLabels.forEach(label => {
        label.addEventListener('click', function() {
            selectedColor = parseInt(this.htmlFor.replace('color', ''));
            colorLabels.forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    const colorPickers = document.querySelectorAll('input[type="color"]');
    colorPickers.forEach(picker => {
        picker.addEventListener('input', updateGridColors);
    });

    // Explicitly select the initial color (Color 0)
    document.getElementById('label-color0').classList.add('selected');
}

window.onload = () => {
    createGrid();
    initColorPickers();
};
