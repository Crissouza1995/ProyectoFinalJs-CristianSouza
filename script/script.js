
document.addEventListener('DOMContentLoaded', () => {
  var categoriaSeleccionada = "";
  var nombreUsuario = "";
  let horasExtras = 0;
  let sabadoUsuario = 0;
  let tecnico1 = 700;
  let tecnico2 = 900;
  let supervisorProduccion = 1400;
  let jefeDeSector = 1900;
  let sueldoBasico = 0;
  let sueldoTotal = 0;



  // validamos los datos ingresados


  const categoriaSelector = document.getElementById('categoria');
  categoriaSelector.addEventListener('change', () => {
    categoriaSeleccionada = categoriaSelector.value;
    console.log(categoriaSeleccionada);
  });


  const validarBtnUser = document.getElementById('validar-nombre');
  validarBtnUser.addEventListener('click', () => {
    nombreUsuario = document.getElementById('nombre-usuario').value;
  });
  console.log(nombreUsuario);


  const validarBtnHorasExtras = document.getElementById('validar-horas-extras');
  validarBtnHorasExtras.addEventListener('click', () => {
    horasExtras = document.getElementById('horas-extras').value;
  });

  console.log(horasExtras);

  const validarSabadosUsuario = document.getElementById('validar-sabado');
  validarSabadosUsuario.addEventListener('click', () => {
    sabadoUsuario = document.getElementById('sabados-trabajados').value;
  });

  console.log(sabadoUsuario);

  // trabajamos de acuerdo los datos ingresados

  //1)En caso de haber seleccionado Tecnico de primera categoria--

  const calcularBtn = document.getElementById('calcular-btn');
  calcularBtn.addEventListener('click', () => {

    if (horasExtras >= 40) {

      alert("no se pueden relizar mas de 40 horas extras en el mes");
      return;
    }

    if (sabadoUsuario >= 6) {

      alert("Es imposible que un mes tenga mas de 5 sabados");
      return;
    }

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

    alert(`Gracias ${nombreUsuario} por usar la calculadora online de sueldo. El valor tus horas extras del mes sin el salario basico es de ${sueldoTotal}`);
    console.log(sueldoTotal);

  });
});

