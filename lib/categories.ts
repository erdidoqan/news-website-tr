import type { Article } from "@/types/news"

export interface Category {
  slug: string
  name: string
  description: string
  parentCategory?: string
}

export const categories: Category[] = [
  // News Categories
  {
    slug: "turkiye-siyaseti",
    name: "Türkiye Siyaseti",
    description: "Türkiye'nin siyasi gündeminden son dakika haberleri ve analizler",
  },
  {
    slug: "konut-evsizlik",
    name: "Konut & Evsizlik",
    description: "Konut piyasası, emlak sektörü ve evsizlik konularındaki gelişmeler",
  },
  { slug: "depremler", name: "Depremler", description: "Deprem haberleri, afet yönetimi ve güvenlik önlemleri" },
  { slug: "egitim", name: "Eğitim", description: "Eğitim sistemi, okul haberleri ve akademik gelişmeler" },
  { slug: "istanbul", name: "İstanbul", description: "İstanbul'dan yerel haberler ve şehir gündeminden gelişmeler" },
  {
    slug: "turkiye",
    name: "Tüm Türkiye Haberleri",
    description: "Türkiye genelinden kapsamlı haber ve analiz içerikleri",
  },

  // Lifestyle Categories
  {
    slug: "kultur-sanat",
    name: "Kültür Sanat",
    description: "Sanat, kültür etkinlikleri ve yaratıcı endüstri haberleri",
  },
  { slug: "turk-mutfagi", name: "Türk Mutfağı", description: "Geleneksel ve modern Türk mutfağı, yemek kültürü" },
  { slug: "haber-merkezi-turkce", name: "Haber Merkezi Türkçe", description: "Türkçe içerik ve dil kültürü haberleri" },
  { slug: "dijital-platform", name: "Dijital Platform", description: "Dijital medya, platform haberleri ve teknoloji" },

  // Economy Categories
  { slug: "borsa-istanbul", name: "Borsa İstanbul", description: "Borsa İstanbul haberleri ve piyasa analizleri" },
  { slug: "doviz-kurlari", name: "Döviz Kurları", description: "Döviz piyasası, kur hareketleri ve ekonomik etkiler" },
  {
    slug: "altin-fiyatlari",
    name: "Altın Fiyatları",
    description: "Altın piyasası, fiyat hareketleri ve yatırım tavsiyeleri",
  },
  { slug: "kripto-paralar", name: "Kripto Paralar", description: "Kripto para haberleri ve blockchain teknolojisi" },

  // Main Categories
  { slug: "teknoloji", name: "Teknoloji", description: "Teknoloji haberleri, yenilikler ve dijital dönüşüm" },
  { slug: "kultur", name: "Kültür", description: "Kültür, sanat ve toplumsal etkinlikler" },
  { slug: "yasam", name: "Yaşam", description: "Yaşam tarzı, sağlık ve kişisel gelişim haberleri" },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export async function getCategoryArticles(
  categorySlug: string,
  page = 1,
  limit = 12,
): Promise<{ articles: Article[]; totalCount: number }> {
  // Mock data - replace with actual API call
  const mockArticles: Article[] = Array.from({ length: limit }, (_, i) => ({
    id: `${categorySlug}-${page}-${i + 1}`,
    title: `${getCategoryBySlug(categorySlug)?.name} Haberi ${(page - 1) * limit + i + 1}`,
    excerpt: "Bu haberin özeti burada yer alacak. Gerçek API entegrasyonu sonrasında dinamik içerik gelecek.",
    imageUrl: `/placeholder.svg?height=300&width=400&query=${categorySlug} news image`,
    imageAlt: `${getCategoryBySlug(categorySlug)?.name} haberi görseli`,
    category: getCategoryBySlug(categorySlug)?.name || "Genel",
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("tr-TR"),
    slug: `${categorySlug}-haberi-${(page - 1) * limit + i + 1}`,
    content: "",
    author: "Haber Merkezi",
    tags: [categorySlug, "güncel"],
  }))

  // Mock total count - replace with actual count from API
  const totalCount = 156

  return {
    articles: mockArticles,
    totalCount,
  }
}

export function getCategoriesByParent(parentSlug?: string): Category[] {
  return categories.filter((category) => category.parentCategory === parentSlug)
}

export function getAllCategorySlugs(): string[] {
  return categories.map((category) => category.slug)
}
