
<?php
// $db_user = 'edufinanciera';
// $db_pass = 'F742C4C5nuc1Q5G';
// $db_name = 'edufinanciera';
// $db_host ='70.38.11.177:3309';

$db_user = 'misfinanzasencasa';
$db_pass = 'D4Viv-C45a-2020*';
$db_name = 'misfinanzasencasa';
$db_host ='34.74.234.54:3306';

$mysqli= new mysqli($db_host,$db_user,$db_pass,$db_name) or die('no paila');

if($mysqli->connect_errno){
printf('connect failed: %\n', $mysqli->connect_errno);
exit();

}
