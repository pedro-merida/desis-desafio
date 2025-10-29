<?php
    $host = "localhost";
    $dbname = "pg-desafio";
    $user = "postgres";
    $password = "055361151";

    $conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

    if (!$conn) {
        echo json_encode(["exito"=>false,"error"=>"No se pudo conectar a la base de datos"]);
        exit;
    }
?>