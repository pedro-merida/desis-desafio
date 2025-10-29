<?php
    include "conexion.php";

    if (isset($_POST['codigo'])) {
        $codigo = trim($_POST['codigo']);

        // Preparar la consulta para evitar SQL injection
        $result = pg_query_params($conn, "SELECT 1 FROM producto WHERE codigo = $1", array($codigo));

        if ($result && pg_num_rows($result) > 0) {
            echo "existe";
        } else {
            echo "disponible";
        }
    }

    pg_close($conn);
?>