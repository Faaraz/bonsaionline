<?php
$conn= new PDO('mysql:host=localhost;dbname=blok1-am1a', "root", "");
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$query2 = $conn->query("SELECT firstname FROM tempusers ORDER BY id DESC LIMIT 1");



$result = $query2->fetchColumn();

$query3 = $conn->query("SELECT lastname FROM tempusers ORDER BY id DESC LIMIT 1");


$results = $query3->fetchColumn();



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
                    <li class="active"><a href="http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=algemenehomepage">Home</a></li>
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
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span> Your Account</a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>
                </ul>
            </div>
        </div>
    </nav>
        <div class="container">
            <div class="row">
                <?php
                require_once("./classes/LoginClass.php");

                if (isset($_GET['id']) && isset($_GET['email']) && isset($_GET['password']))
                {

                if (LoginClass::check_if_activated($_GET['email'],$_GET['password']))
                {
                $action = "index.php?content=activate&id=".$_GET['id']."&email=".$_GET['email']."&password=".$_GET['password'];

                if (LoginClass::check_if_email_password_exists($_GET['email'], $_GET['password'], 'no'))
                {
                if (isset($_POST['submit']))
                {
                    $postcode = $_POST['postcode'];
                    $straat = $_POST['street'];
                    $woonplaats = $_POST['woonplaats'];
                    $seshid = $_GET['id'];
                    $voornaam = $_POST['voornaam'];
                    $achternaam = $_POST['achternaam'];

                    $sql = "INSERT INTO klanten (klantid, postcode, straathuisnummer, woonplaats, betaalwijze) values ('$seshid','$postcode','$straat','$woonplaats','paypal')";

                    $database->fire_query($sql);

                    $sql2 = "INSERT into users (id, item, firstname, infix, lastname) values ('$seshid',' ','$voornaam',' ','$achternaam')";

                    $database->fire_query($sql2);

                if ( !strcmp($_POST['password_1'], $_POST['password_2']))
                {

                LoginClass::activate_account_by_id($_GET['id']);
                LoginClass::update_password($_POST['id'], $_POST['password_1']);
                }
                else
                {
                echo "passwords komen niet overeen, probeer het nog een keer.";
                header("refresh:4;url=".$action);
                }
                }
                else
                {
                echo "<h3>
                    Uw account wordt geactiveerd.<br>
                    Kies een nieuw password
                </h3><br>";
                ?>
                <form action="<?php echo $action; ?>" method='post'>
                    Type hier uw nieuwe wachtwoord <input type='password' name='password_1' /><br>
                    type nogmaals uw wachtwoord (controle) <input type='password' name='password_2' /><br>
                    <input type='hidden' name='id' value='<?php echo $_GET['id']; ?>' />
                <br />

                    Vul hier uw klantengegevens aan: <br />
                    voornaam: <input type='text' name='voornaam' value="<?php echo $result;  ?>" /><br />
                    achternaam: <input type='text' name='achternaam' value="<?php echo $results; ?>" /><br />
                    postcode: <input type='text' name='postcode' /><br />
                    straat & huisnummer: <input type='text' name='street' /><br />
                    woonplaats: <input type='text' name='woonplaats' /><br />
                    <input type='submit' name='submit' />

                </form><?php
							}
						}
						else
						{
							echo "U heeft geen rechten op deze pagina. Uw email/password combi is niet correct of uw account is al geactiveerd. U wordt doorgestuurd naar de registratiepagina<br>";
							header("refresh:4;url=index.php?content=register_form");
						}
					}
					else
					{
						echo "Uw account is all geactiveerd of uw email/password combi is niet correct u heeft daarom geen rechten op deze pagina. U wordt doorgestuurd naar de registratiepagina<br>";
						header("refresh:4;url=index.php?content=register_form");
					}
				}
				else
				{
					echo "Uw url is niet correct en daarom heeft u geen rechten op deze pagina. U wordt doorgestuurd naar de registratiepagina<br>";
					header("refresh:4;url=index.php?content=register_form");
				}
				?>

            </div>
            
        </div>


			