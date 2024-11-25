
// Show modal 5 seconds after page load
window.onload = function() {
    setTimeout(function() {
        if (!modalDisplayed) {  // Check if the modal has already been displayed
            document.getElementById("webinarModal").style.display = "flex";
            modalDisplayed = true; // Set flag to true to prevent multiple displays
        }
    }, 5000); // 5000 milliseconds = 5 seconds
};

// Close the modal when the user clicks the "X" button
document.querySelector(".close").onclick = function() {
    document.getElementById("webinarModal").style.display = "none";
};

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("webinarModal")) {
        document.getElementById("webinarModal").style.display = "none";
    }
};

// Set the time limit (5 minutes)
const timeLimit = 5 * 60 * 1000; // 5 minutes in milliseconds

// Start the countdown as soon as the user visits the site
const startCountdown = new Date().getTime();

// Update the countdown every 1 second
const countdownInterval = setInterval(function() {

    // Get the current time
    const now = new Date().getTime();

    // Calculate the time remaining from the 5-minute limit
    const timeRemaining = timeLimit - (now - startCountdown);

    // Time calculations for minutes and seconds
    const minutes = Math.floor(timeRemaining / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the result in the elements with corresponding IDs

    document.getElementById("days").innerText = '0 :';
    document.getElementById("hours").innerText = '0 :';
    document.getElementById("minutes").innerText = minutes +' :';
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds + ' :';

    // If the countdown is finished, reset it back to 5 minutes
    if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        // Optional: Do something else like showing "Offer Expired" message, then restart
        document.getElementById("countdown").innerHTML = "OFFER EXPIRED";
    }

}, 1000);

