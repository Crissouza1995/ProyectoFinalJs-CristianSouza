const sabadoTrabajado = document.querySelector('#sabados-trabajados');
const extrasUsuario = document.querySelector('#horas-extras');
const arrayEmpleados = [];

function calcularSueldo() {
  let categoriaSeleccionada = "";
  let horasExtras = 0;
  let sabadoUsuario = 0;
  const tecnico1 = 700;
  const tecnico2 = 900;
  const supervisorProduccion = 1400;
  const jefeDeSector = 1900;

  const usuariosRegistrados = [];

  const categoriaSelector = document.querySelector('#categoria');
  const validNombre = document.querySelector('#nombre-usuario');
  const validarBtnUser = document.querySelector('#validar-nombre');
  const validarBtnHorasExtras = document.querySelector('#validar-horas-extras');
  const validarSabadosUsuario = document.querySelector('#validar-sabado');
  const calcularBtn = document.querySelector('#calcular-btn');
  const tablaBody = document.querySelector("#tabla-main");

  categoriaSelector.addEventListener('change', () => {
    categoriaSeleccionada = categoriaSelector.value;
  });

  validarBtnUser.addEventListener('click', () => {
    const nombreUsuario = document.querySelector('#nombre-usuario').value;
    validNombre.classList.add("is-valid");
    usuariosRegistrados[1] = nombreUsuario;
  });

  validarBtnHorasExtras.addEventListener('click', () => {
    horasExtras = document.querySelector('#horas-extras').value;

    if (horasExtras < 0 || horasExtras > 40) {
      event.preventDefault();
      const extraError = document.querySelector('#extraError');
      extraError.textContent = "No se pueden realizar más de 40 horas extras en el mes";
      extrasUsuario.classList.add("is-invalid");
      return;
    }

    const extraError = document.querySelector('#extraError');
    extraError.textContent = "";
    extrasUsuario.classList.remove("is-invalid");
    extrasUsuario.classList.add("is-valid");

    usuariosRegistrados[2] = horasExtras;
  });

  validarSabadosUsuario.addEventListener('click', () => {
    sabadoUsuario = document.querySelector('#sabados-trabajados').value;
    const sabadoError = document.querySelector('#sabadoError');

    if (sabadoUsuario > 4) {
      event.preventDefault();
      sabadoError.textContent = "Es imposible que 1 mes tenga más de 4 sábados.";
      sabadoTrabajado.classList.add("is-invalid");
      return;
    } else {
      sabadoError.textContent = "";
      sabadoTrabajado.classList.remove("is-invalid");
      sabadoTrabajado.classList.add("is-valid");
    }

    usuariosRegistrados[3] = sabadoUsuario;
  });

  calcularBtn.addEventListener('click', () => {
    calcularEmpleado();
    limpiarCampos();
  });

  function calcularEmpleado() {
    event.preventDefault();
    categoriaSeleccionada = parseInt(categoriaSeleccionada);

    let sueldoBasico = 0;
    let sueldoTotal = 0;
    let categoriaTexto = "";

    switch (categoriaSeleccionada) {
      case 1:
        categoriaTexto = "Tecnico de Primera Categoria";
        sueldoBasico = horasExtras * tecnico1 * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 4000;
        break;
      case 2:
        categoriaTexto = "Tecnico de Segunda Categoria";
        sueldoBasico = horasExtras * tecnico2 * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 6000;
        break;
      case 3:
        categoriaTexto = "Supervisor de Produccion";
        sueldoBasico = horasExtras * supervisorProduccion * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 8000;
        break;
      case 4:
        categoriaTexto = "Jefe de Sector";
        sueldoBasico = horasExtras * jefeDeSector * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 10000;
        break;
    }

    usuariosRegistrados[0] = categoriaTexto;
    usuariosRegistrados[4] = sueldoTotal;
    const empleado = {
      categoria: usuariosRegistrados[0],
      nombre: usuariosRegistrados[1],
      horasExtras: usuariosRegistrados[2],
      sabadoTrabajado: usuariosRegistrados[3],
      salario: usuariosRegistrados[4],
    };

    arrayEmpleados.push(empleado);

    const fila = document.createElement("tr");
    fila.className = 'align-items-center my-2';
    const columnaNombre = document.createElement("td");
    columnaNombre.textContent = empleado.nombre;
    const columnaCategoria = document.createElement("td");
    columnaCategoria.textContent = empleado.categoria;
    const columnaSueldo = document.createElement("td");
    columnaSueldo.textContent = empleado.salario;
    const botonEliminar = document.createElement('mi-boton');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.className = 'btn btn-danger btn-sm my-2'
    botonEliminar.addEventListener('click', eliminarUsuario);

    fila.appendChild(columnaNombre);
    fila.appendChild(columnaCategoria);
    fila.appendChild(columnaSueldo);
    fila.appendChild(botonEliminar);
    tablaBody.appendChild(fila);
  }

  const arrayEmpleadosString = localStorage.getItem('empleados');
  const arrayEmpleadosParsed = JSON.parse(arrayEmpleadosString);

  if (Array.isArray(arrayEmpleadosParsed) && arrayEmpleadosParsed.length > 0) {
    arrayEmpleados.push(...arrayEmpleadosParsed);
    console.log(arrayEmpleados);
  }

  function eliminarUsuario(event) {
    const fila = event.target.parentNode;
    const indice = Array.from(fila.parentNode.children).indexOf(fila);
    arrayEmpleados.splice(indice, 1);
    fila.remove();

    const arrayEmpleadosString = JSON.stringify(arrayEmpleados);
    localStorage.setItem('empleados', arrayEmpleadosString);
  }

  function limpiarCampos() {
    usuariosRegistrados.length = 0;
    categoriaSeleccionada = "";
    horasExtras = 0;
    sabadoUsuario = 0;
    usuariosRegistrados.length = 0;

    document.querySelector('#categoria').selectedIndex = 0;
    document.querySelector('#nombre-usuario').value = "";
    document.querySelector('#horas-extras').value = "";
    document.querySelector('#sabados-trabajados').value = "";
    document.querySelector('#extraError').textContent = "";
    document.querySelector('#sabadoError').textContent = "";

    validNombre.classList.remove("is-valid");
    extrasUsuario.classList.remove("is-valid");
    sabadoTrabajado.classList.remove("is-valid");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  calcularSueldo();
});


/*
const buscarBtn = document.querySelector('#buscar-usuario');
    buscarBtn.addEventListener('click', () => {
      const searchTerm = document.getElementById('#busqueda-nombre').value;
      const filteredUsers = usuariosRegistrados.filter((usuario) => usuario.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log(filteredUsers);
    });

    function registrarUsuarios(){

  class Empleado {
    constructor(nombre, apellido, legajo, categoria) {
      this.nombre = nombre,
        this.apellido = apellido,
        this.legajo = legajo,
        this.categoria = categoria
      this.fecha = new Date()
    }
  }
  



*/

