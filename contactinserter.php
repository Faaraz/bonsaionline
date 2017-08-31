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


$name = mysqli_real_escape_string($con, $_POST['customer_name']);
$email = mysqli_real_escape_string($con, $_POST['email_address']);
$comments = mysqli_real_escape_string($con, $_POST['comments']);

$sql = "INSERT INTO contact (naam, email, vraag) values ('$name', '$email', '$comments')";

if(!mysqli_query($con,$sql))
{
    echo 'Er is een fout opgetreden, probeert u het later nogmaals<br><br>';
    header("refresh:4; url=index.php?content=algemeneHomepage");
}
else
{
    echo 'Uw contactaanvraag is verstuurd, u ontvangt binnenkort een e-mail met nadere informatie<br><br>';
    header("refresh:4; url=index.php?content=algemeneHomepage");
}

?>