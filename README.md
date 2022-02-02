# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm ci`

Installs `node_module` dependencies using `package-lock`.

### `npm run lint`

Runs [`eslint`](https://eslint.org/) code format checks.\
Integrates basic SonarJS checks with [`eslint-plugin-sonarjs`](https://www.npmjs.com/package/eslint-plugin-sonarjs).\
*To automatically fix issues, run `npm run lint:fix`.*

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Runs unit tests on both `src/components/` and `src/utils/` using [`jest`](https://jestjs.io/).\
Component and FE unit tests use the [`@testing-library/react`](https://testing-library.com/) framework.

### `npm run test:ci`

For CI and dev frameworks. Runs lint and unit tests.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Development

[`Husky`](https://typicode.github.io/husky/#/) is used to maintain `git hooks`, including `pre-commit` and `pre-push`.
- When users commit new changes, `lint:fix` will run.
- Users cannot push commits unless `test:ci` passes

