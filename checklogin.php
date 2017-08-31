<?php
require_once("classes/LoginClass.php");
require_once("classes/SessionClass.php");


if ( !empty($_POST['email']) && !empty($_POST['password']))
{
	// Als email/password combi bestaat en geactiveerd....
	if (LoginClass::check_if_email_password_exists($_POST['email'],
			MD5($_POST['password']),
			'yes'))
	{
		$session->login(LoginClass::find_login_by_email_password($_POST['email'], 														  MD5($_POST['password'])));

		switch ($_SESSION['userrole'])
		{
			case 'customer':
				header("location:index.php?content=customerHomepage");
				break;
			case 'zaalbeheerder':
				header("location:index.php?content=verkoopleidsterHomepage");
				break;
			case 'root':
				header("location:index.php?content=rootHomepage");
				break;
			case 'photographer':
				header("location:index.php?content=photographerHomepage");
				break;
			case 'developer':
				header("location:index.php?content=developerHomepage");
				break;
			default :
				header("location:index.php?content=Login_form");
		}
	}
	else
	{
		echo "Uw email/password combi bestaat niet of uw account is niet geactiveerd.";
		header("refresh:4;url=index.php?content=Login_form");
	}
}
else
{
	echo "U heeft een van beide velden niet ingevuld, u wordt doorgestuurd<br>
			  naar de inlogpagina.";
	header("refresh:5;url=index.php?content=Login_form");
}
?>