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

	/***
	 *
	 * Calculadora Dolares
	 * Eventos
	 *
	 * ***/
	$('#fechaTransaccionDolares').change(function () {
		$('#fechaCorteDolares').val('');
		$('#fechaLimitePagoDolares').val('');
	});

	$('#fechaCorteDolares').change(function (f) {
		if (calculadoraDolares.validarFechaTransaccionDolares()) {
			if (calculadoraDolares.validarFechaCorteDolares()) {
				calculadoraDolares.calcularDolares();
			} else {
				alert('La fecha de corte no es válida');
			}
		} else {
			alert('La fecha de corte no es válida');
			calculadoraDolares.validarFechaTransaccionDolares();
		}

		if (calculadoraDolares.validarFechaTransaccionMasunMesDolares()) {
			alert('Fecha de Corte no corresponde con Fecha de la Transacción');
		}
	});

	$('#calculadoraDolares')
		.validator()
		.on('submit', function (e) {
			console.log('transaccion validar fecha transaccion ' + calculadoraDolares.validarFechaTransaccionDolares());
			console.log('transaccion validar fecha transaccion mas un mes ' + calculadoraDolares.validarFechaTransaccionMasunMesDolares());

			$('#panelLateralCalculadora').height($('#panelCalculadora').height());
			// if (!e.isDefaultPrevented()) {
			e.preventDefault();
			// if (calculadora.validarFechaCorteDolares()) {
			//  if (calculadora.validarFechaTransaccion() && !calculadora.validarFechaTransaccionMasunMes()) {
			calculadoraDolares.calcularDolares();
			$('.panelTabla').slideDown();
			//  } else {
			//      if (!calculadora.validarFechaTransaccion()) {
			//          alert('La fecha de corte debe ser mayor a la fecha de transacción');
			//      }
			//      if (calculadora.validarFechaTransaccionMasunMes()) {
			//          alert('Fecha de Corte no corresponde con Fecha de la Transacción');
			//      }
			//  }
			// } else {
			//  alert('La fecha de corte no es válida');
			//  alert(calculadora.validarFechaTransaccion());
			// }
			// } else {
			//  e.preventDefault();
			//  console.log('invalido');
			// }
		});

	$('#calculadoraDolares')
		.validator()
		.on('validated.bs.validator', function (e) {
			//console.log("Validacion campo");
			//console.log($('#panelCalculadora').height());
			//var height = $('#panelCalculadora').height() + 50;
			//$('#panelLateralCalculadora').height(height + "px");
			//$('#panelLateralCalculadora').height($('#panelCalculadora').height());
			//console.log($('#panelLateralCalculadora').height());
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

	$('.btnPreguntaD').mouseleave(function () {
		$(this).attr('src', 'assets/images/btn_pregunta_-.png');
	});

	$('#ea').focusout(function () {
		if ($(this).val().length != 0) {
			calculadoraDolares.calcularMVDolares();
		}
	});
});
