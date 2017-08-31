<?php
/**
 * Created by PhpStorm.
 * User: Faaraz
 * Date: 2-6-2016
 * Time: 22:40
 */

//session_start();
if ( !isset( $_SESSION['id']))
{
    echo "Als bezoeker kunt u geen films huren, u wordt doorgestuurd naar de registratie pagina.";
    header("refresh:5;url=index.php?content=register_form");
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


