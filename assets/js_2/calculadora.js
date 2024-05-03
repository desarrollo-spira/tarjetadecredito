var calculadora = (function () {

    var calculadora = document.getElementById('calculadora');

    var validarFechaCorte = function () {
        var fechaCorte = document.getElementById('fechaCorte').value;
        var fechaLimitePago = document.getElementById('fechaLimitePago');
        
        var fechaValida = false;
        
        for(var i=0; i<calendario.length; i++){
            if(calendario[i][0] === fechaCorte){
                fechaLimitePago.value = calendario[i][1];
                fechaValida = true;
                break;
            }
        }
        
        if(!fechaValida) fechaLimitePago.value = "";
        
        return fechaValida;
    };
    
    var validarFechaTransaccion = function() {
        var fechaTransaccion = document.getElementById('fechaTransaccion').value;
        var fechaCorte = document.getElementById('fechaCorte').value;
        
        var transaccion = convertirFecha(fechaTransaccion);
        var corte = convertirFecha(fechaCorte);
        
        if(corte >= transaccion) return true;
        
        return false;
    };

    var calcular = function () {
        var ea = document.getElementById('ea').value;
        var mv = document.getElementById('mv');
        var tipoUso = document.getElementById('tipoUso').value;
        var valor = document.getElementById('valor').value;
        var cuotas = document.getElementById('cuotas').value;
        var fechaTransaccion = document.getElementById('fechaTransaccion').value;
        var fechaCorte = document.getElementById('fechaCorte').value;
        var fechaLimitePago = document.getElementById('fechaLimitePago').value;
        var email = document.getElementById('email').value;

        $('#tabla tbody').empty();

        /*var transaccion = new Date('2016-11-02');
        var corte = new Date('2016-11-29');
        var limitePago = new Date('2016-12-20');
        var transaccion = new Date(fechaTransaccion);
        var corte = new Date(fechaCorte);
        var limitePago = new Date(fechaLimitePago);*/
        
        var transaccion = convertirFecha(fechaTransaccion);
        var corte = convertirFecha(fechaCorte);
        var limitePago = convertirFecha(fechaLimitePago);
        
        ea = ea.replace(',', '.');
        ea = ea / 100;
        
        var base = 1 + Number(ea);
        var exponente = (1 / 12);
        var tasaFacturacion = (Math.pow(base, exponente) - 1) * 100;
        var d8 = ((Date.parse(corte) - Date.parse(transaccion)) / (1000 * 60 * 60 * 24)) + 1;
        var d9 = ((Date.parse(limitePago) - Date.parse(corte)) / (1000 * 60 * 60 * 24));
        
        mv.value = tasaFacturacion.format(2, 0, ',', '.') + "%";

        var date = new Date();
        var saldoInicial = "";
        var abonoCapital = 0;
        var intereses = 0;
        var saldoFinal = 0;
        var cuota = 0;
        var meses = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic")

        console.log(d8);
        console.log(tasaFacturacion);

        var html = '';
        for (var i = 0; i <= cuotas; i++) {
            if (i == 0) {
                date = transaccion;
                date.setDate(date.getDate() + 30);
                saldoInicial = valor;
                abonoCapital = Number(valor) / Number(cuotas);

                if (tipoUso == "avance") {
                    intereses = Number(valor) * (tasaFacturacion * d8 / 30) / 100;
                } else
                    intereses = 0;
                
                cuota = abonoCapital + intereses;
                saldoFinal = Number(valor) - abonoCapital;
            } else if (i == 1) {
                date.setDate(date.getDate() + 30);
                saldoInicial = saldoFinal;

                if (abonoCapital >= valor) {
                    abonoCapital = 0;
                } else {
                    abonoCapital = Number(valor) / Number(cuotas);
                }

                if ((saldoFinal === 0) && (tipoUso === "avance")) {
                    intereses = (abonoCapital * tasaFacturacion * d9 / 30) / 100;
                } else if ((saldoFinal === 0) && (tipoUso === "compra")) {
                    intereses = 0;
                } else if (tipoUso == "avance") {
                    intereses = ((saldoFinal * tasaFacturacion) + (abonoCapital * tasaFacturacion * d9 / 30)) / 100;
                } else {
                    intereses = ((valor * tasaFacturacion * d8 / 30) + (saldoFinal * tasaFacturacion) + (abonoCapital * tasaFacturacion * d9 / 30)) / 100;
                }
                
                cuota = abonoCapital + intereses;
                saldoFinal = saldoInicial - abonoCapital;
            } else {
                date.setDate(date.getDate() + 30);
                saldoInicial = saldoFinal;

                if (abonoCapital >= valor) {
                    abonoCapital = 0;
                } else {
                    abonoCapital = Number(valor) / Number(cuotas);
                }

                if (saldoInicial == 0) {
                    intereses = (abonoCapital * tasaFacturacion * d9 / 30) / 100;
                } else if (tipoUso == "avance") {
                    intereses = ((saldoInicial * tasaFacturacion) + (abonoCapital * tasaFacturacion * d9 / 30)) / 100;
                } else {
                    intereses = ((saldoInicial * tasaFacturacion) + (abonoCapital * tasaFacturacion * d9 / 30)) / 100;
                }
                
                cuota = abonoCapital + intereses;
                saldoFinal = saldoInicial - abonoCapital;
            }

            html += '<tr>';
            if (i!=cuotas) {
                html += '<td>' + (meses[date.getMonth()]) + " - " + date.getFullYear() + '</td>';
            }else{
                    html += '<td>' +" "+ '</td>';
            }
            
            html += '<td>$ ' + Number(saldoInicial).format(2, 3, '.', ',') + '</td>';

            if (i!=cuotas) {
                html += '<td>$ ' + abonoCapital.format(2, 3, '.', ',') + '</td>';
            }else
            {
                html += '<td>$ ' + "0,00" + '</td>';
            }
            
            html += '<td>$ ' + intereses.format(2, 3, '.', ',') + '</td>';
            if (i!=cuotas) {

                html += '<td>$ ' + cuota.format(2, 3, '.', ',') + '</td>';
            }else{
                html += '<td>$ ' + intereses.format(2, 3, '.', ',')  + '</td>';
            }
      
            if (i!=cuotas) {
                html += '<td>$ ' + saldoFinal.format(2, 3, '.', ',') + '</td>';
            } else {
                html += '<td>$ ' + "0,00" + '</td>';
            }
            html += '</tr>';
        }

        $('#tabla tbody').append(html);
        
        guardarCorreo(email);

    };

    Number.prototype.format = function (n, x, s, c) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
                num = this.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
    };
    
    var convertirFecha = function(valor){
        console.log("convertirFecha");
        console.log(valor);
        var datos = valor.split("/");
        var fecha = datos[2] + "-" + datos[1] + "-" + datos[0];
        console.log(fecha);
        return new Date(fecha);
    };
    
    var guardarCorreo = function(correo){
        var formData = new FormData();
        formData.append('correo', correo);
        var oReq = new XMLHttpRequest();
        oReq.open("POST", "InsertarCorreo.php", true);
        
        oReq.onload = function(oEvent){
            if(oReq.status === 200){
                console.log("Se guardaron los datos");
            }else{
                console.log("Ocurrio un error");
            }
        };
        oReq.send(formData);
    };
    
    var calcularMV = function(){
        var ea = document.getElementById('ea').value;
        var mv = document.getElementById('mv');
        
        ea = ea.replace(',', '.');
        ea = ea / 100;
        
        var base = 1 + Number(ea);
        var exponente = (1 / 12);
        var tasaFacturacion = (Math.pow(base, exponente) - 1) * 100;
        mv.value = tasaFacturacion.format(2, 0, ',', '.') + "%";
    };

    return{
        validarFechaCorte: validarFechaCorte,
        validarFechaTransaccion: validarFechaTransaccion,
        calcular: calcular,
        calcularMV: calcularMV,
    };

})();