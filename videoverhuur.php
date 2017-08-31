<!DOCTYPE html>
<html lang="en">
<head>
    <title>Bootstrap Example</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="style/style.css" rel="stylesheet" type="text/css">
    <style>
        /* Remove the navbar's default rounded borders and increase the bottom margin */
        .navbar {
            margin-bottom: 50px;
            border-radius: 0;
        }

        /* Remove the jumbotron's default bottom margin */
        .jumbotron {
           margin-bottom:0;
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
                    <li class="active"><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=videoverhuur">Producten</a></li>
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
                    ?> <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/index.php?content=Login_form">Inloggen</a></li> <?php
                    }

                                                                                                                                             ?>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/contact.html">Contact</a></li>
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
                        echo " <li><a href='http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=view_cart'><span class='glyphicon glyphicon-shopping-cart'></span> Cart</a></li>";

                    }
                    else {
                    }

                    ?>
                   
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
           
<?php
include_once("config.php");
$current_url = urlencode($url="http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
?>

<h1>Producten</h1>
 <form method="post" action="index.php?content=videoverhuur">
     <input type="text" name="search" />
     <input type="submit" name="submitsearch" value="Zoeken" />
 </form>
<?php
if(isset($_SESSION["cart_products"]) && count($_SESSION["cart_products"])>0)
{
    echo '<div class="cart-view-table-front" id="view-cart">';
    echo '<h3>Winkelmandje</h3>';
    echo '<form method="post" action="cart_update.php">';
    echo '<table width="100%"  cellpadding="6" cellspacing="0">';
    echo '<tbody>';
    $total =0;
    $b = 0;
    foreach ($_SESSION["cart_products"] as $cart_itm)
    {
        //foreach ($_SESSION["cart_products"] as $cart_itm
        $product_name = $cart_itm["product_name"];
        $product_qty = $cart_itm["product_qty"];
        $product_price = $cart_itm["product_price"];
        $product_code = $cart_itm["product_code"];
        //$product_color = $cart_itm["product_color"];
        $bg_color = ($b++%2==1) ? 'odd' : 'even'; //zebra stripe
        echo '<tr class="'.$bg_color.'">';
        echo '<td>Aantal <input type="text" size="2" maxlength="2" name="product_qty['.$product_code.']" value="'.$product_qty.'" /></td>';
        echo '<td>Product: '.$product_name.'</td>';
        //echo '<td>Verwijder<input type="checkbox" name="remove_code[]" value="'.$product_code.'" /> </td>';
        echo '</tr>';
        $subtotal = ($product_price * $product_qty);
        $total = ($total + $subtotal);
    }
    echo '<td colspan="4">';
    echo '<button type="submit">Update</button><a href="index.php?content=view_cart" class="button" style="font-size:12px; color:white;">Kassa</a>';
    echo '</td>';
    echo '</tbody>';
    echo '</table>';
    $current_url = urlencode($url="http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);
    echo '<input type="hidden" name="return_url" value="'.$current_url.'" />';
    echo '</form>';
    echo '</div>';
}
?>
<?php
if(isset($_POST['submitsearch'])){
    if(preg_match("/[A-Z  | a-z]+/", $_POST['search'])){ 
        $name=$_POST['search']; 

        $sqlresult = $mysqli->query("SELECT aantalKeerVerhuurd, product_code, product_name, product_desc, product_img_name, price from products WHERE product_name LIKE '%" . $name .  "%' OR product_code LIKE '%" . $name ."%' OR product_desc LIKE '%" . $name ."%'"); 

        if($sqlresult) {
            $products_item = '<ul class="products">';

            while($obj = $sqlresult->fetch_object()){
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
<div align="center"><button type="submit" class="add_to_cart">Toevoegen</button></div>
</div></div>
</form>
</li>
EOT;
            }
            $products_item .= '</ul>';
            echo $products_item;
        } 

        }
    } else {
    $results = $mysqli->query("SELECT aantalKeerVerhuurd, product_code, product_name, product_desc, product_img_name, price FROM products ORDER BY id ASC");
    if($results){
        $products_item = '<ul class="products">';

        while($obj = $results->fetch_object())
        {
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
<div align="center"><button type="submit" class="add_to_cart">Toevoegen</button></div>
</div></div>
</form>
</li>
EOT;
        }
        $products_item .= '</ul>';
        echo $products_item;
    }
}

?>


           
            </div>
        </div>
