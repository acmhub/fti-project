<?php

class UsersModel extends DBModel
{
    public function getUsers()
    {
        $query = "SELECT id, username, createdAt, role FROM `users`";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function changeRole($id, $role)
    {
        $query = "UPDATE users SET role = '$role' WHERE `id` = '$id'";
        $result = $this->db()->query($query);
        return $result;
    }

    public function isAdmin($id)
    {
        $query = "SELECT role FROM `users` WHERE `id` = '$id'";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProfile($id)
    {
        $query = "SELECT id, username, createdAt, role FROM `users` WHERE `id` = '$id'";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function modifyProfile($id, $data)
    {
        /**
         * Verify if the submitted username is the one already existing
         * If not, check if the new username is already existing
         * If not proceed with updating
         *      If there is no password update just the username
         */
        $newUsername = $data['username'];
        $newPassword = $data['password'];

        $compareUsername = "SELECT username FROM `users` WHERE `username`=?";
        $prepCompare = $this->db()->prepare($compareUsername);
        $prepCompare->bind_param("s", $newUsername);
        $prepCompare->execute();
        $compareResult = $prepCompare->get_result();

        // No match
        if ($compareResult->num_rows == 0) {
            $usernames = "SELECT * FROM users WHERE username = ?";
            $prepNames = $this->db()->prepare($usernames);
            $prepNames->bind_param("s", $newUsername);
            $prepNames->execute();
            $nameResult = $prepNames->get_result();

            try {
                if ($nameResult->num_rows > 0) {
                    $response = array(
                        'status' => 'error',
                        'message' => 'Username already exists.'
                    );
                } else {
                    if ($newPassword == null) {
                        $query = "UPDATE `users` SET `username`=? WHERE `id` = $id";
                        $prep = $this->db()->prepare($query);
                        $prep->bind_param("s", $newUsername);

                        if ($prep->execute()) {
                            $response = array(
                                'status' => 'success',
                                'message' => 'Profile modified succesfully.'
                            );
                        } else {
                            $response = array(
                                'status' => 'error',
                                'message' => $prep->error
                            );
                        }

                        $prep->close();
                    } else {
                        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                        $query = "UPDATE `users` SET `username`=?, `password`=? WHERE `id` = $id";
                        $prep = $this->db()->prepare($query);
                        $prep->bind_param("ss", $newUsername, $hashedPassword);

                        if ($prep->execute()) {
                            $response = array(
                                'status' => 'success',
                                'message' => 'Profile modified succesfully.'
                            );
                        } else {
                            $response = array(
                                'status' => 'error',
                                'message' => $prep->error
                            );
                        }

                        $prep->close();
                    }
                }
            } catch (Exception $error) {
                $response = array(
                    'status' => 'error',
                    'message' => $error->getMessage()
                );
            }

            $prepNames->close();
        } else {
            // Match found
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $query = "UPDATE `users` SET `password`=? WHERE `id` = $id";
            $prep = $this->db()->prepare($query);
            $prep->bind_param("s", $hashedPassword);

            if ($prep->execute()) {
                $response = array(
                    'status' => 'success',
                    'message' => 'Profile modified succesfully.'
                );
            } else {
                $response = array(
                    'status' => 'error',
                    'message' => $prep->error
                );
            }

            $prep->close();
        }

        $prepCompare->close();
        echo json_encode($response);
    }
}
