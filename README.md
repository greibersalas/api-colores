# api-colors
API para administrar los colores estandar de la empresa

## Tecnologies

NodeJS Typescript
ExpressJS Framework

## Installation

Para instalar las dependencias del proyecto ejecutamos el siguiente comando

```bash
npm install
```

## Build

Para crear el build utilizamos el siguiente comando

```bash
npm run build
```

## Servidor Dev

Para el servidor Dev utilizamos Nodemon

```bash
npm run dev
```

## Servidor Prod

Para leventar el servidor en produccion utilizamos el siguiente comando

```bash
npm start
```

## Deploy in Docker

Para realizar un despliegue en Docker creamos la imagen con el siguiente comando Docker

```bash
docker build . -t < name-image >
```
Remplazar < name-image > por el nombre que deseamoc colcar a la imagen

Para ejecutar nuestra api ejecutamos el siguiente comando

```bash
docker run -p 6200:3000 < name-image >
```
Notas:
1. En la sección de puertos solo se puede cambiar el primer puerto el segundo puerto debe ser 3000
2. Reemplazar < name-iamge > por el nombre que se coloco anteriormente
