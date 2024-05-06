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
			calculadoraDolares.calcularMVDolares();
		}
	});
});
