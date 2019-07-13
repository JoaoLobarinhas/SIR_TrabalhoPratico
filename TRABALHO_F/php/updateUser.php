<?php

    require_once("db_connection.php");

    $conn = Database::getInstance();

    session_start();

    if (isset($_POST["firstName"]) && isset($_POST["lastName"]) && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["pais"]) 
    && isset($_POST["description"]) && isset($_SESSION["user"]) ) {
        $id_user = $_SESSION["user"]["id_user"];
        $email = ($_POST["email"]);
        $pass = ($_POST["password"]);
        $firstName = ($_POST["firstName"]);
        $lastName = ($_POST["lastName"]);
        $pais = ($_POST["pais"]);
        $description = ($_POST["description"]);
    } else {
        die ( 'This should not had happend' );
    }

    $sql = "UPDATE users set firstName='". $firstName ."', LastName='". $lastName ."', email='". $email ."', pass='". $pass ."', pais='". $pais ."', descriptions='". $description ."' where id_user='". $id_user ."'";

    $result = $conn->getConnection()->query($sql);

    $rows;

    if(isset($result)){
        $rows=true;
    }
    else{
        $rows=false;
    }

    echo $rows;
?>