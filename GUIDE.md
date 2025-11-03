# Project Creation Guide: Clean Blog Website

This guide documents how the Clean Blog website project was created from scratch, following the requirements in CHALLENGE.md.

## Project Overview

A blog website built with Express.js, TypeScript, and Nunjucks template engine, implementing the Clean Blog layout from Start Bootstrap.

## Step-by-Step Creation Process

### 1. Initial Setup

**Downloaded and extracted the Clean Blog template:**

- Downloaded from: https://github.com/startbootstrap/startbootstrap-clean-blog/archive/gh-pages.zip
- Extracted the entire archive to the project root directory
- Kept the original file structure from the template
- Downloaded the three blog post images and placed them in the `img/` folder:
  - [colorful-umbrella.jpg](https://spiced-academy.github.io/wd-advanced-syllabus/backend-development/template-engines/handouts/assets/colorful-umbrella.jpg)
  - [flowers.jpg](https://spiced-academy.github.io/wd-advanced-syllabus/backend-development/template-engines/handouts/assets/flowers.jpg)
  - [sailing.jpg](https://spiced-academy.github.io/wd-advanced-syllabus/backend-development/template-engines/handouts/assets/sailing.jpg)

### 2. Created Project Structure (8 Core Files)

#### Configuration Files (3 files)

**`package.json`** - Project dependencies and scripts

First, initialize npm and install dependencies:

```bash
npm init -y
```

Install production dependencies:

```bash
npm install express@^4.21.1 nunjucks@^3.2.4
```

Install development dependencies:

```bash
npm install --save-dev @types/express@^5.0.0 @types/node@^22.9.1 @types/nunjucks@^3.2.6 ts-node@^10.9.2 typescript@^5.6.3
```

This creates a `package.json` file with the following content:

```json
{
  "name": "create-a-blog-website",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "dependencies": {
    "express": "^4.21.1",
    "nunjucks": "^3.2.4"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.9.1",
    "@types/nunjucks": "^3.2.6",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}
```

**`tsconfig.json`** - TypeScript configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

**`.gitignore`** - Git ignore patterns

```
node_modules/
dist/
*.log
.env
```

#### Application File (1 file)

**`src/index.ts`** - Main Express application

- Configured Nunjucks template engine
- Set up static file serving to serve the Clean Blog template files
- Read blog posts from JSON file
- Created helper functions:
  - `formatDate()` - Convert Unix timestamp to readable date
  - `createSlug()` - Generate URL-friendly slugs from titles
- Implemented routes:
  - `GET /` - Home page listing all blog posts
  - `GET /post/:slug` - Individual blog post detail page
  - `GET /contact` - Contact page with form
  - `GET /about` - About page (for template navigation)
  - `GET /post` - Sample Post (for template navigation)

#### View Templates (5 files)

**`views/layout.njk`** - Base layout template

- Contains common HTML structure (head, navigation, footer)
- Uses template inheritance with `{% block %}` tags
- Includes Clean Blog CSS and JavaScript assets
- Navigation links: Home, About, Sample Post, Contact

**`views/index.njk`** - Home page template

- Extends `layout.njk`
- Displays header with site title
- Loops through blog posts to display:
  - Post title (linked to detail page)
  - Post teaser
  - Author name and formatted date

**`views/post.njk`** - Blog post detail page template

- Extends `layout.njk`
- Header with post image as background
- Displays full post content using `| safe` filter (to render HTML)
- Shows title, teaser, author, and date

**`views/contact.njk`** - Contact page template

- Extends `layout.njk`
- Uses form macro for DRY (Don't Repeat Yourself) principle
- Contains contact form with: name, email, phone, message fields

**`views/about.njk`** - About page template

- Extends `layout.njk`
- Simple placeholder page to support Clean Blog template navigation

#### Macros (1 file)

**`views/macros/form.njk`** - Reusable form field macro

- `formField()` macro accepts: name, label, type, required
- Handles both input fields and textarea
- Implements Bootstrap form styling
- Reduces code repetition as required by CHALLENGE.md: "Try to use macros instead of label input"

### 3. Data Structure

**`data/blog-posts.json`** - Blog posts data

- Contains 3 blog posts with:
  - `title` - Post title
  - `image` - Image filename
  - `author` - Author name
  - `createdAt` - Unix timestamp
  - `teaser` - Short description
  - `content` - Full HTML content

### 4. Key Implementation Details

#### Date Formatting

```typescript
function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

- Converts Unix timestamp to human-readable format
- Does NOT modify the JSON structure (as required)

#### Slug Generation

```typescript
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
```

- Creates URL-friendly slugs from post titles
- Example: "Black: The Absence, Not the Presence, of Color" → "black-the-absence-not-the-presence-of-color"

#### Template Inheritance

```njk
{% extends "layout.njk" %}

{% block header %}
<!-- Page-specific header -->
{% endblock %}

{% block content %}
<!-- Page-specific content -->
{% endblock %}
```

- All pages extend the base layout
- Reduces code duplication
- Maintains consistent site structure

#### Form Macro Usage

```njk
{% from "macros/form.njk" import formField %}

{{ formField("name", "Name", "text", true) }}
{{ formField("email", "Email Address", "email", true) }}
```

- Imports macro into template
- Reuses single macro for all form fields
- Follows CHALLENGE.md requirement: "Try to use macros instead of label input"

### 5. Running the Project

**Installation:**

```bash
npm install
```

**Development mode:**

```bash
npm run dev
```

- Uses `ts-node` to run TypeScript directly
- Server starts at `http://localhost:3000`

**Production build:**

```bash
npm run build
npm start
```

- Compiles TypeScript to JavaScript in `dist/` folder
- Runs compiled code with Node.js

## Project Structure

```
create-a-blog-website/
├── startbootstrap-clean-blog-gh-pages/  # Clean Blog template (extracted)
│   ├── css/
│   ├── js/
│   └── assets/
├── img/                         # Blog post images
│   ├── colorful-umbrella.jpg
│   ├── flowers.jpg
│   └── sailing.jpg
├── data/
│   └── blog-posts.json          # Blog post data
├── src/
│   └── index.ts                 # Express application
├── views/
│   ├── layout.njk               # Base layout
│   ├── index.njk                # Home page
│   ├── post.njk                 # Blog detail page
│   ├── contact.njk              # Contact page
│   ├── about.njk                # About page
│   └── macros/
│       └── form.njk             # Form field macro
├── .gitignore
├── package.json
├── tsconfig.json
├── CHALLENGE.md                 # Original requirements
└── GUIDE.md                     # This file
```

## Requirements Checklist

✅ Setup Express.js application with TypeScript  
✅ Install Nunjucks template engine  
✅ Implement Clean Blog layout  
✅ Create JSON file with blog post data  
✅ Convert Unix timestamp to human-readable format without changing JSON  
✅ List blog posts on home page  
✅ Provide detail page for each blog post with full content and image  
✅ Use slug for detail page URLs  
✅ Use macros for the form to avoid repetition  
✅ Contact page form is HTML only (no validation)  
✅ Use macros instead of label input

## Technologies Used

- **Express.js 4.21.1** - Web framework
- **TypeScript 5.6.3** - Type-safe JavaScript
- **Nunjucks 3.2.4** - Template engine
- **Node.js 22.9.1** - Runtime environment
- **Clean Blog Template** - Bootstrap 5 theme from Start Bootstrap

## Key Learning Points

1. **Template Inheritance** - Using Nunjucks blocks for DRY layouts
2. **Macros** - Creating reusable components for forms
3. **TypeScript with Express** - Type safety in Node.js applications
4. **Data Processing** - Transforming timestamps and generating slugs
5. **Routing** - Dynamic routes with URL parameters
6. **Static Assets** - Serving files from the Clean Blog template

---

**Created:** November 3, 2025  
**Purpose:** Educational project for learning Express.js, TypeScript, and template engines
