# Kodkod Frontend

## Table of Contents

- [Setup](#setup)
  - [Requirements](#requirements)
  - [Clone the repository](#clone-the-repository)
  - [Set git user](#set-git-user)
  - [Install dependencies](#install-dependencies)
  - [Configure environment variables](#configure-environment-variables)
  - [Run the development server](#run-the-development-server)
  - [Linting](#linting)
    - [Format](#format)
    - [ESLint](#eslint)
    - [TypeScript](#typescript)
- [Dependency management](#dependency-management)
    - [Add a dependency](#add-a-dependency)
    - [Add a dev dependency](#add-a-dev-dependency)
    - [Remove a dependency](#remove-a-dependency)
    - [Upgrade a dependency](#upgrade-a-dependency)
- [Stack](#stack)

## Setup

#### Requirements

You need to have the following tools installed in your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (>=20.11.0)
- [Yarn classic](https://yarnpkg.com/)

#### Clone the repository

```bash
$ git clone (repo url)
```

#### Set git user

Go to the root of the project:

```bash
$ cd (project name)
```

You can set a global git user to all your repositories:

```bash
$ git config --global user.name "github account name"
$ git config --global user.email "github account email"
```

or set a local git user only to the current repository (this is useful when you have a personal and a work account):

```bash
$ git config user.name "github account name"
$ git config user.email "github account email"
```

#### Install dependencies

In the root of the project run:

```bash
$ yarn install
# or just
$ yarn
```

#### Configure environment variables

Based on the `.env.example` file, create a `.env` file in the root of the project and set the environment variables.

#### Run the development server

```bash
$ yarn dev
```

#### Linting

```bash
$ yarn lint # runs all linters that run in CI
```

##### Format

```bash
$ yarn format # format all files based on prettier config
$ yarn format-check # check if all files are formatted based on prettier config
```

##### ESLint

```bash
$ yarn eslint-check # check if all code is following ESLint rules
$ yarn eslint-fix # fix all code that is not following ESLint rules and can be fixed automatically
```

##### TypeScript

```bash
$ yarn ts-check # check if all code is following TypeScript rules
```

## Dependency management

We install dependencies with exact versions to avoid unexpected changes or errors in our code. That's why we use a more specific commands to manage our dependencies.

#### Add a dependency

```bash
$ yarn add <package-name> --exact
```

> `--exact` or `-E` flag installs the exact version of the package

#### Add a dev dependency

```bash
$ yarn add <package-name> --dev --exact
```

> `--dev` or `-D` flag installs the package as a dev dependency

#### Remove a dependency

```bash
$ yarn remove <package-name>
```

#### Upgrade a dependency

```bash
$ yarn upgrade <package-name>@= --exact
```

> The `=` is not a valid semver range but it works for the command to display a list of all versions available to install/upgrade.

## Stack

- React.js + TypeScript
- Vite
- Styled-Components (CSS in JS)
- Material UI
- React-Router
- Axios Client
