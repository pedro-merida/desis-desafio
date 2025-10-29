<?php
    include "conexion.php";

    $sql = "SELECT id, nombre FROM moneda";
    $result = pg_query($conn, $sql);

    $monedas = array();

    if ($result) {
        while ($row = pg_fetch_assoc($result)) {
            $monedas[] = $row;
        }
    }

    echo json_encode($monedas);

    pg_close($conn);
?>