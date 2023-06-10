const sabadoTrabajado = document.querySelector('#sabados-trabajados');
const extrasUsuario = document.querySelector('#horas-extras');
const arrayEmpleados = []

function calcularSueldo() {
  let categoriaSeleccionada = "";
  let horasExtras = 0;
  let sabadoUsuario = 0;
  const tecnico1 = 700;
  const tecnico2 = 900;
  const supervisorProduccion = 1400;
  const jefeDeSector = 1900;

  const usuariosRegistrados = []; // Array de usuarios registrados

  const categoriaSelector = document.querySelector('#categoria');
  categoriaSelector.addEventListener('change', () => {
    categoriaSeleccionada = categoriaSelector.value;
  });

  const validNombre = document.querySelector('#nombre-usuario');

  const validarBtnUser = document.querySelector('#validar-nombre');

  validarBtnUser.addEventListener('click', () => {
    const nombreUsuario = document.querySelector('#nombre-usuario').value;

    validNombre.classList.add("is-valid");

    usuariosRegistrados[1] = nombreUsuario;
  });

  const validarBtnHorasExtras = document.querySelector('#validar-horas-extras');
  validarBtnHorasExtras.addEventListener('click', () => {
    const extraError = ('#extraError');
    horasExtras = document.querySelector('#horas-extras').value;

    if (horasExtras < 0 || horasExtras > 40) {

      event.preventDefault();
      const extraError = document.querySelector('#extraError');
      extraError.textContent = "No se pueden realizar más de 40 horas extras en el mes";
      extrasUsuario.classList.add("is-invalid");
      return;
    }

    extraError.textContent = "";
    extrasUsuario.classList.remove("is-invalid");
    extrasUsuario.classList.add("is-valid");

    usuariosRegistrados[2] = horasExtras;
  });

  const validarSabadosUsuario = document.querySelector('#validar-sabado');

  validarSabadosUsuario.addEventListener('click', () => {
    sabadoUsuario = document.querySelector('#sabados-trabajados').value;

    const sabadoError = document.querySelector('#sabadoError');

    if (sabadoUsuario > 4) {
      event.preventDefault();
      const sabadoError = document.querySelector('#sabadoError');
      sabadoError.textContent = "Es imposible que 1 mes tenga más de 4 sábados.";
      sabadoTrabajado.classList.add("is-invalid");
      return;
    } else {
      sabadoError.textContent = "";
      sabadoTrabajado.classList.remove("is-invalid");
      sabadoTrabajado.classList.add("is-valid");
    }
    usuariosRegistrados.push(sabadoUsuario)
    usuariosRegistrados[3] = sabadoUsuario;
  });

  const calcularBtn = document.querySelector('#calcular-btn');
  calcularBtn.addEventListener('click', () => {
    calcularEmpleado();
    limpiarCampos();
  });

  function calcularEmpleado() {
    event.preventDefault();
    categoriaSeleccionada = parseInt(categoriaSeleccionada);

    let sueldoBasico = 0;
    let sueldoTotal = 0;

// instancia para evaluar la categoria seleccionada del empleado 

    switch (categoriaSeleccionada) {
      case 1:
        if (categoriaSeleccionada == 1) {
          categoriaSeleccionada = "Tecnico de Primera Categoria"
        }
        sueldoBasico = horasExtras * tecnico1 * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 4000;
        break;
      case 2:
        if (categoriaSeleccionada == 2) {
          categoriaSeleccionada = "Tecnico de Segunda Categoria"
        }
        sueldoBasico = horasExtras * tecnico2 * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 6000;
        break;
      case 3:
        if (categoriaSeleccionada == 3) {
          categoriaSeleccionada = "Supervisor de Produccion"
        }
        sueldoBasico = horasExtras * supervisorProduccion * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 8000;
        break;
      case 4:
        if (categoriaSeleccionada == 4) {
          categoriaSeleccionada = "Jefe de Sector"
        }
        sueldoBasico = horasExtras * jefeDeSector * 2;
        sueldoTotal = sueldoBasico + sabadoUsuario * 10000;
        break;
    }

    usuariosRegistrados[0] = categoriaSeleccionada;
    usuariosRegistrados[4] = sueldoTotal;
    const empleado = {
      categoria: usuariosRegistrados[0],
      nombre: usuariosRegistrados[1],
      horasExtras: usuariosRegistrados[2],
      sabadoTrabajado: usuariosRegistrados[3],
      salario: usuariosRegistrados[4],
    };


    //creo un nuevo array objeto para almacenar todos los usuarios en un array y etsos poder almacenarlos en el JSON 

    arrayEmpleados.push(empleado);

    const tablaBody = document.querySelector("#tabla-main");
    tablaBody.className ='table table-dark table-striped'
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

  debugger;

  // ---Local Storage---
const arrayEmpleadosString = JSON.stringify(arrayEmpleados);

// Almaceno la cadena en el localStorage
localStorage.setItem('empleados', arrayEmpleadosString);

function eliminarUsuario(event) {
  
  const fila = event.target.parentNode;
  
  const indice = Array.from(fila.parentNode.children).indexOf(fila);

  arrayEmpleados.splice(indice, 1);

  fila.remove();

  // Actualizo el localStorage con el nuevo contenido de arrayEmpleados
  const arrayEmpleadosString = JSON.stringify(arrayEmpleados);
  localStorage.setItem('empleados', arrayEmpleadosString);
}

// Limpio los campos a completar
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

  const arrayEmpleadosString = localStorage.getItem('empleados');

  const arrayEmpleados = JSON.parse(arrayEmpleadosString);

  if (Array.isArray(arrayEmpleados) && arrayEmpleados.length > 0) {
    
    console.log(arrayEmpleados);
  }

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

