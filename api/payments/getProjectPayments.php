<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/PaymentsModel.php';

$payments = new PaymentsModel();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$id = $data['project_id'];

echo json_encode($payments->getProjectPayments($id));
