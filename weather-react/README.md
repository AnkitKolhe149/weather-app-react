# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Environment variables

Create a `.env` file at the project root with your WeatherAPI key (from https://www.weatherapi.com/):

VITE_WEATHERAPI_KEY=your_api_key_here

Restart the dev server after editing `.env` so Vite picks up the new variables.

## Run the project

You should run npm commands from the `weather-react` folder (where `package.json` lives):

```bash
cd weather-react
npm install
npm run dev
```

If you prefer running from the repository root, change into the `weather-react` directory first or move `package.json` up — changing directory is recommended.
