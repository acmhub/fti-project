<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

require '../models/DBModel.php';
require '../models/ReportsModel.php';

$report = new ReportsModel();
$report->compareEarningsWithPreviousMonth();
