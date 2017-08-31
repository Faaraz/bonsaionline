<?php
$userrole = array("customer", "root", "administrator", "developer", "photographer");
require_once("./security.php");

include_once("view_cart.php");


foreach($_SESSION['cart_products'] as $value){

    $allproductnames[] = $value['product_name'];
    $allproductcodes[] = $value['product_code'];

}

$name = $_POST['username'];
$an = $_POST['anaam'];
$bd = $_POST['bdatum'];
$bt = $_POST['btijd'];
$productnaam = $_POST['fnaam'];
$productcode = $_POST['pcode'];
$price = $_POST['prijs'];
$usercomments = $_POST['usercomments'];



?>


<div class="column middle">
    <!-- indexer: on -->
            <h1>Kloppen uw gegevens?</h1>
            <!DOCTYPE html>

            <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <link href="style/style1.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
                <style>
                    form {
                        margin: 0 auto;
                        text-align: center;
                    }

             
                </style>

                <form action="insert.php" method="post">

                    <br />Voornaam:
                    <br />
                    <input type="text" name="username" value="<?php echo htmlspecialchars($name); ?>" style="background-color:white; width:20%;" />

                    <br />Achternaam:
                    <br />
                    <input type="text" name="anaam" value="<?php echo htmlspecialchars($an); ?>" style="background-color:white; width:20%;" />

                    <br />Bezorgdatum:
                    <br />
                    <input type="date" name="bdatum" value="<?php echo htmlspecialchars($bd); ?>" min="2017-05-25" style="background-color:white; width:20%;" />

                    <br />Bezorgtijd:
                    <br />
                    <input type="time" name="btijd" value="<?php echo htmlspecialchars($bt); ?>" min="09:00" style="background-color:white; width:20%;" />

                    <br />Product naam:
                    <br />
                    <input type="text" name="fnaam" value="<?php echo implode(', ',$allproductnames); ?>" style="background-color:white; width:20%;" />

                    <br />Product code:
                    <br />
                    <input type="text" name="pcode" value="<?php echo implode(', ',$allproductcodes); ?>" style="background-color:white; width:20%;" />

                    <br />Prijs:
                    <br />
                    <input type="text" name="prijs" value="<?php echo htmlspecialchars($grand_total); ?>" style="background-color:white; width:20%;" />
                    <br />
                    <br />
                    
                    Opmerkingen <br />
                    <textarea rows="4" cols="50" name="usercomments" placeholder="<?php echo htmlspecialchars($usercomments); ?>" value="<?php echo htmlspecialchars($usercomments); ?>"></textarea>
                    <br />

                    <input type="submit" value="Bestellen" />

                    <br />

                    
                </form>
                <br />
                
                <input type="submit" style="margin-left:48%;" value="Annuleren" onClick="document.location.href='http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=view_cart';" />
               
    </div>
</div>