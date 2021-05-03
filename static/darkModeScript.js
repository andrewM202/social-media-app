

let darkModeButton = document.querySelector(".dark-mode-button");

let darkMode = false;

// the pale blue things
let main = document.querySelector("main");

// the blue things
let header = document.querySelector("header");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let nav = document.querySelector("header nav");
let image = document.querySelector("main .wrapper .image");
let newsDiv1 = document.querySelector("#newsDiv1");
let newsDiv2 = document.querySelector("#newsDiv2");
let wrapAccount = document.querySelector(".wrap.account"); // border-left + border-right
    // Change background color?
let footerPanel = document.querySelector("footer .light-blue-panel");

// the black/grey things
let headerBlackBar = document.querySelector("header .black-bar");
let footerContactInfo = document.querySelector("footer .contact-information");
let headerNavA1 = document.querySelector("#nav1");
let headerNavA2 = document.querySelector("#nav2");


const darkModeSwitch = function() {
    if (darkMode == false) {
        darkModeButton.innerHTML = "turn on light mode";
    
        headerNavA1.style.border = "1px solid #7FF8FF";
        headerNavA2.style.border = "1px solid #7FF8FF";

        headerNavA1.style.color = "#7FF8FF";
        headerNavA2.style.color = "#7FF8FF";

        main.style.backgroundColor = "#003538";

        h1.style.color = "#7FF8FF";
        h3.style.color = "#7FF8FF";

        header.style.backgroundColor = "#005257";
        h1.style.backgroundColor = "#005257";
        nav.style.backgroundColor = "#005257";
        image.style.border = "3px solid #005257";
        newsDiv1.style.border = "3px solid #005257";
        newsDiv2.style.border = "3px solid #005257";
        wrapAccount.style.backgroundColor = "#005257";
        footerPanel.style.backgroundColor = "#005257";
        

        darkMode = true;
        sessionStorage.setItem("darkMode", "true");
    } else {
        darkModeButton.innerHTML = "turn on dark mode"

        main.style.backgroundColor = "#D0FEF6";

        darkMode = false;
    }
}


darkModeButton.addEventListener("click", darkModeSwitch);