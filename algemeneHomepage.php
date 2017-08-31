<?php
if($_SERVER["REMOTE_ADDR"] = '127.0.0.01')
{
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
                    <li class="active"><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemenehomepage">Home</a></li>
                     <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=termsofuse">Terms of Use</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=bestelprocedure">Bestelprocedure</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=videoverhuur">Producten</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=artikelvandedagklant">Artikel van de dag</a></li>
                    
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
    <h1 style="text-align:center">Acties!</h1> <div style="text-align:right;";>Are you english? Click on the british flag icon to view this page in english.  <br /><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=englishhomepage"><img src="./img/english.png" style="width:70px; height:70px;"></a> </div>
    <br />
    <br />

    <div class="container">
        <h4>Voor Pasen hebben de volgende producten 10% korting!</h4>
        <div class="row">
            <div class="col-sm-3">
                <div class="panel panel-primary">
                    <div class="panel-heading">Carmona Macrophylla</div>
                    <div class="panel-body">
                    <img src="./img/CarmonaActie.jpg" class="img-responsive" style="width:100%" alt="Image" /></div>
                    <div class="panel-footer"> <img src="./img/actie.png" style="width:60%" alt="Image" /></div></div>
                </div>
            </div>
        <div class="row">
            <div class="col-sm-3">
                <div class="panel panel-primary">
                    <div class="panel-heading">Acer Palmatum</div>
                    <div class="panel-body"><img src="./img/AcerActie.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
                   <div class="panel-footer"> <img src="./img/actie.png" style="width:60%" alt="Image" /></div></div>
                </div>
            </div>
            </div>
    </div><br><br>
    <br /><br /><br />
        <br />
        <br />
        <br />
        

    <footer class="container-fluid text-center">
        <p>Bonsai Online 2017</p>
        <form class="form-inline">
       
        </form>
    </footer>

</body>
</html>
<?php
} else {
    ?>

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
                    <li class="active"><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemenehomepage">Home</a></li>
                     <li><a href="https://bonsaionline.herokuapp.com/index.php?content=termsofuse">Terms of Use</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=bestelprocedure">Bestelprocedure</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=videoverhuur">Producten</a></li>
                    <li><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=artikelvandedagklant">Artikel van de dag</a></li>
                    
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
    <h1 style="text-align:center">Acties!</h1> <div style="text-align:right;";>Are you english? Click on the british flag icon to view this page in english.  <br /><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=englishhomepage"><img src="./img/english.png" style="width:70px; height:70px;"></a> </div>
    <br />
    <br />

    <div class="container">
        <h4>Voor Pasen hebben de volgende producten 10% korting!</h4>
        <div class="row">
            <div class="col-sm-3">
                <div class="panel panel-primary">
                    <div class="panel-heading">Carmona Macrophylla</div>
                    <div class="panel-body">
                    <img src="./img/CarmonaActie.jpg" class="img-responsive" style="width:100%" alt="Image" /></div>
                    <div class="panel-footer"> <img src="./img/actie.png" style="width:60%" alt="Image" /></div></div>
                </div>
            </div>
        <div class="row">
            <div class="col-sm-3">
                <div class="panel panel-primary">
                    <div class="panel-heading">Acer Palmatum</div>
                    <div class="panel-body"><img src="./img/AcerActie.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
                   <div class="panel-footer"> <img src="./img/actie.png" style="width:60%" alt="Image" /></div></div>
                </div>
            </div>
            </div>
    </div><br><br>
    <br /><br /><br />
        <br />
        <br />
        <br />
        

    <footer class="container-fluid text-center">
        <p>Bonsai Online 2017</p>
        <form class="form-inline">
       
        </form>
    </footer>

</body>
</html>
<?php
}

?>

