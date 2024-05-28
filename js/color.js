// Color Handling Functions

function getColorClass(colorValue) {
    switch (colorValue) {
        case '1':
            return 'red';
        case '2':
            return 'green';
        case '3':
            return 'blue';
        case '4':
            return 'yellow';
        default:
            return 'na';
    }
}

function getColorValue(colorClass) {
    switch (colorClass) {
        case 'red':
            return 1;
        case 'green':
            return 2;
        case 'blue':
            return 3;
        case 'yellow':
            return 4;
        default:
            return 0;
    }
}

function colorCell(cell) {
    const colorValue = document.getElementById('color').value;
    const newColorClass = getColorClass(colorValue);
    const currentColorClass = cell.className.split(' ')[1];

    cell.className = currentColorClass === newColorClass ? 'cell na' : `cell ${newColorClass}`;
    updateEncodedOutput();
}

function colorRow(rowIndex) {
    const colorValue = document.getElementById('color').value;
    const rows = document.getElementsByClassName('row');
    const cells = rows[rowIndex].getElementsByClassName('cell');

    for (let cell of cells) {
        cell.className = `cell ${getColorClass(colorValue)}`;
    }

    updateEncodedOutput();
}

function colorColumn(colIndex) {
    const colorValue = document.getElementById('color').value;
    const rows = document.getElementsByClassName('row');

    for (let row of rows) {
        const cells = row.getElementsByClassName('cell');
        cells[colIndex].className = `cell ${getColorClass(colorValue)}`;
    }

    updateEncodedOutput();
}
