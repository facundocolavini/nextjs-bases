
Que es Nextjs :
Es un Framework poderoso para crear contenido estatico del lado del servidor (serverside rendering). Esta basado en react.
Podemos hacer todo lo que sabemos hacer en react en Next.

Algunas Herraminetas que vienen y algunas mejoras al utilizar Next: 

- Mejoras de cargas
- Mejor SEO
- Mejoras de Rendimiento
- Router :  Viene con un router propio integrado.
- Dependencias : Tenemos menos dependencias por que viene con herramientas ya instaladas para utilizarse.

Entorno de trabajo:
NextJs asume que trabajamos node en el backend.


Next cambia el paradigma del SPA:
Tenemos mas opciones:

- Server side rendering: Contenido generado bajo demanda del lado del servidor cuando se genere una nueva petition.

- Static side rendering: Contenido estatico que se genera y siempre sera el mismo del lado del servidor.
Incremental side generation: 

- Client side renderig : CRA (Create react app )
- Incremental static Regeneration: Sirve para aplicaciones grandes para crear nuevas paginas similares.
- Dinamics routing: Podemos especificar las rutas que queremos contruir y argumentos al momento del hacer el build (no del request del usuario).


Que diferencias hay entre una SPA y una con Server side rendering.

- Spa:

- No son SEO frendly
- El seo es importante por el impacto que va a tener la aplicación en la red.


- Next 
- Genera contenido estatico del lado del servidor



# Estructura de una APP de next

**Pages:**Contendra las paginas de mi aplicacion.

**index.tsx**: Es index por que se sirve el archivo index.html es la raiz de mi url.
Nuestras paginas que son componentes tienen que estar nombrado en minisculas sin espacios.Por que el nombre que tenga mi archivo del componente sera el nombre del path.

**.next**: La carpeta .next cuando servimos la app se sirve en produccion o desarrollo crea esta carpeta.Cuando hacemos el build de produccion genera archivos de forma estatica con hash  para almacenarlo en cache.
En modo desarrollo no tenemos hash y hay menos informacion nuestros archivos no se generan en forma estatica.Generalmente no se toca la carpeta ".next".

**node_modules**: Es la carpeta contenedora de nuestros modulos algunos no se veran incluidos en produccion.Ayuda a hacer la separacion de codigo.Y lo maneja npm , pnpm o yarn.


**pages**: Es la carpeta pages es para menjar nuestro sistema de rutas en la aplicación. Si queremos ver una nueva ruta creamos nuestras carpetas y tomara esa carpeta buscara los archivos dentro y y el nombre de la carpeta sera una ruta. Pages seria nuestra ruta raiz de nuestra aplicación.


**app.tsx**: Es la raiz de nuestra aplicacion seria nuestro nodo de inicio de nuestra aplicación.Cualquier cambio en este archivo se vera afectado en toda nuestra aplicación.

**public**: Manejamos el contenido estatico como imagenes, iconos , archivos css, archivos de javascript sirve para colocar recursos o codigo que no requiera una compilacion y va a ser servido de esta carpeta publica.


**styles**: Son estilos de la aplicación, podemos organizarnos como querramos por ejemplo global podriamos verlo en el App.tsx podriamos utilizar y colocar estilos que se usaran globalmente en nuestra aplicacion.
Luego podemos utilizar archivos que pertenezcan a un componente en particular.
Nos ayuda a separar por modulos y encapsular el css.

**eslintrc.json**: Controlador de codigo.

**next.config.js**: Archivo de configuracion de next.

