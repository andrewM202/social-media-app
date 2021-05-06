

let darkModeButton = document.querySelector(".dark-mode-button");

//let theThing = document.getElementById("#page");

/*----
//let currentTheme = localStorage.getItem("theme");
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
let headerBlackBar1 = document.querySelector("#blackBar1");
let headerBlackBar2 = document.querySelector("#blackBar2");
let footerContactInfo = document.querySelector("footer .contact-information");
let headerNavA1 = document.querySelector("#nav1");
let headerNavA2 = document.querySelector("#nav2");


const darkModeSwitch = function() {
    //document.body.classList.toggle("dark-mode");

    if (darkMode == false/*currentTheme == "light"*//*----) {*----/
/*----
        headerBlackBar1.style.backgroundColor = "#7FF8FF";
        headerBlackBar2.style.backgroundColor = "#7FF8FF";

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
        //wrapAccount.style.backgroundColor = "#005257";
        //footerPanel.style.backgroundColor = "#005257";


        //localStorage.setItem("theme", "dark");
        darkModeButton.innerHTML = "turn on light mode";
        darkMode = true;
    } else if (darkMode == true/*currentTheme == "dark"*//*----) {*----/
/*----
        headerBlackBar1.style.backgroundColor = "#1b2021";
        headerBlackBar2.style.backgroundColor = "#1b2021";

        main.style.backgroundColor = "#D0FEF6";

        headerNavA1.style.border = "1px solid black";
        headerNavA2.style.border = "1px solid black";
        headerNavA1.style.color = "black";
        headerNavA2.style.color = "black";

        h1.style.color = "black";
        h3.style.color = "black";

        header.style.backgroundColor = "#9ddfd3";
        h1.style.backgroundColor = "#9ddfd3";
        nav.style.backgroundColor = "#9ddfd3";
        image.style.border = "3px solid #9ddfd3";
        newsDiv1.style.border = "3px solid #9ddfd3";
        newsDiv2.style.border = "3px solid #9ddfd3";
        //wrapAccount.style.backgroundColor = "#9ddfd3";
        //footerPanel.style.backgroundColor = "#9ddfd3";

        //localStorage.setItem("theme", "light");
        darkModeButton.innerHTML = "turn on dark mode";
        darkMode = false;
    }
}
----*/

/*
let darkModeSwitch = function() {
    let page = document.getElementById("#page");

    document.page.classList.toggle("dark-mode");
}
*/

let currentTheme;

darkModeButton.addEventListener("click", function() {

    page.classList.toggle("dark-mode");

    if (page.classList.length == 2) {

        currentTheme = "light";
        console.log(currentTheme);

    } else if (page.classList.length == 3) {

        currentTheme = "dark";
        console.log(currentTheme);
        
    }

    /*
    // begin TEST code
    if (page.classList.contains("dark-mode")) { // dark mode has been selected
        document.page.setAttribute('data-theme', 'dark');
        localStorage.setItem('themeSwitch', 'dark'); // save theme selection 
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.removeItem('themeSwitch'); // reset theme selection 
      } 
    }
    // end TEST code
    */

});