<?php
include_once("artikelvandedag.php");

$con = mysqli_connect('127.0.0.1','root','');

if(!$con)
{
    echo 'Geen MYSQL Connectie, probeert u het later nog een keer.';
}

if(!mysqli_select_db($con,'blok1-am1a'))
{
    echo 'Database niet gevonden, probeert u het later nog een keer';
}

$productcode = mysqli_real_escape_string($con, $_POST['pcode']);
$seshid = $_SESSION['id'];


$sql = "UPDATE products set artikelvandedag = 1 WHERE product_code = '$productcode' ";

if(!mysqli_query($con,$sql))
{
    echo 'Er is een probleem opgetreden, probeert u het later nog een keer';
    header("refresh:4; url=index.php?content=datepicker");
}
else
{
    echo '<br />';
    echo "Artikel van de dag succesvol aangemaakt";
    header("refresh:5; url=index.php?content=artikelvandedag");
}


?>