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
    // Assume each item has a weight of 1 for simplicity
    const weight = 1;
    
    if (action === 'add') {
        if (panId === 'leftPan') {
            weightLeft += weight;
        } else if (panId === 'rightPan') {
            weightRight += weight;
        }
    } else if (action === 'remove') {
        if (element.parentNode.id === 'leftPan') {
            weightLeft -= weight;
        } else if (element.parentNode.id === 'rightPan') {
            weightRight -= weight;
        }
    }
    
    updateScale(weightLeft, weightRight);
}

function resetElementPosition(e) {
    const originalContainer = document.getElementById('elementsContainer');
    // Determine the parent before moving the element
    const wasInLeftPan = e.target.parentNode.id === 'leftPan';
    const wasInRightPan = e.target.parentNode.id === 'rightPan';

    originalContainer.appendChild(e.target); // Move the element back to its original container

    updateWeight(draggableElement, 'add', e.target.id);
    
    // Only update weight if the element was in one of the pans
   // if (wasInLeftPan || wasInRightPan) {
    //    updateWeight(e.target, 'remove', wasInLeftPan ? 'leftPan' : 'rightPan');
    // }
}

