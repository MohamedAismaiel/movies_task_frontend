# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What to do first?

In case of cloning this application from github, Don't forget to run the (npm install) command or (yarn install) depending on your operating system

## Libraries used:

### Tailwind css

For styling

### Antd

For some built in components

### dayjs

For time and date formatiing

### React redux

For component designing

### react-router-dom

For routing

### react-lazy-load

For rendering Images in lazy loading

## Available Scripts

In the project directory, you can run:

## Backend Endpoints

### /movies

Will respond with the whole movies list starting with page number 1

### /movies?keyword={keyword}&page={pageNumber}

Will respond with the entered keyword and required page number, in case of the user entered directly a wrong page taht does not exist in the url, it will return with no results found & same for keyword.

### /movies/details?id={id}

Will respond with the details information of the movie

## Commands

### `npm start`

Which runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
