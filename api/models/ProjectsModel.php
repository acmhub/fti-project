<?php

class ProjectsModel extends DBModel
{
    public function getAllProjects()
    {
        $query = "SELECT projects.*, clients.first_name, clients.last_name, clients.company_name FROM `projects` JOIN `clients` ON projects.client_id = clients.id";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getLatestProjects()
    {
        $query = "SELECT projects.*, clients.first_name, clients.last_name, clients.company_name FROM `projects` JOIN `clients` ON projects.client_id = clients.id ORDER BY id DESC LIMIT 5";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProjectsInProgress()
    {
        $query = "SELECT projects.*, clients.first_name, clients.last_name, clients.company_name FROM `projects` JOIN `clients` ON projects.client_id = clients.id WHERE projects.status='in progress' ORDER BY id DESC LIMIT 5";
        $result = $this->db()->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function getProjectProgress($id)
    {
        $query = "SELECT * FROM tasks WHERE project_id = '$id'";
        $tasks_query = $this->db()->query($query);
        $tasks_result = $tasks_query->fetch_all(MYSQLI_ASSOC);

        $total_tasks = count($tasks_result);
        $tasks_completed = 0;
        $tasks_in_progress = 0;

        foreach ($tasks_result as $task) {
            if ($task['status'] == 'completed') {
                $tasks_completed++;
            } else if ($task['status'] == 'in progress') {
                $tasks_in_progress++;
            }
        }

        if ($total_tasks > 0) {
            $progress = ($tasks_completed + ($tasks_in_progress / 2)) / $total_tasks * 100;

            $response = array(
                "status" => 200,
                "project" => $id,
                "progress" => number_format($progress, 2)
            );

            return $response;
        } else {
            $response = array(
                "status" => 200,
                "project" => $id,
                "progress" => null
            );

            return $response;
        }

        $tasks_query->close();
    }

    public function addProject($data)
    {
        $value = 0;
        foreach ($data['items'] as $item) {
            $value += $item['value'];
        }

        $query = "INSERT INTO `projects` (`client_id`, `project_name`, `discount`, `value`) VALUES (?, ?, ?, ?)";
        $prep = $this->db()->prepare($query);
        $prep->bind_param("ssii", $data['client_id'], $data['project_name'], $data['discount'], $value);

        if ($prep->execute()) {
            $project_id = $prep->insert_id;

            foreach ($data['items'] as $item) {
                $itemsQuery = "INSERT INTO `project_item` (`project_id`, `service`, `value`) VALUES (?, ?, ?)";
                $itemsPrep = $this->db()->prepare($itemsQuery);
                $itemsPrep->bind_param("iss", $project_id, $item['service'], $item['value']);
                $itemsPrep->execute();
            }

            $response = array(
                "status" => 200,
                "project" => $project_id
            );
        } else {
            $response = array(
                "status" => 500,
                "message" => "Failed to add project."
            );
        }

        $prep->close();

        echo json_encode($response);
    }

    public function getProject($id)
    {
        $stmt = $this->db()->prepare("SELECT * FROM `projects` WHERE `id` = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $project_result = $stmt->get_result();
        $project = $project_result->fetch_assoc();

        if ($project_result->num_rows > 0) {
            $client_id = $project['client_id'];

            $client_stmt = $this->db()->prepare("SELECT * FROM `clients` WHERE `id` = ?");
            $client_stmt->bind_param("i", $client_id);
            $client_stmt->execute();
            $client_result = $client_stmt->get_result();

            $project_item_stmt = $this->db()->prepare("SELECT * FROM `project_item` WHERE `project_id` = ?");
            $project_item_stmt->bind_param("i", $id);
            $project_item_stmt->execute();
            $project_items_result = $project_item_stmt->get_result();

            while ($row = mysqli_fetch_assoc($project_items_result)) {
                $project_items_array[] = $row;
            }

            if ($client_result->num_rows > 0) {
                $client = mysqli_fetch_assoc($client_result);
                return $response = array(
                    "status" => 200,
                    "project" => $project,
                    "client" => $client,
                    "items" => $project_items_array
                );
            } else {
                $response = array(
                    "status" => "error",
                    "message" => "No client found."
                );
            }
        } else {
            $response = array(
                "status" => "error",
                "message" => "Error fetching project"
            );
        }

        return json_encode($response);
    }

    public function changeProjectStatus($id, $status)
    {
        $query = "UPDATE `projects` SET `status`=? WHERE `id` = $id";
        $prep = $this->db()->prepare($query);
        $prep->bind_param("s", $status);

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
}
