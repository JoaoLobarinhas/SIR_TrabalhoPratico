<?php

    require_once("db_connection.php");

    $conn = Database::getInstance();

    session_start();

    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        
    } else {
        exit("erro a passar o email");
    }

    if(isset($_SESSION)){
        $emailAtual = $_SESSION["user"]["email"];
    }
    else{
        $emailAtual="";
    }


    $sql = "SELECT email FROM users where email='" .$email ."'";

    $result = $conn->getConnection()->query($sql);

    $rows = [];

    if (!$result)
    {
        die('Error: ' . mysqli_error($conn));
    }

    if(mysqli_num_rows($result) > 0){
        while($r = mysqli_fetch_assoc($result)) {
            $rows['users']= $r;
        }
        if($emailAtual==$rows["users"]){
            $rows['status'] = true;
        }
        else{
            $rows['status'] = false;
        }  
    }else{
        $rows['status'] = true;
    }

    echo json_encode($results);

?>