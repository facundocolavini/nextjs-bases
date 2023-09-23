# Despliegue y Docker 

- Vamos a probar de poner en march el despliegue a produccion con vercel. Donde podemos despegar nuestras aplicaciones de Nextjs y utilizar las caracteristicas que nos provee NextJS.

Tambien vamos agenerar una imagen de docker para utilizarla a futuro en otros proyectos para montarla en nuestras aplicaciones futuras.

En la imagen de docker pondremos:
- Sistema Operativo.
- Linux.
- Vamos a probarla en nuestro docker desktop.

## Temas putuales de la seccion 2: 

- Convertir una aplicación de Next.js en JavaScript a TypeScript
- Generar el build de producción / distribución
- Desplegar la aplicación en Vercel (Creado por la misma gente de Next.js)
- Generar una imagen de Docker
- Crear la imagen de Docker siguiendo las prácticas recomendadas por Next
- Correr la aplicación desde Docker Desktop


## Desplegar mi App de Next a produccion: 

### Servidor en la intranet:
- Ejecutar el comando : `yarn build`
- Ejecutar el comando : `yarn start` // Para iniciar el servidor de nextjs que tiene las configuraciones de rutas y paths de los archivos para poder servirlos en produccion.
- Crear un repositorio en github o en otros servidores de repositorios.
- Vamos a vercel y importamos nuestro repositorio creado con nuestro proyecto a desplegar ya subido en nuestro repositorio.

### Desplegar mi App en Vecerl con Docker para produccion:

Es mejor utilizar docker para que sea mas facil de mantener y que funcione en cualquier lugar.Ademas que vercel es de los mismos creadores de nextjs.

## Dockerizar nuestra app de nextjs:
Vamos a crear una imagen para poder correr nuestra app y sea autosuficiente y no dependa de nada mas.Tambien puede tener una serie de contenedores y trabajar entre si.

Hay 2 formas de trabajar : 
- .dockerignore : Ignora los archivos que no quieran ser parte de la imagen.Por que son archivos que se tienen que generar como node_modules.

```dockerignore 
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md 
.next
```

- Dockerfile : Es el archivo que va a tener las instrucciones para crear la imagen.

```dockerfile
FROM node: 17.0.1-alpine3.14
RUN mkdir -p /app 
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN yarn build
# USER // cambiar el usuario que esta definido como usuario root. Y para que no se ejecute nada como root.
EXPOSE 3000
CMD ["yarn", "start"]
```
- Instalar docker desktop para poder crear la imagen.
- Creamos nuestra imagen 
- Ir a nuestro directorio donde esta nuestro Dockerfile y ejecutar el comando :
- Este comando le da un nombre a nuestra imagen y el punto es el directorio donde esta nuestro Dockerfile.
```bash
docker build -t nextjs-initial .
```

# Levantar la imagen de docker

  ## Desde la terminar
    - Ejecutar el comando : 
    - 
    ```bash
    docker run --name=next-app -p 3000:3000 nextjs-initial
    ```
    
 - --name: Es el nombre que le vamos a dar a nuestro contenedor.
 - -p : Podemos hacer un puentre entre el port de nuestra maquina y el port de nuestro contenedor.
 - nombre de la imagen que queremos correr.

## Cambiar el port de nuestra maquina (local)al contenedor
    Ejemplo: port 80 de nuestra maquina al port 3000 de nuestro contenedor.
    ```bash
    docker run --name=next-app -p 80:3000 nextjs-initial
    ```

## Mejorar el peso de nuestra imagen de docker
- Modificar el nest.config.js
    ```js
    module.exports = {
        // https://nextjs.org/docs/advanced-features/output-file-tracing
        output: 'standalone',
    }
    ```
- Configurar la variable de entorno para que sea 3000 en el package.json. 

 "start": "next start -p ${PORT:=3000}"


``` dockerfile
# Fuente: https://github.com/vercel/next.js/blob/canary/examples/with-docker/README.md

# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]

# entre 50 a 150 MB```


