<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/UsersModel.php';

$user = new UsersModel();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
$id = (int)$data['id'];

/**
 * Reject if user id=1/username=admin
 */

$role = $data['role'];

$user->changeRole($id, $role);
