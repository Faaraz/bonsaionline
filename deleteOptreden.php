<?php
require("connect_db.php");

$sql = "DELETE FROM `optreden`
			WHERE `id` = '".$_GET['id']."'";

$result = mysqli_query($connection, $sql);

$Truthfalse = ($result) ? "" : "mislukt ";

echo "Het verwijderen is ".$Truthfalse."gelukt.<br>
		  U wordt doorgestuurd naar de zaalbeheer pagina";
header("refresh:5;index.php?content=administratorHomepage");


?>