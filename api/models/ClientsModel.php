<?php

class ClientsModel extends DBModel
{
    public function getClients()
    {
        $q = "SELECT * FROM `clients`";
        $result = $this->db()->query($q);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getClient($id)
    {
        $q = "SELECT * FROM `clients` WHERE `id` = '$id'";
        $result = $this->db()->query($q);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getLatestClients()
    {
        $query = "SELECT * FROM `clients` ORDER BY id DESC LIMIT 5";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addClient($data)
    {
        switch ($data['client_type']) {
            case "individual":
                $query = "INSERT INTO `clients` (`first_name`, `last_name`, `identification`, `email_address`, `phone_number`) VALUES (?, ?, ?, ?, ?)";
                $prep = $this->db()->prepare($query);
                $prep->bind_param("sssss", $data['first_name'], $data['last_name'], $data['identification'], $data['email_address'], $data['phone_number']);
                break;

            case "company":
                $query = "INSERT INTO `clients` (`company_name`, `identification`, `email_address`, `phone_number`) VALUES (?, ?, ?, ?)";
                $prep = $this->db()->prepare($query);
                $prep->bind_param("ssss", $data['company_name'], $data['identification'], $data['email_address'], $data['phone_number']);
                break;

            default:
                $response = array(
                    "status" => "error",
                    "message" => "Invalid client type."
                );
                echo json_encode($response);
                exit();
        }

        if ($prep->execute()) {
            $client_id = $prep->insert_id;

            switch ($data['client_type']) {
                case "individual":
                    $new_client = array(
                        "id" => $client_id,
                        "first_name" => $data['first_name'],
                        "last_name" => $data['last_name'],
                        "identification" => $data['identification'],
                        "email_address" => $data['email_address'],
                        "phone_number" => $data['phone_number']
                    );
                    $response = array(
                        "status" => "success",
                        "client" => $new_client
                    );
                    echo json_encode($response);

                case "company":
                    $new_client = array(
                        "id" => $client_id,
                        "company_name" => $data['company_name'],
                        "identification" => $data['identification'],
                        "email_address" => $data['email_address'],
                        "phone_number" => $data['phone_number']
                    );
                    $response = array(
                        "status" => "success",
                        "client" => $new_client
                    );
                    echo json_encode($response);
            }
        } else {
            $response = array(
                "status" => "error",
                "message" => "Failed to create client." . $prep->error
            );
            echo json_encode($response);
        }
    }

    public function modifyClient($data)
    {
        $id = $data['id'];
        $timezone = new DateTimeZone('Europe/Bucharest');
        $updatedAt = new DateTime('now', $timezone);
        $updatedAt = $updatedAt->format('Y-m-d H:i:s');

        switch ($data['client_type']) {
            case "individual":
                $query = "UPDATE `clients` SET `first_name`=?, `last_name`=?, `identification`=?, `email_address`=?, `phone_number`=?, `updatedAt`=? WHERE `id` = '$id'";
                $prep = $this->db()->prepare($query);
                $prep->bind_param("ssssss", $data['first_name'], $data['last_name'], $data['identification'], $data['email_address'], $data['phone_number'], $updatedAt);
                break;

            case "company":
                $query = "UPDATE `clients` SET `company_name`=?, `identification`=?, `email_address`=?, `phone_number`=?, `updatedAt`=? WHERE `id` = '$id'";
                $prep = $this->db()->prepare($query);
                $prep->bind_param("sssss", $data['company_name'], $data['identification'], $data['email_address'], $data['phone_number'], $updatedAt);
                break;

            default:
                $response = array(
                    "status" => "error",
                    "message" => "Invalid client type."
                );
                exit();
        }

        if ($prep->execute()) {
            $client_id = $prep->insert_id;

            switch ($data['client_type']) {
                case "individual":
                    $new_client = array(
                        "id" => $client_id,
                        "first_name" => $data['first_name'],
                        "last_name" => $data['last_name'],
                        "identification" => $data['identification'],
                        "email_address" => $data['email_address'],
                        "phone_number" => $data['phone_number'],
                        "updatedAt" => $updatedAt,
                    );
                    $response = array(
                        "status" => "success",
                        "client" => $new_client
                    );

                case "company":
                    $new_client = array(
                        "id" => $client_id,
                        "company_name" => $data['company_name'],
                        "identification" => $data['identification'],
                        "email_address" => $data['email_address'],
                        "phone_number" => $data['phone_number'],
                        "updatedAt" => $updatedAt,
                    );
                    $response = array(
                        "status" => "success",
                        "client" => $new_client
                    );
            }
        } else {
            $response = array(
                "status" => "error",
                "message" => "Failed to create client." . $prep->error
            );
        }

        $prep->close();
        echo json_encode($response);
    }
}
