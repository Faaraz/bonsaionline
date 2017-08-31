<?php
	if (isset($_POST['submit']))
	{
		include('connect_db.php');
		
		$sql= "UPDATE	`user` 
			   SET 		`voornaam`		=	'".$_POST['voornaam']."',
						`tussenvoegsel`	= 	'".$_POST['tussenvoegsel']."',
						`achternaam`	=	'".$_POST['achternaam']."'
			   WHERE	`id`			=	'".$_POST['id']."';";
		
		$result = mysqli_query($connection, $sql);
		
		echo "Uw wijziging is verwerkt. 
				U wordt doorgestuurd naar de vorige pagina"; 
		
		header("refresh:4;url=mysqli.php");
		
	}
	else
	{
?>
<h3>Wijzig de gegevens</h3>
<form action='update.php' method='post' />
	voornaam:	<input type="text"
					   name="voornaam" 
					   value='<?php echo $_GET['voornaam']; ?>' /><br>
	tussenvoegsel: <input type="text"
					   name="tussenvoegsel" 
					   value='<?php echo $_GET['tussenvoegsel']; ?>' /><br>
	achternaam:	<input type="text" 
					   name="achternaam" 
					   value='<?php echo $_GET['achternaam']; ?>' /><br>
				<input type="hidden"
					   name="id"
					   value="<?php echo $_GET['id']; ?>" /><br>
				<input type="submit" name="submit" />
</form>
<?php
	}
?>