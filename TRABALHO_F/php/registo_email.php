<?php

    require_once("db_connection.php");

    $conn = Database::getInstance();

    if (isset($_GET['email'])) {
        $email = $_GET['email'];
    } else {
        $email = "";
    }

    $sql = "SELECT email FROM users where email='" .$email ."'";

    $result = $conn->getConnection()->query($sql);

    $results = [];

    if (!$result)
    {
        die('Error: ' . mysqli_error($conn));
    }

    if(mysqli_num_rows($result) > 0){

        $results['status'] = false;

    }else{

        $results['status'] = true;

    }

    echo json_encode($results);

?>