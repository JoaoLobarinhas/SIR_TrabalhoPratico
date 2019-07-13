<?php
    require_once("db_connection.php");

    $conn = Database::getInstance();

    if(isset($_GET["user"])){
        $user=$_GET["user"];
    }
    else{
        exit("Erro ao passar parametros");
    }

    $sql = "SELECT id_user, username from users where username like '". $user ."%' LIMIT 8";
    $result=$conn->getConnection()->query($sql);
    
    if(!(isset($result))){
        exit ("Erro no select");
    }

    $rows = array();

    if(mysqli_num_rows($result) == 0){
        $rows['users'][0] = "erro";
        echo json_encode($rows);
    }
    else{
        while($r = mysqli_fetch_assoc($result)) {
            $rows['users'][]= $r;
        }
        echo json_encode($rows);
    }

?>