var calculadoraDolares = (function () {
	var calculadoraDolares = document.getElementById('calculadoraDolares');

	var validarFechaCorteDolares = function () {
		var fechaCorteDolares = document.getElementById('fechaCorteDolares').value;
		console.log('fechaCorteDolares', fechaCorteDolares);
		var fechaLimitePagoDolares = document.getElementById('fechaLimitePagoDolares').value;
		console.log('fechaLimitePagoDolares', fechaLimitePagoDolares);
		var fechaValidaDolares = false;
		for (var i = 0; i < calendario.length; i++) {
			if (calendario[i][0] === fechaCorteDolares) {
				fechaLimitePagoDolares.value = calendario[i][1];
				fechaValidaDolares = true;
				break;
			}
		}
		if (!fechaValidaDolares) fechaLimitePagoDolares.value = '';
		return fechaValidaDolares;
	};

	var validarFechaTransaccionDolares = function () {
		var fechaTransaccionDolares = document.getElementById('fechaTransaccionDolares').value;
		var fechaCorteDolares = document.getElementById('fechaCorteDolares').value;
		var transaccionDolares = convertirFecha(fechaTransaccionDolares);
		var corteDolares = convertirFecha(fechaCorteDolares);

		if (corteDolares >= transaccionDolares) return true;
		return false;
	};

	var validarFechaTransaccionMasunMesDolares = function () {
		var fechaTransaccionDolares = document.getElementById('fechaTransaccionDolares').value;
		var fechaCorteDolares = document.getElementById('fechaCorteDolares').value;
		var transaccionDolares = convertirFecha(fechaTransaccionDolares);
		var corteDolares = convertirFecha(fechaCorteDolares);

		transaccion_mas_un_mes = transaccionDolares;
		transaccion_mas_un_mes.setMonth(transaccion_mas_un_mes.getMonth() + 1);

		console.log('la fecha es ' + transaccion_mas_un_mes);

		if (transaccion_mas_un_mes < corteDolares) return true;
		return false;
	};

	var calcularDolares = function () {
		var eaDolares = document.getElementById('ea').value;
		var mvDolares = document.getElementById('mv');
		var tipoUsoDolares = document.getElementById('tipoUsoDolares').value;
		console.log('tipo uso: ' + tipoUsoDolares);
		var valorDolares = document.getElementById('valorDolares').value;
		console.log('valorDolares: ' + valorDolares);
		var cuotasDolares = document.getElementById('cuotasDolares').value;
		console.log('cuotasDolares: ' + cuotasDolares);
		var fechaTransaccionDolares = document.getElementById('fechaTransaccionDolares').value;
		var fechaCorteDolares = document.getElementById('fechaCorteDolares').value;
		var fechaLimitePagoDolares = document.getElementById('fechaLimitePagoDolares').value;
		var emailDolares = document.getElementById('emailDolares').value;

		var franquicia = document.getElementById('tipoFranquicia').value.toUpperCase();
		console.log('franquicia: ' + franquicia);
		var tipoTarjeta = document.getElementById('tipoTarjeta').value.toUpperCase();
		console.log('tipo tarjeta: ' + tipoTarjeta);
		var moneda = document.getElementById('moneda').value.toUpperCase();
		console.log('moneda: ' + moneda);

		var franquiciaSelect = document.getElementById('tipoFranquicia');
		var tipoTarjetaSelect = document.getElementById('tipoTarjeta');
		var monedaSelect = document.getElementById('moneda');

		var franquiciaText = franquiciaSelect.options[franquiciaSelect.selectedIndex].text.toUpperCase();
		var tipoTarjetaText = tipoTarjetaSelect.options[tipoTarjetaSelect.selectedIndex].text.toUpperCase();
		var monedaText = monedaSelect.options[monedaSelect.selectedIndex].text.toUpperCase();

		var textoConcatenado = 'SIMULACIÓN DE TARJETA: ' + franquiciaText + ' ' + tipoTarjetaText + ' EN ' + monedaText;
		var resultadodiv = document.getElementById('resultadoDiv');
		resultadodiv.innerHTML = textoConcatenado;

		$('#tabla tbody').empty();

		/*var transaccion = new Date('2016-11-02');
        var corte = new Date('2016-11-29');
        var limitePago = new Date('2016-12-20');
        var transaccion = new Date(fechaTransaccion);
        var corte = new Date(fechaCorte);
        var limitePago = new Date(fechaLimitePago);*/
		var transaccionDolares = convertirFecha(fechaTransaccionDolares);
		var corteDolares = convertirFecha(fechaCorteDolares);
		var limitePagoDolares = convertirFecha(fechaLimitePagoDolares);

		eaDolares = eaDolares.replace(',', '.');
		eaDolares = eaDolares / 100;

		var baseDolares = 1 + Number(ea);
		var exponenteDolares = 1 / 12;
		var tasaFacturacionDolares = (Math.pow(baseDolares, exponenteDolares) - 1) * 100;
		/*fecha corte*/
		var d8Dolares = (Date.parse(corteDolares) - Date.parse(transaccionDolares)) / (1000 * 60 * 60 * 24) + 1;
		//alert(d8);
		/*fecha limite de pago*/
		var d9Dolares = (Date.parse(limitePagoDolares) - Date.parse(corteDolares)) / (1000 * 60 * 60 * 24);
		//alert(d9);
		mvDolares.value = tasaFacturacionDolares.format(2, 0, ',', '.') + '%';

		var date = new Date();
		var saldoInicialDolares = '';
		var abonoCapitalDolares = 0;
		var intereses = 0;
		var saldoFinalDolares = 0;
		var cuotaDolares = 0;
		var meses = new Array('Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic');

		/*console.log(d8);
        console.log(tasaFacturacion);*/

		var html = '';

		var dias_fecha_corte = document.getElementById('dias_fecha_corte');
		var dias_fecha_pago = document.getElementById('dias_fecha_pago');
		var primera_cuota_1 = document.getElementById('primera_cuota_1');
		var primera_cuota_2 = document.getElementById('primera_cuota_2');
		var primera_cuota_3 = document.getElementById('primera_cuota_3');
		var segunda_cuota_1 = document.getElementById('segunda_cuota_1');
		var segunda_cuota_2 = document.getElementById('segunda_cuota_2');
		var segunda_cuota_3 = document.getElementById('segunda_cuota_3');
		var segunda_cuota_4 = document.getElementById('segunda_cuota_4');
		var segunda_cuota_5 = document.getElementById('segunda_cuota_5');
		let segunda_cuota_5_ = 0;

		var dia_milisegundos = 86400000;
		var diferencia_transaccion_corte = corteDolares - transaccionDolares;
		var resultado_diferencia_transaccion_corte = diferencia_transaccion_corte / dia_milisegundos;
		dias_fecha_corte.value = resultado_diferencia_transaccion_corte + 1;

		var diferencia_corte_pago = limitePagoDolares - corteDolares;
		var resultado_diferencia_corte_pago = diferencia_corte_pago / dia_milisegundos;
		dias_fecha_pago.value = resultado_diferencia_corte_pago;

		console.log('valor: ' + valorDolares);
		console.log('mv: ' + mvDolares.value);
		console.log((valorDolares * tasaFacturacionDolares.format(2, 0, ',', '.')) / 100);

		let mv_decimal = Math.pow(baseDolares, exponenteDolares) - 1;
		let primera_cuota_1_ = Number(valorDolares) * mv_decimal;
		primera_cuota_1.value = '$ ' + Number(primera_cuota_1_).format(2, 3, '.', ',');

		let primera_cuota_2_ = primera_cuota_1_ / 30;
		primera_cuota_2.value = '$ ' + Number(primera_cuota_2_).format(2, 3, '.', ',');

		let primera_cuota_3_ = primera_cuota_2_ * dias_fecha_corte.value;
		primera_cuota_3.value = '$ ' + Number(primera_cuota_3_).format(2, 3, '.', ',');

		if (cuotasDolares == 1) {
			document.getElementById('text_left_share').style.display = 'none';
			document.getElementById('left_share').style.display = 'none';
			document.getElementById('right_share').style.display = 'none';

			// primera_cuota_1.value = "$ " + Number(0).format(2, 3, '.', ',')
			// primera_cuota_2.value = "$ " + Number(0).format(2, 3, '.', ',')
			// primera_cuota_3.value = "$ " + Number(0).format(2, 3, '.', ',')

			if (tipoUsoDolares === 'compra_cartera' || tipoUsoDolares === 'gasolina' || tipoUsoDolares === 'impuestos' || tipoUsoDolares === 'peajes' || tipoUsoDolares === 'PSE' || tipoUsoDolares === 'rediferido' || tipoUsoDolares === 'avance') {
				document.getElementById('text_left_share').style.display = 'block';
				document.getElementById('left_share').style.display = 'block';
				document.getElementById('right_share').style.display = 'block';
			}
		} else {
			document.getElementById('text_left_share').style.display = 'block';
			document.getElementById('left_share').style.display = 'block';
			document.getElementById('right_share').style.display = 'block';
		}

		for (var i = 0; i < cuotasDolares; i++) {
			if (i == 0) {
				date = transaccionDolares;
				// date.setDate(date.getDate() + 30);
				date.setMonth(date.getMonth() + 1);
				saldoInicialDolares = valorDolares;
				abonoCapitalDolares = Number(valorDolares) / Number(cuotasDolares);
				if (tipoUsoDolares === 'compra_cartera' || tipoUsoDolares === 'gasolina' || tipoUsoDolares === 'impuestos' || tipoUsoDolares === 'peajes' || tipoUsoDolares === 'PSE' || tipoUsoDolares === 'rediferido' || tipoUsoDolares === 'avance') {
					intereses = (Number(valorDolares) * ((tasaFacturacionDolares * d8Dolares) / 30)) / 100;
					// alert(intereses);
				} else if (tipoUsoDolares != 'avance' && cuotasDolares > 1) {
					intereses = (Number(valorDolares) * ((tasaFacturacionDolares * d8Dolares) / 30)) / 100;
				} else {
					intereses = 0;
				}
				cuotaDolares = abonoCapitalDolares + intereses;
				saldoFinalDolares = Number(valorDolares) - abonoCapitalDolares;

				//nuevo requerimento
				let segunda_cuota_1_;

				if (cuotasDolares == 1) {
					if (tipoUsoDolares == 'compra') {
						segunda_cuota_1_ = 0;
					} else {
						if (tipoUsoDolares == 'pagos_automaticos') {
							segunda_cuota_1_ = 0;
						} else {
							if (intereses == 0) {
								segunda_cuota_1_ = ((saldoInicialDolares * mv_decimal) / 30) * dias_fecha_corte.value;
							} else {
								segunda_cuota_1_ = saldoFinal * mv_decimal;
							}
						}
					}
				} else {
					segunda_cuota_1_ = saldoFinalDolares * mv_decimal;
				}
				segunda_cuota_1.value = '$ ' + Number(segunda_cuota_1_).format(2, 3, '.', ',');

				let segunda_cuota_2_ = Number(abonoCapitalDolares) * mv_decimal;
				segunda_cuota_2.value = '$ ' + Number(segunda_cuota_2_).format(2, 3, '.', ',');

				let segunda_cuota_3_ = Number(segunda_cuota_2_) / 30;
				segunda_cuota_3.value = '$ ' + Number(segunda_cuota_3_).format(2, 3, '.', ',');

				let segunda_cuota_4_ = Number(segunda_cuota_3_) * dias_fecha_pago.value;
				segunda_cuota_4.value = '$ ' + Number(segunda_cuota_4_).format(2, 3, '.', ',');

				segunda_cuota_5_ = Number(segunda_cuota_1_) + Number(segunda_cuota_4_);
				segunda_cuota_5.value = '$ ' + Number(segunda_cuota_5_).format(2, 3, '.', ',');

				if (intereses > 0) {
					document.querySelector('#variable_label').innerText = 'Multiplique el Saldo Final de la primera cuota por la tasa M.V.';
				} else {
					document.querySelector('#variable_label').innerText = 'Multiplique el valor de la transacción por la tasa M.V., la divide en 30 y la multiplica por los días transcurridos desde la Fecha de la transacción hasta la Fecha de Corte';
				}
			} else if (i == 1) {
				// date.setDate(date.getDate() + 31);
				date.setMonth(date.getMonth() + 1);
				saldoInicialDolares = saldoFinalDolares;

				if (abonoCapitalDolares > valorDolares) {
					abonoCapitalDolares = 0;
				} else {
					abonoCapitalDolares = Number(valorDolares) / Number(cuotasDolares);
				}
				if (saldoFinalDolares === 0 && tipoUsoDolares === 'avance') {
					intereses = (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30 / 100;
					//console.log(intereses);
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'compra') {
					intereses = 0;
				} else if (tipoUsoDolares === 'compra') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'compra_cartera') {
					intereses = (((d9Dolares + d8Dolares) / 30) * tasaFacturacionDolares * abonoCapitalDolares) / 100;
				} else if (tipoUsoDolares === 'compra_cartera') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'gasolina') {
					intereses = (((d9Dolares + d8Dolares) / 30) * tasaFacturacionDolares * abonoCapitalDolares) / 100;
				} else if (tipoUsoDolares === 'gasolina') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'impuestos') {
					intereses = (((d9Dolares + d8Dolares) / 30) * tasaFacturacionDolares * abonoCapitalDolares) / 100;
				} else if (tipoUsoDolares === 'impuestos') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'pagos_automaticos') {
					intereses = 0;
				} else if (tipoUsoDolares === 'pagos_automaticos') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'peajes') {
					intereses = (((d9Dolares + d8Dolares) / 30) * tasaFacturacionDolares * abonoCapitalDolares) / 100;
				} else if (tipoUsoDolares === 'peajes') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'PSE') {
					intereses = (((d9Dolares + d8Dolares) / 30) * tasaFacturacionDolares * abonoCapitalDolares) / 100;
				} else if (tipoUsoDolares === 'PSE') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoFinalDolares === 0 && tipoUsoDolares === 'rediferido') {
					intereses = (((d9Dolares + d8Dolares) / 30) * tasaFacturacionDolares * abonoCapitalDolares) / 100;
				} else if (tipoUsoDolares === 'rediferido') {
					//intereses = ((abonoCapital* tasaFacturacion) + ((saldoFinal * tasaFacturacion ) * d9 / 30)/100);
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (tipoUsoDolares == 'avance') {
					intereses = (saldoFinalDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else {
					intereses = (((d9Dolares + d8Dolares) / 30) * tasaFacturacionDolares * abonoCapitalDolares) / 100;
					//alert(intereses);
				}
				cuotaDolares = abonoCapitalDolares + intereses;
				saldoFinalDolares = saldoInicialDolares - abonoCapitalDolares;
			} else {
				// date.setDate(date.getDate() + 31);
				date.setMonth(date.getMonth() + 1);

				saldoInicialDolares = saldoFinalDolares;
				if (abonoCapitalDolares >= valorDolares) {
					abonoCapitalDolares = 0;
				} else {
					abonoCapitalDolares = Number(valorDolares) / Number(cuotasDolares);
				}
				if (saldoInicialDolares < 1) {
					//alert('prueba');
					intereses = (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30 / 100;
				} else if (tipoUsoDolares == 'avance') {
					intereses = (saldoInicialDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
				} else if (saldoInicialDolares >= 1) {
					// alert(saldoInicial+":"+'saldo inicial');

					intereses = (saldoInicialDolares * tasaFacturacionDolares + (abonoCapitalDolares * tasaFacturacionDolares * d9Dolares) / 30) / 100;
					// alert(intereses+":"+'intereses');
				} else {
					intereses = 0;
				}
				cuotaDolares = abonoCapitalDolares + intereses;
				saldoFinalDolares = saldoInicialDolares - abonoCapitalDolares;
			}

			html += `<tr id="tr_${+i}">`;

			console.log('iteracion' + i);
			console.log('dia: ' + date.getDate());
			console.log('mes: ' + date.getMonth());

			if (i != cuotasDolares) {
				html += '<td>' + meses[date.getMonth()] + ' - ' + date.getFullYear() + '</td>';
			} else {
				//html += '<td>' +" "+ '</td>';
				html += '<td>' + meses[date.getMonth()] + ' - ' + date.getFullYear() + '</td>';
			}

			html += '<td>$ ' + Number(saldoInicialDolares).format(2, 3, '.', ',') + '</td>';

			if (i != cuotas) {
				html += '<td>$ ' + abonoCapitalDolares.format(2, 3, '.', ',') + '</td>';
				html += '<td>$ ' + intereses.format(2, 3, '.', ',') + '</td>';
				html += '<td>$ ' + cuotaDolares.format(2, 3, '.', ',') + '</td>';
				html += '<td>$ ' + saldoFinalDolares.format(2, 3, '.', ',') + '</td>';
			} else {
				html += '<td>$ ' + '0,00' + '</td>';
				html += '<td>$ ' + intereses.format(2, 3, '.', ',') + '</td>';
				html += '<td>$ ' + intereses.format(2, 3, '.', ',') + '</td>';
				html += '<td>$ ' + '0,00' + '</td>';
			}
			html += '</tr>';
		}

		if (cuotasDolares == 1) {
			if (tipoUsoDolares === 'compra_cartera' || tipoUsoDolares === 'gasolina' || tipoUsoDolares === 'impuestos' || tipoUsoDolares === 'peajes' || tipoUsoDolares === 'PSE' || tipoUsoDolares === 'rediferido' || tipoUsoDolares === 'avance') {
				date.setMonth(date.getMonth() + 1);
				console.log('date: ' + date);
				html += `<tr id="tr_1">`;

				// console.log("iteracion" + i);
				// console.log("dia: " + date.getDate());
				// console.log("mes: " + date.getMonth());

				html += '<td>' + meses[date.getMonth()] + ' - ' + date.getFullYear() + '</td>';

				html += '<td>$ ' + '0' + '</td>';

				html += '<td>$ ' + '0' + '</td>';
				html += '<td> ' + '$ ' + Number(segunda_cuota_5_).format(2, 3, '.', ',') + '</td>';
				html += '<td>$ ' + '0' + '</td>';
				html += '<td>$ ' + '0' + '</td>';

				html += '</tr>';
			}
		}

		$('#tabla tbody').append(html);

		if ($('#condiciones').is(':checked')) {
			guardarCorreo(emailDolares);
		}
	};

	Number.prototype.format = function (n, x, s, c) {
		var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
			num = this.toFixed(Math.max(0, ~~n));

		return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	};

	var convertirFecha = function (valor) {
		//console.log("convertirFecha");
		// console.log(valor);
		var datosDolares = valor.split('/');
		var fechaDolares = datosDolares[2] + '-' + datosDolares[1] + '-' + datosDolares[0];
		// console.log(fecha);
		return new Date(fechaDolares);
	};

	/*var guardarCorreo = function(correo){
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
    };*/

	var guardarCorreoDolares = function (correo) {
		document.getElementById('div-satisfaction').style.display = 'block';

		var correo = $('#emailDolares').val();
		var data = 'Correo=' + correo;
		$.ajax({
			url: 'InsertarCorreo.php',
			type: 'POST',
			data: data,
			beforesend: function () {
				// console.log('enviando');
			},
			seccess: function (resp) {
				//console.log('resp');
			},
		});
	};

	function dosDecimales(n) {
		let t = n.toString();
		let regex = /(\d*.\d{0,2})/;
		return t.match(regex)[0];
	}

	var calcularMVDolares = function () {
		var eaDolares = document.getElementById('ea').value;
		var mvDolares = document.getElementById('mv');

		eaDolares = eaDolares.replace(',', '.');
		eaDolares = eaDolares / 100;

		var baseDolares = 1 + Number(eaDolares);
		var exponenteDolares = 1 / 12;
		var tasaFacturacionDolares = (Math.pow(baseDolares, exponenteDolares) - 1) * 100;
		mvDolares.value = tasaFacturacionDolares.format(2, 0, ',', '.') + '%';
	};

	return {
		validarFechaCorteDolares: validarFechaCorteDolares,
		validarFechaTransaccionDolares: validarFechaTransaccionDolares,
		validarFechaTransaccionMasunMesDolares: validarFechaTransaccionMasunMesDolares,
		calcularDolares: calcularDolares,
		calcularMVDolares: calcularMVDolares,
	};
})();
$(document).ready(function () {
	/*initialisation des composants*/
	initComponent();
});

