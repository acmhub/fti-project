<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/ClientsModel.php';

$client = new ClientsModel();

if (isset($_POST)) {
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    return json_encode($client->addClient($data));
}

// echo json_encode($client->addClient());