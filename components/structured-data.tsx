"use client"

interface StructuredDataProps {
  type: 'website' | 'article' | 'breadcrumb' | 'organization'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let jsonLd: any = {}

  switch (type) {
    case 'website':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: data.name,
        description: data.description,
        url: data.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${data.url}/arama?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        },
        publisher: {
          '@type': 'Organization',
          name: data.name,
          url: data.url,
          logo: data.logo ? {
            '@type': 'ImageObject',
            url: data.logo
          } : undefined
        }
      }
      break

    case 'organization':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: data.name,
        description: data.description,
        url: data.url,
        logo: data.logo ? {
          '@type': 'ImageObject',
          url: data.logo
        } : undefined,
        sameAs: data.socialMedia ? Object.values(data.socialMedia).filter(Boolean) : [],
        contactPoint: data.contact ? {
          '@type': 'ContactPoint',
          email: data.contact.email,
          telephone: data.contact.phone,
          contactType: 'customer service'
        } : undefined
      }
      break

    case 'article':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: data.title,
        description: data.excerpt,
        image: data.image ? {
          '@type': 'ImageObject',
          url: data.image,
          width: 1200,
          height: 630
        } : undefined,
        datePublished: data.publishedAt,
        dateModified: data.modifiedAt || data.publishedAt,
        author: {
          '@type': 'Person',
          name: data.author.name,
          description: data.author.bio
        },
        publisher: {
          '@type': 'Organization',
          name: data.publisher.name,
          url: data.publisher.url,
          logo: data.publisher.logo ? {
            '@type': 'ImageObject',
            url: data.publisher.logo
          } : undefined
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        },
        articleSection: data.category,
        keywords: data.tags?.join(', '),
        wordCount: data.wordCount,
        timeRequired: `PT${data.readTime}M`,
        url: data.url
      }
      break

    case 'breadcrumb':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
