<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();

    if(isset($_GET["user"]) && isset($_SESSION["user"])){
        $id = $_GET["user"];
        $id_follow = $_SESSION["user"]["id_user"];
    }
    else{
        exit("Dados nao validos");
    }

    $sql = "SELECT * from seguir where id_user='". $id ."' and id_user_follow ='". $id_follow ."'";
    $result=$conn->getConnection()->query($sql);
    
    if(!(isset($result))){
        exit ($result);
    }

    if(mysqli_num_rows($result) > 0){
        $rows["follow"]=0;
        echo json_encode($rows);
    }
    else{
        $rows["follow"]=1;
        echo json_encode($rows);
    }

?>