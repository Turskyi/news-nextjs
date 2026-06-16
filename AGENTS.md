### News Sourcing (Dual-API Strategy)

```
User Request → /api/news?country=ua|intl|us|etc
  ├─ Primary: NewsAPI (international & country-specific)
  ├─ Fallback: GNews (Ukrainian news has limited NewsAPI coverage)
  └─ Automatic fallback on 429 rate limit errors
```

**Key file**: `pages/api/news.ts` - Routes requests to appropriate news source
with region-aware logic

### Content Pipeline

```
Raw Articles → cleanNewsArticle() → isArticleUseful() → Response
```

**Key service**: `services/newsContentCleaner.ts` - Aggressive content
validation:

- Removes NewsAPI truncation markers `[+X chars]`
- Detects "unreadable" content (low letter density, garbage text, URLs embedded)
- Filters articles with login prompts, subscription walls, or policy pages

### AI Insight Generation

```
Articles → getConclusionWithFallback() {
  Try Groq (fast, free) 
  → Fallback to Mistral 
  → Fallback to Gemini (most capable)
}
```

**Key file**: `services/ai-orchestrator.ts` - Three-tier LLM fallback for
reliability

**Cache behaviour**: In-memory 4-hour caching per language + article hash combo
(`pages/api/news-conclusion.ts`)

---

## Critical Patterns & Conventions

### API Route Pattern

All API handlers implement CORS and OPTIONS support:

```typescript
// Standard CORS headers + OPTIONS response
response.setHeader('Access-Control-Allow-Origin', '*');
if (request.method === 'OPTIONS') return response.status(200).end();
```

### Rate Limit Handling

NewsAPI returns 429 → Automatic fallback to GNews via `isRateLimitError()`
check.

### Content Cleaning Rules

The `isLikelyUnreadableContent()` function is complex and critical. It checks:

- Minimum readable word count (≥3), letter count (≥15)
- Letter density (>40% of content should be letters)
- Presence of markers: URLs, `t.me`, Telegram, WhatsApp, "click here"
- Special character ratio, repeated patterns, non-printable chars

### Language Support

- All prompts injected with language instructions in `news-conclusion.ts`
- Route language: URL param → `lang` prop → translations lookup
- English is default; Ukrainian triggers specific country code logic

### Client-Side Data Fetching

Uses **SWR** hook (React 18) with memoized fetchers:

```typescript
useSWR<ActionableInsight | null>(
  newsArticles.length > 0 ? [`/api/actionable-insight`, lang] : null,
  fetchConclusion,  // callable with payload
)
```

## Key Files & Their Responsibilities

| File                                  | Purpose                                                                        |
|---------------------------------------|--------------------------------------------------------------------------------|
| `pages/api/news.ts`                   | Primary news fetching; switches between NewsAPI + GNews                        |
| `pages/api/news-conclusion.ts`        | Generates AI insights with caching + language support                          |
| `services/ai-orchestrator.ts`         | LLM fallback logic: Groq → Mistral → Gemini                                    |
| `services/newsContentCleaner.ts`      | Sophisticated article filtering; regex-based validation                        |
| `services/NewsArticleDeduplicator.ts` | Dedupes articles by title/content hashing                                      |
| `constants/prompts.ts`                | System & user prompts for news conclusions                                     |
| `constants/translations.ts`           | English/Ukrainian i18n strings                                                 |
| `models/*.ts`                         | TypeScript interfaces: `NewsArticle`, `ActionableInsight`, `ConclusionArticle` |

---

## Developer Workflow

### Run Project

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint + Prettier (single quotes)
```

### Node Version

Pinned to **Node 22.x** (see `package.json` engines)

### Key Debugging Patterns

- Search API enable debug logs: `?debug=true` in requests
- Sample: `/api/search-news?q=ukraine&debug=true` logs article counts + API
  requests
- Console errors logged server-side for API failures

### Add New News Source

1. Create source-specific fetch logic in `pages/api/news.ts`
2. Implement `GNewsArticle` → `NewsArticle` mapping (handle different field
   names)
3. Apply `cleanNewsArticle()` before response
4. Consider region mapping (ua/uk → special handling for Ukrainian)

---

## Common Pitfalls & Gotchas

1. **Article Filtering is Strict**: Login prompts, newsletter CTAs, policy links
   are actively filtered. Test with real APIs to see filtering in action.

2. **News API vs GNews Field Mismatch**: NewsAPI has `urlToImage`, GNews has
   `image`. Always map in transformation step.

3. **Language Injection**: Prompts MUST include language instruction in system
   prompt. See `pages/api/news-conclusion.ts` line 75.

4. **Cache Key is Article-Dependent**: Same articles across languages reuse
   cache (good), but changing article order breaks cache hit.

5. **Fallback Failures Are Silent**: If all AI providers fail, user gets
   fallback message—no error thrown. Check console for cascade logs.

6. **ISR via getServerSideProps**: Not using Next.js ISR; every request hits
   `/api/news` (good for fresh news, impacts performance).

---

## Reference Architecture Decisions

- **Pages Router (Not App Router)**: Project predates App Router migration;
  dynamic routes via `[param].tsx`
- **In-Memory Cache**: Lightweight but resets on deployment. For scale,
  integrate Redis.
- **AI Orchestrator Pattern**: Handles unavailability of expensive/slow
  providers gracefully
- **Content Cleaning Service**: Needed because external APIs return low-quality
  or truncated content

---

## Testing Endpoints (by hand)

```bash
# Core news endpoint
curl "http://localhost:3000/api/news?country=ua"

# Search (handles dedup + GNews fallback)
curl "http://localhost:3000/api/search-news?q=climate&debug=true"

# AI insights (POST payload)
curl -X POST http://localhost:3000/api/news-conclusion \
  -H "Content-Type: application/json" \
  -d '{"articles":[{"title":"...","description":"..."}],"lang":"en"}'

# With language override
curl "http://localhost:3000/?lang=uk"  # Ukrainian homepage
```

# This file should never exceed 200 lines of code, meaning, this line should never be below line number 200. If we need to add something to this file, we simply have to remove something less critical.
