# DEVELOPER.md

This document provides a guide for developers who want to contribute to or work with the `@interactive-video-labs/react` project. It covers setting up the development environment, understanding the project structure, running tests, building the project, and working with examples.

## Table of Contents

1.  [Getting Started](#getting-started)
2.  [Project Structure](#project-structure)
3.  [Available Scripts](#available-scripts)
4.  [Testing](#testing)
5.  [Building the Project](#building-the-project)
6.  [Working with Examples](#working-with-examples)
7.  [Contributing](#contributing)
8.  [Troubleshooting](#troubleshooting)

## 1. Getting Started

To get started with development, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/interactive-video-labs/interactive-video-react-wrapper.git
    cd interactive-video-react-wrapper
    ```

2.  **Install dependencies:**
    This project uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it via npm:
    ```bash
    npm install -g pnpm
    ```
    Then, install the project dependencies:
    ```bash
    pnpm install
    ```

## 2. Project Structure

Here's an overview of the key directories and files in this project:

*   `src/`: Contains the main source code for the React wrapper (`index.tsx`).
*   `test/`: Contains unit tests for the components (`InteractiveVideo.test.tsx`) and test setup (`setupTests.ts`).
*   `examples/`: Contains a simple example React application demonstrating how to use the wrapper.
    *   `index.html`: The HTML entry point for the example.
    *   `index.tsx`: The React application code for the example.
*   `dist/`: The output directory for the compiled library files.
*   `tsup.config.ts`: Configuration for `tsup`, the bundler used to build the library.
*   `vitest.config.ts`: Configuration for `Vitest`, the testing framework.
*   `package.json`: Project metadata, dependencies, and scripts.

## 3. Available Scripts

This project includes several scripts defined in `package.json` to help with development:

*   `pnpm build`: Compiles the TypeScript source code into JavaScript for distribution (`dist` folder).
*   `pnpm dev`: Starts `tsup` in watch mode, recompiling the library whenever source files change.
*   `pnpm test`: Runs all unit tests using Vitest.
*   `pnpm clean`: Removes the `dist` directory.
*   `pnpm prepare`: Runs `pnpm build`. This script is typically run before publishing the package.
*   `pnpm serve-examples`: Builds the example application and serves it using `http-server`.
*   `pnpm build-examples`: Compiles the example application using `esbuild`.

## 4. Testing

Tests are written using `Vitest` and `React Testing Library`. You can run all tests with:

```bash
pnpm test
```

When adding new features or fixing bugs, please ensure you add or update relevant tests to maintain code quality and prevent regressions.

## 5. Building the Project

The project is built using `tsup`. To compile the library for production, run:

```bash
pnpm build
```

This will generate the compiled JavaScript files and TypeScript declaration files in the `dist` directory.

## 6. Working with Examples

The `examples/` directory contains a basic usage example. To run it:

```bash
pnpm serve-examples
```

This will build the example and start a local web server, usually accessible at `http://localhost:8080` (or another port if 8080 is in use). You can modify the `examples/index.tsx` file to test your changes in a live environment.

## 7. Contributing

We welcome contributions to this project! Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines on how to contribute, including information on:

*   Reporting bugs
*   Suggesting enhancements
*   Submitting pull requests
*   Coding style and conventions

## 8. Troubleshooting

*   **`pnpm` command not found**: Ensure `pnpm` is installed globally (`npm install -g pnpm`).
*   **Build errors**: Check the output of `pnpm build` for specific error messages. Ensure all dependencies are installed (`pnpm install`).
*   **Test failures**: Review the test output for details on failing tests. You can often debug tests by adding `console.log` statements or using your IDE's debugger.
*   **Example server not starting**: Check if port 8080 (or the default `http-server` port) is already in use. You might need to stop other processes using that port or configure `http-server` to use a different port (though this is not directly supported by the `serve-examples` script).
