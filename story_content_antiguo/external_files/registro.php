<?php

$archivo=fopen ("ingresos.csv",'a');
fputs($archivo,date('d/m/y').";");
if ($archivo==true) {
	echo "<script language='javascript'>"; 
	echo "alert('listo')"; 
	header("Location:https://misfinanzasencasa.davivienda.com/tarjetadecredito/"); 
	echo "</script>";
}
fclose($archivo);

?>


