<?php
include_once("favoritesview.php");

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


$sql = "DELETE FROM favorieten WHERE klantid = '$seshid' and ProductCode = '$productcode' ";

if(!mysqli_query($con,$sql))
{
    echo 'Er is een probleem opgetreden, probeert u het later nog een keer';
    header("refresh:4; url=index.php?content=datepicker");
}
else
{
    echo '<br />';
    echo "Uw favoriet is succesvol verwijderd ";
    header("refresh:5; url=index.php?content=favoritesview");
}


?>