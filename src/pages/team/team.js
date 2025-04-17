/*window.addEventListener("load", teamScramble, true);
function teamScramble() {
    // Get team element and team members contained within it:
    var team = document.getElementById("dogscbr-team");
    if (!!team) {
        var teamMembers = Array.prototype.slice.call(team.getElementsByClassName("staff-container"));
            // Remove the team member elements from the team element
        teamMembers.forEach(function(member){
            team.removeChild(member)
        })
        // Randomly shuffle the team members
        for (var i = teamMembers.length -1; i>0 ; i --) {
            var j = Math.floor(Math.random() * (i+1)); // Maps 0-1 to 0-len
            var temp = teamMembers[i];
            var newDiv = teamMembers[j];
            
            teamMembers[i] = newDiv; // Puts the final element as the randomly selected element
            teamMembers[j] = temp; // Replaces the chosen element with the one it replaced
        }

        var idx = 1; // idx=0 start puts images on outside, idx=1 puts the images on inside
        // Replace the team member elements back within the team element
        teamMembers.forEach(function(member) {
            // Stagger the internal ordering iteratively
            member.firstElementChild.setAttribute("style",`order:${2*(idx%2 + 1)}`);
            team.appendChild(member);
            idx +=1;
        })
    }
}*/