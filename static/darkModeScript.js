let darkModeButton = document.querySelector(".dark-mode-button");

const darkModeOn = function() {
    darkModeButton.style.color = "red";
    console.log("do the thing");
}

darkModeButton.addEventListener("click", darkModeOn);