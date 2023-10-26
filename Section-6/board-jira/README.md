# Install Jira Board App

- Para correr localmente, se necesita la base de datos para eso se debe ejecutar con:

```
 docker-compose up -d
```
* El -d es para que se ejecute en segundo plano y no se quede en la terminal. __detacherd__.

Mongodb Url local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo  __.env.template__ a __.env__ y configurar las variables de entorno.


## Llenar la base de datos con infomacion de pruebas

Llamar : 

```
http://localhost:3000/api/seed

```