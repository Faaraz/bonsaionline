<?php

$con = mysqli_connect('127.0.0.1','root','');

if(!$con)
{
    echo 'Geen MYSQL Connectie, probeert u het later nog een keer.';
}

if(!mysqli_select_db($con,'blok1-am1a'))
{
    echo 'Database niet gevonden, probeert u het later nog een keer';
}

$postcode = mysqli_real_escape_string($con, $_POST['postcode']);
$straat = mysqli_real_escape_string($con, $_POST['straat']);
$woonplaats = mysqli_real_escape_string($con, $_POST['woonplaats']);


$sql = "INSERT INTO klanten (postcode, straathuisnummer, woonplaats) values ('$postcode','$straat','$woonplaats')";

if(!mysqli_query($con,$sql))
{
    echo 'uhh';
}
else
{
    echo 'done';
}


?>