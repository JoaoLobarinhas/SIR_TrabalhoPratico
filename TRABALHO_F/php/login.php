<?php
    require_once("db_connection.php");

    $conn = Database::getInstance();

    if (isset($_POST["email"]) && isset($_POST["pass"])) {
        $email = urlencode($_POST["email"]);
        $email= urldecode($email);
        $pass = urlencode($_POST["pass"]);
    } else {
        $email = NULL;
        $pass = NULL;
    }

    $sql = "SELECT id_user, username, firstName, lastName, email, pais, descriptions, img_url FROM users where email='" .$email ."' and pass='" .$pass ."'";

    $result = $conn->getConnection()->query($sql);

    $rows = array();

    if(isset($result)){
        session_start();
        while($r = mysqli_fetch_assoc($result)) {
            $rows['user'] = $r;
            $_SESSION["user"] = $r;
        }
    }

    echo json_encode($rows); 
?>
