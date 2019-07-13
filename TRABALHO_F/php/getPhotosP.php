<?php
    require_once("db_connection.php");

    session_start();

    $conn = Database::getInstance();

    if(!(isset($_GET["user"]))){
        exit("Erro");
    }

    $id_user =$_GET["user"];

    $rows = array();

    $sql = "SELECT * from user_imagens where id_user='". $id_user ."' ORDER by user_imagens.dates DESC";
    $result = $conn->getConnection()->query($sql);
    if(isset($result)){
        if(mysqli_num_rows($result) > 0){
            while($r = mysqli_fetch_assoc($result)) {
                $rows['imagens'][] = $r;
            }
            echo json_encode($rows);
        }
        else{
            $rows['imagens'] = "noImages";
            echo json_encode($rows);
        }
        
    }else{ 
        $rows['imagens'] = "erro";
        echo json_encode($rows);
    }

    
?>