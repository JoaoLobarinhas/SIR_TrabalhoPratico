<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();

    $rows = array();

    if(isset($_SESSION["searchUser"])){
        $rows["user"]=$_SESSION["searchUser"];

        $id_user = $rows["user"]["id_user"];
        $sql = "SELECT count(id_imagem) as posts from user_imagens where id_user='". $id_user ."'";
        $result = $conn->getConnection()->query($sql);
        if(isset($result)){
            while($r = mysqli_fetch_assoc($result)) {
                $rows['posts'] = $r;
            }
        }else{
            exit("erro random");
        }
        $sql = "SELECT count(id_user) as followers from seguir where id_user ='". $id_user ."'";
        $result = $conn->getConnection()->query($sql);
        if(isset($result)){
            while($r = mysqli_fetch_assoc($result)) {
                $rows['followers'] = $r;
            }
        }else{
            exit("erro random 2");
        }
        $sql = "SELECT count(id_user_follow) as follow from seguir where id_user_follow='". $id_user ."'";
        $result = $conn->getConnection()->query($sql);
        if(isset($result)){
            while($r = mysqli_fetch_assoc($result)) {
                $rows['follow'] = $r;
            }
        }else{
            exit("erro random 3");
        }

        echo json_encode($rows);
    }
    else{ 
        $rows["user"][0]="erro";
        json_encode($rows);
    }
    
?>