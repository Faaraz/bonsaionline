<?php
$userrole = array("customer", "root", "administrator", "developer", "zaalbeheerder");
require_once("./security.php");


error_reporting(E_ALL ^ E_WARNING); 
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

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 80%;
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
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
                        echo " <li class='active'><a href='index.php?content=verkoopleidsterHomepage'><span class='glyphicon glyphicon-user'></span> Your Account</a></li>";

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
    <h1>Artikel van de dag kiezen</h1>



<?php

if (isset($_POST["search_type"]) && !empty($_POST["search_type"])) {
    $conn= new PDO('mysql:host=localhost;dbname=blok1-am1a', "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query2 = "SELECT * FROM klachten order by klachtstatus asc";

    print "<table>";
    $result = $conn->query($query2);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    print " <tr>";
    foreach ($row as $field => $value){
        print " <th>$field</th>";
    } 
    print " </tr>";

    $data = $conn->query($query2);
    $data->setFetchMode(PDO::FETCH_ASSOC);
    foreach($data as $row){
        print " <tr>";
        foreach ($row as $name=>$value){
            print " <td>$value</td>";
        } 
        print " </tr>";
    } 
    print "</table>";
}  else{ 
    try {
        $con= new PDO('mysql:host=localhost;dbname=blok1-am1a', "root", "");
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$sessionid = $_SESSION['id'];
        $query = "SELECT * FROM products order by id asc";
        
        print "<table>";
        $result = $con->query($query);

        $row = $result->fetch(PDO::FETCH_ASSOC);
        print " <tr>";
        foreach ($row as $field => $value){
            print " <th>$field</th>";
        } 
        print " </tr>";

        $data = $con->query($query);
        $data->setFetchMode(PDO::FETCH_ASSOC);
        foreach($data as $row){
            print " <tr>";
            foreach ($row as $name=>$value){
                print " <td>$value</td>";
            } 
            print " </tr>";
        } 
        print "</table>";
    }
    catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    } 

}
?>

    <div>
        <form action="index.php?content=finalizedailyartikel" method="post">
            <br>Product code:<br><input type="text" name="pcode">
            <input type='submit' value='Kiezen' name='submit' />
        </form>

    </div>














?>