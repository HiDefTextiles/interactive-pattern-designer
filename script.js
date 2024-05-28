function createGrid() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < cols; j++) {
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
    const rows = gridContainer.children;
    let encodedOutput = '';

    for (let row of rows) {
        let currentColor = row.children[0].className.split(' ')[1];
        let count = 0;
        let encodedRow = [];

        for (let cell of row.children) {
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
    const rows = gridContainer.children;
    for (let row of rows) {
        for (let cell of row.children) {
            cell.className = 'cell na';
        }
    }
    updateEncodedOutput();
}

window.onload = createGrid;
