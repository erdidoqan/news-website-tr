# Haber Merkezi - News Website

A modern, responsive news website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📱 Fully responsive design
- 🚀 Fast loading with optimized images
- 📰 Breaking news ticker
- 🎯 Featured stories section
- 📊 Trending stories sidebar
- 🔍 Category-based navigation
- 📧 Newsletter signup
- 📱 Mobile app promotion

## API Integration

The website is designed to work with your news API. Replace the mock data in the API routes with your actual data source.

### API Endpoints

- `GET /api/news/featured` - Get featured story
- `GET /api/news` - Get news articles (with pagination and category filtering)
- `GET /api/news/breaking` - Get breaking news items
- `GET /api/news/trending` - Get trending stories
- `GET /api/news/article/[slug]` - Get single article by slug

### Environment Variables

Create a `.env.local` file with:

\`\`\`
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
# Add your actual API URL in production
\`\`\`

### Customization

1. **Replace Mock Data**: Update the API routes in `app/api/news/` with your actual data source
2. **Update Types**: Modify `types/news.ts` to match your data structure
3. **Configure API Service**: Update `lib/api.ts` with your API endpoints
4. **Styling**: Customize colors and fonts in `app/globals.css` and components

### Data Structure

The website expects news articles with the following structure:

\`\`\`typescript
interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content?: string
  imageUrl: string
  imageAlt: string
  category: string
  publishedAt: string
  author?: string
  slug: string
  urgent?: boolean
  featured?: boolean
  readTime?: string
}
\`\`\`

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel with one click or build for production:

\`\`\`bash
npm run build
npm start
# news-website-tr
