import express, { Request, Response } from "express";
import nunjucks from "nunjucks";
import path from "path";
import fs from "fs";

interface BlogPost {
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
}

interface BlogPostWithMeta extends BlogPost {
  formattedDate: string;
  slug: string;
}

const app = express();
const PORT = 3000;

// Configure Nunjucks
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Serve static files
app.use(express.static("public"));
app.use("/css", express.static("css"));
app.use("/js", express.static("js"));
app.use("/assets", express.static("assets"));

// Read blog posts
const blogPosts: BlogPost[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/blog-posts.json"), "utf-8")
);

// Helper function to convert unix timestamp to readable date
function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Add formatted dates and slugs to posts
const postsWithMeta: BlogPostWithMeta[] = blogPosts.map((post) => ({
  ...post,
  formattedDate: formatDate(post.createdAt),
  slug: createSlug(post.title),
}));

// Home route - list all blog posts
app.get("/", (req: Request, res: Response) => {
  res.render("index.njk", { posts: postsWithMeta });
});

// About route
app.get("/about", (req: Request, res: Response) => {
  res.render("about.njk");
});

// Sample Post route - show the first blog post
app.get("/post", (req: Request, res: Response) => {
  const post = postsWithMeta[0];
  res.render("post.njk", { post });
});

// Blog post detail route
app.get("/post/:slug", (req: Request, res: Response) => {
  const post = postsWithMeta.find((p) => p.slug === req.params.slug);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("post.njk", { post });
});

// Contact route
app.get("/contact", (req: Request, res: Response) => {
  res.render("contact.njk");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
