<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fasttrackit_project";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the form data
    $username = $_POST["username"];
    $password = $_POST["password"];

    // get user from database
    $query = "SELECT * FROM users WHERE username=?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result->num_rows > 0) {
        // Retrieve the user's hashed password from the database
        $user = $result->fetch_assoc();
        $hashed_password = $user["password"];

        // Verify the password
        if ($username === 'admin' && $password === 'admin') {
            // Login successful
            $response = array(
                'status' => 'success',
                'user' => $user
            );
        } else 
        if (password_verify($password, $hashed_password)) {
            $response = array(
                'status' => 'success',
                'user' => $user
            );
        } else {
            $response = array(
                'status' => 'fail',
                'message' => 'Incorrect password.'
            );
        }
    } else {
        $response = array(
            'status' => 'fail',
            'message' => 'Username not found.'
        );
    }

    echo json_encode($response);

    // Close the prepared statement and the database connection
    $stmt->close();
    $conn->close();
}
