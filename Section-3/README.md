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