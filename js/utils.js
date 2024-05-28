// Utility functions for the web app


function updateEncodedOutput() {
    // Encode the grid data into a string using run-length encoding, first the color id then the
    // count of consecutive cells with that color id. Each row is separated by a newline character.

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
