<?php

class DBModel
{
    protected $conn;

    public function db()
    {
        $this->conn = new mysqli('localhost', 'root', '', 'fasttrackit_project');
        if ($this->conn->connect_error) {
            die('Connection error!');
        }
        return $this->conn;
    }
}
