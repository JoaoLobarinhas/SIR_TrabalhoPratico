<?php
    session_start();

    if(isset($_SESSION["user"])){
        $rows["erro"] = "no error";
        echo json_encode($rows);
    }
    else{
        $rows["erro"] = "erro";
        echo json_encode($rows);
    }
?>