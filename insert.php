
<?php
session_start();

$con = mysqli_connect('127.0.0.1','root','');

if(!$con)
{
    echo 'Geen MYSQL Connectie, probeert u het later nog een keer.';
}

if(!mysqli_select_db($con,'blok1-am1a'))
{
    echo 'Database niet gevonden, probeert u het later nog een keer';
}

$name = mysqli_real_escape_string($con, $_POST['username']);
$an = mysqli_real_escape_string($con, $_POST['anaam']);
$bd = mysqli_real_escape_string($con, $_POST['bdatum']);
$bt = mysqli_real_escape_string($con, $_POST['btijd']);
$productnaam = mysqli_real_escape_string($con, $_POST['fnaam']);
$productcode = mysqli_real_escape_string($con, $_POST['pcode']);
$price = mysqli_real_escape_string($con, $_POST['prijs']);
$seshid = $_SESSION['id'];
date_default_timezone_set('Europe/Amsterdam');
$createddate = date('Y-m-d H:i:s');
$usercomments = mysqli_real_escape_string($con, $_POST['usercomments']);


$sql = "INSERT INTO orders (klantid, createdAt, name, surname, bezorgdatum, bezorgtijd, productnaam, productcode, price, usercomments) values ('$seshid', '$createddate', '$name', '$an','$bd', '$bt', '$productnaam','$productcode','$price','$usercomments')";

if(!mysqli_query($con,$sql))
{
    echo 'De gekozen tijd is al gereserveerd door een andere klant! U wordt teruggestuurd naar het formulier<br><br>';
    echo 'Ophaaltijd '; echo($bt); echo '<br>Bezorgtijd ';
    header("refresh:4; url=index.php?content=datepicker");
}
else
{
    echo "Bedankt voor uw bestelling! ";
    header("refresh:0.1; url=index.php?content=checkout");
}


?>

