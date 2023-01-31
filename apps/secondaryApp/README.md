# Buying Item Admin app

### Configure local API_URL 

- Copy the file .env.sample and rename it to `.env.development`
- Set the local API_URL and port

### Install project dependencies

```sh
yarn
```

## Running the application

```sh
yarn start
```

## Creating production build

- Copy the file .env.sample and rename it to `.env.production`
- Set the production API_URL and port

```sh
yarn build
```

The production build will be stored on `${root}/dist`

## Running code linter

```sh
yarn lint
```
Some of the lint errors can be fixed automatically by running
```sh
yarn lint --fix
```

## Running unit tests

```sh
yarn test
```

## Running unit tests on watch

```sh
yarn test --watchAll
```
Or if you're using Git
```sh
yarn test --watch
```
