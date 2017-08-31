<?php session_start(); ?>
<!DOCTYPE html>
<html>
	<head>
		<title>SESSION array</title>
	</head>
	<body>
		<h3>Dit is een test: kan ik het $_POST array overal opvragen?</h3>
		<?php
			echo "De ingevulde naam is: ".$_SESSION['voornaam']
										 ." "
										 .$_SESSION['tussenvoegsel']
										 ." "
										 .$_SESSION['achternaam']."<br>"
										 .$_SESSION['zomaar'];
		?>		
	</body>
</html>