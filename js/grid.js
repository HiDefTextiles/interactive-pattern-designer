function createGrid() {
    const gridContainer = document.getElementById('grid');
    const newRows = parseInt(document.getElementById('rows').value);
    const newCols = parseInt(document.getElementById('cols').value);

    const existingRows = gridContainer.getElementsByClassName('row').length;
    const zoomFactor = parseInt(document.getElementById('zoomFactor').value);

    // Adjust columns in the header row
    const headerRow = gridContainer.querySelector('.header-row');
    if (headerRow) {
        adjustHeaderRow(headerRow, newCols);
    } else {
        createHeaderRow(gridContainer, newCols);
    }

    // Adjust rows and columns
    adjustGridRows(gridContainer, newRows, newCols, existingRows);

    // Update pattern info
    document.getElementById('pattern-info').textContent = `Pattern: ${newRows} x ${newCols}`;
    document.getElementById('zoom-info').textContent = `Zoom: ${zoomFactor}`;

}


function adjustHeaderRow(headerRow, newCols) {
    const existingCols = headerRow.children.length - 1;
    if (newCols > existingCols) {
        for (let c = existingCols; c < newCols; c++) {
            const headerCell = document.createElement('div');
            headerCell.className = 'header-cell';
            headerCell.textContent = c + 1;
            headerCell.addEventListener('click', () => colorColumn(c));
            headerRow.appendChild(headerCell);
        }
    } else if (newCols < existingCols) {
        for (let c = existingCols; c > newCols; c--) {
            headerRow.removeChild(headerRow.lastChild);
        }
    }
}

function createHeaderRow(gridContainer, newCols) {
    const headerRow = document.createElement('div');
    headerRow.className = 'header-row';
    const emptyHeaderCell = document.createElement('div');
    emptyHeaderCell.className = 'header-cell';
    headerRow.appendChild(emptyHeaderCell);
    for (let c = 0; c < newCols; c++) {
        const headerCell = document.createElement('div');
        headerCell.className = 'header-cell';
        headerCell.textContent = c + 1;
        headerCell.addEventListener('click', () => colorColumn(c));
        headerRow.appendChild(headerCell);
    }
    gridContainer.appendChild(headerRow);
}

function adjustGridRows(gridContainer, newRows, newCols, existingRows) {
    for (let r = 0; r < newRows; r++) {
        if (r < existingRows) {
            adjustRow(gridContainer.getElementsByClassName('row')[r], newCols);
        } else {
            createRow(gridContainer, r, newCols);
        }
    }

    // Remove excess rows if new row count is less than existing row count
    if (newRows < existingRows) {
        for (let r = existingRows - 1; r >= newRows; r--) {
            gridContainer.removeChild(gridContainer.getElementsByClassName('row')[r]);
        }
    }
}

function adjustRow(row, newCols) {
    const existingCells = row.getElementsByClassName('cell').length;
    if (newCols > existingCells) {
        for (let c = existingCells; c < newCols; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell na';
            cell.style.backgroundColor = getColorClass(0);
            cell.setAttribute('data-color-id', 0);
            cell.addEventListener('click', () => colorCell(cell));
            row.appendChild(cell);
        }
    } else if (newCols < existingCells) {
        for (let c = existingCells; c > newCols; c--) {
            row.removeChild(row.lastChild);
        }
    }
}

function createRow(gridContainer, rowIndex, cols) {
    const row = document.createElement('div');
    row.className = 'row';
    const headerCell = document.createElement('div');
    headerCell.className = 'header-cell';
    headerCell.textContent = rowIndex + 1;
    headerCell.addEventListener('click', () => colorRow(rowIndex));
    row.appendChild(headerCell);
    for (let c = 0; c < cols; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell na';
        cell.style.backgroundColor = getColorClass(0);
        cell.setAttribute('data-color-id', 0);
        cell.addEventListener('click', () => colorCell(cell));
        cell.addEventListener('mouseover', () => updateHoverInfo(rowIndex + 1, c + 1, cell));
        cell.addEventListener('mouseout', () => updateHoverInfo(-1, -1, null));
        row.appendChild(cell);
    }
    gridContainer.appendChild(row);
}

