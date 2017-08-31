<?php
//session_start();
if ( !isset( $_SESSION['id']))
{
	echo "U bent niet ingelogd en daarom niet bevoegd om deze pagina te bekijken. U wordt doorgestuurd naar de loginpagina.";
	header("refresh:5;url=index.php?content=login_form");
	exit();
}
else if ( !(in_array($_SESSION['userrole'], $userrole) ))
{
	echo "U bent niet gemachtigd (te weinig rechten) en daarom niet bevoegd om deze pagina te bekijken. U wordt teruggestuurd naar uw homepagina.";
	header("refresh:5;url=index.php?content=".$_SESSION['userrole']."Homepage");
	exit();
}
else
{

}
?>