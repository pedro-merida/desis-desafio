const codigo = document.getElementById('codigo');
const nombre = document.getElementById('nombre');
const bodega = document.getElementById('bodega');
const sucursal = document.getElementById('sucursal');
const moneda = document.getElementById('moneda');
const precio = document.getElementById('precio')
const descripcion = document.getElementById('descripcion')
const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]');

const form = document.getElementById('form')

function verificar_codigo(codigo){
    const codigo_regex_letras = /[A-Za-z]/;
    const codigo_regex_numeros = /[0-9]/;
    const codigo_regex_caracteres = /^[A-Za-z0-9]+$/;

    const codigo_valor = codigo.value.trim();

    if (codigo_valor.length < 5 || codigo_valor.length > 15) {
        if (codigo_valor === '' || codigo_valor === null) {
            alert("El código del producto no puede estar en blanco");
        }
        else {
            alert("El código debe tener entre 5 y 15 caracteres");
        }
        return false
    } 
    else if (!codigo_regex_letras.test(codigo_valor)) {
        alert("El código debe contener al menos una letra");
        return false
    }
    else if (!codigo_regex_numeros.test(codigo_valor)) {
        alert("El código debe contener al menos un número");
        return false
    }
    else if (!codigo_regex_caracteres.test(codigo_valor)) {
        alert("El código no puede contener caracteres especiales");
        return false
    }
    
    return fetch("php/verificar_codigo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "codigo=" + encodeURIComponent(codigo_valor)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en la conexión con el servidor");
        return response.text();
    })
    .then(respuesta => {
        if (respuesta === "existe") {
            alert("El código del producto ya está registrado");
            return false;
        } 
        else if (respuesta === "disponible") {
            return true;
        } 
        else {
            alert("Error al verificar el código");
            return false;
        }
    })
    .catch(error => {
        console.error(error);
        alert("Error de conexión con el servidor");
        return false;
    });
}

function verificar_nombre(nombre){
    const nombre_valor = nombre.value.trim();

    if (nombre_valor.length < 2 || nombre_valor.length > 50) {
        if (nombre_valor === '' || nombre_valor === null) {
            alert("El nombre del producto no puede estar en blanco");
        }
        else {
            alert("El nombre debe tener entre 2 y 50 caracteres");
        }
        return false
    }
    else {
        return true
    }
}

function verificar_precio(precio){
    const precio_regex = /^(?:\d+(?:[.,]\d{1,2})?)$/
    const precio_valor = precio.value.trim();

    if (precio_valor === '' || precio_valor === null) {
        alert("El precio del producto no puede estar en blanco");
        return false
    }
    else if (!precio_regex.test(precio_valor)){
        alert("El precio del producto debe ser un número positivo con hasta dos decimales");
        return false
    }
    else {
        return true
    }
}

function verificar_checkboxes(checkboxes){
    const seleccionados = Array.from(checkboxes).filter(chk => chk.checked);

    if (seleccionados.length < 2) {
        alert("Debe seleccionar al menos dos materiales para el producto")
        return false
    } else {
        return true
    }
}

function verificar_bodega(bodega){
    const bodega_valor = bodega.value;

    if (bodega_valor === '' || bodega_valor === null) {
        alert("Debe seleccionar una bodega");
        return false
    }
    else {
        return true
    }
}

function verificar_sucursal(sucursal){
    const sucursal_valor = sucursal.value;

    if (sucursal_valor === '' || sucursal_valor === null) {
        alert("Debe seleccionar una sucursal para la bodega seleccionada");
        return false
    }
    else {
        return true
    }
}

function verificar_moneda(moneda){
    const moneda_valor = moneda.value;

    if (moneda_valor === '' || moneda_valor === null) {
        alert("Debe seleccionar una moneda para el producto");
        return false
    }
    else {
        return true
    }
}

function verificar_descripcion(descripcion){
    const descripcion_valor = descripcion.value.trim();

    if (descripcion_valor.length < 10 || descripcion_valor.length > 1000) {
        if (descripcion_valor === '' || descripcion_valor === null) {
            alert("La descripción del producto no puede estar en blanco");
        }
        else {
            alert("La descripción del producto debe tener entre 10 y 1000 caracteres");
        }
        return false
    }
    else {
        return true
    }
}

