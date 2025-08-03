# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is next-lyaesley-blog, a technical blog built with Next.js 15, designed for static site generation and deployment to GitHub Pages. The blog features a modern, professional design with comprehensive functionality for technical content creation and consumption.

### Key Features

- **Static Site Generation (SSG)** with Next.js 15 App Router
- **Markdown Support** with syntax highlighting using Prism.js
- **Categories and Tags System** for content organization
- **Search Functionality** with Fuse.js for client-side search
- **Dark/Light Theme Toggle** with next-themes
- **Responsive Design** using Tailwind CSS
- **SEO Optimization** with proper meta tags and structured data
- **Code Block Copy Functionality** for better developer experience
- **GitHub Pages Deployment** with automated GitHub Actions

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (static export)
npm run build

# Start production server (after build)
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## Project Structure

```
next-lyaesley-blog/
├── .github/workflows/     # GitHub Actions for deployment
├── posts/                 # Markdown blog posts
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── blog/         # Blog listing and individual posts
│   │   ├── categories/   # Category pages
│   │   ├── tags/         # Tag pages
│   │   ├── search/       # Search functionality
│   │   ├── about/        # About page
│   │   └── contact/      # Contact page
│   ├── components/       # React components
│   │   ├── blog/         # Blog-specific components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── providers/    # Context providers
│   │   └── ui/           # UI components
│   ├── lib/              # Utility functions
│   │   └── markdown.ts   # Markdown processing logic
│   └── types/            # TypeScript type definitions
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Architecture

### Content Management

- **Blog Posts**: Stored as Markdown files in `/posts/` directory
- **Frontmatter**: Uses gray-matter for metadata (title, excerpt, date, author, tags, category, featured)
- **Processing**: Markdown is processed with remark and remark-html
- **Syntax Highlighting**: Prism.js with multiple language support

### Routing

- **Static Generation**: All routes are pre-generated at build time
- **Dynamic Routes**: `[slug]`, `[category]`, and `[tag]` for dynamic content
- **generateStaticParams**: Used for generating static paths

### State Management

- **Theme State**: Managed by next-themes provider
- **Search State**: Local component state with Fuse.js
- **No Global State**: Each component manages its own state

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS Variables**: For theme colors and consistency
- **Dark Mode**: Automatic system preference detection with manual toggle
- **Responsive Design**: Mobile-first approach

### Performance Optimizations

- **Static Site Generation**: Pre-rendered HTML for fast loading
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Disabled for static export (GitHub Pages)
- **Bundle Analysis**: Can be enabled with @next/bundle-analyzer

## Content Creation

### Adding New Blog Posts

1. Create a new `.md` file in the `/posts/` directory
2. Add frontmatter with required fields:

```markdown
---
title: "Your Post Title"
excerpt: "Brief description of the post"
date: "2024-01-15"
author: "Author Name"
tags: ["Tag1", "Tag2", "Tag3"]
category: "Category Name"
featured: false # Set to true for featured posts
---

Your markdown content here...
```

### Supported Languages for Syntax Highlighting

- JavaScript/TypeScript
- JSX/TSX
- CSS
- JSON
- Bash
- Python
- Java
- Go
- Rust

### Code Block Example

```javascript
function example() {
  console.log("This will be syntax highlighted");
}
```

## Deployment

### GitHub Pages Setup

1. Repository must be public or have GitHub Pro
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. Push to main branch triggers automatic deployment

### GitHub Actions Workflow

- Located in `.github/workflows/deploy.yml`
- Runs on push to main branch
- Builds static site and deploys to GitHub Pages
- Uses Node.js 18 and npm for dependency management

### Manual Deployment

```bash
npm run build  # Generates static files in 'out' directory
# Upload 'out' directory contents to your hosting provider
```

## Configuration

### Next.js Configuration

- **Output**: Static export mode for GitHub Pages
- **Trailing Slash**: Enabled for GitHub Pages compatibility
- **Image Optimization**: Disabled for static hosting
- **Base Path**: Configure for subdirectory hosting if needed

### Environment Variables

Create `.env.local` for development:

```env
# Add any environment variables here
# They will be available during build time
```

## SEO and Meta Tags

### Automatic SEO

- **Page Titles**: Dynamic based on content
- **Meta Descriptions**: From post excerpts or page descriptions
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: JSON-LD schema for articles

### Sitemap and RSS

- Consider adding `next-sitemap` for automatic sitemap generation
- RSS feed can be generated from markdown posts

## Customization

### Changing Theme Colors

Modify CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: #0070f3; /* Primary brand color */
  --background: #ffffff; /* Background color */
  /* ... other variables */
}
```

### Adding New Pages

1. Create directory in `src/app/`
2. Add `page.tsx` with default export
3. Include metadata export for SEO

### Modifying Layout

- **Header**: `src/components/layout/header.tsx`
- **Footer**: `src/components/layout/footer.tsx`
- **Root Layout**: `src/app/layout.tsx`

## Common Tasks

### Adding a New Category Page

1. Posts with the category will automatically appear
2. Update navigation links if needed
3. Category pages are generated automatically

### Updating Contact Information

- Modify `src/app/contact/page.tsx`
- Update social links in `src/components/layout/footer.tsx`

### Adding New UI Components

1. Create component in `src/components/ui/`
2. Use TypeScript interfaces for props
3. Follow existing naming conventions

## Troubleshooting

### Build Issues

- Check TypeScript errors: `npm run type-check`
- Verify all markdown frontmatter is valid
- Ensure all imports are correct

### Styling Issues

- Verify Tailwind classes are valid
- Check dark mode variants are properly applied
- Use browser dev tools to inspect CSS variables

### Deployment Issues

- Verify GitHub Actions permissions
- Check that all paths are relative
- Ensure no server-side only code in components

## Dependencies

### Core Dependencies

- **Next.js**: React framework
- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

### Content Processing

- **gray-matter**: Frontmatter parsing
- **remark**: Markdown processing
- **remark-html**: HTML conversion
- **prismjs**: Syntax highlighting

### UI and UX

- **next-themes**: Theme management
- **lucide-react**: Icons
- **fuse.js**: Search functionality

All dependencies are production-ready and actively maintained. Update regularly for security and feature improvements.
