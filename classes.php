<?php
	require_once("CarClass.php");

	$auto1 = new CarClass();
	$auto2 = new CarClass();
	
	$auto1->setMerk("Fiat");
	$auto1->setType("Punto");
	$auto1->setAantalWielen(4);
	$auto1->setBrandstof("diesel");
	$auto1->setKenteken("51-HB-ZP");
	$auto1->setBouwjaar("2002");
	
	$auto2->setMerk("Mercedes");
	$auto2->setType("SLK 500");
	$auto2->setAantalWielen(2);
	$auto2->setBrandstof("benzine");
	$auto2->setKenteken("52-IB-ZQ");
	$auto2->setBouwjaar("2018");
	
	
	
	
	$text = "Het object auto1 heeft de volgende kenmerken:<br>";
	$text .= "Merk: ".$auto1->getMerk()."<br>";
	$text .= "Type: ".$auto1->getType()."<br>";
	$text .= "Aantal wielen aan de auto: ".$auto1->getAantalWielen()."<br>";
	$text .= "Brandstof: ".$auto1->getBrandstof()."<br>";
	$text .= "Kenteken: ".$auto1->getKenteken()."<br>";
	$text .= "Bouwjaar: ".$auto1->getBouwjaar()."<br>";
	$text .= "+++++++++++++++++++++++++++++++++++++++++++++++<br>";
	
	$text2 = "Het object auto1 heeft de volgende kenmerken:<br>";
	$text2 .= "Merk: ".$auto2->getMerk()."<br>";
	$text2 .= "Type: ".$auto2->getType()."<br>";
	$text2 .= "Aantal wielen aan de auto: ".$auto2->getAantalWielen()."<br>";
	$text2 .= "Brandstof: ".$auto2->getBrandstof()."<br>";
	$text2 .= "Kenteken: ".$auto2->getKenteken()."<br>";
	$text2 .= "Bouwjaar: ".$auto2->getBouwjaar()."<br>";
	$text2 .= "+++++++++++++++++++++++++++++++++++++++++++++++";
?>
<h3>Werken met class</h3>
<?php echo $text.$text2; ?>
