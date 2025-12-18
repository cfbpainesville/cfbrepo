# Data Optimization Strategy for Airtable Integration

## Overview

This document outlines the smart loading and caching strategy implemented to minimize Airtable API calls while maintaining fresh, accurate data across the website.

## Problem Statement

The original implementation was fetching from Airtable every page load with ISR (Incremental Static Regeneration) set to 1-24 hours. While ISR prevents runtime API calls, it still revalidates unnecessarily for data that rarely changes, wasting API quota and adding latency.

## Solution: Optimized ISR with Backup Data

### Core Strategy

1. **Longer ISR windows** based on data change frequency
2. **Hardcoded backup data** for graceful degradation
3. **Intelligent error handling** that uses backups when Airtable is unavailable
4. **Build-time data export** (optional) to eliminate runtime fetches entirely

---

## Data-Specific Optimization

### 1. Leadership Data (Almost Never Changes)
- **Change Frequency**: ~1-2 times per year
- **Current ISR**: 24 hours → **New ISR: 7 days (604800 seconds)**
- **Backup Data**: Yes (`/lib/data/leadership.ts`)
- **Benefit**: 71% reduction in ISR checks (24→7 day window)
- **Page**: `/about`

### 2. Missions Data (Rarely Changes)
- **Change Frequency**: Monthly/Quarterly
- **Current ISR**: 1 hour → **New ISR: 7 days (604800 seconds)**
- **Backup Data**: Yes (`/lib/data/missions.ts`)
- **Benefit**: 168x reduction in API calls (1 hour → 7 days)
- **Page**: `/missions`

### 3. Ministries Data (Rarely Changes)
- **Change Frequency**: Monthly/Quarterly
- **Current ISR**: 1 hour → **New ISR: 7 days (604800 seconds)**
- **Backup Data**: Yes (`/lib/data/ministries.ts`)
- **Benefit**: 168x reduction in API calls (1 hour → 7 days)
- **Pages**: `/ministries`, `/ministries/[slug]`
- **Note**: Uses `generateStaticParams` for pre-rendering all detail pages at build time

### 4. Events Data (Changes Several Times/Month)
- **Change Frequency**: 2-4 times per month
- **Current ISR**: 24 hours → **New ISR: 3 days (259200 seconds)**
- **Backup Data**: Optional (not yet added)
- **Benefit**: Checks 8x less frequently while staying fresh
- **Page**: `/` (Home page)

### 5. Sermons (Weekly Updates)
- **Change Frequency**: Once per week
- **Current Strategy**: Hardcoded static data file
- **Recommended**: ISR with 3 days (check 2-3x weekly)
- **Note**: Should migrate from hardcoded to fetch from Airtable with ISR
- **Benefit**: Dynamic updates without build rebuilds

### 6. Contact Form Submissions (Real-Time)
- **Strategy**: Server action (correct approach)
- **No ISR needed**: Direct database write

---

## ISR Revalidation Times

| Page/Data | Old ISR | New ISR | Benefit | Updated |
|-----------|---------|---------|---------|---------|
| Home (Events) | 24h | 3d | 8x less API calls | ✅ |
| Missions | 1h | 7d | 168x less API calls | ✅ |
| Ministries | 1h | 7d | 168x less API calls | ✅ |
| About (Leadership) | 24h | 7d | 71% less API calls | ✅ |
| Sermons | N/A (hardcoded) | 3d (recommended) | Dynamic updates | ⏳ |

---

## Fallback/Backup Data System

### Current Implementation

Each infrequently-changing table has a backup data file:

```
/lib/data/
├── leadership.ts    (10 members from Airtable)
├── missions.ts      (empty, ready for data)
├── ministries.ts    (empty, ready for data)
└── events.ts        (not yet created)
```

### How It Works

1. **Primary Source**: Fetch from Airtable
2. **If empty**: Use backup data (prevents "no results" page)
3. **If error**: Use backup data (graceful degradation)
4. **If unavailable**: User sees last-cached data + fallback

### Keeping Backup Data Fresh

#### Option A: Manual Update
```bash
# When you update data in Airtable, manually copy to backup files
# Then commit to git
```

#### Option B: Automated Export (Recommended)
```bash
# Run before deploying to update all backup data
node scripts/export-airtable-data.js
```

This script:
- Fetches all data from Airtable
- Exports as TypeScript files in `/lib/data/`
- Timestamps exports for tracking
- Can be run locally or in CI/CD pipeline

---

## Performance Impact

### API Call Reduction

