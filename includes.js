

const secciones = [
    { id: "seccion-inicio",                archivo: "inicio.html" },
    { id: "seccion-instalacion",           archivo: "instalacion.html" },
    { id: "seccion-como-trabajaSExtractor",          archivo: "como-trabajaSExtractor.html" },
    { id: "seccion-archivos-configuracionSExtractor",archivo: "archivos-configuracionSExtractor.html" },
    { id: "seccion-parametros-entradaSExtractor",    archivo: "parametros-entradaSExtractor.html" },
    { id: "seccion-psf",                   archivo: "psf.html" },
    { id: "seccion-uso-sextractor",        archivo: "uso-sextractor.html" },
    { id: "seccion-psfex",                 archivo: "psfex.html" },
    { id: "seccion-clasificacion",         archivo: "clasificacion.html" },
    { id: "seccion-referencias",           archivo: "referencias.html" },
    { id: "seccion-uso-psfex",             archivo: "uso-psfex.html" },
    { id: "seccion-subaru",                archivo: "subaru.html"},  
];

async function cargarSeccion({ id, archivo }) {
    const contenedor = document.getElementById(id);

    // Si el contenedor no existe en el HTML, no seguimos: antes esto hacía
    // que el catch intentara usar contenedor.innerHTML sobre null, lo cual
    // lanzaba un error no controlado y detenía la carga de TODAS las
    // secciones siguientes en cargarTodasLasSecciones().
    if (!contenedor) {
        console.error(`No existe ningún elemento con id="${id}" para ${archivo}`);
        return;
    }

    try {
        const resp = await fetch(archivo);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        contenedor.innerHTML = await resp.text();
    } catch (err) {
        contenedor.innerHTML = `<p style="color:red">Error cargando ${archivo}: ${err.message}</p>`;
        console.error(`No se pudo cargar ${archivo}`, err);
    }
}

async function cargarTodasLasSecciones() {
    // Se cargan en orden para respetar la jerarquía visual de la página.
    // Cada sección se envuelve en su propio try/catch para que un fallo en
    // una sección (por ejemplo, un error de red o de parsing inesperado)
    // no impida que las demás sigan cargando.
    for (const seccion of secciones) {
        try {
            await cargarSeccion(seccion);
        } catch (err) {
            console.error(`Fallo inesperado cargando ${seccion.archivo}`, err);
        }
    }

    // MathJax ya procesó el documento en la carga inicial (cuando el <main>
    // estaba vacío). Como el contenido con fórmulas llegó después, hay que
    // pedirle que vuelva a recorrer la página.
    if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
    }

    // Si el usuario entró con un enlace tipo index.html#psf, hacemos scroll
    // hasta ahí una vez que el contenido ya existe en el DOM.
    if (window.location.hash) {
        const objetivo = document.getElementById(window.location.hash.slice(1))
            || document.querySelector(`[id="${decodeURIComponent(window.location.hash.slice(1))}"]`);
        if (objetivo) objetivo.scrollIntoView();
    }
}

document.addEventListener("DOMContentLoaded", cargarTodasLasSecciones);