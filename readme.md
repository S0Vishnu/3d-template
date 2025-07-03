# web-3d-template

`web-3d-template` is a command-line tool for scaffolding React Three Fiber (web-3d) projects. It allows you to quickly set up a project with optional physics support and choose between JavaScript and TypeScript.

---

## Features

* **Basic web-3d Template**: Includes `@react-three/fiber` and `@react-three/drei`.
* **Physics Support**: Optionally add `@react-three/rapier` for physics-based interactions.
* **Language Choice**: Generate projects in either JavaScript or TypeScript.
* **Ease of Use**: Just a few prompts to get started.

---

## Installation

You can use the tool directly with `npx` (no installation required):

```bash
npx web-3d-template
```

Or, install it globally for repeated use:

```bash
npm install -g web-3d-template
```

---

## Usage

Run the CLI tool:

```bash
npx web-3d-template
```

### Steps:

1. **Enter Project Name**: Provide a name for your new project folder.
2. **Include Physics**: Choose whether to include physics support with `@react-three/rapier` (`y` or `n`).
3. **Select Language**: Choose between JavaScript or TypeScript for your project.

### Example:

```bash
npx web-3d-template
```

#### Sample Interaction:

```text
Enter project name: my-web-3d-project
Include physics (rapier)? [y/N]: y
Choose the project language:
  ◉ JavaScript (.js and .jsx)
  ○ TypeScript (.ts and .tsx)
```

After completing the prompts, the tool will scaffold the project files in a new folder named `my-web-3d-project`.

---

## Next Steps

1. Navigate to the project directory:

   ```bash
   cd my-web-3d-project
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Open your browser at the URL shown in the terminal to view your project.

---

## Directory Structure

Here’s an overview of the generated project structure:

```text
my-web-3d-project/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx       # Main component
│   └── main.jsx      # Entry point
├── package.json      # Project metadata and scripts
└── vite.config.js    # Vite configuration
```

For TypeScript projects, `.jsx` files will be replaced with `.tsx`.

---

## Templates

The CLI generates projects based on the following templates:

* **Basic**: web-3d project with `@react-three/fiber` and `@react-three/drei`.
* **Physics**: web-3d project with `@react-three/fiber`, `@react-three/drei`, and `@react-three/rapier`.

---

## Requirements

* **Node.js**: v14 or higher
* **npm**: v6 or higher

---

## Contributing

If you encounter any issues or have feature requests, please feel free to open an issue or submit a pull request.

---

## License

MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

[Vishnu](https://github.com/S0Vishnu)

---

## Acknowledgements

Thanks to the React Three Fiber, Drei, and Rapier communities for their excellent libraries and resources.
