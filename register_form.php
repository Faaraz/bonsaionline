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
                    <li class="active">
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
            if (isset($_POST['submit']))
            {
                require_once("./classes/LoginClass.php");
                if (LoginClass::check_if_email_exists($_POST['email']))
                {
                    echo "Het door u gebruikte emailadres is al in gebruik.<br>
				  Gebruik een ander emailadres. U wordt doorgestuurd naar<br>
				  het registratieformulier";
                    header("refresh:5;url=http://localhost/2014-2015/InlogRegistratieSysteem/Les%201/index.php?content=register_form");
                }
                else
                {
                    LoginClass::insert_into_database($_POST);
                }

                $firstname = $_POST['firstname'];
                $lastname = $_POST['lastname'];

                $conn= new PDO('mysql:host=localhost;dbname=blok1-am1a', "root", "");
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $query2 = $conn->query("INSERT into tempusers (firstname, lastname) VALUES('$firstname', '$lastname')");
            }
            
            else
            {
              
            ?>
					<style>
                        label{
                    display: inline-block;
                    float: left;
                    clear: left;
                    width: 250px;
                   
                }
                input {
                  display: inline-block;
                  float: left;
                }

                    </style>

					<h3>Registratieformulier</h3>
					<form action='index.php?content=register_form' method='post'>
						<label style="font-size:17px;">voornaam: </label> <input type='text' name='firstname' /><br>
						<label style="font-size:17px;">tussenvoegsel: </label> <input type='text' name='infix' /><br>
						<label style="font-size:17px;">achternaam: </label> <input type='text' name='lastname' /><br>
						<label style="font-size:17px;">email: </label> <input type='email' name='email' /><br>
                        <br />
                        <br />
						<input type='submit' name='submit' />
					</form>
                    <!--<form action="index.php?content=insertklant" class='myForms' method='post' id='secondform'>
                        postcode: <input type='text' name='postcode' /><br />
                        straat & huisnummer: <input type='text' name='straat' /><br />
                        woonplaats: <input type='text' name='woonplaats' /><br />
                    </form>-->
				     
					
					<?php
            }
                    ?>
        </div>
        <!--<script type="text/javascript">
            $('.myForms').submit(function () {
                console.log("");
                return true;
                })

                $("#clickMe").click(function () {
                    $(".myForms").trigger('submit'); // should show 3 alerts (one for each form submission)
                });
                </script>-->
    </div>
				

		
