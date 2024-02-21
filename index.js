function updateScale(weightLeft, weightRight) {
    var angle = (weightRight - weightLeft) * 10; // Simplified calculation
    document.getElementById('scale').style.transform = `rotate(${angle}deg)`;
}

// Example usage:
updateScale(10, 5); // Update this based on actual weights


function applyWeights() {
    var weightLeft = parseInt(document.getElementById('weightLeft').value) || 0;
    var weightRight = parseInt(document.getElementById('weightRight').value) || 0;
    
    updateScale(weightLeft, weightRight);
}


let weightLeft = 0;
let weightRight = 0;

// Function to update scale (defined in previous steps)

document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', handleDragStart, false);
});

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

    // Update weights and balance scale
    // For this example, let's assume each item has a weight of 1
    // You might want to assign and manage individual weights for a realistic effect
    if (e.target.id === 'leftPan') {
        weightLeft += 1;
    } else if (e.target.id === 'rightPan') {
        weightRight += 1;
    }
    updateScale(weightLeft, weightRight);
}