/*ejemplo
$(function () {
$(".js-datepicker").datepicker({
onClose: function (selectedDate) {
$("#fechaCorte").datepicker("option", "minDate", selectedDate);
}
});
$("#fechaCorte").datepicker({
onClose: function (selectedDate) {
$(".js-datepicker").datepicker("option", "maxDate", selectedDate);
}
});
});
 
/* Fonction d'initialisation des composants */
function initComponent() {
	/* Fecha transacción */

	$('.js-datepicker').datepicker({
		dateFormat: 'dd/mm/yy',
		onClose: function (selectedDate) {
			$('#fechaCorte').datepicker('option', 'minDate', selectedDate);
		},
	});

	/* Fecha de corte */
	$('#fechaCorteDolares').datepicker({
		dateFormat: 'dd/mm/yy',
		onClose: function (selectedDate) {
			$('.js-datepicker').datepicker('option', '+1M', selectedDate);
		},

		beforeShowDay: function (d) {
			var dmy = d.getMonth() + 1;

			if (d.getMonth() < 9) dmy = '0' + dmy;
			dmy += '-';

			if (d.getDate() < 10) dmy += '0';
			dmy += d.getDate() + '-' + d.getFullYear();

			//console.log(dmy+' : '+($.inArray(dmy, cal2)));

			if ($.inArray(dmy, cal2) != -1) {
				return [true, ''];
			} else {
				return [false, ''];
			}
		},
	});

	//$("#dateRetrait").datepicker({buttonImage: "../../../Images/boutons/btn_calendier.png"});
	//$("#dateRetrait").datepicker({showButtonPanel: true });
	//$("#dateRetrait").datepicker({beforeShow: function() {setTimeout(function() {$(".ui-datepicker").css("z-index", 9999999999);}, 10);}});
}
