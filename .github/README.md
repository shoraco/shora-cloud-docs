# Shora Cloud Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MDX](https://img.shields.io/badge/MDX-Ready-fcb32c.svg)](https://mdxjs.com/)

Official documentation for [Shora Cloud Platform](https://shora.cloud) - Build modern e-commerce experiences.

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Development](#-development)
- [Contributing](#-contributing)
- [Support](#-support)

## 🌟 Overview

This repository contains the source code for Shora Cloud's documentation website. The documentation is built using Next.js, MDX, and Tailwind CSS, providing a modern and responsive experience for our users.

## ✨ Features

- 🎯 **Clear Navigation**: Intuitive sidebar navigation with collapsible sections
- 🔍 **Full-text Search**: Powered by Algolia DocSearch
- 🌙 **Dark Mode**: Automatic and manual dark mode support
- 📱 **Responsive Design**: Mobile-first approach for all screen sizes
- 🎨 **Syntax Highlighting**: Beautiful code blocks with theme support
- 🚀 **Fast Performance**: Static site generation with Next.js
- 📝 **MDX Support**: Write documentation with MDX
- 🔄 **Hot Reload**: Fast development with hot module replacement

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/shoraco/shora-cloud-docs.git
cd shora-cloud-docs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure

```
.
├── content/           # Documentation content (MDX files)
│   ├── docs/         # General documentation
│   ├── api/          # API reference
│   └── guides/       # Guides and tutorials
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── layouts/      # Page layouts
│   ├── pages/        # Next.js pages
│   └── styles/       # CSS styles
└── package.json
```

### Adding Content

1. Create a new MDX file in the appropriate directory
2. Add frontmatter with title and description
3. Write your content using MDX
4. Add the page to the navigation in `src/layouts/DocsLayout.tsx`

Example MDX file:
```mdx
---
title: Getting Started
description: Learn how to get started with Shora Cloud
---

# Getting Started

Welcome to Shora Cloud! This guide will help you...
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a Pull Request

Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Writing Guidelines

- Use clear and concise language
- Include code examples where appropriate
- Follow our [style guide](STYLE_GUIDE.md)
- Test your changes locally

## 🔒 Security

- [Security Policy](SECURITY.md)
- [Best Practices](./docs/security.md)
- [Vulnerability Reporting](https://shora.cloud/security)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

- 📧 Email: support@shora.cloud
- 💬 Discord: [Join our community](https://discord.gg/shora-cloud)
- 📚 Documentation: [docs.shora.cloud](https://docs.shora.cloud)
- 🐦 Twitter: [@ShoraCloud](https://twitter.com/shoracloud)

## 🏢 About Shora Cloud

Shora Cloud is a headless, API-first commerce platform developed by Shora Technology Inc. Learn more at [shora.cloud](https://shora.cloud).
