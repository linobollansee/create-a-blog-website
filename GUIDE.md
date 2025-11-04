# Project Creation Guide: Clean Blog Website

This comprehensive guide documents how the Clean Blog website project was created from scratch, following the requirements in CHALLENGE.md. It serves as both a reference for understanding the completed project and a tutorial for recreating or extending it.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack & Architecture](#technology-stack--architecture)
3. [Initial Setup & Project Initialization](#initial-setup--project-initialization)
4. [Configuration Files Explained](#configuration-files-explained)
5. [Application Core (src/index.ts)](#application-core-srcindexts)
6. [Template System (Nunjucks)](#template-system-nunjucks)
7. [Data Management](#data-management)
8. [Static Assets & Styling](#static-assets--styling)
9. [Routing & URL Structure](#routing--url-structure)
10. [Testing & Running the Application](#testing--running-the-application)
11. [Project Structure Deep Dive](#project-structure-deep-dive)
12. [Key Concepts & Best Practices](#key-concepts--best-practices)
13. [Troubleshooting Common Issues](#troubleshooting-common-issues)
14. [Extending the Project](#extending-the-project)

---

## Project Overview

A fully functional blog website built with Express.js, TypeScript, and Nunjucks template engine, implementing the Clean Blog layout from Start Bootstrap. The application dynamically renders blog posts from JSON data, provides SEO-friendly URLs, and demonstrates modern web development practices including template inheritance, reusable components, and type-safe server-side code.

**Core Features:**

- 📝 Dynamic blog post rendering from JSON data
- 🎨 Responsive Bootstrap 5 design with Clean Blog theme
- 🔗 SEO-friendly URL slugs (e.g., `/post/flowers-natures-muse-for-design`)
- 📅 Automatic Unix timestamp to human-readable date conversion
- ♻️ Reusable form components using Nunjucks macros
- 🔒 Type-safe development with TypeScript interfaces
- 🎯 Template inheritance for DRY (Don't Repeat Yourself) code

---

## Technology Stack & Architecture

### Backend Technologies

**Express.js 4.21.1**

- Fast, unopinionated, minimalist web framework for Node.js
- Handles HTTP requests, routing, and middleware
- Serves static files and renders dynamic templates
- Why chosen: Industry-standard, mature, and well-documented

**TypeScript 5.6.3**

- Strongly typed superset of JavaScript
- Provides compile-time type checking and IntelliSense
- Prevents common runtime errors through static analysis
- Compiles to clean JavaScript for production
- Why chosen: Improved developer experience, better code quality, and easier refactoring

**Nunjucks 3.2.4**

- Mozilla's powerful templating engine inspired by Jinja2
- Supports template inheritance, macros, filters, and more
- Server-side rendering for better SEO and performance
- Automatic HTML escaping for security
- Why chosen: More powerful than EJS, cleaner syntax than Handlebars, excellent for complex layouts

**Node.js**

- JavaScript runtime built on Chrome's V8 engine
- Handles server-side execution
- Non-blocking I/O for efficient handling of concurrent requests
- Why chosen: JavaScript everywhere (full-stack), vast ecosystem

### Frontend Technologies

**Bootstrap 5**

- Responsive CSS framework (via Clean Blog template)
- Mobile-first grid system
- Pre-styled components (navigation, forms, buttons)
- Why chosen: Came with Clean Blog template, industry standard

**Font Awesome 6.3.0**

- Icon library for social media links and UI elements
- Scalable vector icons
- Why chosen: Professional-looking icons, easy to implement

### Development Tools

**ts-node 10.9.2**

- Runs TypeScript directly without pre-compilation
- Perfect for development mode
- Fast iteration cycle

**@types packages**

- Type definitions for JavaScript libraries
- Enables TypeScript IntelliSense and type checking
- Specific versions: @types/express, @types/node, @types/nunjucks

### Architecture Pattern

**Server-Side Rendering (SSR)**

- Templates rendered on the server before sending HTML to client
- Benefits: Better SEO, faster initial page load, works without JavaScript
- Nunjucks compiles templates and injects data server-side
- Express serves the fully-rendered HTML pages

**MVC-like Structure** (Model-View-Controller)

- **Model**: JSON data files (`data/blog-posts.json`)
- **View**: Nunjucks templates (`views/*.njk`)
- **Controller**: Express route handlers in `src/index.ts`

---

## Initial Setup & Project Initialization

### Step 1: Download and Set Up Clean Blog Template

**1.1 Download the Template**

```bash
# Visit: https://startbootstrap.com/theme/clean-blog
# Click "Free Download" button
# Or download directly from GitHub:
# https://github.com/startbootstrap/startbootstrap-clean-blog/archive/gh-pages.zip
```

**1.2 Extract Template Files**

- Unzip the downloaded archive
- Extract contents to your project directory
- The template includes:
  - `css/styles.css` - Compiled Bootstrap and theme styles
  - `js/scripts.js` - Theme JavaScript functionality
  - `assets/img/` - Background images for headers
  - `index.html`, `about.html`, `contact.html`, `post.html` - Static HTML templates (we'll convert these to Nunjucks)

**1.3 Download Blog Post Images**

Create an `assets/img/` directory and download the three blog images:

```bash
# Create directory if it doesn't exist
mkdir -p assets/img

# Download images (use browser or curl/wget)
# Place these images in assets/img/:
# - colorful-umbrella.jpg
# - flowers.jpg
# - sailing.jpg
```

Download from:

- [colorful-umbrella.jpg](https://spiced-academy.github.io/wd-advanced-syllabus/backend-development/template-engines/handouts/assets/colorful-umbrella.jpg)
- [flowers.jpg](https://spiced-academy.github.io/wd-advanced-syllabus/backend-development/template-engines/handouts/assets/flowers.jpg)
- [sailing.jpg](https://spiced-academy.github.io/wd-advanced-syllabus/backend-development/template-engines/handouts/assets/sailing.jpg)

### Step 2: Initialize Node.js Project

**2.1 Create package.json**

```bash
npm init -y
```

This creates a basic `package.json` with default values. We'll customize it next.

**2.2 Install Production Dependencies**

```bash
npm install express@^4.21.1 nunjucks@^3.2.4
```

- **express**: Web framework for creating the server and handling routes
- **nunjucks**: Template engine for rendering dynamic HTML

**2.3 Install Development Dependencies**

```bash
npm install --save-dev @types/express@^5.0.0 @types/node@^22.9.1 @types/nunjucks@^3.2.6 ts-node@^10.9.2 typescript@^5.6.3
```

- **@types/\*** packages: TypeScript type definitions for better IntelliSense
- **ts-node**: Runs TypeScript files directly without compiling
- **typescript**: TypeScript compiler

**2.4 Understanding the Dependency Versions**

- `^4.21.1` means "compatible with 4.21.1" - npm will install the latest 4.x.x version
- This prevents breaking changes while allowing bug fixes and minor updates
- Lock file (`package-lock.json`) ensures consistent installs across environments

**2.5 Updating Dependencies**

To update all dependencies to their latest compatible versions:

```bash
npm update
```

To check which packages have available updates:

```bash
npm outdated
```

To update to the latest major versions (breaking changes possible):

```bash
npx npm-check-updates -u
npm install
```

**Best Practice:**

- Run `npm outdated` regularly to check for updates
- Review changelogs before major version updates
- Test thoroughly after updating dependencies
- Commit `package-lock.json` to ensure consistent versions across environments

---

## Configuration Files Explained

### package.json - Project Manifest

```json
{
  "name": "create-a-blog-website",
  "version": "1.0.0",
  "description": "A blog website built with Express.js, TypeScript, and Nunjucks",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "keywords": ["blog", "express", "typescript", "nunjucks"],
  "author": "",
  "license": "ISC",
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

**Understanding the Scripts:**

1. **`npm run dev`** - Development mode

   - Runs `ts-node src/index.ts`
   - Executes TypeScript directly without compilation
   - Fast for development iteration
   - Hot restart with nodemon (optional enhancement)

2. **`npm run build`** - Production build

   - Runs `tsc` (TypeScript compiler)
   - Compiles `src/` directory to `dist/` folder
   - Generates JavaScript files from TypeScript
   - Should be run before deployment

3. **`npm start`** - Production mode
   - Runs `node dist/index.js`
   - Executes the compiled JavaScript
   - Requires running `npm run build` first
   - Used in production environments

**Main Field:**

- `"main": "dist/index.js"` - Entry point for the application
- Points to compiled JavaScript in production

### tsconfig.json - TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020", // Compile to ES2020 JavaScript
    "module": "commonjs", // Use CommonJS modules (Node.js standard)
    "lib": ["ES2020"], // Include ES2020 standard library
    "outDir": "./dist", // Output compiled JS to dist/
    "rootDir": "./src", // TypeScript source files in src/
    "strict": true, // Enable all strict type checking
    "esModuleInterop": true, // Better interop with CommonJS
    "skipLibCheck": true, // Skip type checking of .d.ts files
    "forceConsistentCasingInFileNames": true, // Prevent case issues
    "resolveJsonModule": true, // Allow importing JSON files
    "moduleResolution": "node" // Use Node.js module resolution
  },
  "include": ["src/**/*"], // Include all files in src/
  "exclude": ["node_modules"] // Exclude dependencies
}
```

**Key Compiler Options Explained:**

- **`target: "ES2020"`**: Output modern JavaScript that Node.js 14+ understands
- **`module: "commonjs"`**: Use `require()` and `module.exports` (Node.js standard)
- **`strict: true`**: Enables:
  - `strictNullChecks` - Prevents null/undefined errors
  - `strictFunctionTypes` - Better function type checking
  - `noImplicitAny` - Forces explicit types
  - And more strict checks
- **`resolveJsonModule: true`**: Allows `import blogPosts from './data.json'`
- **`esModuleInterop: true`**: Makes `import express from 'express'` work correctly

### .gitignore - Git Ignore Patterns

Create a `.gitignore` file (if not already present):

```
# Dependencies
node_modules/

# Build output
dist/

# Logs
*.log
npm-debug.log*

# Environment variables
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
```

**Why Ignore These?**

- **node_modules/**: Large directory, can be recreated with `npm install`
- **dist/**: Generated code, can be recreated with `npm run build`
- **logs**: Temporary debugging files
- **.env**: May contain sensitive API keys or secrets

---

## Application Core (src/index.ts)

The heart of the application - let's break down every section of `src/index.ts`:

### Imports and Type Definitions

```typescript
import express, { Request, Response } from "express";
import nunjucks from "nunjucks";
import path from "path";
import fs from "fs";
```

**Import Breakdown:**

- **express**: Main framework, Request/Response types for type safety
- **nunjucks**: Template engine for rendering views
- **path**: Node.js built-in for cross-platform file paths
- **fs**: Node.js built-in for file system operations (reading JSON)

### TypeScript Interfaces

```typescript
interface BlogPost {
  title: string;
  image: string;
  author: string;
  createdAt: number; // Unix timestamp
  teaser: string;
  content: string;
}

interface BlogPostWithMeta extends BlogPost {
  formattedDate: string; // Human-readable date
  slug: string; // URL-friendly slug
}
```

**Why Two Interfaces?**

1. **BlogPost**: Matches the exact structure in `blog-posts.json`
   - Mirrors the data layer
   - Type-safe JSON reading
2. **BlogPostWithMeta**: Extended version with computed fields
   - `formattedDate`: Converted from Unix timestamp
   - `slug`: Generated from title for URLs
   - Keeps original data unchanged (requirement)
   - Used in templates for rendering

**Benefits of Interfaces:**

- IntelliSense autocomplete when coding
- Compile-time error if you misspell a property
- Self-documenting code
- Easier refactoring

### Express Application Setup

```typescript
const app = express();
const PORT = 3000;
```

- Creates Express application instance
- Defines port (can be made configurable via environment variables)

### Nunjucks Configuration

```typescript
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
```

**Configuration Explained:**

- **"views"**: Directory where `.njk` template files are stored
- **autoescape: true**: Automatically escapes HTML to prevent XSS attacks
  - `<script>` becomes `&lt;script&gt;`
  - Use `| safe` filter only for trusted content
- **express: app**: Integrates Nunjucks with Express
  - Enables `res.render()` method
  - Sets up template caching in production

### Static File Serving

```typescript
app.use("/css", express.static(path.join(__dirname, "../css")));
app.use("/js", express.static(path.join(__dirname, "../js")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));
```

**How Static Middleware Works:**

- **express.static()**: Serves files directly without processing
- **path.join(\_\_dirname, "../folder")**: Creates absolute paths from compiled `dist/` folder
  - `__dirname` points to `dist/` in production (after TypeScript compilation)
  - `../css` goes up to project root, then into `css/` folder
- Maps URL paths to filesystem directories
- Examples:
  - `/css/styles.css` → serves `css/styles.css`
  - `/assets/img/flowers.jpg` → serves `assets/img/flowers.jpg`
  - `/js/scripts.js` → serves `js/scripts.js`

**Why Absolute Paths?**

- Works reliably when TypeScript compiles to `dist/` folder
- Prevents path resolution issues in production
- Clean URL structure matching the template expectations
- Security: Only expose specific directories

### Reading Blog Data

```typescript
const blogPosts: BlogPost[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/blog-posts.json"), "utf-8")
);
```

**Step-by-Step:**

1. **`__dirname`**: Current directory of the executing file
   - In development: Points to `src/`
   - In production: Points to `dist/`
2. **`path.join()`**: Constructs path safely across platforms
   - Windows: `dist\data\blog-posts.json`
   - Unix: `dist/data/blog-posts.json`
3. **`../data/blog-posts.json`**: Goes up one directory, then into data/
4. **`fs.readFileSync()`**: Reads file content synchronously
   - Blocking operation (OK at startup)
   - Returns buffer, "utf-8" converts to string
5. **`JSON.parse()`**: Converts JSON string to JavaScript object
6. **Type annotation**: `: BlogPost[]` ensures type safety

### Helper Functions

#### Date Formatting Function

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

**Deep Dive:**

- **Input**: Unix timestamp (seconds since Jan 1, 1970)
- **`timestamp * 1000`**: JavaScript Date expects milliseconds
- **`new Date()`**: Creates Date object from timestamp
- **`toLocaleDateString()`**: Formats date for specific locale
  - `"en-US"`: American English
  - `year: "numeric"`: 2025
  - `month: "long"`: November (full name)
  - `day: "numeric"`: 3
- **Output**: "November 3, 2025"

**Why This Approach?**

- Doesn't modify the original JSON data (requirement)
- Locale-aware formatting
- Easy to change format by adjusting options
- Built-in JavaScript, no external library needed

#### Slug Generation Function

```typescript
function createSlug(title: string): string {
  return title
    .toLowerCase() // "BLACK: The Absence..." → "black: the absence..."
    .replace(/[^a-z0-9]+/g, "-") // "black: the absence..." → "black-the-absence-"
    .replace(/(^-|-$)/g, ""); // "black-the-absence-" → "black-the-absence"
}
```

**Step-by-Step Transformation:**

Input: `"Black: The Absence, Not the Presence, of Color"`

1. **`.toLowerCase()`**

   - Result: `"black: the absence, not the presence, of color"`
   - Makes URLs case-insensitive

2. **`.replace(/[^a-z0-9]+/g, "-")`**

   - Regex: `[^a-z0-9]+` matches one or more non-alphanumeric characters
   - `g` flag: Global (replace all occurrences)
   - Replaces spaces, punctuation, special chars with hyphens
   - Result: `"black-the-absence-not-the-presence-of-color"`

3. **`.replace(/(^-|-$)/g, "")`**
   - Removes leading/trailing hyphens
   - `^-`: Hyphen at start
   - `-$`: Hyphen at end
   - Cleans up edge cases

**Output**: `"black-the-absence-not-the-presence-of-color"`

**Why Slugs Matter:**

- SEO-friendly URLs
- Human-readable
- No spaces or special characters
- Unique identifier for each post

### Processing Blog Posts

```typescript
const postsWithMeta: BlogPostWithMeta[] = blogPosts.map((post) => ({
  ...post,
  formattedDate: formatDate(post.createdAt),
  slug: createSlug(post.title),
}));
```

**What's Happening:**

- **`.map()`**: Transforms each post in the array
- **`...post`**: Spread operator - copies all properties from original post
- **Additional properties**: Adds `formattedDate` and `slug`
- **Type**: Result is `BlogPostWithMeta[]` with all properties

**Before:**

```javascript
{
  title: "Black: The Absence...",
  createdAt: 1743120000,
  // ... other fields
}
```

**After:**

```javascript
{
  title: "Black: The Absence...",
  createdAt: 1743120000,  // Original preserved
  formattedDate: "November 3, 2025",  // NEW
  slug: "black-the-absence-not-the-presence-of-color",  // NEW
  // ... other fields
}
```

---

## Routing & URL Structure

### Route: Home Page (`GET /`)

```typescript
app.get("/", (req: Request, res: Response) => {
  res.render("index.njk", { posts: postsWithMeta });
});
```

**Breakdown:**

- **`app.get("/")`**: Handles GET requests to root URL
- **Callback**: `(req, res)` - request and response objects
- **`res.render()`**: Renders Nunjucks template
  - Template: `views/index.njk`
  - Data: `{ posts: postsWithMeta }` available in template as `posts` variable

**Flow:**

1. User visits `http://localhost:3000/`
2. Express matches this route
3. Nunjucks renders `index.njk` with posts data
4. Loops through posts, generates HTML
5. Sends complete HTML to browser

### Route: Blog Post Detail (`GET /post/:slug`)

```typescript
app.get("/post/:slug", (req: Request, res: Response) => {
  const post = postsWithMeta.find((p) => p.slug === req.params.slug);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("post.njk", { post });
});
```

**URL Parameters:**

- **`:slug`**: Dynamic route parameter
- Matches any URL like `/post/anything-here`
- Accessible via `req.params.slug`

**Example:**

- URL: `/post/flowers-natures-muse-for-design`
- `req.params.slug` = `"flowers-natures-muse-for-design"`

**Logic Flow:**

1. Extract slug from URL
2. Search `postsWithMeta` array for matching slug
3. If found: Render `post.njk` with that post's data
4. If not found: Return 404 error

**`.find()` Method:**

```typescript
const post = postsWithMeta.find((p) => p.slug === req.params.slug);
```

- Returns first matching element or `undefined`
- More efficient than filtering entire array
- Type: `BlogPostWithMeta | undefined`

### Route: Contact Page (`GET /contact`)

```typescript
app.get("/contact", (req: Request, res: Response) => {
  res.render("contact.njk");
});
```

- Simple static page
- No data passed to template
- Just renders the contact form

### Route: About Page (`GET /about`)

```typescript
app.get("/about", (req: Request, res: Response) => {
  res.render("about.njk");
});
```

- Placeholder page from original template
- Maintains navigation structure
- Can be customized with actual about content

### Route: Sample Post (`GET /post`)

```typescript
app.get("/post", (req: Request, res: Response) => {
  const post = postsWithMeta[0];
  res.render("post.njk", { post });
});
```

- Shows first blog post
- Supports original Clean Blog template navigation
- Alternative to dynamic slug route

### Starting the Server

```typescript
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

- **`app.listen()`**: Starts HTTP server
- **PORT**: 3000 (or configured value)
- **Callback**: Runs when server is ready
- **Console log**: Confirmation message

---

## Template System (Nunjucks)

---

## Template System (Nunjucks)

### Understanding Template Inheritance

Template inheritance is a powerful feature that eliminates code duplication by allowing templates to extend a base layout.

**Concept:**

- **Base template** (`layout.njk`): Defines common structure
- **Child templates** (`index.njk`, `post.njk`, etc.): Fill in specific sections
- **Blocks**: Placeholders that child templates can override

### layout.njk - Base Template

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Clean Blog</title>
    <link href="/css/styles.css" rel="stylesheet" />
    <!-- Font Awesome for icons -->
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js"></script>
    <!-- Google Fonts -->
    <link
      href="https://fonts.googleapis.com/css?family=Lora:400,700"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- Navigation (appears on all pages) -->
    <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="/">Start Bootstrap</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse">
          Menu <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/post">Sample Post</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Block for page-specific header (hero section) -->
    {% block header %}{% endblock %}

    <!-- Block for page-specific content -->
    {% block content %}{% endblock %}

    <!-- Footer (appears on all pages) -->
    <footer class="border-top">
      <div class="container px-4 px-lg-5">
        <!-- Social media links -->
        <ul class="list-inline text-center">
          <li class="list-inline-item">
            <a href="#!"><i class="fab fa-twitter"></i></a>
          </li>
          <!-- ... more social links -->
        </ul>
        <div class="small text-center text-muted fst-italic">
          Copyright &copy; Your Website 2023
        </div>
      </div>
    </footer>

    <!-- Bootstrap JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/scripts.js"></script>
  </body>
</html>
```

**Key Components:**

1. **Navigation**: Same menu on every page
2. **`{% block header %}`**: Page-specific hero/header image
3. **`{% block content %}`**: Main page content
4. **Footer**: Same footer on every page

### index.njk - Home Page Template

```html
{% extends "layout.njk" %} {% block header %}
<!-- Page Header with background image -->
<header
  class="masthead"
  style="background-image: url('assets/img/home-bg.jpg')"
>
  <div class="container position-relative px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <div class="site-heading">
          <h1>Clean Blog</h1>
          <span class="subheading">A Blog Theme by Start Bootstrap</span>
        </div>
      </div>
    </div>
  </div>
</header>
{% endblock %} {% block content %}
<!-- Main Content - Loop through blog posts -->
<div class="container px-4 px-lg-5">
  <div class="row gx-4 gx-lg-5 justify-content-center">
    <div class="col-md-10 col-lg-8 col-xl-7">
      {% for post in posts %}
      <!-- Post preview card -->
      <div class="post-preview">
        <a href="/post/{{ post.slug }}">
          <h2 class="post-title">{{ post.title }}</h2>
          <h3 class="post-subtitle">{{ post.teaser }}</h3>
        </a>
        <p class="post-meta">
          Posted by <a href="#!">{{ post.author }}</a>
          on {{ post.formattedDate }}
        </p>
      </div>

      <!-- Divider between posts (except after last) -->
      {% if not loop.last %}
      <hr class="my-4" />
      {% endif %} {% endfor %}
    </div>
  </div>
</div>
{% endblock %}
```

**Template Features:**

1. **`{% extends "layout.njk" %}`**: Inherits from base layout
2. **`{% for post in posts %}`**: Loops through posts array from Express
3. **`{{ post.slug }}`**: Outputs slug variable (auto-escaped)
4. **`{% if not loop.last %}`**: Nunjucks loop variable for conditional logic
5. **Link generation**: `/post/{{ post.slug }}` creates dynamic URLs

**Nunjucks Loop Variables:**

- `loop.index`: Current iteration (1-indexed)
- `loop.index0`: Current iteration (0-indexed)
- `loop.first`: True if first iteration
- `loop.last`: True if last iteration
- `loop.length`: Total items

### post.njk - Blog Post Detail Template

```html
{% extends "layout.njk" %} {% block header %}
<!-- Dynamic header with post's image -->
<header
  class="masthead"
  style="background-image: url('/assets/img/{{ post.image }}')"
>
  <div class="container position-relative px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <div class="post-heading">
          <h1>{{ post.title }}</h1>
          <h2 class="subheading">{{ post.teaser }}</h2>
          <span class="meta">
            Posted by <a href="#!">{{ post.author }}</a>
            on {{ post.formattedDate }}
          </span>
        </div>
      </div>
    </div>
  </div>
</header>
{% endblock %} {% block content %}
<!-- Post Content -->
<article class="mb-4">
  <div class="container px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <!-- Safe filter renders HTML content -->
        {{ post.content | safe }}
      </div>
    </div>
  </div>
</article>
{% endblock %}
```

**Critical Feature: `| safe` Filter**

```html
{{ post.content | safe }}
```

- **Without `| safe`**: HTML tags are escaped
  - `<p>Hello</p>` → `&lt;p&gt;Hello&lt;/p&gt;` (displayed as text)
- **With `| safe`**: HTML renders normally
  - `<p>Hello</p>` → Renders as a paragraph
- **Security Warning**: Only use with trusted content!
- **Our case**: Content is from our own JSON file (safe)

### contact.njk - Contact Form Template

```html
{% extends "layout.njk" %} {% block header %}
<header
  class="masthead"
  style="background-image: url('assets/img/contact-bg.jpg')"
>
  <div class="container position-relative px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <div class="page-heading">
          <h1>Contact Me</h1>
          <span class="subheading">Have questions? I have answers.</span>
        </div>
      </div>
    </div>
  </div>
</header>
{% endblock %} {% block content %}
<main class="mb-4">
  <div class="container px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <p>Fill out the form below to send me a message!</p>

        <div class="my-5">
          <form id="contactForm">
            <!-- Import and use the form macro -->
            {% from "macros/form.njk" import formField %} {{ formField("name",
            "Name", "text", true) }} {{ formField("email", "Email Address",
            "email", true) }} {{ formField("phone", "Phone Number", "tel", true)
            }} {{ formField("message", "Message", "textarea", true) }}

            <br />
            <button class="btn btn-primary text-uppercase" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main>
{% endblock %}
```

**Macro Usage:**

1. **`{% from "..." import formField %}`**: Imports macro from file
2. **`{{ formField(...) }}`**: Calls macro with parameters
3. **DRY principle**: Write once, use multiple times

### form.njk - Reusable Form Macro

```html
{% macro formField(name, label, type="text", required=false) %}
<div class="form-floating mb-3">
  {% if type == "textarea" %}
  <!-- Textarea for longer input -->
  <textarea
    class="form-control"
    id="{{ name }}"
    name="{{ name }}"
    placeholder="Enter your {{ label | lower }}..."
    style="height: 12rem"
    {%
    if
    required
    %}required{%
    endif
    %}
  ></textarea>
  {% else %}
  <!-- Input for shorter input -->
  <input
    class="form-control"
    id="{{ name }}"
    name="{{ name }}"
    type="{{ type }}"
    placeholder="Enter your {{ label | lower }}..."
    {%
    if
    required
    %}required{%
    endif
    %}
  />
  {% endif %}
  <label for="{{ name }}">{{ label }}</label>
</div>
{% endmacro %}
```

**Macro Parameters:**

- **name**: Form field name and ID (e.g., "email")
- **label**: Display label (e.g., "Email Address")
- **type**: Input type (e.g., "text", "email", "tel", "textarea")
- **required**: Boolean for required attribute

**How It Works:**

Calling:

```html
{{ formField("email", "Email Address", "email", true) }}
```

Generates:

```html
<div class="form-floating mb-3">
  <input
    class="form-control"
    id="email"
    name="email"
    type="email"
    placeholder="Enter your email address..."
    required
  />
  <label for="email">Email Address</label>
</div>
```

**Benefits:**

- ✅ Consistent styling across all form fields
- ✅ DRY principle - no repetition
- ✅ Easy to update all fields by changing macro once
- ✅ Meets CHALLENGE.md requirement: "use macros instead of label input"
- ✅ Handles both input and textarea types

**Filters in Macro:**

- `{{ label | lower }}` - Converts label to lowercase for placeholder
- Example: "Email Address" → "email address"

---

## Data Management

### blog-posts.json Structure

```json
[
  {
    "title": "Black: The Absence, Not the Presence, of Color",
    "image": "colorful-umbrella.jpg",
    "author": "Peter Parker",
    "createdAt": 1743120000,
    "teaser": "Scientifically, black is not a color but rather...",
    "content": "<p>When you think about the rainbow...</p><p>...</p>"
  },
  {
    "title": "Flowers: Nature's Muse for Design",
    "image": "flowers.jpg",
    "author": "Peter Parker",
    "createdAt": 1745452800,
    "teaser": "Flowers endlessly inspire diverse design fields...",
    "content": "<p>Flowers, with their riot of colors...</p>"
  },
  {
    "title": "UDesign's Harmony: Core Purpose and Supporting Details",
    "image": "sailing.jpg",
    "author": "Peter Parker",
    "createdAt": 1748736000,
    "teaser": "Discover how distinguishing between the major core...",
    "content": "<p>In the world of design, you'll often hear...</p>"
  }
]
```

**Field Descriptions:**

- **title** (string): Post title, used for display and slug generation
- **image** (string): Filename in `assets/img/` directory
- **author** (string): Author name (hardcoded to "Peter Parker")
- **createdAt** (number): Unix timestamp in seconds
  - 1743120000 = January 1, 2025
  - Converted to readable format in application
- **teaser** (string): Short description/excerpt for list pages
- **content** (string): Full HTML content of blog post
  - Contains `<p>` tags and other HTML
  - Rendered with `| safe` filter in templates

**Why Unix Timestamps?**

- Compact storage (just a number)
- Language/locale independent
- Easy date calculations
- Easily converted to any date format
- Requirement: "convert unix timestamp...without changing json structure"

**Adding New Posts:**

1. Add new object to array in `blog-posts.json`
2. Ensure image exists in `assets/img/`
3. Generate timestamp: `Date.now() / 1000 | 0` in JavaScript console
4. Restart server to reload data

---

## Static Assets & Styling

### Directory Structure

```
assets/
  img/
    colorful-umbrella.jpg   # Post 1 image
    flowers.jpg             # Post 2 image
    sailing.jpg             # Post 3 image
    home-bg.jpg            # Home page header background
    contact-bg.jpg         # Contact page header background
    post-bg.jpg            # Default post background
    about-bg.jpg           # About page background
    favicon.ico            # Browser icon

css/
  styles.css               # Compiled Bootstrap + Clean Blog styles

js/
  scripts.js              # Clean Blog JavaScript (navigation, etc.)
```

### styles.css - Compiled Styles

The `styles.css` file includes:

- **Bootstrap 5** base styles
- **Clean Blog** custom theme
- **Responsive design** breakpoints
- **Typography** (Lora and Open Sans fonts)
- **Navigation** styling and animations
- **Post preview** card styles
- **Form** styling

**Key CSS Classes Used:**

```css
.masthead {
  /* Hero header with background image */
}
.navbar {
  /* Top navigation bar */
}
.post-preview {
  /* Blog post card on home page */
}
.form-floating {
  /* Bootstrap floating label inputs */
}
```

### scripts.js - Theme JavaScript

Handles:

- **Responsive navigation**: Hamburger menu on mobile
- **Scroll effects**: Navbar shrinks on scroll
- **Form interactions**: Focus states, validation UI

---

## Testing & Running the Application

### Development Workflow

**Step 1: Install Dependencies**

```bash
npm install
```

- Downloads all packages from `package.json`
- Creates `node_modules/` directory
- Generates `package-lock.json` for reproducible installs

**Step 2: Start Development Server**

```bash
npm run dev
```

- Executes `ts-node src/index.ts`
- Runs TypeScript directly without compilation
- Server starts on `http://localhost:3000`
- **No hot reload** - manually restart after changes

**Step 3: Test in Browser**

```
http://localhost:3000           → Home page with post list
http://localhost:3000/about     → About page
http://localhost:3000/contact   → Contact form
http://localhost:3000/post      → First blog post (sample)
http://localhost:3000/post/black-the-absence-not-the-presence-of-color  → Specific post
```

**Step 4: Making Changes**

1. Edit files in `src/`, `views/`, or `data/`
2. Save changes
3. Stop server (Ctrl+C)
4. Restart with `npm run dev`

### Production Build

**Step 1: Compile TypeScript**

```bash
npm run build
```

- Runs `tsc` (TypeScript compiler)
- Reads `tsconfig.json` configuration
- Compiles `src/**/*.ts` → `dist/**/*.js`
- Output structure mirrors source structure

**Step 2: Start Production Server**

```bash
npm start
```

- Runs `node dist/index.js`
- Executes compiled JavaScript
- More performant than ts-node
- Should be used in production deployments

### Verification Checklist

- [ ] All 3 blog posts appear on home page
- [ ] Clicking post title navigates to detail page
- [ ] Post detail shows full content and correct image
- [ ] Dates are formatted (e.g., "January 1, 2025")
- [ ] Navigation links work (Home, About, Contact, Sample Post)
- [ ] Contact form displays all fields
- [ ] Browser console shows no errors
- [ ] Responsive design works on mobile

---

## Project Structure Deep Dive

```
create-a-blog-website/
│
├── src/                          # TypeScript source code
│   └── index.ts                  # Main application entry point
│
├── views/                        # Nunjucks templates
│   ├── layout.njk                # Base template (navigation, footer)
│   ├── index.njk                 # Home page (post list)
│   ├── post.njk                  # Blog detail page
│   ├── contact.njk               # Contact form page
│   ├── about.njk                 # About page
│   └── macros/
│       └── form.njk              # Reusable form field macro
│
├── data/                         # Application data
│   └── blog-posts.json           # Blog post content
│
├── assets/                       # Static assets
│   └── img/                      # Images
│       ├── colorful-umbrella.jpg
│       ├── flowers.jpg
│       ├── sailing.jpg
│       └── [template images]
│
├── css/                          # Stylesheets
│   └── styles.css                # Bootstrap + Clean Blog CSS
│
├── js/                           # Client-side JavaScript
│   └── scripts.js                # Clean Blog theme scripts
│
├── dist/                         # Compiled JavaScript (generated)
│   └── index.js                  # Compiled from src/index.ts
│
├── node_modules/                 # Dependencies (generated)
│
├── package.json                  # Project manifest
├── package-lock.json             # Dependency lock file
├── tsconfig.json                 # TypeScript configuration
├── .gitignore                    # Git ignore patterns
├── README.md                     # Project documentation
├── GUIDE.md                      # This file
└── CHALLENGE.md                  # Original requirements
```

**Directory Purposes:**

- **src/**: Server-side TypeScript code
- **views/**: HTML templates with dynamic content
- **data/**: JSON data files (database alternative)
- **assets/**, **css/**, **js/**: Public static files
- **dist/**: Compiled code (not committed to git)
- **node_modules/**: Dependencies (not committed to git)

---

## Key Concepts & Best Practices

### 1. Separation of Concerns

**Data Layer** (`data/blog-posts.json`)

- Stores content separate from code
- Easy to update without touching logic
- Could be replaced with database later

**View Layer** (`views/*.njk`)

- Presentation logic only
- No business logic in templates
- Reusable components (macros)

**Controller Layer** (`src/index.ts`)

- Request handling
- Data processing (formatting, slugs)
- Route logic

### 2. DRY Principle (Don't Repeat Yourself)

**Template Inheritance:**

- Navigation written once in `layout.njk`
- Footer written once in `layout.njk`
- All pages inherit automatically

**Macros:**

- Form field markup written once
- Used 4 times in contact form
- Easy to update styling everywhere

**Helper Functions:**

- `formatDate()` used for all posts
- `createSlug()` generates all URLs
- Consistent behavior across application

### 3. Type Safety

**TypeScript Benefits:**

- Catches errors before runtime
- IntelliSense autocomplete
- Refactoring safety
- Self-documenting code

**Example:**

```typescript
interface BlogPost {
  title: string;
  // ...
}
```

If you type `post.titel`, TypeScript warns you before running code.

### 4. Security

**HTML Escaping:**

- Nunjucks `autoescape: true` prevents XSS
- User input automatically escaped
- Only use `| safe` for trusted content

**Static File Serving:**

- Only specific directories exposed
- Source code (`src/`) not publicly accessible
- Environment variables not exposed

### 5. SEO Optimization

**Semantic URLs:**

- `/post/flowers-natures-muse-for-design` (good)
- `/post?id=2` (bad)
- Readable, shareable, indexable

**Server-Side Rendering:**

- Search engines see full HTML
- Fast initial page load
- No JavaScript required for content

---

## Troubleshooting Common Issues

### Issue: "Cannot find module 'express'"

**Cause**: Dependencies not installed
**Solution**:

```bash
npm install
```

### Issue: "Port 3000 is already in use"

**Cause**: Another process using port 3000
**Solution**:

```typescript
// Change port in src/index.ts
const PORT = 3001; // or any available port
```

Or kill the process:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: Post images not displaying

**Cause**: Incorrect image path

**Solution**:

1. Verify images are in `assets/img/` directory
2. Check filenames match exactly (case-sensitive)
3. Confirm static middleware configured correctly in `src/index.ts`
4. Check browser console for 404 errors

**Debug**:

```typescript
// Add to src/index.ts to log static file requests
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});
```

### Issue: TypeScript errors in IDE

**Cause**: Type definitions not installed
**Solution**:

```bash
npm install --save-dev @types/express @types/node @types/nunjucks
```

### Issue: Changes not reflecting

**Cause**: Server not restarted
**Solution**:

1. Stop server (Ctrl+C)
2. Restart with `npm run dev`
3. **Optional**: Install nodemon for auto-restart

### Issue: 404 on post detail pages

**Cause**: Slug mismatch
**Debug**:

```typescript
// Add console log in src/index.ts
console.log(
  "Available slugs:",
  postsWithMeta.map((p) => p.slug)
);
```

Check browser URL matches generated slug exactly

---

## Extending the Project

### Add Author Pages

1. **Add author field to posts**
2. **Create route**:

```typescript
app.get("/author/:name", (req, res) => {
  const authorPosts = postsWithMeta.filter(
    (p) => p.author.toLowerCase() === req.params.name.toLowerCase()
  );
  res.render("author.njk", { posts: authorPosts, name: req.params.name });
});
```

3. **Create `views/author.njk` template**

### Add Search Functionality

1. **Create search route**:

```typescript
app.get("/search", (req, res) => {
  const query = req.query.q?.toString().toLowerCase() || "";
  const results = postsWithMeta.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query)
  );
  res.render("search.njk", { results, query });
});
```

2. **Add search form to navigation**

### Add Categories/Tags

1. **Update JSON**:

```json
{
  "title": "...",
  "tags": ["design", "color"],
  ...
}
```

2. **Create tag filter route**
3. **Display tags on post pages**

### Connect to Database

Replace JSON file with MongoDB/PostgreSQL:

```typescript
// Instead of reading JSON
const blogPosts = await db.collection("posts").find().toArray();
```

### Add Comments

1. **Install database (MongoDB, etc.)**
2. **Create comments collection/table**
3. **Add POST route to handle comment submission**
4. **Display comments in `post.njk`**

### Add Pagination

```typescript
app.get("/", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = 5;
  const start = (page - 1) * perPage;
  const paginatedPosts = postsWithMeta.slice(start, start + perPage);

  res.render("index.njk", {
    posts: paginatedPosts,
    currentPage: page,
    totalPages: Math.ceil(postsWithMeta.length / perPage),
  });
});
```

### Add RSS Feed

```typescript
app.get("/rss.xml", (req, res) => {
  res.set("Content-Type", "application/rss+xml");
  res.render("rss.njk", { posts: postsWithMeta });
});
```

---

## Requirements Checklist

✅ **Setup Express.js application with TypeScript**

- Express 4.21.1 installed and configured
- TypeScript 5.6.3 with proper tsconfig.json
- Type definitions for all packages

✅ **Install Nunjucks template engine**

- Nunjucks 3.2.4 installed
- Configured with Express integration
- Template directory set to `views/`

✅ **Implement Clean Blog layout**

- Downloaded from Start Bootstrap
- All CSS/JS/images included
- Responsive design maintained

✅ **Generate blog posts from JSON data**

- `data/blog-posts.json` created
- Contains all 3 required posts
- Properly structured with all fields

✅ **Convert Unix timestamp without changing JSON**

- `formatDate()` helper function
- Conversion happens at runtime
- Original JSON data untouched

✅ **List blog posts on home page**

- `index.njk` loops through posts
- Shows title, teaser, author, date
- Links to detail pages

✅ **Detail page for each blog post**

- Dynamic `/post/:slug` route
- Displays full content
- Shows post image as header background

✅ **Use slug for URLs**

- `createSlug()` generates SEO-friendly URLs
- Converts titles to lowercase with hyphens
- Handles special characters correctly

✅ **Use macros for form**

- `form.njk` macro created
- Parameters: name, label, type, required
- Used 4 times in contact form
- Eliminates repetition

✅ **Contact form is HTML only**

- No backend validation
- No POST handler (as specified)
- Meets requirement: "It's ok if the form...is just HTML"

---

## Technologies Summary

| Technology   | Version | Purpose               |
| ------------ | ------- | --------------------- |
| Node.js      | 18+     | JavaScript runtime    |
| Express.js   | 4.21.1  | Web framework         |
| TypeScript   | 5.6.3   | Type-safe development |
| Nunjucks     | 3.2.4   | Template engine       |
| Bootstrap    | 5.2.3   | CSS framework         |
| Font Awesome | 6.3.0   | Icon library          |
| ts-node      | 10.9.2  | TypeScript execution  |

---

## Final Notes

**What Was Built:**

- Fully functional blog website
- 3 dynamic blog posts from JSON
- Clean, responsive design
- Type-safe server-side code
- Reusable template components
- SEO-friendly URLs
- Professional code structure

**What Was Learned:**

- Express.js routing and middleware
- TypeScript with Node.js
- Nunjucks template inheritance and macros
- Server-side rendering
- Data transformation (timestamps, slugs)
- Static file serving
- Project structuring and organization

**Production Readiness:**
To make this production-ready, consider adding:

- Environment variables (PORT, NODE_ENV)
- Logging (Winston, Morgan)
- Error handling middleware
- Database integration
- User authentication
- Form validation and submission handling
- Testing (Jest, Mocha)
- Deployment configuration (Docker, etc.)

---

**Created:** November 3, 2025  
**Author:** Documented from completed project  
**Purpose:** Educational reference and tutorial  
**Project Type:** Educational blog website demonstration

For questions or issues, refer to the code comments in `src/index.ts` and template files in `views/`.
