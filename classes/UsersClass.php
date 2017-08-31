<?php
	require_once('MySqlDatabaseClass.php');
	
	class UsersClass
	{
		//Fields
		private $id;
		private $firstname;
		private $infix;
		private $lastname;
		
		//Properties
		//getters
		public function getId() { return $this->id; }
		public function getFirstname() { return $this->firstname; }
		public function getInfix() { return $this->infix; }
		public function getLastname() { return $this->lastname; }
		//setters
		public function setId($value) { $this->id = $value; }
		public function setFirstname($value) { $this->firstname = $value; }
		public function setInfix() { $this->infix = $value; }
		public function setLastname() { $this->lastname = $value; }
		
		
		//Constuctor
		public function __construct() {}
		
		//Methods
		public static function find_by_sql($query)
		{
			// Maak het $database-object vindbaar binnen deze method
			global $database;
			
			// Vuur de query af op de database
			$result = $database->fire_query($query);
			
			// Maak een array aan waarin je UsersClass-objecten instopt
			$object_array = array();
			
			// Doorloop alle gevonden records uit de database
			while ( $row  = mysqli_fetch_array($result))
			{
				// Een object aan van de UsersClass (De class waarin we ons bevinden)
				$object = new UsersClass();
				
				// Stop de gevonden recordwaarden uit de database in de fields van een UsersClass-object
				$object->id				= $row['id'];
				$object->firstname		= $row['firstname'];
				$object->infix			= $row['infix'];
				$object->lastname		= $row['lastname'];
			
				$object_array[] = $object;
			}
			return $object_array;
		}
		
		public static function find_info_by_id($id)
		{
			$query = "SELECT 	*
					  FROM 		`users`
					  WHERE		`id`	=	".$id;
			$object_array = self::find_by_sql($query);
			$usersclassObject = array_shift($object_array);
			//var_dump($usersclassObject); exit();
			return $usersclassObject;			
		}
		
		public static function insert_into_database($id, $post)
		{
			global $database;
			$query = "INSERT INTO `users` (`id`,
										   `firstname`,
										   `infix`,
										   `lastname`)
					  VALUES			  ('".$id."',
										   '".$post['firstname']."',
										   '".$post['infix']."',
										   '".$post['lastname']."')";
			
			$database->fire_query($query);
		}
}
?>