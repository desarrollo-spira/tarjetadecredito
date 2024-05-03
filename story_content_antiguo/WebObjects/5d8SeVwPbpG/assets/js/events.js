$(document).ready(function(){
    
    $(document).tooltip({
        tooltipClass: "customToolTip",
    });
    $('#panelLateralCalculadora').height($('#panelCalculadora').height());
    $('.panelDerechoFinanzas').height($('.panelFinanzas').height());
    //$('[data-toggle="tooltip"]').tooltip();
    
    var heightFinanzas = $('.panelFinanzas').height();
    $('.btnFinanzasCasa').height(heightFinanzas + "px");
    $('.btnFinanzasCasa').css('line-height', heightFinanzas + "px");
    
    $('#btnFinanzasCasaLink img:nth-child(2)').hide();
    $('#btnFinanzasCasaLink').mouseover(function(){
        $('#btnFinanzasCasaLink img:nth-child(1)').hide();
        $('#btnFinanzasCasaLink img:nth-child(2)').show();
    });
    $('#btnFinanzasCasaLink').mouseleave(function(){
        $('#btnFinanzasCasaLink img:nth-child(2)').hide();
        $('#btnFinanzasCasaLink img:nth-child(1)').show();
    });
    
    
    
    var output = [];
    $.each(calendario, function(key, value){
        output.push('<option value="' + value[0] + '">' + value[0] + '</option>');
    });
   
   

    //$('#fechaCorte').html(output.join(''));
    /*$('#fechaCorte').datepicker({
        //dateFormat:'yy-mm-dd'
        //dateFormat:'dd-mm-yy'
        dateFormat:'dd/mm/yy'
    }); 



    
    /*$('#calcular').click(function(event){
        event.preventDefault();
        calculadora.calcular();
        $('.panelTabla').slideDown();
    });*/
     $('#fechaTransaccion').change( function(){
               $('#fechaCorte').val("");
                $('#fechaLimitePago').val("");
    });
    
 $('#fechaCorte').change( function(f){
                if(calculadora.validarFechaTransaccion()){
                        if(calculadora.validarFechaCorte()){
                            calculadora.calcular();

                            }else{
                            alert("La fecha de corte no es válida");
                             }
                  }else{
                alert("La fecha de corte no es válida");
                calculadora.validarFechaTransaccion();
               
            }
    });
      

      
    $('#calculadora').validator().on('submit', function(e){
        $('#panelLateralCalculadora').height($('#panelCalculadora').height());
        if(!e.isDefaultPrevented()){
            e.preventDefault();
            if(calculadora.validarFechaCorte()){
                if(calculadora.validarFechaTransaccion()){
                    calculadora.calcular();
                    $('.panelTabla').slideDown();
                }else{
                    alert("La fecha de corte debe ser mayor a la fecha de transacción");
                }
            }else{
                alert("La fecha de corte no es válida");
                alert(calculadora.validarFechaTransaccion());
            }
            //
        }else{
            e.preventDefault();
            console.log("invalido");
        }
    });
    
     
    $('#calculadora').validator().on('validated.bs.validator', function(e){
        //console.log("Validacion campo");
        //console.log($('#panelCalculadora').height());
        //var height = $('#panelCalculadora').height() + 50;
        //$('#panelLateralCalculadora').height(height + "px");
        //$('#panelLateralCalculadora').height($('#panelCalculadora').height());
        //console.log($('#panelLateralCalculadora').height());
        setTimeout(function(){
            $('#panelLateralCalculadora').height($('#panelCalculadora').height());
        }, 500);
    });
    
    function heightChange(){
        console.log("camamsnm");
        
    }
    
    $(window).resize(function(){
        $('#panelLateralCalculadora').height($('#panelCalculadora').height());
        $('.panelDerechoFinanzas').height($('.panelFinanzas').height());
    });
    
    $('.btnPregunta').mouseover(function(){
        console.log("mouse over");
        $(this).attr('src', 'assets/images/btn_pregunta2.png');
    });
    
    $('.btnPregunta').mouseleave(function(){
        $(this).attr('src', 'assets/images/btn_pregunta_-.png');
    });
    
    $('#ea').focusout(function(){
        if($(this).val().length != 0){
            calculadora.calcularMV();
        }
    });
    
    /*$('#calculadora').submit(function(e){
        console.log("Submit");
    });*/
});