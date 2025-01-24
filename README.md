<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="logo-light.svg">
    <source media="(prefers-color-scheme: light)" srcset="logo-dark.svg">
    <img alt="useGoogleFont" src="logo-light.svg" width="500">
  </picture>
</div>
<br/>
<br/>

[![Tests](https://github.com/iisdan/useGoogleFont/actions/workflows/test.yaml/badge.svg)](https://github.com/iisdan/useGoogleFont/actions/workflows/test.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@danherbert/use-google-font)](https://bundlephobia.com/package/@danherbert/use-google-font)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A lightweight React hook for dynamically loading and applying Google Fonts.

## Installation

```bash
npm install use-google-font
```

# Usage

## Basic Usage

Simply call the hook with the font name you want to use and it will load the font in dynamically.


```tsx
import { useGoogleFont } from 'use-google-font';

const App = () => {

  useGoogleFont('Gigachad Gothic', { ...options })

}
```

# Options

## Weights

Use the optional `weights` option to change which weights are loaded. 

By default only normal 500 and 700 wieghts will be loaded. 

```tsx
{ 
  weights: { 
    normal: [500, 700], 
    italic: [100] 
  }
}
```

## Default

By setting `default` to `true`, the font will be set on the body tag automatically.

```tsx
{ 
  default: true
}
```

# Performance

Optionally, you can add the following HTML snippet in your document's head to optimize font loading. 
Placing these <link> tags in the <head> ensures the preconnect requests happen early, reducing latency:

```html
<head>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
</head>
```

