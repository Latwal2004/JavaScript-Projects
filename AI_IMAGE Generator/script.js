const themeToggle = document.querySelector(".theme-toggle");
// const promptBtn = document.querySelector(".prompt-btn");

//set theme based on saved preferences or system defaults.
(() =>{
const savedTheme  = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefer-color-scheme: dark)").matches;

const isDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
document.body.classList.toggle("dark-theme",isDarkTheme);
themeToggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";

})();

//Switch between light and dark theme
const toggleTheme = () =>{
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme",isDarkTheme ? "dark" : "light");
    themeToggle.querySelector("i").className = isDarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
};
themeToggle.addEventListener("click",toggleTheme);
