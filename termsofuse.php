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
                    <li class="active"><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemenehomepage">Terms of Use</a></li>
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
                         ?><?php
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
                <ul class="nav navbar-nav navbar-right"><?php
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
                                                        ?><?php
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
    <div class="container">
       <h1> TERMS OF SERVICE </h1>

       SERVICEVOORWAARDEN
OVERZICHT
Deze website wordt beheerd door Bonsai Online. Over de hele site verwijzen de termen  we ,  us  en  our to naar Bonsai Online. Bonsai Online biedt deze website, inclusief alle informatie, gereedschappen en diensten die beschikbaar zijn vanaf deze site aan u, de gebruiker, op de hoogte van uw acceptatie van alle voorwaarden, voorwaarden, beleid en mededelingen die hier vermeld worden. Door onze website te bezoeken en / of iets van ons te kopen, gaat u deel aan onze  Service  en gaat u akkoord met de volgende voorwaarden ( Terms of Service  Terms ), inclusief deze aanvullende voorwaarden en beleidslijnen Hierin verwezen en / of beschikbaar via hyperlink. Deze gebruiksvoorwaarden zijn van toepassing op alle gebruikers van de site, inclusief zonder beperking gebruikers die browsers, verkopers, klanten, handelaren en / of contributors van inhoud zijn.
Lees deze gebruiksvoorwaarden zorgvuldig door voordat u toegang krijgt tot onze website. Door toegang te krijgen tot of gebruik te maken van een deel van de site, gaat u akkoord om gebonden te zijn aan deze gebruiksvoorwaarden. Als u niet akkoord gaat met alle voorwaarden van deze overeenkomst, dan mag u de website niet gebruiken of diensten gebruiken. Als deze gebruiksvoorwaarden een aanbod worden beschouwd, is de acceptatie uitdrukkelijk beperkt tot deze gebruiksvoorwaarden.
Alle nieuwe functies of gereedschappen die bij de huidige winkel worden toegevoegd, zijn ook onderworpen aan de gebruiksvoorwaarden. U kunt de meest actuele versie van de gebruiksvoorwaarden te allen tijde op deze pagina bekijken. Wij behouden ons het recht voor om een ​​deel van deze gebruiksvoorwaarden bij te werken, te wijzigen of te vervangen door updates en / of wijzigingen aan onze website te plaatsen. Het is uw verantwoordelijkheid om deze pagina periodiek te controleren voor wijzigingen. Uw voortdurende gebruik of toegang tot de website na de indiening van wijzigingen vormt de aanvaarding van die wijzigingen.
Onze winkel is gehost op Shopify Inc. Ze bieden ons het online e-commerce platform waarmee wij onze producten en diensten aan u kunnen verkopen.


        
      
    </div>