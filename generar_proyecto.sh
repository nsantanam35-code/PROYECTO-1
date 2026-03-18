#!/bin/bash
# Preguntar el nombre del proyecto
echo "Escribe el nombre de tu nuevo proyecto (ej: practica_fullstack):"
read PROYECTO

# 1. Crear estructura completa de carpetas
mkdir -p "$PROYECTO/assets/css" "$PROYECTO/assets/js" "$PROYECTO/assets/img"

# 2. Crear el archivo index.html con vínculos a CSS y JS
cat <<EOT > "$PROYECTO/index.html"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$PROYECTO</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <h1>Proyecto: $PROYECTO</h1>
    <p>Estructura generada exitosamente.</p>
    
    <img src="assets/img/placeholder.png" alt="Imagen de prueba">

    <script src="assets/js/app.js"></script>
</body>
</html>
EOT

# 3. Crear el archivo CSS (Lección 3)
cat <<EOT > "$PROYECTO/assets/css/styles.css"
body {
    background-color: lightblue;
    font-family: sans-serif;
}
h1 {
    color: red;
    text-align: center;
}
img {
    width: 400px;
    height: 300px;
    display: block;
    margin: 20px auto;
    border: 2px solid #333;
}
EOT

# 4. Crear el archivo JavaScript (JS) con un mensaje de prueba
cat <<EOT > "$PROYECTO/assets/js/app.js"
console.log("¡JavaScript vinculado correctamente en $PROYECTO!");

// Ejemplo: Cambiar el color de fondo al hacer click
document.querySelector('h1').addEventListener('click', () => {
    alert('¡Hola desde JS!');
});
EOT

# 5. Crear un archivo vacío para la imagen (placeholder)
touch "$PROYECTO/assets/img/placeholder.png"

echo "------------------------------------------"
echo "¡LISTO! Proyecto '$PROYECTO' creado."
echo "Estructura:"
echo " - index.html (Vinculado)"
echo " - assets/css/styles.css (Con estilos)"
echo " - assets/js/app.js (Con lógica inicial)"
echo " - assets/img/ (Carpeta para tus imágenes)"
echo "------------------------------------------"
