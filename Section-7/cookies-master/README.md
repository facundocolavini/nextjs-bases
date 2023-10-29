Beneficio de utilizar cookies:

4KB de almacenamiento

- Almacenar información del usuario
- Son enviadas al backend/servidor en cada petición.
- Se pueden leer y escribir desde el backend y el frontend

Hay varias formas de leer las cookies

La cookie esta hecha para cuando el cliente haga una solitud nosotros podamos devolver la informacion especializada basado en lo que busca el usuario.Algo como rastrear informacion por ejemplo si buscamos sobre remeras y eso se guarda en la cookie y luego cuando volvamos a buscar algo se nos muestre informacion relacionada con remeras.

No confiar al 100% de la informacion que venga de la cookie hay que validarla.


getInitialProps: es una funcion que se ejecuta en el servidor y en el cliente, es decir, se ejecuta en el servidor cuando se hace la peticion y en el cliente cuando se hace la navegacion.

No es recomendable usar getInitialProps en el componente, es mejor usarlo en el archivo _app.js porque se ejecuta una sola vez y no en cada componente.

Si  utilizamos el getInitialProps perdemos el static side generation, es decir, no se va a generar el html en el servidor, sino que se va a generar en el cliente.Esto cuando usamos el getInitialprops en el App.tsx y no en el componente.

Todas las paginas cuando agamos el build de la app se van a generar en el servidor, pero si usamos el getInitialProps en el componente, cuando se haga la peticion se va a generar el html en el servidor y cuando se haga la navegacion se va a generar el html en el cliente.