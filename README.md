# Clean Blog Website

A modern blog website built with Express.js, TypeScript, and Nunjucks template engine, implementing the Clean Blog layout from Start Bootstrap.

## Features

- 📝 Dynamic blog post rendering from JSON data
- 🎨 Responsive Clean Blog theme with Bootstrap 5
- 🔗 SEO-friendly URL slugs for blog posts
- 📅 Automatic timestamp formatting
- 📧 Contact form page
- ♻️ Reusable template components with Nunjucks macros
- 🔒 Type-safe development with TypeScript

## Technologies

- **Express.js 4.21.1** - Fast, unopinionated web framework for Node.js
- **TypeScript 5.6.3** - Strongly typed programming language that builds on JavaScript
- **Nunjucks 3.2.4** - Powerful templating engine with inheritance and macros
- **Node.js** - JavaScript runtime environment
- **Bootstrap 5** - Frontend framework for responsive design (via Clean Blog template)

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/linobollansee/create-a-blog-website.git
cd create-a-blog-website
```

2. Install dependencies:

```bash
npm install
```

## Usage

### Development Mode

Run the application in development mode with automatic TypeScript compilation:

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Production Build

Build and run the application for production:

```bash
npm run build
npm start
```

This compiles TypeScript to JavaScript in the `dist/` folder and runs the compiled code.

## Available Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled production build

## Project Structure

```
create-a-blog-website/
├── assets/              # Blog post images
│   └── img/
│       ├── colorful-umbrella.jpg
│       ├── flowers.jpg
│       └── sailing.jpg
├── css/                 # Stylesheets
│   └── styles.css
├── data/                # Blog post data
│   └── blog-posts.json
├── js/                  # Client-side JavaScript
│   └── scripts.js
├── src/                 # TypeScript source code
│   └── index.ts         # Main Express application
├── views/               # Nunjucks templates
│   ├── layout.njk       # Base layout template
│   ├── index.njk        # Home page
│   ├── post.njk         # Blog post detail page
│   ├── contact.njk      # Contact form page
│   ├── about.njk        # About page
│   └── macros/
│       └── form.njk     # Reusable form field macro
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
├── CHALLENGE.md         # Original project requirements
└── GUIDE.md            # Detailed creation guide
```

## Routes

- `GET /` - Home page displaying all blog posts
- `GET /post/:slug` - Individual blog post detail page
- `GET /contact` - Contact form page
- `GET /about` - About page
- `GET /post` - Sample post (template navigation)

## Blog Posts

Blog posts are stored in `data/blog-posts.json` with the following structure:

```json
{
  "title": "Blog Post Title",
  "image": "image-filename.jpg",
  "author": "Author Name",
  "createdAt": 1743120000,
  "teaser": "Short description...",
  "content": "<p>Full HTML content...</p>"
}
```

The application automatically:

- Converts Unix timestamps to readable dates (e.g., "January 1, 2024")
- Generates URL-friendly slugs from titles
- Renders HTML content safely in templates

## Key Features Implementation

### Template Inheritance

All pages extend the base `layout.njk` template, ensuring consistent navigation, styling, and structure across the site.

### Macros

Reusable form field macro in `views/macros/form.njk` eliminates code repetition:

```njk
{% from "macros/form.njk" import formField %}
{{ formField("name", "Name", "text", true) }}
```

### Dynamic Routing

Blog posts are accessible via SEO-friendly URLs:

```
/post/black-the-absence-not-the-presence-of-color
/post/flowers-natures-muse-for-design
/post/udesigns-harmony-core-purpose-and-supporting-details
```

## Customization

### Adding New Blog Posts

Edit `data/blog-posts.json` and add a new entry:

```json
{
  "title": "Your Post Title",
  "image": "your-image.jpg",
  "author": "Your Name",
  "createdAt": 1234567890,
  "teaser": "Brief description",
  "content": "<p>Full content in HTML</p>"
}
```

### Styling

Modify `css/styles.css` to customize the appearance or extend the Clean Blog theme.

## License

ISC

## Credits

- Clean Blog template by [Start Bootstrap](https://startbootstrap.com/theme/clean-blog)
- Built as an educational project for learning Express.js, TypeScript, and template engines

## Author

Created on November 3, 2025

---

For detailed step-by-step creation process, see [GUIDE.md](GUIDE.md)
