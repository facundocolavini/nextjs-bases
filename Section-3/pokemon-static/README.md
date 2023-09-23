This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## GetStaticProps
Utilizamos getStaticProps siempre y cuando sepamos que  los parametros que se van a utilizar en la pagina.

Cuando generamos una pagina antes cuando el cliente hace el request y se genera en el servidor y en el request se envia la pagina ya construida.

Se getStaticProps se ejecuta del lado del servidor en el build time.

Solo se utiliza en las Pages de Next.js

props: esta funcion retorna un objeto con las props que se van a pasar al componente y se pueden ver en el cliente.

getStaticProps: se utiliza para generar las props de las paginas que se van a generar de forma estatica.

Cuando generamos el build de produccion no se vuelve a ejecutar getStaticProps.

## getStaticPaths Static site generation para paginas que tienen armgumentos dinamicos
Podemos utilizar getStaticPaths si estamos de manera estatica pre renderizando las paginas que utilizan argumentos dinamicos.

Cuando se tiene una pagina que se va a generar de forma estatica pero con argumentos se utiliza getStaticPaths

getStaticPaths: Retorna un objeto con las rutas que se van a generar de forma estatica.

paths : es un array de objetos que tienen la propiedad params que es un objeto con los argumentos que se van a utilizar en la pagina.

fallback: es un booleano que indica si se va a generar una pagina de forma estatica o no. Puede tener 3 valores.

false: si la pagina no existe se va a mostrar un 404
true: si la pagina no existe se va a generar de forma dinamica  
blocking: si la pagina no existe se va a generar de forma dinamica pero el usuario no va a poder ver la pagina hasta que se genere.

Cuando se termina de ejecutar getStaticPaths se ejecuta getStaticProps y podemos utilizar los argumentos que se generaron en getStaticPaths.

ctx : es un objeto que tiene la propiedad params que es un objeto con los argumentos que se van a utilizar en la pagina.

getStaticPaths se ejecuta en el servidor en el build time.En desarrollo se ejecuta en cada request.