<?php
    include "conexion.php";

    if (
        isset($_POST['codigo']) &&
        isset($_POST['nombre']) &&
        isset($_POST['id_bodega']) &&
        isset($_POST['id_sucursal']) &&
        isset($_POST['id_moneda']) &&
        isset($_POST['precio']) &&
        isset($_POST['descripcion'])
    ) {
        $codigo = trim($_POST['codigo']);
        $nombre = trim($_POST['nombre']);
        $id_bodega = intval($_POST['id_bodega']);
        $id_sucursal = intval($_POST['id_sucursal']);
        $id_moneda = intval($_POST['id_moneda']);
        $precio = floatval(str_replace(",", ".", $_POST['precio']));
        $descripcion = trim($_POST['descripcion']);

        $sql = "INSERT INTO producto (codigo, nombre, precio, descripcion, id_bodega, id_sucursal, id_moneda)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id";

        $result = pg_query_params($conn, $sql, [$codigo, $nombre, $precio, $descripcion, $id_bodega, $id_sucursal, $id_moneda]);

        if ($result) {
            $row = pg_fetch_assoc($result);
            $id_producto = $row['id'];
            echo json_encode(["exito" => true, "id_producto" => $id_producto]);
        } else {
            echo json_encode(["exito" => false, "error" => pg_last_error($conn)]);
        }
    } else {
        echo json_encode(["error" => "Faltan datos en la solicitud"]);
    }

    pg_close($conn);
?>