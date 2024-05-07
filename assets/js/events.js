$(document).ready(function () {
	$(document).tooltip({
		tooltipClass: 'customToolTip',
	});
	$('#panelLateralCalculadora').height($('#panelCalculadora').height());
	$('.panelDerechoFinanzas').height($('.panelFinanzas').height());
	//$('[data-toggle="tooltip"]').tooltip();

	var heightFinanzas = $('.panelFinanzas').height();
	$('.btnFinanzasCasa').height(heightFinanzas + 'px');
	$('.btnFinanzasCasa').css('line-height', heightFinanzas + 'px');

	$('#btnFinanzasCasaLink img:nth-child(2)').hide();
	$('#btnFinanzasCasaLink').mouseover(function () {
		$('#btnFinanzasCasaLink img:nth-child(1)').hide();
		$('#btnFinanzasCasaLink img:nth-child(2)').show();
	});
	$('#btnFinanzasCasaLink').mouseleave(function () {
		$('#btnFinanzasCasaLink img:nth-child(2)').hide();
		$('#btnFinanzasCasaLink img:nth-child(1)').show();
	});

	var output = [];
	$.each(calendario, function (key, value) {
		output.push('<option value="' + value[0] + '">' + value[0] + '</option>');
	});

	$('#fechaTransaccion').change(function () {
		$('#fechaCorte').val('');
		$('#fechaLimitePago').val('');
	});

	$('#fechaCorte').change(function (f) {
		var moneda = document.getElementById("moneda").value
		if (calculadora.validarFechaTransaccion()) {
			if (calculadora.validarFechaCorte()) {
				if (moneda === "pesos") {
					calculadora.calcular();
				} else if (moneda === "dolares") {
					calculadora.calcularDolares();
				} else {
					alert('No has seleccionado moneda');
				}

			} else {
				alert('La fecha de corte no es válida');
			}
		} else {
			alert('La fecha de corte no es válida');
			calculadora.validarFechaTransaccion();
		}

		if (calculadora.validarFechaTransaccionMasunMes()) {
			alert('Fecha de Corte no corresponde con Fecha de la Transacción');
		}
	});

	$('#calculadora')
		.validator()
		.on('submit', function (e) {
			console.log('transaccion validar fecha transaccion ' + calculadora.validarFechaTransaccion());
			console.log('transaccion validar fecha transaccion mas un mes ' + calculadora.validarFechaTransaccionMasunMes());

			$('#panelLateralCalculadora').height($('#panelCalculadora').height());
			// if (!e.isDefaultPrevented()) {
			e.preventDefault();
			// if (calculadora.validarFechaCorte()) {
			// 	if (calculadora.validarFechaTransaccion() && !calculadora.validarFechaTransaccionMasunMes()) {
			if (moneda === "pesos") {
				calculadora.calcular();
			} else if (moneda === "dolares") {
				calculadora.calcularDolares();
			} else {
				alert('No has seleccionado moneda');
			}
			$('.panelTabla').slideDown();
			// 	} else {
			// 		if (!calculadora.validarFechaTransaccion()) {
			// 			alert('La fecha de corte debe ser mayor a la fecha de transacción');
			// 		}
			// 		if (calculadora.validarFechaTransaccionMasunMes()) {
			// 			alert('Fecha de Corte no corresponde con Fecha de la Transacción');
			// 		}
			// 	}
			// } else {
			// 	alert('La fecha de corte no es válida');
			// 	alert(calculadora.validarFechaTransaccion());
			// }
			// } else {
			// 	e.preventDefault();
			// 	console.log('invalido');
			// }
		});


	$('#calculadora')
		.validator()
		.on('validated.bs.validator', function (e) {
			setTimeout(function () {
				$('#panelLateralCalculadora').height($('#panelCalculadora').height());
			}, 500);
		});

	function heightChange() {
		console.log('camamsnm');
	}

	$(window).resize(function () {
		$('#panelLateralCalculadora').height($('#panelCalculadora').height());
		$('.panelDerechoFinanzas').height($('.panelFinanzas').height());
	});

	$('.btnPregunta').mouseover(function () {
		console.log('mouse over');
		$(this).attr('src', 'assets/images/btn_pregunta2.png');
	});

	$('.btnPregunta').mouseleave(function () {
		$(this).attr('src', 'assets/images/btn_pregunta_-.png');
	});

	$('#ea').focusout(function () {
		if ($(this).val().length != 0) {
			calculadora.calcularMV();
		}
	});
});
