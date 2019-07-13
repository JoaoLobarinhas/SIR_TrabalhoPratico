<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();

    if(isset($_SESSION["user"])){
        $rows = array();
        $rows = $_SESSION["user"];
        echo json_encode($rows);
    }
    else{
        exit("Erro Sessão não iniciada");
    }

?>