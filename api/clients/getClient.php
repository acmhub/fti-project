<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/ClientsModel.php';

$user = new ClientsModel();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$id = (int)$data['clientId'];

echo json_encode($user->getClient($id));
