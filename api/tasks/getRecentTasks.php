<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/TasksModel.php';

$recentTasks = new TasksModel();
echo json_encode($recentTasks->getRecentTasks());
