Temas puntuales de la sección
Esta es una sección pequeña pero nos ayudará a comprender sobre dos formas de expandir nuestra generación estática con una configuración muy simple.

El objetivo es que nuestro servidor de Next pueda almacenar respuestas para su futuro uso y a la vez que pueda revalidar el contenido previamente generado.


## 1. Incremental Static Regeneration (ISR)
ISR es una característica de Next que nos permite actualizar el contenido de nuestra página sin tener que volver a generarla por completo.

Esto es posible gracias a que Next puede almacenar en caché las páginas generadas estáticamente y volver a generarlas en segundo plano cuando se detecte que han cambiado.

Para habilitar esta característica debemos agregar la propiedad revalidate a la función getStaticProps de la siguiente manera:

```js
export async function getStaticProps() {
  const res = await fetch('https://.../posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    // Incremental Static Regeneration
    revalidate: 1, // In seconds
  }
}
```
fallback blocking : El servidor de Next.js esperará a que la página se genere por completo antes de responder a la solicitud. Esto es lo que hace que la página se genere en el momento de la solicitud.

fallback true : El servidor de Next.js generará una versión HTML para los caminos que no se han generado de forma estática a medida que se solicitan. Y luego, el servidor de Next.js regenerará y almacenará en caché esa página HTML para futuras solicitudes de la misma URL.

fallback false : Si el camino no se ha generado de forma estática, Next.js responderá con un 404.