**Before Optimization:**
- Home: 1 API call per 24 hours = ~730 calls/year
- Missions: 1 API call per 1 hour = ~8,760 calls/year
- Ministries: 1 API call per 1 hour = ~8,760 calls/year
- Total: ~18,250 calls/year

**After Optimization:**
- Home: 1 API call per 3 days = ~122 calls/year (↓ 83%)
- Missions: 1 API call per 7 days = ~52 calls/year (↓ 99%)
- Ministries: 1 API call per 7 days = ~52 calls/year (↓ 99%)
- Total: ~226 calls/year (↓ 99%)

### Results
- **API calls reduced from 18,250 to 226 annually** (98.8% reduction)
- **Airtable API quota preserved**
- **Faster page loads** (no runtime API calls on cache hit)
- **Better reliability** (backup data fallback)

---

## When to Use Each Strategy

### Static Generation (Pre-render at Build)
**Best for**: Data that never changes or changes less than weekly
**Example**: Leadership, Ministries, Missions
**Pros**: Fastest, no runtime overhead
**Cons**: Need rebuild to update, harder to maintain
**Current Use**: `generateStaticParams` for ministry detail pages

### ISR (7+ day revalidation)
**Best for**: Data that rarely changes (monthly/quarterly)
**Example**: Missions, Ministries, Leadership
**Pros**: Balance of freshness and performance
**Cons**: Data can be stale up to 7 days
**Current Use**: Missions, Ministries, About pages

### ISR (1-3 day revalidation)
**Best for**: Data that changes weekly
**Example**: Events, Sermons
**Pros**: Reasonably fresh, minimal API overhead
**Cons**: More API calls than 7-day window
**Current Use**: Home page (3 days)

### Real-Time (Server Actions)
**Best for**: User submissions, real-time data
**Example**: Contact form, comments
**Pros**: Always current
**Cons**: API call on every action
**Current Use**: Contact form submissions

---

## Implementation Checklist

- [x] Leadership page: ISR 7 days + hardcoded backup
- [x] Missions page: ISR 7 days + hardcoded backup
- [x] Ministries list: ISR 7 days + hardcoded backup
- [x] Home/Events: ISR 3 days
- [x] About/Leadership: ISR 7 days
- [x] Export script created for backup data
- [ ] Populate missions backup data
- [ ] Populate ministries backup data
- [ ] Migrate sermons from hardcoded to Airtable fetch
- [ ] Set up CI/CD to run export script on deploy
- [ ] Add monitoring for API quota usage

---

## Updating Backup Data

### Automatic Method (Recommended)

```bash
# Run this before deploying
node scripts/export-airtable-data.js

# Commit the updated files
git add lib/data/*.ts
git commit -m "Update backup Airtable data exports"
git push
```

### Manual Method

1. Go to Airtable and copy the data you want to backup
2. Update the corresponding TypeScript file in `/lib/data/`
3. Commit and deploy

### Monitoring

Each backup file is timestamped with export date:
```typescript
// Auto-generated from Airtable on 2024-12-18T10:30:00.000Z
export const MISSIONS_DATA = [...]
```

---

## Future Optimizations

### 1. Build-Time Data Injection
- Export Airtable data during build
- Embed directly in static HTML
- Zero runtime API calls
- Requires rebuild to update

### 2. On-Demand ISR with Webhooks
- Configure Airtable webhooks to trigger revalidation
- Updates visible within seconds of change
- Requires webhook endpoint setup

### 3. Edge Caching (Vercel)
- Cache responses at Vercel's edge
- Even faster delivery globally
- Can extend ISR windows further

### 4. Database Fallback
- Store backup data in PostgreSQL/MongoDB
- More robust than file-based backups
- Enables more complex caching strategies

---

## Testing the Optimization

### Verify ISR Settings
```bash
# Check revalidate values in pages
grep -r "export const revalidate" app/

# Expected output:
# app/page.tsx: export const revalidate = 259200;        (3 days)
# app/about/page.tsx: export const revalidate = 604800;  (7 days)
# app/missions/page.tsx: export const revalidate = 604800; (7 days)
# app/ministries/page.tsx: export const revalidate = 604800; (7 days)
```

### Test Fallback Behavior
```bash
# Temporarily disable Airtable token to test fallback
# The page should still work with backup data

# Check logs for fallback messages
# "No published missions found in Airtable, using backup data"
# "Error fetching ministries from Airtable, using backup data"
```

### Monitor API Usage
- Check Airtable API token usage regularly
- Should see dramatic drop after deployment
- Verify API calls align with ISR windows

---

## Documentation Maintenance

Update this document when:
- ISR windows change
- New data sources added to Airtable
- Optimization strategies adjust
- Backup data is exported

Last Updated: 2024-12-18
