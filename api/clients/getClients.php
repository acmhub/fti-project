<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/ClientsModel.php';

$clients = new ClientsModel();
echo json_encode($clients->getClients());
