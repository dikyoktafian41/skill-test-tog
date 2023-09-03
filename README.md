# Skill Test TOG

This application was generated using the [NodeJS blueprint](https://github.com/jhipster/generator-jhipster-nodejs) of JHipster 7.0.1, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v7.0.1](https://www.jhipster.tech/documentation-archive/v7.0.1). For any questions you can refer to the stream lead: [Angelo Manganiello](https://github.com/amanganiello90).

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install




## Building and running

#### Running

```bash
npm run json:watch
npm run serve
```

#### Building

```bash
npm run build:app
```

The build folder with all compiled sources will be **server/dist**.

> For more explanation about full stack server/client build refer to [server/README.md](server/README.md)

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    npm test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run in a terminal (`npm run e2e`) after that the full application is run (`npm run start:app`).

For more information, refer to the [Running tests page][].

