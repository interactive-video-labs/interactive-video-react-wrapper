# CONTRIBUTING.md

We welcome contributions to the `@interactive-video-labs/react` project! By contributing, you help us improve and expand the capabilities of this React wrapper for interactive video experiences. Please take a moment to review this document to understand how to contribute effectively.

## Table of Contents

1.  [Code of Conduct](#1-code-of-conduct)
2.  [How Can I Contribute?](#2-how-can-i-contribute)
    *   [Reporting Bugs](#reporting-bugs)
    *   [Suggesting Enhancements](#suggesting-enhancements)
    *   [Your First Code Contribution](#your-first-code-contribution)
    *   [Pull Request Guidelines](#pull-request-guidelines)
3.  [Development Setup](#3-development-setup)
4.  [Testing](#4-testing)
5.  [Coding Style](#5-coding-style)
6.  [Commit Messages](#6-commit-messages)
7.  [License](#7-license)

## 1. Code of Conduct

This project adheres to the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [your contact email or issue tracker].

## 2. How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on our [GitHub Issues](https://github.com/interactive-video-labs/interactive-video-react-wrapper/issues) page. When reporting a bug, please include:

*   A clear and concise description of the bug.
*   Steps to reproduce the behavior.
*   Expected behavior.
*   Actual behavior.
*   Screenshots or video (if applicable).
*   Your environment details (OS, browser, `@interactive-video-labs/react` version, React version).

### Suggesting Enhancements

We love new ideas! If you have a suggestion for an enhancement or a new feature, please open an issue on our [GitHub Issues](https://github.com/interactive-video-labs/interactive-video-react-wrapper/issues) page. Please include:

*   A clear and concise description of the proposed enhancement.
*   Why this enhancement would be useful.
*   Any potential use cases or examples.

### Your First Code Contribution

If you're looking to make your first code contribution, look for issues labeled `good first issue` on our [issue tracker](https://github.com/interactive-video-labs/interactive-video-react-wrapper/issues).

### Pull Request Guidelines

1.  **Fork the repository** and create your branch from `main`.
2.  **Ensure your code adheres to the existing style** (see [Coding Style](#5-coding-style)).
3.  **Add or update tests** for any new features or bug fixes. Ensure all tests pass.
4.  **Update documentation** as necessary (e.g., `README.md`, `DEVELOPER.md`).
5.  **Write clear and concise commit messages** (see [Commit Messages](#6-commit-messages)).
6.  **Open a pull request** to the `main` branch. Provide a clear description of your changes and reference any related issues.

## 3. Development Setup

For detailed instructions on setting up your development environment, installing dependencies, and running the project locally, please refer to the [DEVELOPER.md](DEVELOPER.md) file.

## 4. Testing

All new features and bug fixes should be accompanied by appropriate tests. To run the test suite, use:

```bash
pnpm test
```

Ensure all tests pass before submitting a pull request.

## 5. Coding Style

We use ESLint and Prettier to maintain a consistent coding style. Please ensure your code is formatted correctly before submitting a pull request. You can typically run linting and formatting checks via your IDE or by running project-specific scripts (if available, check `package.json`).

## 6. Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for our commit messages. This helps with automated changelog generation and understanding the history of changes.

Examples:

*   `feat: Add new video playback controls`
*   `fix: Resolve issue with cue point triggering`
*   `docs: Update README with new usage example`
*   `chore: Update dependencies`

## 7. License

By contributing to `@interactive-video-labs/react`, you agree that your contributions will be licensed under its MIT License. See the [LICENSE](LICENSE) file for details.
