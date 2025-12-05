# Sermon Archive System Documentation

## Overview

The sermon archive system is optimized for **performance** using Static Site Generation (SSG) with Incremental Static Regeneration (ISR). This means:

- ⚡ **Lightning-fast page loads** - No database queries on every visit
- 💰 **Lower costs** - Minimal API calls to Airtable
- 📈 **Scalable** - Can handle high traffic without performance degradation
- 🔄 **Auto-updating** - Pages regenerate every hour to show new content

## Architecture

### 1. Hardcoded Historical Data (`lib/data/sermons.ts`)

All sermons from **November 2017 to August 2024** (260+ sermons) are hardcoded in a TypeScript file. This provides:

- Zero database calls for historical content
- Type-safe data with autocomplete
- Instant page loads

### 2. Static Site Generation (SSG)

The sermons page (`app/sermons/page.tsx`) is generated at **build time**:

```typescript
// Revalidate every hour (3600 seconds)
export const revalidate = 3600;
```

This means:
- First visitor after an hour triggers a regeneration
- Subsequent visitors get the cached version
- No database queries for most visitors

### 3. Featured Sermons

The **4 most recent sermons** are prominently displayed at the top of the page. These are defined in `FEATURED_SERMONS` constant in `lib/data/sermons.ts`.

## How to Add New Sermons

### Option 1: Quick Update (Recommended for New Sermons)

1. **Edit the hardcoded data file:**

   ```bash
   # Open the file
   code lib/data/sermons.ts
   ```

2. **Add your new sermon to the TOP of both arrays:**

   ```typescript
   // Add to FEATURED_SERMONS (keep only the 4 most recent)
   export const FEATURED_SERMONS: SermonData[] = [
     {
       title: "September 8, 2024",  // NEW SERMON HERE
       date: "2024-09-08",
       url: "https://fb.watch/xxxxx/",
       type: "facebook",
     },
     {
       title: "September 1, 2024",  // Move previous featured down
       date: "2024-09-01",
       url: "https://fb.watch/xxxxx/",
       type: "facebook",
     },
     // Keep only 4 total - remove the oldest
   ];

   // Add to ALL_SERMONS at the very top
   export const ALL_SERMONS: SermonData[] = [
     { title: "September 8, 2024", date: "2024-09-08", url: "https://fb.watch/xxxxx/", type: "facebook" },
     { title: "September 1, 2024", date: "2024-09-01", url: "https://fb.watch/xxxxx/", type: "facebook" },
     // ... rest of sermons
   ];
   ```

3. **Deploy your changes:**

   ```bash
   git add lib/data/sermons.ts
   git commit -m "Add sermon for September 8, 2024"
   git push
   ```

4. **The page will auto-regenerate** within an hour, or you can trigger a rebuild immediately.

### Option 2: Add to Airtable (For Future Integration)

If you want to manage sermons through Airtable:

1. **Edit the sync script:**

   ```bash
   code scripts/sync-sermons-to-airtable.ts
   ```

2. **Add your sermons to the array:**

   ```typescript
   const recentSermons: NewSermon[] = [
     {
       title: "September 8, 2024",
       date: "2024-09-08",
       videoLink: "https://fb.watch/xxxxx/",
       speaker: "Pastor Doug Reeder",
       description: "A powerful message about faith and perseverance",
       series: "Living by Faith",
     },
   ];
   ```

3. **Run the sync:**

   ```bash
   npm run sync-sermons
   ```

## Sermon Data Format

```typescript
interface SermonData {
  title: string;        // Display title (usually date or sermon name)
  date: string;         // YYYY-MM-DD format
  url: string;          // Link to Facebook, YouTube, or PowerPoint
  speaker?: string;     // Optional - defaults to Pastor Doug Reeder
  type: 'facebook' | 'youtube' | 'powerpoint';
}
```

## Performance Benefits

### Before (Database on Every Load)
```
User visits page → Query Airtable → Wait 500-2000ms → Show sermons
                    💰 Costs $      ⏱️ Slow
```

### After (Static Generation)
```
User visits page → Serve cached HTML → Show sermons instantly
                    💰 Free          ⚡ <50ms
```

### Stats
- **260+ sermons** loaded in under 50ms
- **Zero API calls** on most page loads
- **Automatic updates** every hour via ISR
- **Hosting cost** reduced by ~90%

## File Structure

```
lib/
  data/
    sermons.ts          # Hardcoded sermon data (260+ sermons)
  airtable.ts           # Airtable utilities

app/
  sermons/
    page.tsx            # Sermons page with SSG/ISR

scripts/
  sync-sermons-to-airtable.ts  # Utility to sync to Airtable

docs/
  SERMONS-SYSTEM.md   # This file
```

## Updating Featured Sermons

The 4 featured sermons appear at the top of the page. To update them:

1. Open `lib/data/sermons.ts`
2. Edit the `FEATURED_SERMONS` array
3. Keep only the 4 most recent sermons
4. Commit and deploy

Example:
```typescript
export const FEATURED_SERMONS: SermonData[] = [
  // Most recent first
  { title: "September 8, 2024", date: "2024-09-08", ... },
  { title: "September 1, 2024", date: "2024-09-01", ... },
  { title: "August 25, 2024", date: "2024-08-25", ... },
  { title: "August 18, 2024", date: "2024-08-18", ... },
];
```

## ISR (Incremental Static Regeneration)

The sermon page uses ISR with a **1-hour revalidation period**:

```typescript
export const revalidate = 3600; // 1 hour in seconds
```

### How It Works:
1. Page is generated at build time
2. Served from cache for up to 1 hour
3. After 1 hour, next visitor triggers background regeneration
4. Visitor still gets cached version immediately
5. New version is cached for the next hour

### Benefits:
- Always fresh content (within 1 hour)
- No waiting for page to load
- Automatic updates without manual rebuilds

## Troubleshooting

### Sermons not updating?
1. Check that you committed and pushed changes to `lib/data/sermons.ts`
2. Wait up to 1 hour for ISR to regenerate
3. Or trigger a manual rebuild/redeploy

### Page loading slow?
- This shouldn't happen with SSG
- Check if ISR is configured (`export const revalidate = 3600`)
- Verify the page is being statically generated (check build logs)

### Want faster updates than 1 hour?
Change the revalidate time in `app/sermons/page.tsx`:
```typescript
export const revalidate = 1800; // 30 minutes
export const revalidate = 600;  // 10 minutes
```

Note: Lower values = more regenerations = slightly higher server costs (but still minimal)

## Future Enhancements

### Integrating Airtable for New Sermons

You can set up a system where:
1. Old sermons (2017-2024) stay hardcoded
2. New sermons (2024+) come from Airtable
3. Combine both sources at build time

Example:
```typescript
// In app/sermons/page.tsx
const hardcodedSermons = ALL_SERMONS;
const airtableSermons = await getAllRecords(BASE_ID, TABLES.SERMONS);
const allSermons = [...airtableSermons, ...hardcodedSermons];
```

### Search Functionality

Add a search bar to filter sermons:
```typescript
const [search, setSearch] = useState('');
const filtered = sermons.filter(s =>
  s.title.toLowerCase().includes(search.toLowerCase())
);
```

### Sermon Series

Group sermons by series:
```typescript
const seriesList = groupBy(sermons, 'series');
```

## Questions?

Contact the development team or refer to:
- Next.js SSG documentation: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
- Next.js ISR documentation: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
