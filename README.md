# Sayurbox - Technical Test Frontend
The React Native Project(`swapi-mobile`) is part of git submodules. So when trying to clone the repo use the `--recursive` flag

Example
```
git clone git@github.com:ganes1410/Sayurbox-task.git --recursive
```
## Web Project setup

```
yarn install
```

### Development

```
yarn dev
```

### Build for Production

```
yarn build
```

## React Native Project setup

The React Native Project project is built with Expo. The code for it is under `swapi-mobile` submodule.

```
cd swapi-mobile

yarn install
```

### Development

```
yarn start
```

## [Live Demo](https://sayurbox-task.netlify.app/) deployed on Netlify

## Features Implemented

- Listing Pages for Movies and People section separated by tabs.
- Details Pages for individual Movies and People.
- All the pages are cached with `DocumentCache`, so the api calls do not happen on subsequent page visits.
- Pagination of Planets Listing to fetch only 12 items at a time.
- The above features are also completed on the mobile app except the pagination part.

## Known issues

- The Cached Pagination data of Planets Listing does not persist across mutliple routes.
  This happens because the react state does not know about the cached data on initial load.
  Could not find a solution for this in time.

## Packages / Frameworks Used

- [NextJS](https://nextjs.org/) for building the react app.
- [Expo](https://docs.expo.dev/) for building the react native app.
- [Urql](https://formidable.com/open-source/urql/docs/) as the graphl client.
- [Chakra UI](https://chakra-ui.com/) for styling in the react app.
- [Graphql Code Gen](https://www.graphql-code-generator.com/) for generating graphql types and hooks needed for the project.
