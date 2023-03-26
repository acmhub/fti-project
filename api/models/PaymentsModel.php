<?php

class PaymentsModel extends DBModel
{
    public function addPayment($data)
    {
        $query = "INSERT INTO `payments` (`project_id`, `amount`, `paidAt`) VALUES (?, ?, ?)";
        $prep = $this->db()->prepare($query);
        $amount = number_format((float)$data['amount'], 2, '.', '');
        $prep->bind_param("ids", $data['project_id'], $amount, $data['paidAt']);

        if ($prep->execute()) {
            $response = array(
                "status" => 200,
            );
        } else {
            $response = array(
                "status" => 500,
                "message" => "Failed to add payment."
            );
        }

        $prep->close();
        echo json_encode($response);
    }

    public function getProjectPayments($id)
    {
        $query = "SELECT * FROM `payments` WHERE `project_id` = '$id'";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function modifyPayment($data)
    {
        $id = $data['id'];
        $query = "UPDATE `payments` SET `amount`=?, `paidAt`=? WHERE `id` = '$id'";
        $prep = $this->db()->prepare($query);
        $prep->bind_param("is", $data['amount'], $data['paidAt']);

        if ($prep->execute()) {
            echo 'Payment updated.';
        } else {
            echo 'Error.';
        }
    }

    public function removePayment($id)
    {
        $query = "DELETE FROM `payments` WHERE `id` = '$id'";
        $prep = $this->db()->prepare($query);

        if ($prep->execute()) {
            echo 'Payment deleted successfully.';
        } else {
            echo 'No payment was deleted.';
        }
    }
}
