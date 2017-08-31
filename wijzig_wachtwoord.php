<?php
$userrole = array("customer", "root", "administrator", "developer", "photographer");
require_once("./security.php");
?>
<?php
$userrole = array("customer", "root", "administrator", "developer", "photographer");
require_once("./security.php");
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
                        echo " <li class='active'><a href='index.php?content=customerHomepage'><span class='glyphicon glyphicon-user'></span> Your Account</a></li>";

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
            $userrole = array("customer");
            require_once("./security.php");


            if (isset($_POST['submit']))
            {
                require_once("classes/LoginClass.php");

                if (LoginClass::check_old_password($_POST['oude_wachtwoord']))
                {
                    //echo "Goede wachtwoord";
                    if (!strcmp($_POST['nieuw_wachtwoord'], $_POST['controle_wachtwoord']))
                    {
                        LoginClass::update_password($_SESSION['id'],$_POST['nieuw_wachtwoord']);
                        header("refresh:5;url=index.php?content=customerHomepage");
                    }
                    else
                    {
                        echo "U heeft u nieuwe wachtwoord de tweede keer verkeerd ingevoerd. Probeer het nog een keer";
                        header("refresh:5;url=index.php?content=wijzig_wachtwoord");
                    }
                }
                else
                {
                    echo "Uw heeft uw huidige wachtwoord verkeerd ingevoerd. Probeer het opnieuw";
                    header("refresh:5;url=index.php?content=wijzig_wachtwoord");
                }
            }
            else
            {
            ?>
            <p><h3>Wijzig uw wachtwoord</h3></p>
            <form action='index.php?content=wijzig_wachtwoord' method='post'>

                Geef het oude wachtwoord:
                <input type='password' name='oude_wachtwoord' required><br>
                Geef het nieuwe wachtwoord:
                <input type='password' name='nieuw_wachtwoord' required><br>
                Geef nogmaals uw nieuwe wachtwoord:
                <input type='password' name='controle_wachtwoord' required><br>
                <input type='submit' name='submit' value='verzenden'>
            </form>
            <?php
            }
            ?>
        </div>
    </div>
      