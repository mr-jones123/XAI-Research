
# Basics
`npm` , Node Package Manager, is a **dependency** package manager for Node.js. 

> To install `npm`, you need to install Node.js first.

[![image](https://www.specbee.com/sites/default/files/inline-images/NPM-01_0.jpg)
**Dependency** is a third-party library, framework, or software that your project relies on. For example, when you are creating a website, it needs important frameworks like `react`, `tailwind`, and `next.js` in order for the front-end to work. 

All **dependencies** in a project are stored in the `package.json` file. Whenever you see a project in websites like GitHub and want to develop it, executing the command `npm install` will download all dependencies on your local machine.

Often you'll see more flags added to this command:
- `--save-dev` installs and adds the entry to the `package.json` file _devDependencies_
- `--no-save` installs but does not add the entry to the `package.json` file _dependencies_
- `--save-optional` installs and adds the entry to the `package.json` file _optionalDependencies_
- `--no-optional` will prevent optional dependencies from being installed

Shorthands of the flags can also be used:

- -S: `--save`
- -D: `--save-dev`
- -O: `--save-optional`

The difference between _devDependencies_ and _dependencies_ is that the former contains development tools, like a testing library, while the latter is bundled with the app in production.

## node_modules

Noticed when you run `npm install`, there's a `node_modules` folder? That is the container which `npm` will track packages installed in your local machine. 

So when you use a CSS framework like Tailwind, all of its components and functionalities come from the `node_modules` folder.  

> **It is important to note that when you push your files in your GitHub repository, you must not include the  `node_modules` folder, as the file is too large.**>

#### Resources
[What is the purpose of node_modules folder?](https://stackoverflow.com/questions/63294260/what-is-the-purpose-of-the-node-modules-folder)
[Should I .gitignore node_modules?](https://www.reddit.com/r/webdev/comments/pdz3oi/should_i_gitignore_node_modules/)
[Should "node_modules" folder be included in the git repository](https://stackoverflow.com/questions/18128863/should-node-modules-folder-be-included-in-the-git-repository)

## Running Tasks

In the `package.json` file, you might see something this:
```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}
```

These are called **scripts** that run tasks such as starting a local server using the command: `npm run <task-name>`.
## npx

`npx` , Node Package Execute, is a tool for executing npm packages without installing them locally.

For example, in creating a React app using next.js you execute this command -> : `npx create-next-app@latest`.

These two commands should give you a good idea about the distinction between `npm` and `npx`.  The first command installs the package, and the second executes it.
```
npm install -D tailwindcss
npx tailwindcss init
```

