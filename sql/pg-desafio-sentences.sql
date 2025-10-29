SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET search_path = public, pg_catalog;



CREATE TABLE public.bodega (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

CREATE TABLE public.materiales (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

CREATE TABLE public.moneda (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

CREATE TABLE public.sucursal (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    id_bodega integer REFERENCES public.bodega(id)
);

CREATE TABLE public.producto (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo varchar(15) NOT NULL,
    nombre varchar(50) NOT NULL,
    precio numeric NOT NULL,
    descripcion varchar(1000) NOT NULL,
    id_bodega integer NOT NULL REFERENCES public.bodega(id),
    id_sucursal integer NOT NULL REFERENCES public.sucursal(id),
    id_moneda integer NOT NULL REFERENCES public.moneda(id)
);

CREATE TABLE public.producto_material (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_producto integer NOT NULL REFERENCES public.producto(id),
    id_material integer NOT NULL REFERENCES public.materiales(id)
);




INSERT INTO public.bodega (id, nombre)
OVERRIDING SYSTEM VALUE VALUES
(1, 'Bodega 01'),
(2, 'Bodega 02'),
(3, 'Bodega 03');

INSERT INTO public.sucursal (id, nombre, id_bodega)
OVERRIDING SYSTEM VALUE VALUES
(1, 'Sucursal 01', 1),
(2, 'Sucursal 02', 1),
(3, 'Sucursal 03', 2),
(4, 'Sucursal 04', 2),
(5, 'Sucursal 05', 3),
(6, 'Sucursal 06', 3);

INSERT INTO public.materiales (id, nombre)
OVERRIDING SYSTEM VALUE VALUES
(1, 'Plástico'),
(2, 'Metal'),
(3, 'Madera'),
(4, 'Vidrio'),
(5, 'Textil');

INSERT INTO public.moneda (id, nombre)
OVERRIDING SYSTEM VALUE VALUES
(1, 'Dólar'),
(2, 'Peso chileno'),
(3, 'Peso mexicano');

INSERT INTO public.producto (id, codigo, nombre, precio, descripcion, id_bodega, id_sucursal, id_moneda)
OVERRIDING SYSTEM VALUE VALUES
(6, 'AUJ124F23', 'Aceite de oliva', 5990, 'Aceite de oliva extra virgen', 1, 2, 2),
(7, 'AUJ124FG67', 'Aceite Maravilla', 5990, 'Aceite de maravilla vegetal', 2, 4, 2),
(8, 'B7UMK90', 'Azúcar flor', 3.99, 'Azúcar flor 1 kg', 3, 6, 1),
(9, 'AAAAA111', 'Pantalla OLED', 159990, 'Pantalla OLED 55 pulgadas', 1, 1, 2);

INSERT INTO public.producto_material (id, id_producto, id_material)
OVERRIDING SYSTEM VALUE VALUES
(1, 6, 1),
(2, 6, 3),
(3, 6, 4),
(4, 7, 2),
(5, 7, 4),
(6, 7, 5),
(7, 8, 1),
(8, 8, 4),
(9, 9, 1),
(10, 9, 2);




SELECT pg_catalog.setval('public.bodega_id_seq', 3, true);
SELECT pg_catalog.setval('public.materiales_id_seq', 5, true);
SELECT pg_catalog.setval('public.moneda_id_seq', 3, true);
SELECT pg_catalog.setval('public.producto_id_seq', 9, true);
SELECT pg_catalog.setval('public.producto_material_id_seq', 10, true);
SELECT pg_catalog.setval('public.sucursal_id_seq', 6, true);