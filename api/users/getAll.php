<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/UsersModel.php';

$users = new UsersModel();
echo json_encode($users->getUsers());
