


function calcularSueldo() {

  document.addEventListener('DOMContentLoaded', () => {


    var categoriaSeleccionada = "";
    let horasExtras = 0;
    let sabadoUsuario = 0;
    let tecnico1 = 700;
    let tecnico2 = 900;
    let supervisorProduccion = 1400;
    let jefeDeSector = 1900;
    let sueldoBasico = 0;
    let sueldoTotal = 0;
    


    const usuariosRegistrados = []; // Array de usuarios registrados

    // validamos los datos ingresados

    const categoriaSelector = document.querySelector('#categoria');
    categoriaSelector.addEventListener('change', () => {
      categoriaSeleccionada = categoriaSelector.value;

      usuariosRegistrados.push(categoriaSeleccionada);

    });




    const validNombre = document.querySelector('#nombre-usuario');
    const validarBtnUser = document.querySelector('#validar-nombre');
    validarBtnUser.addEventListener('click', () => {

      const nombreUsuario = document.querySelector('#nombre-usuario').value;


      validNombre.classList.add("is-valid");

      usuariosRegistrados.push(nombreUsuario);

    });



    const validarBtnHorasExtras = document.querySelector('#validar-horas-extras');


    validarBtnHorasExtras.addEventListener('click', () => {

      const extrasUsuario = document.querySelector('#horas-extras');
      const extraError = ('#extraError');

      horasExtras = document.querySelector('#horas-extras').value;



      if (horasExtras < 0 || horasExtras > 40) {

        event.preventDefault();
        extraError.textContent = "No se pueden realizar mas de 40hs extras en el mes";
        extrasUsuario.classList.add("is-invalid")
        return;
      }

      extraError.textContent = "";
      extrasUsuario.classList.remove("is-invalid");
      extrasUsuario.classList.add("is-valid");

      usuariosRegistrados.push(horasExtras);


    });


    const sabadoTrabajado = document.querySelector('#sabados-trabajados');


    const validarSabadosUsuario = document.querySelector('#validar-sabado');
    validarSabadosUsuario.addEventListener('click', () => {

      sabadoUsuario = document.querySelector('#sabados-trabajados').value;

      const sabadoError = document.querySelector('#sabadoError');

      if (sabadoUsuario > 4) {
        event.preventDefault();
        sabadoError.textContent = "Es imposible que 1 mes tenga mas de 4 sabadados.";
        sabadoTrabajado.classList.add("is-invalid");
        return;
      }
      sabadoError.textContent = "";
      sabadoTrabajado.classList.remove("is-invalid");
      sabadoTrabajado.classList.add("is-valid");

      usuariosRegistrados.push(sabadoUsuario)


    });

   
    // trabajamos de acuerdo los datos ingresados

    //1)En caso de haber seleccionado Tecnico de primera categoria--


    const calcularBtn = document.querySelector('#calcular-btn');
    calcularBtn.addEventListener('click', () => {

      categoriaSeleccionada = parseInt(categoriaSeleccionada);


     
      
      switch (categoriaSeleccionada) {


      
        case 1:
          sueldoBasico = horasExtras * tecnico1;
          sueldoBasico = sueldoBasico * 2; // se multiplica por 2 ya que las horas extras se pagan un 50% mas que las horas normales.
          sueldoTotal = sueldoBasico + sabadoUsuario * 4000; // el valor de sabados por la categoriaseleccionada
          break;

        case 2:

          sueldoBasico = horasExtras * tecnico2;
          sueldoBasico = sueldoBasico * 2; // se multiplica por 2 ya que las horas extras se pagan un 50% mas que las horas normales.
          sueldoTotal = sueldoBasico + sabadoUsuario * 6000; // el valor de sabados por la categoriaseleccionada
          break;

        case 3:

          sueldoBasico = horasExtras * supervisorProduccion;
          sueldoBasico = sueldoBasico * 2; // se multiplica por 2 ya que las horas extras se pagan un 50% mas que las horas normales.
          sueldoTotal = sueldoBasico + sabadoUsuario * 8000; // el valor de sabados por la categoriaseleccionada
          break;

        case 4:
          sueldoBasico = horasExtras * jefeDeSector;
          sueldoBasico = sueldoBasico * 2; // se multiplica por 2 ya que las horas extras se pagan un 50% mas que las horas normales.
          sueldoTotal = sueldoBasico + sabadoUsuario * 10000; // el valor de sabados por la categoriaseleccionada
          break;
      }

      usuariosRegistrados.push(sueldoTotal);
      console.log(sueldoTotal);
      console.log(usuariosRegistrados)


      const arrayEmpleado = usuariosRegistrados.map(e=>{

        return{

          categoria: usuariosRegistrados[0],
          nombre: usuariosRegistrados[1],
          horasExtras: usuariosRegistrados[2],
          sabadoTrabajado: usuariosRegistrados[3],
          salario: usuariosRegistrados[4],

        }

      });
    
      console.log(arrayEmpleado);

      const empleadoTabla = ()=>{

        const tablaBody = document.querySelector("#tabla-main");
    
        arrayEmpleado.forEach(empleado => {

          const fila = document.createElement("tr");
          const columnaNombre = document.createElement("td");
          columnaNombre.textContent = empleado.nombre;
          const columnaCategoria = document.createElement("td");
          columnaCategoria.textContent = empleado.categoria;
          const columnaSueldo = document.createElement("td");
          columnaSueldo.textContent = empleado.salario;
          const botonEliminar = document.createElement('button');
          botonEliminar.textContent ='Eliminar';
    
          fila.appendChild(columnaNombre);
          fila.appendChild(columnaCategoria);
          fila.appendChild(columnaSueldo);
          fila.appendChild(botonEliminar)
          tablaBody.appendChild(fila);
    
        });
    
      }

      empleadoTabla();

    });
  });



}


calcularSueldo();



/* Segunda Preentrega
 
(1)-Estructura HTML del proyecto
(2)-Variables Js necesarias
(3)-Funciones escenciales del proceso a simular
(4)-Objeto del Js
(5)-Arrays
(6)- Metodo de busqueda y filtrado sobre el array
(7)- La estructura hace referencia a el html y css, correspondientes al armado de la pagina general, pero que el JS que se evalua, aun no esta interactuando con ella.


---Objetivos especificos--

(1)-Capturar entradas mediante prompt().
(2)- Declarar variables y objetos necesarios para simular el proceso seleccionado.
(3)-Crear funciones y/o metodos para realizar operaciones (suma, resta, concanetacion, division, porcentaje, etc).
(4)- Efectuar una salida, que es el resultado de los datos procesados, la cual puede hacerse por alert() o console.log().

*/


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
  
  const empleado1 = new Empleado("Carlos", "Flores", 271, "Tecnico de primera categoria");
  const empleado2 = new Empleado("Carlos", "Toloza", 25, "Tecnico de segunda categoria");
  const empleado3 = new Empleado("Carlos", "Gonzales", 271, "Supervisor de produccion");
  const empleado4 = new Empleado("Luis", "Pereyra", 271, "Tecnico de segunda categoria");
  const empleado5 = new Empleado("Alexis", "Rivarola", 271, "Jefe de sector");
  const empleadodinamico = new Empleado("", "", 0, "");

  
  
  }
  





/*Storage y Json




metodo => let user = sessionstorage.seItem(usuario, cristian);





*/

