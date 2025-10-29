<?php
    header('Content-Type: application/json');
    
    include "conexion.php";

    if (isset($_POST['id_producto'], $_POST['materiales'])) {
        $id_producto = intval($_POST['id_producto']);
        $materiales = json_decode($_POST['materiales'], true);

        if (is_array($materiales)) {
            foreach ($materiales as $id_material) {
                pg_query_params($conn, "INSERT INTO producto_material (id_producto, id_material) VALUES ($1, $2)", [$id_producto, intval($id_material)]);
            }
            echo json_encode(["exito"=>true]);
        } else {
            echo json_encode(["exito"=>false,"error"=>"Materiales inválidos"]);
        }
    } 
    else {
        echo json_encode(["exito"=>false,"error"=>"Faltan datos en la solicitud"]);
    }
    pg_close($conn);
?>