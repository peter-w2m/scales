// Define initial weights for both sides of the scale
let weightLeft = 0;
let weightRight = 0;

// Function to update the scale's angle based on weights
function updateScale(weightLeft, weightRight) {
    var angle = (weightRight - weightLeft) * 10; // Simplified calculation for angle
    document.getElementById('scale').style.transform = `rotate(${angle}deg)`;
}

// Event handlers for draggable elements
document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', handleDragStart, false);
});

// Event handlers for drop zones
document.querySelectorAll('.dropZone').forEach(zone => {
    zone.addEventListener('dragover', handleDragOver, false);
    zone.addEventListener('dragenter', handleDragEnter, false);
    zone.addEventListener('dragleave', handleDragLeave, false);
    zone.addEventListener('drop', handleDrop, false);
});

// Handle the start of dragging
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

// Allow the dragged item to be dropped by preventing the default handling
function handleDragOver(e) {
    e.preventDefault();
}

// Highlight the drop zone when an item is dragged over it
function handleDragEnter(e) {
    e.target.classList.add('over');
}

// Remove the highlight when the dragged item leaves the drop zone
function handleDragLeave(e) {
    e.target.classList.remove('over');
}

// Handle the drop of an item
function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    e.target.classList.remove('over');

    // Move the draggable element to the drop zone
    if (!e.target.classList.contains('dropZone')) {
        // Ensure that items are only dropped into drop zones, not nested inside other items
        return;
    }
    e.target.appendChild(draggableElement);

    // Adjust weights based on which pan the item was dropped
    if (e.target.id === 'leftPan') {
        weightLeft += 1; // Adjust weight increment based on your logic or item-specific weights
    } else if (e.target.id === 'rightPan') {
        weightRight += 1; // Adjust weight increment accordingly
    }
    updateScale(weightLeft, weightRight);
}

// Function to manually apply weights through input fields (if part of your design)
function applyWeights() {
    var weightLeftInput = parseInt(document.getElementById('weightLeft').value) || 0;
    var weightRightInput = parseInt(document.getElementById('weightRight').value) || 0;
    
    // Update global weights based on input
    weightLeft += weightLeftInput;
    weightRight += weightRightInput;

    updateScale(weightLeft, weightRight);
}
