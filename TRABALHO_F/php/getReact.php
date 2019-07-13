<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();

    if(isset($_GET["photo"])){
        $id_img = $_GET["photo"];
    }
    else{
        print_r("erro a passar id da foto");
        exit("erro a passar id da foto");
    }

    if(!(isset($_SESSION["user"]))){
        echo json_encode(1);
    }
    else{
        $id_user = $_SESSION["user"]["id_user"];

        $sql = "SELECT * from interacao where id_user='". $id_user ."'and id_imagem='". $id_img ."'";
        $result = $conn->getConnection()->query($sql);
        if(isset($result)){
           
            while($r = mysqli_fetch_assoc($result)) {
                $rows['react'] = $r;
            }
        }else{
            exit("erro no request do qtd de img");
        }
    
        if (empty($rows)) {
            echo json_encode(1);
        }
        else{
            echo json_encode($rows);
        }
    }

    
    
?>