let selectedColor = 0;

function getColorClass(colorValue) {
    const colorPicker = document.getElementById(`color${colorValue}`);
    return colorPicker ? colorPicker.value : '#ffffff';
}

function colorCell(cell) {
    const currentColorId = parseInt(cell.getAttribute('data-color-id'));
    const newColorId = selectedColor;

    if (currentColorId === newColorId) {
        cell.setAttribute('data-color-id', 0); // Revert to color-0
        cell.style.backgroundColor = getColorClass(0);
    } else {
        cell.setAttribute('data-color-id', newColorId);
        cell.style.backgroundColor = getColorClass(newColorId);
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

function updateGridColors(event) {
    const colorPickerId = event.target.id;
    const colorValue = parseInt(colorPickerId.replace('color', ''));
    const newColorClass = event.target.value;

    const rows = document.getElementsByClassName('row');
    for (let row of rows) {
        const cells = row.getElementsByClassName('cell');
        for (let cell of cells) {
            const cellColorId = parseInt(cell.getAttribute('data-color-id'));
            if (cellColorId === colorValue) {
                cell.style.backgroundColor = newColorClass;
            }
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
