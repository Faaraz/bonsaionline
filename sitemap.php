<?php
session_start();
?>
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
                   <li class="active">
                       <a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les 1/sitemap">Sitemap</a>
                   </li>
                </ul>
            </div>
        </div>
    </nav>

    <?php
    if (isset($_SESSION['userrole'])) {
        if($_SESSION['userrole'] == 'customer') {
            echo "<div id='layout' class='clearfix'>
    <section id='layout-content'>
        <h2>Bonsai Online sitemap</h2>
        <h3>Algemene Pagina's</h3>
        <ul>
            <li>
                <a href='index.php?content=algemenehomepage'>Home Page</a>
            </li>
            <li>
                <a href='index.php?content=termsofuse'>Terms of Use</a>
            </li>
            <li>
                <a href='index.php?content=bestelprocedure'>Bestel Procedure</a>
            </li>
            <li>
                <a href='index.php?content=videoverhuur'>Producten</a>
            </li>
            <li>
                <a href='index.php?content=register_form'>Registreren</a>
            </li>
            <li>
                <a href='index.php?content=login_form'>Inloggen</a>
            </li>
            <li>
                <a href='index.php?content=contact'>Contact</a>
            </li>
            <li>
                <a href='index.php?content=customerHomepage'>Account Portaal</a>
            </li>
            <li>
                <a href='index.php?content=view_cart'>Winkelmandje bekijken</a>
            </li>

        </ul>
        <h3>Account Portaal pagina's</h3>
        <ul>
            <li>
                <a href='index.php?content=wijzig_wachtwoord'>Wachtwoord wijzigen</a>
            </li>
            <li>
                <a href='index.php?content=klachtaanmaken'>Klacht aanmaken</a>
            </li>
            <li>
                <a href='index.php?content=klachtview'>Klachten bekijken</a>
            </li>
            <li>
                <a href='index.php?content=favoritesview'>Favorieten bekijken</a>
            </li>
            <li>
                <a href='index.php?content=orderview'>Orders bekijken</a>
            </li>
            <li>
                <a href='index.php?content=customerHomepage'>Account Portaal</a>
            </li>
        </ul>";
        }
        else if($_SESSION['userrole'] == 'zaalbeheerder') {
            echo "<ul>
            <li>
                <a href='index.php?content=algemenehomepage'>Home Page</a>
            </li>
            <li>
                <a href='index.php?content=termsofuse'>Terms of Use</a>
            </li>
            <li>
                <a href='index.php?content=bestelprocedure'>Bestel Procedure</a>
            </li>
            <li>
                <a href='index.php?content=videoverhuur'>Producten</a>
            </li>
            <li>
                <a href='index.php?content=register_form'>Registreren</a>
            </li>
            <li>
                <a href='index.php?content=login_form'>Inloggen</a>
            </li>
            <li>
                <a href='index.php?content=contact'>Contact</a>
            </li>
            <li>
                <a href='index.php?content=customerHomepage'>Account Portaal</a>
            </li>
            <li>
                <a href='index.php?content=view_cart'>Winkelmandje bekijken</a>
            </li>

        </ul>
           <h3>Account Portaal pagina's</h3>
        <ul>
            <li>
                <a href='index.php?content=wijzig_wachtwoord'>Wachtwoord wijzigen</a>
            </li>
            <li>
                <a href='index.php?content=complaintsview'>Openstaande klachten beoordelen</a>
            </li>
            <li>
                <a href='index.php?content=verkoopleidsterHomepage'>Account Portaal</a>
            </li>
        </ul>";
        }
    }
    ?>
