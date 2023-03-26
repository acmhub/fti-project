<?php

class TasksModel extends DBModel
{

    public function getAllTasks()
    {
        $query = "SELECT * FROM `tasks` WHERE status <> 'completed'";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProjectTasks($id)
    {
        $query = "SELECT * FROM `tasks` WHERE `project_id` = '$id'";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getRecentTasks()
    {
        $query = "SELECT * FROM `tasks` ORDER BY id DESC LIMIT 5";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function addTask($data)
    {
        $query = "INSERT INTO `tasks` (`project_id`, `task`) VALUES (?, ?)";
        $prep = $this->db()->prepare($query);
        $prep->bind_param("is", $data['project_id'], $data['task']);

        if ($prep->execute()) {
            $task_id = $prep->insert_id;

            $response = array(
                "status" => 200,
                "task" => $task_id
            );
        } else {
            $response = array(
                "status" => 500,
                "message" => "Failed to add task."
            );
        }

        $prep->close();
        echo json_encode($response);
    }

    public function changeTaskStatus($id, $status)
    {
        $timezone = new DateTimeZone('Europe/Bucharest');
        $updatedAt = new DateTime('now', $timezone);
        $updatedAt = $updatedAt->format('Y-m-d H:i:s');

        $query = "UPDATE `tasks` SET `status`=?, `updatedAt`=? WHERE `id` = $id";
        $prep = $this->db()->prepare($query);
        $prep->bind_param("ss", $status, $updatedAt);

        if ($prep->execute()) {
            $response = array(
                'status' => 200,
            );
        } else {
            $response = array(
                'status' => 'error',
                'message' => $prep->error
            );
        }

        $prep->close();
        return json_encode($response);
    }

    public function modifyTask($data)
    {
        $id = $data['id'];
        $query = "UPDATE `tasks` SET `task`=? WHERE `id` = '$id'";
        $prep = $this->db()->prepare($query);
        $prep->bind_param("s", $data['task']);

        if ($prep->execute()) {
            echo 'Task updated.';
        } else {
            echo 'Error.';
        }
    }

    public function removeTask($id)
    {
        $query = "DELETE FROM `tasks` WHERE `id` = '$id'";
        $prep = $this->db()->prepare($query);

        if ($prep->execute()) {
            echo 'Task deleted successfully.';
        } else {
            echo 'No task was deleted.';
        }
    }
}
