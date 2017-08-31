<?php
	require("connect_db.php");
	
	// Maak je sql opdracht
	$sql = "DELETE FROM `user`
			WHERE `id` = '".$_GET['id']."'";
			
	$result = mysqli_query($connection, $sql);
	
	// Conditional operator (ternary operator) () ? :
	
	$yesOrNo = ($result) ? "" : "niet ";
	
	echo "Het verwijderen is ".$yesOrNo."gelukt.<br>
		  U wordt doorgestuurd naar de vorige pagina";
		  header("refresh:1;url=mysqli.php");
	
	
?>