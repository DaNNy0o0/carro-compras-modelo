// Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

const listCursos = document.querySelector("#lista-cursos");

// Carrito

let articulosCarrito = [];

// ---------------------------------------------------

cargarEventListeners();

function cargarEventListeners() {
  // Cuando agregas un curso presionando 'Agregar al Carrito'
  listCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Muestra el carrito guardado en Local Storage en el HTML
  document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('Carrito')) || []

    carritoHTML()
  })

  // Vaciar carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

// Funciones

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina curso del carrito

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoID = e.target.getAttribute("data-id");

    // Elimina del array de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoID);

    carritoHTML(); // Iterar sobre el carrito y volver a crear el html
  }
}

// Vaciar Carrito

function vaciarCarrito() {
  articulosCarrito = []; // Reseteamos el array

  limpiarHtml(); // Limpiar HTML
}

// Lee contenido del HTML al que se da click
//          y extrae info del curso

function leerDatosCurso(curso) {
  //   console.log(curso);

  // Crear objeto con contenido del curso seleccionado
  const infoCurso = {
    imagen: curso.querySelector(".imagen-curso").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Comprobar si el elemnto ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    // Actualizamos la cantidad
    const cursosComprobacionCantidad = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Retorna los objetos no duplicados
      }
    });
    articulosCarrito = [...cursosComprobacionCantidad];
  } else {
    // Agrega elementos al array de Carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
  }

  carritoHTML();
}

// Muestra el carrito de compras en el html

function carritoHTML() {
  // Limpiar el HTML

  limpiarHtml();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>
              <img src='${imagen}' alt='imagen curso' width='100'/>
                
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'>X</a>
            </td>

        `;

    // Agrega el HTML al tbody del carrito
    contenedorCarrito.appendChild(row);
  });

  // Sincronizamos con LocalStorage
  sincronizarStorage()
}

// Añade elementos del carrito a local storage

function sincronizarStorage() {
  localStorage.setItem('Carrito', JSON.stringify(articulosCarrito))
}

// Elimina los curso del Tbody

function limpiarHtml() {
  // Forma lenta
  //   contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
