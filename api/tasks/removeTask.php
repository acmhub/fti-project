<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/TasksModel.php';

$task = new TasksModel();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$id = (int)$data['id'];

echo json_encode($task->removeTask($id));
