// Abre/cierra un grupo de botones tipo acordeón: al abrir uno,
// se cierran los demás que estén al MISMO nivel (mismos hermanos).
function inicializarAcordeon(selectorBoton) {

    document.querySelectorAll(selectorBoton).forEach(button => {

        button.addEventListener("click", () => {

            const submenuActual = button.nextElementSibling;
            const yaEstabaAbierto = submenuActual.classList.contains("open");

            // <ul> que contiene a este botón: define su "nivel"
            const listaPadre = button.closest("ul");

            // Cierra únicamente los botones/submenús que son hermanos
            // directos dentro de esa misma lista (mismo nivel)
            listaPadre.querySelectorAll(`:scope > li > ${selectorBoton}`).forEach(btn => {
                btn.classList.remove("active");
                btn.nextElementSibling.classList.remove("open");
            });

            // Si el botón clickeado estaba cerrado, lo abre
            if (!yaEstabaAbierto) {
                button.classList.add("active");
                submenuActual.classList.add("open");
            }
        });
    });
}

// Botones principales (primer nivel)
inicializarAcordeon(".menu-btn");

// Botones secundarios (segundo nivel)
inicializarAcordeon(".submenu-btn");