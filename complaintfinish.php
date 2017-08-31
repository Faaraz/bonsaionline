<?php
include_once("complaintsview.php");

$con = mysqli_connect('127.0.0.1','root','');

if(!$con)
{
    echo 'Geen MYSQL Connectie, probeert u het later nog een keer.';
}

if(!mysqli_select_db($con,'blok1-am1a'))
{
    echo 'Database niet gevonden, probeert u het later nog een keer';
}

$klachtid = mysqli_real_escape_string($con, $_POST['klachtid']);
$klachtjudgement = mysqli_real_escape_string($con, $_POST['klachtjudgement']);


$sql = "UPDATE klachten SET klachtbeoordeling = '$klachtjudgement' WHERE id = '$klachtid'";

if(!mysqli_query($con,$sql))
{
    echo 'Er is een probleem opgetreden, probeert u het later nog een keer';
    header("refresh:4; url=index.php?content=datepicker");
}
else
{
    echo '<br />';
    echo "Success ";
    $sql2 = "UPDATE klachten set klachtstatus = 'klaar' where id = '$klachtid'";
    if(!mysqli_query($con, $sql2)){
        echo "Probleem met het updaten van de klacht, probeer het later nog eens.";
    }
    header("refresh:5; url=index.php?content=favoritesview");
}


?>