<?php
    $host = "localhost";
    $dbname = "pg-desafio";
    $user = "postgres";
    $password = "055361151";

    $conn = pg_connect("host=$host dbname=$dbname user=$user password=$password");

    if (!$conn) {
        echo "error";
        exit;
    }

    if (isset($_POST['id_bodega'])) {
        $id_bodega = intval($_POST['id_bodega']);

        $sql = "SELECT id, nombre FROM sucursal WHERE id_bodega = $1";
        $result = pg_query_params($conn, $sql, [$id_bodega]);

        $sucursales = [];
        if ($result) {
            while ($row = pg_fetch_assoc($result)) {
                $sucursales[] = $row;
            }
        }

        echo json_encode($sucursales);
    } 
    else {
        echo json_encode([]);
    }

    pg_close($conn);
?>