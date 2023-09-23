Esta sección es sumamente importante para comprender cómo podemos crear de forma estática páginas aunque tengan argumentos dinámicos.

- Puntualmente veremos:
- Multiples componentes de NextUI
- Flex Layout
- Temas de NextUI
- Next _document
- Navegación
- Parámetros por URL
- Parámetros estáticos
- Next - GetStaticProps
- Next - getStaticPaths
- Generar 151 páginas de forma estática en tiempo de construcción (build time)

Se utilizara la version 12 para seguir el curso de Nextjs:


## Paquetes: 

```bash
yarn  create next-app@12 
yarn add @nextui-org/react@1.0.2-beta.2

```

## Configuracion del _document.ts 
Ayuda a que todos los navegadores web puedan renderizar la aplicación de forma correcta.
Nos permite tener un control total sobre el documento HTML que se genera en la aplicación. 

```tsx
// pages/_document.tsx
import { CssBaseline } from "@nextui-org/react";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps, styles: <>{initialProps.styles}</> };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

```


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