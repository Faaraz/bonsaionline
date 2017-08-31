<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="style/style.css" rel="stylesheet" type="text/css" />
    <style>
        /* Remove the navbar's default rounded borders and increase the bottom margin */
        .navbar {
            margin-bottom: 50px;
            border-radius: 0;
        }

        /* Remove the jumbotron's default bottom margin */
        .jumbotron {
            margin-bottom: 0px;
        }

        /* Add a gray background color and some padding to the footer */
        footer {
            background-color: #f2f2f2;
            padding: 25px;
        }
    </style>
</head>
<body>

    <div class="jumbotron">
        <div class="container text-center">
            <h1>Bonsai Shop Online</h1>
            <p>Snel en gemakkelijk</p>
        </div>
    </div>

    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Logo</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemenehomepage">Home</a></li>
                     <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=termsofuse">Terms of Use</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=bestelprocedure">Bestelprocedure</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=videoverhuur">Producten</a></li>
                    <li class="active"><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=artikelvandedagklant">Artikel van de dag</a></li>
                    
                    <?php
                    if (isset($_SESSION['userrole'])) {


                    }
                    else{
                    ?>
                    <li>
                        <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/index.php?content=register_form">Registreren</a>
                    </li><?php
                    }

                         ?>
                    <?php
                    if (isset($_SESSION['userrole'])) {
                        echo "<li><a href='index.php?content=logout'>Uitloggen</a></li>";

                    }
                    else{
                    ?>
                    <li>
                        <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/index.php?content=Login_form">Inloggen</a>
                    </li><?php
                    }

                         ?>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/contact.html">Contact</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <?php
                    if (isset($_SESSION['userrole'])) {
                        if($_SESSION['userrole'] == 'customer') {
                            echo " <li><a href='index.php?content=customerHomepage'><span class='glyphicon glyphicon-user'></span> Your Account</a></li>";
                        }
                        else {
                            echo "<li><a href='index.php?content=verkoopleidsterHomepage'><span class='glyphicon glyphicon-user'></span>Your Account</a></li>";
                        }
                    }
                    else {
                    }

                    ?>
                    <?php
                    if (isset($_SESSION['userrole'])) {
                        echo " <li><a href='http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=view_cart'><span class='glyphicon glyphicon-shopping-cart'></span> Cart</a></li>";

                    }
                    else {
                    }

                    ?>
                    <li>
                        <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/sitemap">Sitemap</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <h1>Artikel van de dag</h1>
    <div>Hieronder vind u het artikel van de dag, dit artikel is van 11:00 tot 13:00 50% afgeprijsd bij bestelling van 2 artikelen</div>
<?php
date_default_timezone_set('Europe/Amsterdam'); // CDT
include_once("config.php");
$current_url = urlencode($url="http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
//$info = getdate();
//$date = $info['mday'];
//$month = $info['mon'];
//$year = $info['year'];
//$hour = $info['hours'];
//$min = $info['minutes'];
//$sec = $info['seconds'];

//$current_date = " $hour:$min";

//echo $current_date;

$results = $mysqli->query("SELECT aantalKeerVerhuurd, product_code, product_name, product_desc, product_img_name, price, discountOpen, discountClose FROM products WHERE artikelvandedag = '1' ORDER BY id ASC");
if($results){
    $products_item = '<ul class="products">';

    while($obj = $results->fetch_object())
    {
        $now = date('Y-m-d H:i:s');

  
        $date = new DateTime("now");
        $open = $obj->discountOpen;
        $close = $obj->discountClose;
        
      
        if($now > $open && $now < $close){
            $obj->price = '12.50';
        }
        $products_item .= <<<EOT
<li class="product">
<form method="post" action="cart_update.php">
<div  class="product-content"><h3>{$obj->product_name}</h3>
<div  class="product-thumb" ><img src = "img/{$obj->product_img_name}" ></div>
<div  class="product-desc">{$obj->product_desc}</div>
<div class="product-info">
Prijs {$obj->price} euro
<fieldset>
<label>
<span>Aantal</span>
<input type="text" size="2" maxlength="2" name="product_qty" value="1" />
</label>
</fieldset>
<input type="hidden" name="product_code" value="{$obj->product_code}" />
<input type="hidden" name="type" value="add" />
<input type="hidden" name="return_url" value="{$current_url}" />

</div></div>
</form>
</li>
EOT;
        
    }
    $products_item .= '</ul>';
    echo $products_item;
}

?>