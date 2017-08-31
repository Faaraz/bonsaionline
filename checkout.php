<?php
include_once("view_cart.php");
/*echo $shipping_cost ?>Totaal: <?php echo sprintf("%01.2f Euro", $grand_total);*/
//echo $product_qty;

error_reporting(E_ALL ^ E_WARNING); 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "blok1-am1a";

$seshid = $_SESSION['id'];

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE `products` SET `aantalKeerVerhuurd` = `aantalKeerVerhuurd` + '$product_qty' WHERE `product_name` = '$product_name'";



$con= new PDO('mysql:host=localhost;dbname=blok1-am1a', "root", "");
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql2 = "select id from orders where klantid = $seshid order by id desc LIMIT 1";

$result = $con->query($sql2);

$row = $result->fetch(PDO::FETCH_COLUMN);

if ($conn->query($sql) === TRUE) {
    echo "Bedankt voor uw bestelling, u vind uw orders terug in de orderview pagina. uw Order ID is: $row"; 
    header("refresh:5;url=http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemeneHomepage");
    $_SESSION["cart_products"] = null;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
$con = null;
?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Checkout</title>
    <link href="style/style1.css" rel="stylesheet" type="text/css"></head>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/resources/demos/style.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

</head>
<body>

</body>
</html>
