<?php
    require_once("db_connection.php");

    $conn = Database::getInstance();

    session_start();

    if(isset($_GET["id_user"])){
        $id=$_GET["id_user"];
    }
    else{
        exit ("erro no user");
    }

    $sql="SELECT id_user, username, firstName, lastName, email, pais, descriptions, img_url from users where id_user='". $id ."'";
    $result=$conn->getConnection()->query($sql);

    if(!(isset($result))){
        exit ("Erro no select");
    }

    $rows = array();
    
    if(isset($result)){
        while($r = mysqli_fetch_assoc($result)) {
            $rows['users'][]= $r;
            $_SESSION["searchUser"]=$r;
        }
        if(isset($_SESSION["user"])){
            if(in_array($_SESSION["user"],$rows["users"])){
                echo json_encode("myProfile");
            }
            else{
                echo json_encode($rows);
            } 
        }
        else{
            echo json_encode($rows);
        }
    }

    
?>
