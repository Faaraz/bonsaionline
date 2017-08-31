<?php
include_once("view_cart.php");
$userrole = array("customer", "root", "administrator", "developer", "photographer");
require_once("./security.php");
error_reporting(E_ALL ^ E_WARNING);
$con = mysqli_connect('127.0.0.1','root','');

if(!$con)
{
    echo 'Geen MYSQL Connectie, probeert u het later nog een keer.';
}

if(!mysqli_select_db($con,'blok1-am1a'))
{
    echo 'Database niet gevonden, probeert u het later nog een keer';
}

//$productname = mysqli_real_escape_string($con, $product_name);
//$productcode = mysqli_real_escape_string($con, $product_code);
$seshid = mysqli_real_escape_string($con, $_SESSION['id']);

foreach($_SESSION["cart_products"] as $value){

$productcodeinsert = $value['product_code'];
$productnameinsert = $value['product_name'];

$sql = "INSERT INTO favorieten (klantid, ProductCode, ProductNaam) values ('$seshid','$productcodeinsert','$productnameinsert')";


if(!mysqli_query($con,$sql))
{
    echo 'Uw producten konden niet worden toegevoegd, probeert u het later nog eens';
    header("refresh:4; url=index.php?content=view_cart");
}
else
{
    echo "Uw producten zijn succesvol toegevoegd aan uw favorieten, u vind uw favorieten terug in uw klanten portaal.";
    header("refresh:5; url=index.php?content=customerHomepage");

}

}




?>