<?php
session_start();
$userrole = array("customer", "root", "administrator", "developer", "photographer");
require_once("./security.php");

include_once("config.php");
$link = mysqli_connect("localhost", "root", "", "blok1-am1a");

// Escape user inputs for security

$name = mysqli_real_escape_string($link, $_REQUEST['customer_name']);
$customerid = mysqli_real_escape_string($link, $_SESSION['id']);
$email = mysqli_real_escape_string($link, $_REQUEST['email_address']);
$enquirysubject = mysqli_real_escape_string($link, $_REQUEST['enquiry_subject']);
$customercomments = mysqli_real_escape_string($link, $_REQUEST['customer_comments']);
$ordernumber = mysqli_real_escape_string($link, $_REQUEST['order_number']);



// attempt insert query execution

$sql = "INSERT INTO klachten (naam, klantid, email, klachtreden, klacht, ordernummer, klachtstatus, klachtbeoordeling) VALUES ('$name', '$customerid', '$email', '$enquirysubject', '$customercomments', '$ordernumber','openstaand',' ')";

if(mysqli_query($link, $sql)){

    echo "Uw klacht is verwerkt in ons systeem, op uw 'bekijk klachten' pagina vind u uw geplaatste klachten terug, u word doorgestuurd naar het account portaal";
    header("refresh:5;url=index.php?content=customerHomepage");

} else{

    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);

}



// close connection

mysqli_close($link);

?>