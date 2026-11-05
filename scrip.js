/*PARA OBTENER LOS ELEMENTOS DE HTML*/
const inicio = document.getElementById("inicio");
const registro = document.getElementById("registro");
const listaActividades = document.getElementById("listaActividades");

const bInicio = document.getElementById("bInicio");
const bActividades = document.getElementById("bActividades");
const bAgregar = document.getElementById("bAgregar");

/*PARA CAMBIAR DE SECCION*/
const mostrarSeccion = (seccion, botonActivo) => 
{
    inicio.hidden = true;
    registro.hidden = true;
    listaActividades.hidden = true;

    seccion.hidden = false;

    document.querySelectorAll("nav button").forEach(boton =>
    {
        boton.classList.toggle("activo", boton === botonActivo);
    });
};

mostrarSeccion(inicio, bInicio);


/* BOTONES DEL MENU */

bInicio.addEventListener("click", () =>
{
    mostrarSeccion(inicio, bInicio);
});

bActividades.addEventListener("click", () =>
{
    mostrarSeccion(listaActividades, bActividades);
});

bAgregar.addEventListener("click", () =>
{
    mostrarSeccion(registro, bAgregar);
});

/*GUARDAR ACTIVIDADES*/

let actividades = [];

/* OBTENER LOS ELEMETNOS DEL FORMULARIO*/

const formulario = document.getElementById("formularioActividad");
const contenedorLista = document.getElementById("contenedorLista");

/* MOSTRAR LAS ACTIVIDADES*/

const mostrarActividades = () => 
{
    if (actividades.length === 0)
    {
        contenedorLista.innerHTML = "<p id= 'mensajeVacio'>Aun no tienes actividades agregadas.</p>";
    } else
    {
        contenedorLista.innerHTML = actividades.map((actividad) => `
            <div class="tarjetaActividad">
            <div class="encabezadoActividad">
                <h3>${actividad.nombre}</h3>
                <div class="etiquetasActividad">
                <span class="dificultad ${actividad.dificultad.toLowerCase()}">${actividad.dificultad}</span>

                
                <select class="cambiarEstado estado-${actividad.estado.toLowerCase().replace(" ", "-")}" data-id="${actividad.id}">
                 <option value="Pendiente" ${actividad.estado === "Pendiente" ? "selected" : "" }>Pendiente</option>
                 <option value="Completada" ${actividad.estado === "Completada" ? "selected" : ""}>Completada</option>
                </select>
                </div>
                </div>

                <div class="informacionActividad">
                <div class="datoActividad">
                <span>Materia</span>
                <p>${actividad.materia}</p>
                </div>

                <div class="datoActividad">
                <span>Fecha de entrega:</span>
                <p>${actividad.fechaEntrega}</p>
                </div>
                </div>

                <div class="descripcionActividad">
                <span>Descripcion:</span>
                <p>${actividad.descripcion || "Sin descripcion"}</p>
                </div> 
            </div>
    `).join("");
    }
};

/* ESTADO DE LA ACTIVIDAD*/

contenedorLista.addEventListener("change", (evento) =>
{
    if (evento.target.classList.contains("cambiarEstado"))
    {
        const idActividad = Number(evento.target.dataset.id);
        const nuevoEstado = evento.target.value;

        const actividad = actividades.find((actividad) => actividad.id === idActividad);
        if (actividad)
        {
            actividad.estado = nuevoEstado;
            mostrarActividades();
            actualizarResumen();
        }
    }
});

/*ACTUALIZAR CONTADOR*/

const actualizarResumen = () =>
{
    document.getElementById("actividadesTotales").textContent = actividades.length;
    document.getElementById("actividadesPendientes").textContent = actividades.filter((actividad) => actividad.estado === "Pendiente").length;
    document.getElementById("actividadesCompletadas").textContent = actividades.filter((actividad) => actividad.estado === "Completada").length;
};

/*REGISTRAR ACTIVIDAD*/

formulario.addEventListener("submit", (evento) =>
{
    evento.preventDefault();

    const nombre = document.getElementById("nombreActividad").value.trim();
    const materia = document.getElementById("materia").value.trim();
    const fechaEntrega = document.getElementById("fechaEntrega").value;
    const dificultad = document.getElementById("dificultad").value;
    const descripcion = document.getElementById("descripcion").value.trim();


/* VALIDAR CAMPOS OBLIGATORIOS*/

if (nombre === "" || materia === "" || fechaEntrega === "" || dificultad === "")
{
    alert("Completa los campos obligatorios");
    return;
}

/* OBJETO NUEVA ACTIVIDAD*/

const nuevaActividad = 
{
    id: Date.now(),
    nombre: nombre,
    materia: materia,
    fechaEntrega: fechaEntrega,
    dificultad: dificultad,
    descripcion: descripcion,
    estado: "Pendiente"
};

actividades.push(nuevaActividad);
formulario.reset();
actualizarResumen();
mostrarActividades();
mostrarSeccion(listaActividades, bActividades);

alert("¡Actividad agregada correctamente!");

});

