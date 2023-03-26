<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/ReportsModel.php';

$report = new ReportsModel();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$report->entriesPerDay($data);
