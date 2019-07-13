<?php

    require_once("db_connection.php");

    $conn = Database::getInstance();

    if (isset($_GET['user'])) {
        $user = $_GET['user'];
    } else {
        $user = "";
    }

    $sql = "SELECT username FROM users where username='" .$user ."'";

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