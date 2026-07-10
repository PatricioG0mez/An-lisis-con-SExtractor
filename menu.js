// Botones principales

document.querySelectorAll(".menu-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.toggle("active");

        button.nextElementSibling.classList.toggle("open");

    });

});

// Botones secundarios

document.querySelectorAll(".submenu-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.toggle("active");

        button.nextElementSibling.classList.toggle("open");

    });

});