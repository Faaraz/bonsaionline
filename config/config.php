<?php
    

$witch_server = $_SERVER['SERVER_ADDR'];

switch($witch_server)
{
    case '::1':
        define('SERVERNAME', 'localhost');
		define('USERNAME', 'root');
		define('PASSWORD', '');
		define('DATABASENAME','blok1-am1a');
        define('MAIL_PATH','http://localhost\2014-2015\Inlog_Registratie_Systeem\les 1');
        break;
    
		case '31.170.165.23':
		define('SERVERNAME', 'mysql.hostinger.nl');
		define('USERNAME', 'u405091378_blok1');
		define('PASSWORD', 'halloo456');
		define('DATABASENAME', 'u405091378_blok1');
		define('MAIL_PATH', 'http://www.faarazsite.esy.es');

        break;
    
}
    
 


      
        
    
    
    
        
    
?>