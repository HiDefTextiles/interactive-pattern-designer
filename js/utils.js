// Utility functions for the web app

function updateHoverInfo(row, col, cell) {
    const hoverInfo = document.getElementById('hover-info');
    if (row === -1 || col === -1) {
        hoverInfo.textContent = '(Row, Col): Color';
    } else {
        const colorId = cell.getAttribute('data-color-id');
        const colorName = getColorName(colorId);
        hoverInfo.textContent = `(${row}, ${col}) - ${colorName}`;
    }
}

function getColorName(colorId) {
    const colorPicker = document.getElementById(`color${colorId}`);
    if (colorPicker) {
        return colorPicker.labels[0].textContent;
    }
    return 'None';
}

function updateEncodedOutput() {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    let encodedOutput = '';

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        let currentColorId = row.children[1].getAttribute('data-color-id');
        let count = 0;
        let encodedRow = [];

        for (let j = 1; j < row.children.length; j++) {
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
