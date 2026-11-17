
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "☀️ Light";
    } else {
        themeBtn.textContent = "🌙 Dark";
    }

});

console.log("CloudDevOps Portfolio Loaded Successfully!");
