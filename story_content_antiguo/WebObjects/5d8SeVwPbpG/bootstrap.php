<?php
$db_user = 'edufinanciera';
$db_pass = 'F742C4C5nuc1Q5G';
$db_name = 'edufinanciera';
$db_host ='70.38.11.177:3309';
$mysqli= new mysqli($db_host,$db_user,$db_pass,$db_name) or die('no paila');

if($mysqli->connect_errno){
printf('connect failed: %\n', $mysqli->connect_errno);
exit();

}
