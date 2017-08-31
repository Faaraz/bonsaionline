<?php
	if (isset($_POST['submit']))
	{
		include('connect_db.php');

		$sql= "UPDATE	`klant`
			   SET 		`naam`		=	'".$_POST['naam']."',
						`emailadres`	= 	'".$_POST['emailadres']."'
			   WHERE	`idKlant`			=	'".$_POST['idKlant']."';";

		$result = mysqli_query($connection, $sql);

		echo "Uw wijziging is verwerkt.
				U wordt doorgestuurd naar de vorige pagina";

		header("refresh:4;url=mysqli.php");

	}
	else
	{
?>
<h3>Wijzig de gegevens van een klant</h3>
<form action='update.php' method='post' />
	Naam:	<input type="text"
					   name="naam"
					   value='<?php echo $_GET['naam']; ?>' /><br>
	Email: <input type="text"
					   name="emailadres"
					   value='<?php echo $_GET['emailadres']; ?>' /><br>
				<input type="hidden"
					   name="idKlant"
					   value="<?php echo $_GET['idKlant']; ?>" /><br>
				<input type="submit" name="submit" />
</form>
<?php
	}
?>