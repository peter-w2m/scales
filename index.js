// Define initial weights for both sides of the scale
let weightLeft = 0;
let weightRight = 0;

// Function to update the scale's angle based on weights
function updateScale(weightLeft, weightRight) {
    var angle = (weightRight - weightLeft) * 3; // Simplified calculation for angle
    document.getElementById('scale').style.transform = `rotate(${angle}deg)`;
}

// Enhanced drag and drop functionality
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('click', resetElementPosition, false); // Add click event listener
});

// Event handlers for drop zones
document.querySelectorAll('.dropZone').forEach(zone => {
    zone.addEventListener('dragover', handleDragOver, false);
    zone.addEventListener('dragenter', handleDragEnter, false);
    zone.addEventListener('dragleave', handleDragLeave, false);
    zone.addEventListener('drop', handleDrop, false);
});

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
}

function handleDragEnter(e) {
    e.target.classList.add('over');
}

function handleDragLeave(e) {
    e.target.classList.remove('over');
}

function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    e.target.classList.remove('over');

    // Move the draggable element to the drop zone
    e.target.appendChild(draggableElement);

    // Update weights based on the drop zone
    updateWeight(draggableElement, 'add', e.target.id);
}

function updateWeight(element, action, panId) {
    const weight = 1; // Assume each item has a weight of 1 for simplicity
    
    if (action === 'add') {
        if (panId === 'leftPan') {
            weightLeft += weight;
        } else if (panId === 'rightPan') {
            weightRight += weight;
        }
    } else if (action === 'remove') {
        // Adjust this logic to ensure it's accurate based on where the element was before being moved
        if (panId === 'leftPan') {
            weightLeft -= weight;
        } else if (panId === 'rightPan') {
            weightRight -= weight;
        }
    }
    
    // Ensure updateScale is called after adjusting weights
    updateScale(weightLeft, weightRight);
}


/*
function resetElementPosition(e) {
    const originalContainer = document.getElementById('elementsContainer');
    const wasInLeftPan = e.target.parentNode.id === 'leftPan';
    const wasInRightPan = e.target.parentNode.id === 'rightPan';

    // Check if the element was in one of the pans before resetting its position
    // if (wasInLeftPan || wasInRightPan) {
        // Move the element back to its original container
        originalContainer.appendChild(e.target);

        // Update the weight accordingly
        updateWeight(e.target, 'remove', wasInLeftPan ? 'leftPan' : 'rightPan');
   // }
}
*///

function resetElementPosition(e) {
    const originalContainer = document.getElementById('elementsContainer');
    // You don't need to check if it was in a pan since the action is 'remove'
    // and updateWeight checks the panId to adjust weights correctly
    const panId = e.target.parentNode.id; // Capture the panId before moving the element

    // Move the element back to its original container
    originalContainer.appendChild(e.target);

    // Update the weight accordingly, using the captured panId
    updateWeight(e.target, 'remove', panId);
}


