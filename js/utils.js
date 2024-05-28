// Utility Functions

function clearElementContent(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
}

function addEventListenerToElement(element, event, handler) {
    element.addEventListener(event, handler);
}
