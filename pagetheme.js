const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const line = document.querySelector('.navbar');

const modes = {
    light: {
        background: "white",
        color: "black",
        borderColor: "black",
        className: "light",
        icon: "bi-brightness-high-fill",
        remove: "dark"
    },
    dark: {
        background: "#192841",
        color: "white",
        borderColor: "white",
        className: "dark",
        icon: "bi-moon",
        remove: "light"
    }
}


setupInitialTheme();

function change(currentMode, withTransition = true) {
    const mode = modes[currentMode];
    const keyboard = document.getElementById("keyboard");
    

    keyboard.classList.add(mode.className);
    keyboard.classList.remove(mode.remove);
    body.style.background = mode.background;
    body.style.color = mode.color;
    if (withTransition)
        body.style.transition = "2s";
    line.style.borderColor = mode.borderColor;
 
    localStorage.setItem("PageMode", JSON.stringify(mode.className))
}

function setupInitialTheme() {
    const initialTheme = JSON.parse(localStorage.getItem("PageMode"));
    if (initialTheme) {
        toggle.classList.add(modes[initialTheme].icon);
        change(initialTheme, false);
    } else {
        toggle.classList.add(modes.light.icon);
    }
    
}


toggle.addEventListener('click', function(){
    this.classList.toggle("bi-moon");
    if(this.classList.toggle('bi-brightness-high-fill')){ 
        change("light");
    } else {
        change("dark");
    }
        
});
