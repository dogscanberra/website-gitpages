window.onload = (function() {
    // Get team element and team members contained within it:
var team = document.getElementById("dogscbr-team");
var teamMembers = Array.prototype.slice.call(team.getElementsByClassName("staff-blurb"));
    // Remove the team member elements from the team element
teamMembers.forEach(function(member){
    team.removeChild(member)
})
    // Randomly shuffle the team members
for (var i = teamMembers.length -1; i>0 ; i --) {
    var j = Math.floor(Math.random() * (i+1)); // Maps 0-1 to 0-len
    var temp = teamMembers[i];
    teamMembers[i] = teamMembers[j]; // Puts the final element as the randomly selected element
    teamMembers[j] = temp; // Replaces the chosen element with the one it replaced
}
    // Replace the team member elements back within the team element
teamMembers.forEach(function(member) {
    team.appendChild(member);
})
});

