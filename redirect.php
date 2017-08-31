<?php
	if (isset($_GET["content"]))
	{
		//echo $_GET["content"].".php";exit();
		include($_GET["content"].".php");
	}
	else
	{
		include("algemeneHomepage.php");
	}
?>