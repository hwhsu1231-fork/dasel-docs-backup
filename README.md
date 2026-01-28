# Dasel Documentation

This repository contains the documentation for [Dasel](https://github.com/TomWright/dasel), built using [mdBook](https://rust-lang.github.io/mdBook/).

## Prerequisites

Install mdBook:

```bash
cargo install mdbook
```

Or using other methods from the [official installation guide](https://rust-lang.github.io/mdBook/guide/installation.html).

## Building the Documentation

To build the documentation:

```bash
mdbook build
```

The generated HTML files will be in the `book/v2` directory.

## Viewing the Documentation

To serve the documentation locally with live reload:

```bash
mdbook serve
```

Then open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
.
├── book.toml          # mdBook configuration
├── src/               # Documentation source files
│   ├── SUMMARY.md     # Table of contents
│   ├── README.md      # Introduction page
│   ├── commands/      # Command documentation
│   ├── examples/      # Example documentation
│   └── functions/     # Function documentation
└── book/              # Generated output (ignored by git)
```

## Contributing

When adding or modifying documentation:

1. Edit the Markdown files in the `src/` directory
2. Update `src/SUMMARY.md` if adding new pages
3. Test your changes with `mdbook serve`
4. Submit a pull request

## License

This documentation follows the same license as the Dasel project.
