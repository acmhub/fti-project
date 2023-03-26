<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

// Establish a connection to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fasttrackit_project";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// If the sign-up form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Retrieve the form data
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Check if the username already exists in the database
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response = array(
            'status' => 'fail',
            'message' => 'Username already exists.'
        );
    } else {

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert the new user into the database
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $hashed_password);
        if ($stmt->execute()) {
            // Get the ID of the newly created user
            $user_id = $stmt->insert_id;

            // Select the newly created user from the database
            $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            $response = array(
                'status' => 'success',
                'user' => $user
            );
        } else {
            $response = array(
                'status' => 'fail',
                'message' => $stmt->error
            );
        }
    }

    // Close the prepared statement and the database connection
    $stmt->close();
    $conn->close();
}

echo json_encode($response);
