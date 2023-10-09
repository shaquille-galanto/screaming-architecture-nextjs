## 📔 Overview

This project is a highly scalable project architecture for NextJS 13 which is built and configured to easily achieve quality and consistency of codes among the team of developers.

### 📜 Table of Contents

- [Introduction to Screaming Architecture](#-introduction-to-screaming-architecture)
- [Rules](#-rules)
  - [Group by feature](#-rule-1-group-by-feature)
  - [Avoid nesting of feature files inside feature file](#-rule-2-avoid-nesting-of-feature-files-inside-feature-file)
  - [Create barrel file then name the component file by its name, not index.tsx](#-rule-3-create-barrel-file-then-name-the-component-file-by-its-name-not-indextsx)
  - [Create a type-only barrel file for types](#-rule-4-create-a-type-only-barrel-file-for-types)
  - [Place UI components inside features/ui directory](#-rule-5-place-ui-components-inside-featuresui-directory)
  - [Place utility functions inside features/utils directory](#-rule-6-place-utility-functions-inside-featuresutils-directory)
  - [Create separate directory for section components](#-rule-7-create-separate-directory-for-section-components)
  - [Use kebab-case for file/folder names](#-rule-8-use-kebab-case-for-filefolder-names)
  - [Use relative import when importing from the same module](#-rule-9-use-relative-import-when-importing-from-the-same-module)
  - [Notes](#-notes)
- [Feature File Structure](#-feature-file-structure)
  - [Component](#-component)
  - [Section Component](#-section-component)
  - [Context-Reducer](#-context-reducer)
  - [Context](#-context)
  - [Hooks](#-hooks)
  - [Utils](#-utils)
- [Code Generator](#-code-generator)
- [Project Configurations & Setup](#-project-configurations--setup)
  - [Package Manager](#-package-manager)
  - [Continuous Integration (CI)](#-continuous-integration-ci)
  - [Husky Pre-Commit](#-husky-pre-commit)
  - [TypeScript](#-typescript)
  - [ESLint](#-eslint)
  - [VSCode Settings](#-vscode-settings)
  - [NextJS Config](#-nextjs-config)
  - [Testing Environment](#-testing-environment)
  - [SCSS Modules](#-scss-modules)
- [Resources About Screaming Architecture](#resources-about-screaming-architecture)

## 🎉 Introduction to Screaming Architecture

**Screaming Architecture** is a concept introduced by Uncle Bob (Robert C. Martin) as a metaphor for software architecture that emphasizes the clarity and intent of the system's architecture through its structure and organization. The idea behind Screaming Architecture is to make the architecture of a software system so evident and expressive that it "screams" its purpose and design, making it easy for developers and stakeholders to understand and work with.

## 📝 Rules

### ✏️ Rule #1: Group by feature

Follow these rules for grouping by feature

- Place all feature codes inside `src/features` directory
- Co-locate all related files of a specific feature
- Don't name your folders that describes the framework that you are using

Here's an example of structure that does not comply with all the rules mentioned above:

```
❌ Don't do this ❌

└── 📁 src/
    ├── 📁 components/
    │   ├── 📁 add-todo-form/
    │   └── 📁 todo-list/
    ├── 📁 contexts/
    │   └── 📁 todo-provider/
    ├── 📁 hooks/
    │   └── 📁 use-todo/
    └── 📁 graphql/
        └── 📁 todos/
```

And here's how to fix it:

```
✅ Do this instead ✅

└── 📁 src/
    └── 📁 features/
        └── 📁 todos/
            ├── 📁 add-todo-form/
            ├── 📁 todo-provider/
            ├── 📁 todo-list/
            ├── 📁 todo-query/
            ├── 📁 use-todo/
            └── 📄 index.ts
```

### ✏️ Rule #2: Avoid nesting of feature files inside feature file

Nesting of files can affect the readability of the project architecture, so as much as possible we want to avoid it. Let's say for example, `todo-item` is only being used in `todo-list` and we have `use-todo-item` which is being used inside `todo-item` only. We might think of nesting `use-todo-item` inside `todo-item` and nesting `todo-item` inside `todo-list`. But what if there's another file that is only being used in `use-todo-item`? The nesting would be endless, so it might be better to just avoid it from the start.

```
❌ Don't do this ❌

└── 📁 src/
    └── 📁 features/
        │   ✅ root level of feature file
        └── 📁 todos/
            │   ✅ 1st level
            └── 📁 todo-list/
                │   ❌ 2nd level
                ├── 📁 todo-item/
                │   │   ❌ 3rd level
                │   ├── 📁 text use-todo-item/
                │   │   ├── 📄 use-todo-item.tsx
                │   │   └── 📄 index.ts
                │   ├── 📄 todo-item.tsx
                │   └── 📄 index.ts
                ├── 📄 todo-list.tsx
                └── 📄 index.ts
```

```
✅ Do this instead ✅

└── 📁 src/
    └── 📁 features/
        │   ✅ root level of feature file
        └── 📁 todos/
            │   ✅ 1st level
            ├── 📁 todo-list/
            │   ├── 📄 todo-list.tsx
            │   └── 📄 index.ts
            │   ✅ 1st level
            ├── 📁 todo-item/
            │   ├── 📄 todo-item.tsx
            │   └── 📄 index.ts
            │   ✅ 1st level
            └── 📁 use-todo-item/
                ├── 📄 use-todo-item.tsx
                └── 📄 index.ts

```

### ✏️ Rule #3: Create barrel file then name the component file by its name, not index.tsx

Naming the component file as `index.tsx` will create confusion in the directory and will make it harder to search a specific component in IDE, resulting in poor developer experience.

```
❌ Don't do this ❌

└── 📁 todo-list/
    └── 📄 index.tsx
```

```
✅ Do this instead ✅

└── 📁 todo-list/
    ├── 📄 todo-list.tsx
    └── 📄 index.ts
```

See [component structure](#-component) for reference.

### ✏️ Rule #4: Create a type-only barrel file for types

It is easier to use `Type-Only Imports and Export` with types when we store all types in a type-only barrel file. See illustration below.

```
└── 📁 src/
    └── 📁 features/
        └── 📁 todos/
            ├── 📁 todo-list/
            │   ├── 📄 todo-list.tsx
            │   │   # This is the barrel file of todo-list component
            │   ├── 📄 index.ts
            │   └── 📄 types.ts
            │   # This is the barrel file of components for todos feature
            ├── 📄 index.ts
            │   # This is the barrel file of types for todos feature
            └── 📄 types.ts
```

This way, we can use `Type-Only Imports and Export` with ease like

```ts
// todos/types.ts

// re-export types using type-only export
export type * from './todo-list/types'
```

```ts
// import TodoListProps somewhere

// import types using type-only import
import type { TodoListProps } from '@features/todos/types'
```

### ✏️ Rule #5: Place UI components inside features/ui directory

Treat every component as a feature even if that component doesn't do anything besides displaying its UI in the webpage. UI components are the components that is shared/reusable across the app like `<Button>`, `<Input>`, `<Container>`, etc. Those components should be placed inside `features/ui` directory.

### ✏️ Rule #6: Place utility functions inside features/utils directory

Utility function is a function designed to perform a specific task or set of tasks, often focused on providing common functionalities that can be reused across the app. Just like UI components, utility functions are also considered a feature and should be placed inside `features/utils` directory.

### ✏️ Rule #7: Create separate directory for section components

Section component is a component that contains composition or layout of multiple feature components. It usually doesn't contain any logic, only styles that controls the layout. Each feature item can have section directory that contains section components.

```
└── 📁 src/
    └── 📁 features/
        └── 📁 todos/
            ├── 📁 add-todo-form/
            │   ├── 📄 add-todo-form.tsx
            │   ├── 📄 index.ts
            │   └── 📄 types.ts
            ├── 📁 todo-list/
            │   ├── 📄 todo-list.tsx
            │   ├── 📄 index.ts
            │   └── 📄 types.ts
            │   ✨ Sections directory ✨
            ├── 📁 sections/
            │   ├── 📁 todo-section/
            │   │   ├── 📄 todo-section.tsx
            │   │   ├── 📄 index.ts
            │   │   └── 📄 types.ts
            │   │   # Barrel file for sections
            │   └── 📄 index.ts
            ├── 📄 index.ts
            └── 📄 types.ts
```

```tsx
const TodoSection = () => (
  <section>
    <AddTodoForm />
    <TodoList />
  </section>
)
```

### ✏️ Rule #8: Use kebab-case for file/folder names

A common way of naming file in react is to name component as PascalCase, and non-component as camelCase. However, it promotes inconsistency and could probably give confusion to the developers. Plus, it is prone to have conflicts with case-sensitive file systems like CI, Version Control and Operating Systems. By using kebab-case, we can avoid those problems. See [feature file structure](#-feature-file-structure) for reference.

### ✏️ Rule #9: Use relative import when importing from the same module

By having feature-based directory and barrel files, this type of architecture is prone to having circular dependency by importing a module from the same module. For example we have this directory setup:

```
└── 📁 src/
    └── 📁 features/
        └── 📁 todos/
            ├── 📁 add-todo-form/
            │   ├── 📄 add-todo-form.tsx
            │   ├── 📄 index.ts
            │   └── 📄 types.ts
            ├── 📁 todo-list/
            │   ├── 📄 todo-list.tsx
            │   ├── 📄 index.ts
            │   └── 📄 types.ts
            ├── 📄 index.ts
            └── 📄 types.ts
```

Then, inside `todo-list` if you want to import `add-todo-form`, you shouldn't import it using [path alias](#-typescript), use relative path instead.

```ts
// Alias path
// ❌ Don't do this ❌
import { AddTodoForm } from '@features/todos'
```

```ts
// Relative path
// ✅ Do this instead ✅
import { AddTodoForm } from '../add-todo-form'
```

### 💡 Notes

Although this project have certain rules to achieve the goal of **Screaming Architecture**, there can still be a lot of different implementations of it. It will only be a matter of preference and what will work for you or everyone in the team. There's no right or wrong here as long as you apply the important rule of **Screaming Architecture**, which is to tell the readers and developers about the system, not about the frameworks you used in your system.

## 📂 Feature File Structure

### ✨ Component

```
└── 📁 todo-list/
    ├── 📄 index.ts
    ├── 📄 styles.module.scss
    ├── 📄 todo-list.test.tsx
    ├── 📄 todo-list.tsx
    └── 📄 types.ts
```

### ✨ Section Component

```
└── 📁 todos/
    └── 📁 sections/
        ├── 📁 todo-section/
        │   ├── 📄 index.ts
        │   ├── 📄 todo-section.tsx
        │   ├── 📄 todo-section.test.tsx
        │   └── 📄 types.ts
        ├── 📁 todo-form-section/
        │   ├── 📄 index.ts
        │   ├── 📄 todo-form-section.tsx
        │   ├── 📄 todo-form-section.test.tsx
        │   └── 📄 types.ts
        └── 📄 index.ts
```

### ✨ Context-Reducer

```
└── 📁 todo-provider/
    ├── 📄 index.ts
    ├── 📄 todo-provider.test.tsx
    ├── 📄 todo-provider.tsx
    ├── 📄 todo-reducer.test.ts
    ├── 📄 todo-reducer.ts
    └── 📄 types.ts
```

### ✨ Context

```
└── 📁 todo-provider/
    ├── 📄 index.ts
    ├── 📄 todo-provider.test.tsx
    ├── 📄 todo-provider.tsx
    └── 📄 types.ts
```

### ✨ Hooks

```
└── 📁 use-todo/
    ├── 📄 index.ts
    ├── 📄 use-todo.test.ts
    ├── 📄 use-todo.ts
    └── 📄 types.ts
```

### ✨ Utils

```
└── 📁 utils/
    ├── 📁 debounce/
    │   ├── 📄 debounce.test.ts
    │   ├── 📄 debounce.ts
    │   └── 📄 index.ts
    ├── 📁 use-media-query/
    │   ├── 📄 index.ts
    │   ├── 📄 use-media-query.test.ts
    │   └── 📄 use-media-query.ts
    └── 📄 index.ts
```

## Code Generator

```
pnpm plop
```

<img src="https://example.com/path/to/your-gif.gif" alt="Your GIF">

## ⚙️ Project Configurations & Setup

### 🔧 Package Manager

This project uses `pnpm` as package manager. `pnpm` is known to be 3 times faster and more efficient than `npm` and it is also faster than `yarn` in many cases. There are still more reasons to be choosing `pnpm` over `npm` and `yarn`, but it is still a matter of team's preference. Listed down below some useful resources about `pnpm`:

- [Why you should prefer using pnpm over npm and yarn?](https://refine.dev/blog/pnpm-vs-npm-and-yarn/)
- [JavaScript Package Managers: NPM vs YARN vs PNPM](https://www.atatus.com/blog/npm-vs-yarn-vs-pnpm/)
- [PNPM Benchmark](https://pnpm.io/benchmarks)

### 🔧 Continuous Integration (CI)

This project runs an automated error-checks workflow, including linting, type checking, and testing in every pull request. This will help developers to identify and address potential errors, ensuring code quality in the codebase.

### 🔧 Husky Pre-Commit

In order to protect the repo from bad commits, this project is configured with husky pre-commit that will run eslint and typecheck and will prevent the commit if there's any eslint and type errors.

### 🔧 TypeScript

This project is configured with NextJS TypeScript config with an additional helpful config that will help maintain code quality.

- **Path Alias**

  - Every root directory inside `./src` is set to have alias with this format `@name-of-directory/`. See examples below:
    - `./src/features` ---> `@features/`
    - `./src/styles` ---> `@styles/`
  - With this config, every non-relative import will become like `@features/todo`, `@features/ui`, `@styles/abstracts`

- **Global Types**
  - This project has `global.d.ts` file where global types and utilities are being declared. Global types that is being declared here are usually the types for the integrated third-party scripts that doesn't provide type declarations on their module.

### 🔧 ESLint

This project is configured with NextJS ESLint config with an additional helpful rules that will help maintain code quality especially in ReactJS. A rule that is worth mentioning here is the `react-hooks/exhaustive-deps` rule is set to `error`. That rule will prevent any bad usages of `useEffect` and will help developers to think twice when using it, since most of the time [you might not need an effect](https://react.dev/learn/you-might-not-need-an-effect).

### 🔧 VSCode Settings

The vscode settings are configured to align with the code standards of this project. Configs that are worth mentioning are the ff:

- **Organize imports on save**.

  - This will remove unused imports and sort imports alphabetically.

- **Format on save**.

  - This will run prettier on the specific file you save.

- **Fix eslint errors on save**.
  - This will automatically fix eslint errors on the specific file you save.

### 🔧 NextJS Config

This project uses the default config of NextJS and just configured with [circular-dependency-plugin](https://www.npmjs.com/package/circular-dependency-plugin) in webpack to trace circular dependency errors easily.

### 🔧 Testing Environment

This project is configured to use the following testing frameworks:

- **Unit, Integration & Component Testing**

  - Jest + React Testing Library

- **End-to-end Testing**
  - Cypress (Coming Soon)

### 🔧 SCSS Modules

This project uses SCSS modules for styling.

**Directories**

- **styles/abstract**
  - This is like the utilities for scss. This is where all variables, mixins, functions and other non-css property codes are placed
- **styles/base**
  - This is where the global styles are placed like reset and base styles. This set of styles are imported in the root app.

## Resources About Screaming Architecture

- https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html

- https://profy.dev/article/react-folder-structure

- https://levelup.gitconnected.com/what-is-screaming-architecture-f7c327af9bb2
