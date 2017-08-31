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
                    <li class="active"><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=bestelprocedure">Bestelprocedure</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=videoverhuur">Producten</a></li>
                    
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
    <div style="text-align:right;";>Are you english? Click on the british flag icon to view this page in english.  <br /><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=orderprocedure"><img src="./img/english.png" style="width:70px; height:70px;"></a> </div>
    <h1>Bestel Procedure</h1>
    <br />
    <div>
    Bij het registreren op de pagina wordt uw betaalmethode vastgelegd (paypal), na registratie en activatie van uw account kunt u producten bestellen op de producten pagina. <br />
    Uw producten worden in een winkelmandje geplaatst, tijdens het bestellen word u gevraagd een bezorgdatum en bezorgtijd voor uw producten te kiezen.<br /><br />

    Na het aanmaken van een order kunt u uw order bekijken in uw klantenportaal (onder orders bekijken).


    </div>
