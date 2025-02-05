window.addEventListener("load", galleryScramble, true);
function galleryScramble() {
    // Get gallery element and frames contained within it:
var gallery = document.getElementById("photo-gallery");
if (!!gallery) {
var photoFrames = Array.prototype.slice.call(gallery.getElementsByClassName("photo-frame"));
    // Remove the frame elements from the gallery element
photoFrames.forEach(function(frame){
    gallery.removeChild(frame)
})
    // Randomly shuffle the team members
for (var i = photoFrames.length -1; i>0 ; i --) {
    var j = Math.floor(Math.random() * (i+1)); // Maps 0-1 to 0-len
    var temp = photoFrames[i];
    photoFrames[i] = photoFrames[j]; // Puts the final element as the randomly selected element
    photoFrames[j] = temp; // Replaces the chosen element with the one it replaced
}
    // Replace the team member elements back within the team element
photoFrames.forEach(function(frame) {
    gallery.appendChild(frame);
})}
};

