<?php
    include "conexion.php";

    $sql = "SELECT id, nombre FROM bodega";
    $result = pg_query($conn, $sql);

    $bodegas = array();

    if ($result) {
        while ($row = pg_fetch_assoc($result)) {
            $bodegas[] = $row;
        }
    }

    echo json_encode($bodegas);

    pg_close($conn);
?>