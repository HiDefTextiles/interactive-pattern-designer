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

function clearGrid() {
    const rows = document.getElementsByClassName('row');
    for (let row of rows) {
        const cells = row.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.style.backgroundColor = getColorClass(0);
            cell.setAttribute('data-color-id', 0);
        }
    }
}

async function copyOutput() {
    const format = document.getElementById('output-format').value;
    let textToCopy = '';

    switch (format) {
        case 'rle':
            textToCopy = encodeGridAsRLE();
            await copyTextToClipboard(textToCopy);
            break;
        case 'json':
            textToCopy = encodeGridAsCompactJSON();
            await copyTextToClipboard(textToCopy);
            break;
        case 'matrix':
            textToCopy = encodeGridAsMatrix();
            await copyTextToClipboard(textToCopy);
            break;
        case 'png':
            await copyCanvasToClipboard();
            break;
        default:
            alert('Invalid format selected for copying.');
            return;
    }

    alert('Output copied to clipboard');
}

async function copyTextToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Error copying text: ', err);
    }
}

async function copyCanvasToClipboard() {
    const newCanvas = document.createElement('canvas');
    generateImage(newCanvas, 1); // Generate the image on a new canvas with zoom factor 1

    newCanvas.toBlob(async (blob) => {
        try {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            alert('PNG image copied to clipboard');
        } catch (err) {
            console.error('Error copying canvas image: ', err);
        }
    });
}


function renderOutput() {
    const format = document.getElementById('output-format').value;
    let encodedOutput = '';

    const canvas = document.getElementById('imageCanvas');
    const imageContainer = document.getElementById('imageContainer');
    const encodedOutputElement = document.getElementById('encodedOutput');

    switch (format) {
        case 'rle':
            encodedOutput = encodeGridAsRLE();
            canvas.style.display = 'none';
            imageContainer.style.display = 'none';
            encodedOutputElement.style.display = 'block';
            break;
        case 'json':
            encodedOutput = encodeGridAsCompactJSON();
            canvas.style.display = 'none';
            imageContainer.style.display = 'none';
            encodedOutputElement.style.display = 'block';
            break;
        case 'matrix':
            encodedOutput = encodeGridAsMatrix();
            canvas.style.display = 'none';
            imageContainer.style.display = 'none';
            encodedOutputElement.style.display = 'block';
            break;
        case 'png':
            const zoomFactor = parseInt(document.getElementById('zoomFactor').value);
            generateImage(canvas, zoomFactor);
            canvas.style.display = 'block';
            imageContainer.style.display = 'block';
            encodedOutputElement.style.display = 'none';
            break;
        default:
            encodedOutput = 'Unknown format';
            canvas.style.display = 'none';
            imageContainer.style.display = 'none';
            encodedOutputElement.style.display = 'block';
    }

    encodedOutputElement.textContent = encodedOutput;
}

function encodeGridAsRLE() {
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

    return encodedOutput;
}

function encodeGridAsCompactJSON() {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    const gridData = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowData = [];

        for (let j = 1; j < row.children.length; j++) {
            const cell = row.children[j];
            const colorId = cell.getAttribute('data-color-id');
            rowData.push(parseInt(colorId));
        }

        gridData.push(rowData);
    }

    return JSON.stringify(gridData);
}

function encodeGridAsMatrix() {
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    let matrixOutput = '';

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        let matrixRow = [];

        for (let j = 1; j < row.children.length; j++) {
            const cell = row.children[j];
            const colorId = cell.getAttribute('data-color-id');
            matrixRow.push(colorId);
        }

        matrixOutput += matrixRow.join(' ') + '\n';
    }

    return matrixOutput;
}

function generateImage(canvas, cellSize=1) {
    // Takes in the size of each pixel in the image
    const gridContainer = document.getElementById('grid');
    const rows = gridContainer.getElementsByClassName('row');
    const context = canvas.getContext('2d');

    canvas.width = (rows[0].children.length - 1) * cellSize;
    canvas.height = rows.length * cellSize;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (let j = 1; j < row.children.length; j++) { // Skip the header cell
            const cell = row.children[j];
            const colorId = cell.getAttribute('data-color-id');
            if (colorId === '0') {
                context.clearRect((j - 1) * cellSize, i * cellSize, cellSize, cellSize); // Clear cell
            } else {
                context.fillStyle = getColorClass(colorId);
                context.fillRect((j - 1) * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
}
