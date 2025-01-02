// Constants
const tagWheelItems = document.querySelectorAll('.tag-wheel-item');
const tagWheel = document.querySelector('.tag-wheel-items');
const caseWheelItems = document.querySelectorAll('.case-wheel-item');
let visibleCaseItems = Array.from(caseWheelItems).filter(div => {return window.getComputedStyle(div).display !== 'none';}).length;
const caseWheel = document.querySelector('.case-wheel-items');
let currentTagIndex = 0;  // Start with the first item selected 
let currentCaseIndex = 2;  // Start with the middle item selected (index 2 in a 5-item view)

let tagScrollInterval = null;  // To store the interval for auto-scrolling
let caseScrollInterval = null;  // To store the interval for auto-scrolling

document.documentElement.style.setProperty('--case-studies-pixel-width', String(document.querySelector('.case-wheel-items').getBoundingClientRect().width)+'px')


function updateTagSelection() {
    tagWheelItems.forEach(item => item.classList.remove('selected')); 
    tagWheelItems[currentTagIndex].classList.add('selected');
    visibleCaseItems = Array.from(caseWheelItems).filter(div => {return window.getComputedStyle(div).display !== 'none';}).length;
}
function updateCaseWheel() {
    visibleCaseItems = Array.from(caseWheelItems).filter(div => {return window.getComputedStyle(div).display !== 'none';}).length;
    if (currentCaseIndex <= -Math.floor(visibleCaseItems/2)) currentCaseIndex = -Math.floor(visibleCaseItems/2)+1-visibleCaseItems%2;
    if (currentCaseIndex >= Math.floor(visibleCaseItems/2)) currentCaseIndex = Math.floor(visibleCaseItems/2);
    scrollCaseWheel(0)
}


function scrollTagWheel(delta) {
    currentTagIndex += delta;
    // Keep the index within bounds
    if (currentTagIndex < 0) currentTagIndex = 0;
    if (currentTagIndex >= tagWheelItems.length) currentTagIndex = tagWheelItems.length - 1;

    // Apply the transition (scroll the wheel up or down)
    tagWheel.style.transform = `translateY(-${Math.min(Math.max(currentTagIndex - 2,0),tagWheelItems.length-3) * 100}px)`;  // Adjust by -2 to center the selected item

    // Update the selected item
    updateTagSelection();
}

function scrollCaseWheel(delta) {
    currentCaseIndex += delta;
    if (currentCaseIndex <= -Math.floor(visibleCaseItems/2)) currentCaseIndex = -Math.floor(visibleCaseItems/2)+1-visibleCaseItems%2;
    if (currentCaseIndex >= Math.floor(visibleCaseItems/2)) currentCaseIndex = Math.floor(visibleCaseItems/2);

    caseWheel.style.transform = `translateX(${(Math.min(Math.max(-currentCaseIndex,-Math.floor(visibleCaseItems/2)),Math.floor(visibleCaseItems/2))+(1-visibleCaseItems%2)/2) * 350}px)`;
    updateTagSelection();
}

function startScrollTagWheel(delta, interval) {
    clearInterval(tagScrollInterval);
    tagScrollInterval = setInterval(() => {
        // Change the scroll direction based on the mouse position (or keep it simple by always scrolling down)
        scrollTagWheel(delta);  // Scroll down by 1 item every 100ms
        console.log("Hover scroll triggered...")
    }, interval);  // Scroll every 100ms
    updateTagSelection();
}

function stopScrollTagWheel() {
    clearInterval(tagScrollInterval)
}
function startScrollCaseWheel(delta, interval) {
    updateTagSelection();
    clearInterval(caseScrollInterval);
    caseScrollInterval = setInterval(() => {
        // Change the scroll direction based on the mouse position (or keep it simple by always scrolling down)
        scrollCaseWheel(delta);  // Scroll down by 1 item every 100ms
        console.log("Hover case scroll triggered...")
    }, interval);  // Scroll every 100ms
    updateTagSelection();
}

function stopScrollCaseWheel() {
    clearInterval(caseScrollInterval);
    updateTagSelection();
}

// Initial selection
updateTagSelection();
updateCaseWheel();

const selectedName = null;
function selectNewTag(tag) {
    tagWheelItems.forEach(item => item.classList.remove('selected'));
    tag.classList.add('selected');
    const newTagIndex = [...tagWheelItems].findIndex(item => item.classList.contains('selected'));
    scrollTagWheel(newTagIndex-currentTagIndex);
    currentTagIndex = newTagIndex;   
    updateCaseWheel(); 
}
// On Click, select a given tag.
tagWheelItems.forEach(item => item.addEventListener('click', () => {selectNewTag(item)}))
// Start auto-scrolling when mouse hovers over the wheel
const tagWheelContainer = document.querySelector('.tag-wheel-container')
tagWheelContainer.addEventListener('mousemove', (event) => {
    const wheelRect = tagWheelContainer.getBoundingClientRect();
    const mouseY = event.clientY - wheelRect.top;

    const tagWheelHeight = tagWheelContainer.clientHeight;
    const upThreshold = tagWheelHeight*0.3;
    const downThreshold = tagWheelHeight - upThreshold;

    // Set up an interval to auto-scroll
    if (mouseY < upThreshold) {
        startScrollTagWheel(-1, 2.5*(800-10)*mouseY/tagWheelHeight+10);
    }
    else if (mouseY > downThreshold) {
        startScrollTagWheel(1, 2.5*(800-10)*(tagWheelHeight-mouseY)/tagWheelHeight+10);
    }
    else {
        stopScrollTagWheel();
        updateTagSelection();
        updateCaseWheel();
    }
    
});

// Stop auto-scrolling when the mouse leaves the wheel
tagWheelContainer.addEventListener('mouseleave', () => {
    // Clear the interval to stop auto-scrolling
    if (tagScrollInterval) {
        clearInterval(tagScrollInterval);
    }
    updateTagSelection();
});

// Case Study Wheel
const caseWheelContainer = document.querySelector('.case-wheel-container')
caseWheelContainer.addEventListener('mousemove', (event) => {
    const wheelRect = caseWheelContainer.getBoundingClientRect();
    const mouseX = event.clientX - wheelRect.left;

    const caseWheelWidth = caseWheelContainer.clientWidth;
    const leftThreshold   = caseWheelWidth*0.3;
    const rightThreshold  = caseWheelWidth - leftThreshold;

    // Set up an interval to auto-scroll
    if (mouseX < leftThreshold) {
        startScrollCaseWheel(-1, 2.5*(800-10)*mouseX/caseWheelWidth+10);
        console.log("Scrolling Left");
    }
    else if (mouseX > rightThreshold) {
        startScrollCaseWheel(1, 2.5*(800-10)*(caseWheelWidth-mouseX)/caseWheelWidth+10);
        console.log("Scrolling Right")
    }
    else {
        stopScrollCaseWheel();
    }
    
});

// Stop auto-scrolling when the mouse leaves the wheel
caseWheelContainer.addEventListener('mouseleave', () => {
    // Clear the interval to stop auto-scrolling
    if (caseScrollInterval) {
        clearInterval(caseScrollInterval);
    }
});