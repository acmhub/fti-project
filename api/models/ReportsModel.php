<?php

class ReportsModel extends DBModel
{
    public function compareWithPreviousMonth($type)
    {
        $type = $type['type'];

        $queryCurrentMonth = "SELECT COUNT(*) AS count FROM $type WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 31 DAY)";
        $resultCurretMonth = $this->db()->query($queryCurrentMonth);
        $row1 = $resultCurretMonth->fetch_assoc();
        $currentMonth = $row1['count'];

        $queryPrevMonth = "SELECT COUNT(*) AS count FROM $type WHERE createdAt BETWEEN DATE_SUB(NOW(), INTERVAL 64 DAY) AND DATE_SUB(NOW(), INTERVAL 31 DAY)";
        $resultPrevMonth = $this->db()->query($queryPrevMonth);
        $row2 = $resultPrevMonth->fetch_assoc();
        $prevMonth = $row2['count'];

        if ($prevMonth != 0) {
            $denominator = ($currentMonth + $prevMonth) / 2;
            $difference = (($currentMonth - $prevMonth) / $denominator) * 100;

            $response = array(
                "status" => 200,
                "difference" => $difference
            );
        } else {
            $difference = 0;
            $response = array(
                "status" => 200,
                "difference" => $difference
            );
        }

        echo json_encode($response);
    }

    public function compareEarningsWithPreviousMonth()
    {
        $current_month = date('m');
        $current_month_amount_query = "SELECT SUM(amount) AS current_month_total FROM payments WHERE MONTH(createdAt) = $current_month";
        $current_month_amount_result = $this->db()->query($current_month_amount_query);
        $current_month_total = mysqli_fetch_assoc($current_month_amount_result)['current_month_total'];

        // Calculate total amount for previous month
        $previous_month = date('m', strtotime('-1 month'));
        $previous_month_amount_query = "SELECT SUM(amount) AS previous_month_total FROM payments WHERE MONTH(createdAt) = $previous_month";
        $previous_month_amount_result = $this->db()->query($previous_month_amount_query);
        $previous_month_total = mysqli_fetch_assoc($previous_month_amount_result)['previous_month_total'];

        $response = array(
            "status" => 200,
            "current_month_total" => $current_month_total,
            "previous_month_total" => $previous_month_total,
        );

        echo json_encode($response);
    }


    public function entriesPerDay($data)
    {
        $table = $data['table'];
        $daysAgo = $data['daysAgo'];

        $query = "SELECT DATE(createdAt) AS day, COUNT(*) AS count
                FROM $table
                WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL $daysAgo DAY)
                GROUP BY day";

        $results = array();
        $result = $this->db()->query($query);

        while ($row = mysqli_fetch_assoc($result)) {
            $results[] = array('day' => $row['day'], 'count' => $row['count']);
        }

        $response = array(
            "status" => 200,
            "report" => $results
        );

        echo json_encode($response);
        $result->close();
    }

    public function getMostProjects()
    {
        $data = array();
        $project_sql = "SELECT id, client_id, COUNT(*) AS project_count FROM projects GROUP BY client_id ORDER BY project_count DESC LIMIT 5";
        $project_count_sql = $this->db()->query($project_sql);

        if ($project_count_sql->num_rows > 0) {
            while ($row = $project_count_sql->fetch_assoc()) {
                $client_id = $row["client_id"];
                $id = $row["id"];
                $project_count = $row["project_count"];
                $client_sql = "SELECT `first_name`, `last_name`, `company_name` FROM clients WHERE id='$client_id'";
                $client_result = $this->db()->query($client_sql);
                $client = $client_result->fetch_assoc();
                $data[] = (object) [
                    'id' => $id,
                    'project_count' => $project_count,
                    'client' => $client
                ];

                $client_result->close();
            }
        } else {
            echo "No results found.";
        }

        $project_count_sql->close();
        echo json_encode($data);
    }

    public function getTopPayments()
    {
        $payments = array();

        $query = "SELECT * FROM payments ORDER BY amount DESC LIMIT 5";
        $result = $this->db()->query($query);

        if ($result->num_rows > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $payment = new stdClass();
                $payment->project_id = $row["project_id"];
                $payment->amount = $row["amount"];
                $payments[] = $payment;
            }
        }

        $response = array(
            "status" => 200,
            "payments" => $payments
        );

        echo json_encode($response);
    }

    public function getTopProjects()
    {
        $data = array();
        $project_sql = "SELECT * FROM projects WHERE value > 0 ORDER BY value DESC LIMIT 5";
        $projects_sql = $this->db()->query($project_sql);

        if ($projects_sql->num_rows > 0) {
            while ($row = $projects_sql->fetch_assoc()) {
                $id = $row["id"];
                $client_id = $row["client_id"];
                $client_sql = "SELECT `first_name`, `last_name`, `company_name` FROM clients WHERE id='$client_id'";
                $client_result = $this->db()->query($client_sql);
                $client = $client_result->fetch_assoc();
                $data[] = (object) [
                    'id' => $id,
                    'value' => $row['value'],
                    'client' => $client
                ];

                $client_result->close();
            }
        } else {
            echo "No results found.";
        }

        $projects_sql->close();
        echo json_encode($data);
    }
}
