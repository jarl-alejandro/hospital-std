function calcularEdad (nacimiento, flag=null) {
  var fecha = nacimiento
  if(validate_fecha(fecha) == true){
    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    var edad = (ahora_ano + 1900) - ano;
    if ( ahora_mes < mes ) {
      edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
      edad--;
    }
    if (edad > 1900) {
      edad -= 1900;
    }

    var meses = 0
    if(ahora_mes>mes) meses=ahora_mes-mes
    if(ahora_mes<mes) meses=12-(mes-ahora_mes)
    if(ahora_mes==mes && dia>ahora_dia) meses=11;

    var dias = 0;

    if(ahora_dia>dia) dias=ahora_dia-dia;

    if(ahora_dia<dia) {
      ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
      dias = ultimoDiaMes.getDate()-(dia-ahora_dia);
    }
    if (flag === null) {
      let edad_person = `${ edad } años ${ meses } meses ${ dias } dias`
      return edad_person
    } else {
      return {
        edad: edad,
        meses: meses,
        dias: dias,
      }
    }
  }
  else{
    Materialize.toast("incorrecta", 4000)
  }
}

function isValidDate(day,month,year){
  var dteDate
  month = month - 1
  dteDate = new Date(year,month,day);
  return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
}

function validate_fecha(fecha){
  var patron=new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");

  if(fecha.search(patron)==0) {
      var values = fecha.split("-")

      if(isValidDate(values[2],values[1],values[0])) {
        return true;
      }
  }
  return false;
}


// duration
function duration(since, until) {

  //if first date is greater that the first, we fix the order
  if (since > until) {
    var temp = since;
    since = until;
    until = temp;
  }

  var years,months,days;

  //Years
  years = (until.getFullYear() - since.getFullYear());
  if (until.getMonth() == since.getMonth()){
    if (since.getDate() < (until.getDate()-1)) {
      years += 1;
    }
    if(since.getDate()==until.getDate()){
        years+= 1;
    }
  }
  if(since.getMonth() > until.getMonth()){
      years = (years - 1);
  }
  //Months
  if(since.getDate() > until.getDate()){
    if(since.getMonth() > (until.getMonth()-1)){
      months = 11 - (since.getMonth() - until.getMonth());
      if (since.getMonth() == until.getMonth()){
        months = 11;
      }
    }else{
      months = until.getMonth() - since.getMonth() - 1;
    }
  }else{
    if(since.getMonth() > until.getMonth()){
      months = 12 - (until.getMonth() - since.getMonth());
    }else{
      months = until.getMonth() - since.getMonth();
    }
  }
  //Days
  if(since.getDate() > (until.getDate()-1)){
    var days_pm = dayssInmonths(until.getMonth(until.getMonth()-1));
    days =  days_pm - since.getDate() + until.getDate();
    if((since.getMonth() == until.getMonth()) & (since.getDate()==until.getDate())){
      days = 0;
    }
  }else{
    days = until.getDate() - since.getDate();
  }

  return ({"years":years,"months":months,"days":days});
}

function dayssInmonths(date){
  date = new Date(date);
  return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}
