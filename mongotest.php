<?php

$manager = new MongoDB\Driver\Manager('mongodb://127.0.0.1:27017');

$json = array([
    "id",
    23,
    "klant",
    [
      "klantid" => 147,
      "naam" => "faaraz",
      "achternaam" => "rasolzadeh",
      "postcode" => "3962KN",
      "straathuisnummer" => "Virgilius 20",
      "woonplaats" => "Wijk bij Duurstede",
      "betaalwijze" => "paypal"
    ],
    "createdAt",
    "2017-06-13 12:56:37",
    "bezorgdatum",
    "2-08-2017",
    "bezorgtijd",
    "15:00",
    "productnaam",
    "Ulmus Chinensis, Azalea, Ligustrum Chinensis",
    "productcode",
    "PD1014, PD1006",
    "price",
    "46.50",
    "usercomments",
    "dititwork"
  ]);






$bulk = new MongoDB\Driver\BulkWrite;
$bulk->insert([$json]);
//$bulk->insert(['test' => 2]);
//$bulk->insert(['laatstetest' => 3]);
$manager->executeBulkWrite('orders.orders', $bulk);

//$filter = ['x' => ['$gt' => 1]];
//$options = [
//    'projection' => ['_id' => 0],
//    'sort' => ['x' => -1],
//];

//$query = new MongoDB\Driver\Query($filter, $options);
//$cursor = $manager->executeQuery('orders.orders', $query);

//foreach ($cursor as $document) {
//    var_dump($document);
//}
?>