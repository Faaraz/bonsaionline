<?php
$userrole = array("customer", "root", "administrator", "developer", "photographer");
require_once("./security.php");
?>
<?php
error_reporting(E_ALL ^ E_NOTICE);
include_once("config.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
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
                    <li>
                        <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemenehomepage">Home</a>
                    </li>
                    <li>
                        <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=videoverhuur">Producten</a>
                    </li>
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
                    <li>
                        <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/contact.html">Contact</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <?php
                    if (isset($_SESSION['userrole'])) {
                        echo " <li><a href='index.php?content=customerHomepage'><span class='glyphicon glyphicon-user'></span> Your Account</a></li>";

                    }
                    else {
                    }

                    ?>
                    <?php
                    if (isset($_SESSION['userrole'])) {
                        echo " <li class='active'><a href='http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=view_cart'><span class='glyphicon glyphicon-shopping-cart'></span> Cart</a></li>";

                    }
                    else {
                    }

                    ?>

                </ul>
            </div>
        </div>
    </nav>
    <h1 style="color:white;">Winkelmandje</h1>
    <div class="cart-view-table-back">
        <form method="post" action="cart_update.php">
            <table width="100%" cellpadding="6" cellspacing="0">
                <thead>
                    <tr>
                        <th>Aantal</th>
                        <th>Naam</th>
                        <th>Prijs</th>
                        <th>Totaal</th>
                        <th>Verwijder</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
            if(isset($_SESSION["cart_products"])) //check session var
            {
                $total = 0; //total value
                $b = 0; //var for zebra strepen tabel
                foreach ($_SESSION["cart_products"] as $cart_itm)
                {
//set variables to use in content below
                    //product_name = $cart_itm["product_name];
                    //$product_qty = $cart_itm["product_qty"]

                    $product_name = $cart_itm["product_name"];
                    $product_qty = $cart_itm["product_qty"];
                    $product_price = $cart_itm["product_price"];
                    $product_code = $cart_itm["product_code"];
//$product_color = $cart_itm["product_color"];
                    date_default_timezone_set('Europe/Amsterdam');
                    $now = date('Y-m-d H:i:s');
                    $open = '2017-08-22 11:00:00';
                    $close = '2017-08-22 13:00:00';


                    
                    if($product_price == '25.00' && $now > $open && $now < $close){

                        $product_price = '12.50';
                    }
                    //if($product_code = 'PD1005'){
                    //    $now = date('Y-m-d H:i:s');

                    //    $query5 = $conn->query("SELECT aantalKeerVerhuurd, product_code, product_name, product_desc, product_img_name, price, discountOpen, discountClose FROM products WHERE artikelvandedag = '1'");
                    //    //$date = new DateTime("now");
                    //    //$open = $query5['discountOpen'];
                    //    //$close = $query5['discountClose'];

                    //    $resultsklant = $query5->fetch;

                    //    var_dump($resultsklant);

                    //    if($now > $open && $now < $close){
                    //        $grand_total = '48.50';
                    //    }
                    //}
                    $subtotal = ($product_price * $product_qty); //Price x Qty
                    $bg_color = ($b++%2==1) ? 'odd' : 'even'; //class voor zebra strepen tabel
                    echo '<tr class="'.$bg_color.'">';
                    echo '<td><input type="text" size="2" maxlength="2" name="product_qty['.$product_code.']" value="'.$product_qty.'" /></td>';
                    echo '<td>'.$product_name.'</td>';
                    echo '<td>'.$product_price.' Euro</td>';
                    echo '<td>'.$subtotal.' Euro</td>';
                    echo '<td><input type="checkbox" name="remove_code[]" value="'.$product_code.'" /></td>';
                    echo '</tr>';
                    $total = ($total + $subtotal); //add subtotaal naar far
                }
                $grand_total = $total + $shipping_cost; //grand total = + verzendkosten
                foreach($taxes as $key => $value){ //alles samen in array
                    $tax_amount     = round($total * ($value / 100));
                    $tax_item[$key] = $tax_amount;
                    $grand_total    = $grand_total + $tax_amount;  //add tax val to grand total
                }
                $list_tax       = '';
                foreach($tax_item as $key => $value){ //List all taxes
                    $list_tax .= $key. ' : '. $currency. sprintf("%01.2f", $value).'<br />';
                }
                $shipping_cost = ($shipping_cost)?'Verzendkosten: '. sprintf("%01.2f", $shipping_cost).' Euro<br />':'';
            }
                    ?>
                    <tr>
                        <td colspan="5">
                            <span style="float:right;text-align: right;">
                                <?php echo $shipping_cost ?>Totaal: <?php echo sprintf("%01.2f Euro", $grand_total);?>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <a href="index.php?content=insertfavorites" class="button" style="font-size:12px; color:white;">Producten aan favorieten toevoegen</a>
                            <a href="index.php?content=videoverhuur" class="button" style="font-size:12px; color:white;">Voeg meer producten toe</a>
                            <button type="submit" style="font-size:12px;">Update</button>
                            <a href="index.php?content=datepicker" class="button" style="font-size:12px; color:white;">Checkout</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <input type="hidden" name="return_url" value="<?php
        $current_url = urlencode($url="http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
        echo $current_url; ?>" />
        </form>
    </div>

    <!--<form method="post" action="checkout.php">-->

</body>
</html>

<!-- indexer: off -->

