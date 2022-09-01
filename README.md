# Getting Started

This repo is an example of how to add HMR (Hot Module Reloading) to your [Enhance](https://enhance.dev) application using [Fastify](https://fastify.io).

    git clone git@github.com:Eckhardt-D/fastify-enhance-hmr.git

Install dependencies

    cd fastify-enhance-hmr && npm install

Run the dev server

    npm run dev

## Reloading

When you edit any files in the /app directory your app should automatically reload your changes in the browser. You can add more files to watch by following the pattern in `index.mjs`. The paths must be absolute paths to directories. (Due to lack of support in some OS's you cannot just add the top-level directory yet...).

## Production Mode

When you run

    npm run start

HMR will be completely disabled and no sockets will be registered client or server-side.

## Notes

This was mostly a thought experiment, feel free to open PRs though, but I don't see this being used widely. 😁