//Obtener las bodegas disponibles
document.addEventListener('DOMContentLoaded', () => {
  const selectBodega = document.getElementById('bodega');

  fetch('php/obtener_bodegas.php')
    .then(response => response.json())
    .then(data => {

      selectBodega.innerHTML = '<option value="" selected></option>';

      data.forEach(bodega => {
        const option = document.createElement('option');
        option.value = bodega.id;
        option.textContent = bodega.nombre;
        selectBodega.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar bodegas:', error);
    });
});

//Obtener las sucursales según la bodega
document.getElementById("bodega").addEventListener("change", function () {
  const idBodega = this.value;
  const sucursalSelect = document.getElementById("sucursal");

  sucursalSelect.innerHTML = '<option value="" selected></option>';

  if (!idBodega) return;

  const formData = new FormData();
  formData.append("id_bodega", idBodega);

  fetch("php/obtener_sucursales.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(sucursal => {
        const option = document.createElement("option");
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        sucursalSelect.appendChild(option);
      });
    })
    .catch(err => console.error("Error al cargar sucursales:", err));
});

//Obtener las monedas disponibles
document.addEventListener('DOMContentLoaded', () => {
  const selectMoneda = document.getElementById('moneda');

  fetch('php/obtener_moneda.php')
    .then(response => response.json())
    .then(data => {

      selectMoneda.innerHTML = '<option value="" selected></option>';

      data.forEach(moneda => {
        const option = document.createElement('option');
        option.value = moneda.id;
        option.textContent = moneda.nombre;
        selectMoneda.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar monedas:', error);
    });
});

//Mandar datos del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const codigo_valido = await verificar_codigo(codigo);
    const nombre_valido = verificar_nombre(nombre);
    const bodega_valida = verificar_bodega(bodega);
    const sucursal_valida = verificar_sucursal(sucursal);
    const moneda_valida = verificar_moneda(moneda);
    const precio_valido = verificar_precio(precio);
    const checkboxes_validos = verificar_checkboxes(checkboxes);
    const descripcion_valida = verificar_descripcion(descripcion);

    const todo_valido =
        codigo_valido &&
        nombre_valido &&
        bodega_valida &&
        sucursal_valida &&
        moneda_valida &&
        precio_valido &&
        checkboxes_validos &&
        descripcion_valida;
    
    if (todo_valido){

        const formData = new FormData();
        formData.append("codigo", codigo.value.trim());
        formData.append("nombre", nombre.value.trim());
        formData.append("precio", precio.value.trim());
        formData.append("descripcion", descripcion.value.trim());
        formData.append("id_bodega", bodega.value);
        formData.append("id_sucursal", sucursal.value);
        formData.append("id_moneda", moneda.value);

        try {
            const response = await fetch("php/insertar_producto.php", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.exito) {
                const id_producto = data.id_producto;

                const materialesSeleccionados = Array.from(
                    document.querySelectorAll('input[name="material[]"]:checked')
                ).map(el => el.value);

                const formDataMateriales = new FormData();
                formDataMateriales.append("id_producto", id_producto);
                formDataMateriales.append("materiales", JSON.stringify(materialesSeleccionados));

                try {
                    const resMateriales = await fetch("php/insertar_materiales.php", {
                        method: "POST",
                        body: formDataMateriales
                    });

                    const dataMateriales = await resMateriales.json();

                    if (dataMateriales.exito) {
                        alert("Producto agregado correctamente");
                        form.reset();
                    } else {
                        alert("Error al agregar materiales: " + dataMateriales.error);
                    }
                } catch (err) {
                    console.error("Error al insertar materiales:", err);
                    alert("Error al conectar con el servidor para materiales");
                }
            } 
            else {
                alert("Error: " + (data.error || "No se pudo agregar el producto"));
            }
        } 
        catch (err) {
            console.error("Error en la conexión:", err);
            alert("Error al conectar con el servidor");
        }
    }
})