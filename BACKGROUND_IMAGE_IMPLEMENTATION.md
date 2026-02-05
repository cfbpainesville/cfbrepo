# Background Image Implementation Guide
## Where and How to Use Artistic Images

---

## QUICK IMPLEMENTATION REFERENCE

### Hero Section Pattern

```tsx
<section
  className="relative bg-cover bg-center py-20 px-4"
  style={{
    backgroundImage: "url('/images/backgrounds/homepage-hero.jpg')",
  }}
>
  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
    <h1 className="text-5xl font-bold mb-6">Welcome to Calvary Fellowship</h1>
    <p className="text-xl">Join us for worship this Sunday</p>
  </div>
</section>
```

### Card Background Pattern

```tsx
<div className="relative overflow-hidden rounded-lg shadow-lg h-64">
  <Image
    src="/images/cards/praying-hands-card.jpg"
    alt="Prayer ministry"
    fill
    className="object-cover"
    quality={85}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
    <h3 className="text-2xl font-bold mb-2">Prayer Ministry</h3>
    <p>Join us in prayer every Wednesday</p>
  </div>
</div>
```

---

## PAGE-BY-PAGE IMPLEMENTATION

### 1. HOMEPAGE (`/app/page.tsx`)

#### Current Hero Section (Lines ~60-75)
**Replace:** Plain gradient background
**With:** `homepage-hero.jpg` or `worship-hero.jpg`

```tsx
// BEFORE:
<section className="hero-gradient py-20 px-4">

// AFTER:
<section
  className="relative bg-cover bg-center py-20 px-4 min-h-[500px]"
  style={{
    backgroundImage: "url('/images/backgrounds/homepage-hero.jpg')",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 to-sky-600/50"></div>
  <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
    {/* Existing content - text will be white now */}
  </div>
</section>
```

**Alternative images:**
- `worship-hero.jpg` - More energetic worship focus
- `open-bible-light.jpg` - Teaching/learning focus
- `sunrise-hope.jpg` - New beginnings theme

---

#### "Why Visit" Section (Lines ~130-175)
**Current:** Plain white background with emoji icons
**Enhancement:** Add card images behind each feature

```tsx
// Update each feature card:
<div className="relative bg-white p-8 rounded-lg shadow-md overflow-hidden">
  {/* Background image */}
  <div className="absolute inset-0 opacity-10">
    <Image
      src="/images/cards/praying-hands-card.jpg"
      alt=""
      fill
      className="object-cover"
    />
  </div>

  {/* Content on top */}
  <div className="relative z-10">
    <div className="mb-4 flex justify-center">
      <Image src="/icons/ministry/praying-hands.png" alt="Prayer" width={64} height={64} />
    </div>
    <h3 className="text-2xl font-bold mb-3">Strong Faith</h3>
    <p>We are committed to biblical teaching...</p>
  </div>
</div>
```

**Images by feature:**
- Strong Faith → `praying-hands-card.jpg` or `cross-light-rays.jpg`
- Real Community → `community-background.jpg` or `helping-hands.jpg`
- Spiritual Growth → `open-bible-light.jpg` or `pathway-light.jpg`

---

#### Service Times Section
**Add:** Subtle background texture

```tsx
<section className="py-16 px-4 relative">
  {/* Background image with heavy overlay */}
  <div
    className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: "url('/images/backgrounds/wood-texture-light.jpg')",
    }}
  ></div>

  {/* Existing content */}
  <div className="relative z-10">
    {/* Service times content */}
  </div>
</section>
```

---

### 2. ABOUT PAGE (`/app/about/page.tsx`)

#### Hero Section (Lines ~64-72)
**Replace:** Solid blue gradient
**With:** `about-hero.jpg` or `community-background.jpg`

```tsx
// BEFORE:
<section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">

// AFTER:
<section
  className="relative bg-cover bg-center text-white py-16 px-4 min-h-[400px]"
  style={{
    backgroundImage: "url('/images/backgrounds/about-hero.jpg')",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-700/60"></div>
  <div className="relative z-10 max-w-4xl mx-auto">
    <h1 className="text-5xl font-bold mb-4">About Calvary Fellowship</h1>
    <p className="text-xl text-blue-100">...</p>
  </div>
</section>
```

---

#### History Section (Lines ~116-153)
**Add:** Vintage texture background

```tsx
<section className="py-16 px-4 bg-white relative">
  <div
    className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: "url('/images/backgrounds/stone-foundation.jpg')",
    }}
  ></div>

  <div className="relative z-10 max-w-4xl mx-auto">
    {/* History content */}
  </div>
</section>
```

**Image options:**
- `stone-foundation.jpg` - Symbolizes solid foundation
- `wood-texture-light.jpg` - Warm, traditional feel

---

#### Pastor Section (Lines ~157-228)
**Add:** Subtle background behind pastor bio

```tsx
<div className="bg-white rounded-lg shadow-md p-8 mb-8 relative overflow-hidden">
  {/* Subtle background */}
  <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
    <Image
      src="/images/ministry/music-worship.jpg"
      alt=""
      fill
      className="object-cover"
    />
  </div>

  <div className="relative z-10">
    {/* Pastor content */}
  </div>
</div>
```

---

### 3. VISIT PAGE (`/app/visit/page.tsx`)

#### Hero Section
**Replace:** Plain gradient
**With:** `worship-hero.jpg` or `family-church.jpg`

```tsx
<section
  className="relative bg-cover bg-center text-white py-20 px-4 min-h-[500px]"
  style={{
    backgroundImage: "url('/images/backgrounds/family-church.jpg')",
  }}
>
  <div className="absolute inset-0 bg-blue-900/60"></div>
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h1>Plan Your Visit</h1>
    {/* ... */}
  </div>
</section>
```

---

#### What to Expect Section (Lines ~140-175)
**Add:** Background images to feature cards

```tsx
{/* Genuine Welcome */}
<div className="relative rounded-lg overflow-hidden shadow-lg h-80">
  <Image
    src="/images/cards/helping-hands.jpg"
    alt="Welcoming hands"
    fill
    className="object-cover"
    quality={85}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 via-sky-600/50 to-transparent"></div>
  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
    <div className="text-5xl mb-4">🤝</div>
    <h3 className="text-2xl font-bold mb-3">Genuine Welcome</h3>
    <p>From the moment you arrive...</p>
  </div>
</div>
```

**Images by feature:**
- Genuine Welcome → `helping-hands.jpg` or `family-church.jpg`
- Bible-Centered → `open-bible-light.jpg`
- Community Minded → `community-background.jpg` or `worship-hands-light.jpg`

---

### 4. MINISTRIES PAGE (`/app/ministries/page.tsx`)

#### Hero Section (Lines ~124-136)
**Replace:** Plain gradient
**With:** Ministry-appropriate background

```tsx
<section
  className="relative bg-cover bg-center py-20 px-4 min-h-[400px]"
  style={{
    backgroundImage: "url('/images/backgrounds/community-background.jpg')",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 to-sky-600/60"></div>
  <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Ministries</h1>
    <p className="text-xl md:text-2xl max-w-3xl mx-auto">...</p>
  </div>
</section>
```

---

#### Ministry Cards
**Add:** Background images specific to each ministry

```tsx
// Example: AWANA ministry card
<Link
  href="/ministries/awana"
  className="block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all group h-96"
>
  {/* Background image */}
  <Image
    src="/images/ministry/childrens-ministry.jpg"
    alt="AWANA"
    fill
    className="object-cover group-hover:scale-105 transition-transform duration-300"
  />

  {/* Dark gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

  {/* Content */}
  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
    <h3 className="text-2xl font-bold mb-3">AWANA</h3>
    <span className="inline-block px-3 py-1 bg-sky-600 text-white text-sm font-semibold rounded-full mb-3 self-start">
      Ages K through 6th grade
    </span>
    <p className="mb-4 leading-relaxed">AWANA is a school year ministry...</p>
  </div>
</Link>
```

**Images by ministry:**
- AWANA → `childrens-ministry.jpg`
- 727 Student Ministry → `youth-group.jpg`
- Adult Bible Fellowship → `senior-fellowship.jpg` or `open-bible-light.jpg`
- Women's Ministry → `womens-ministry.jpg`
- Men's Fraternity → `mens-ministry.jpg`
- Music Ministry → `music-worship.jpg`
- Prayer Ministry → `prayer-background.jpg` or `praying-hands-card.jpg`
- Children's Church → `childrens-ministry.jpg`
- Food Pantry → `helping-hands.jpg`
- Bible Study Fellowship → `open-bible-light.jpg`

---

### 5. MINISTRY DETAIL PAGE (`/app/ministries/[slug]/page.tsx`)

#### Hero Section (Lines ~95-122)
**Replace:** Plain gradient
**With:** Ministry-specific image

```tsx
<section
  className="relative bg-cover bg-center py-20 px-4 min-h-[400px]"
  style={{
    backgroundImage: `url('/images/ministry/${ministry.Slug}.jpg')`,
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-sky-900/80 to-sky-700/70"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-white">
    <Link href="/ministries" className="inline-flex items-center mb-6">
      {/* Back button */}
    </Link>

    <h1 className="text-5xl md:text-6xl font-bold mb-6">
      {ministry["Ministry Name"]}
    </h1>

    {ministry["Age/Group Target"] && (
      <div className="mb-6">
        <span className="inline-block px-4 py-2 bg-white/90 text-sky-800 text-lg font-semibold rounded-full shadow-md">
          {ministry["Age/Group Target"]}
        </span>
      </div>
    )}
  </div>
</section>
```

**Create mapping object:**
```tsx
const ministryImages: Record<string, string> = {
  'awana': '/images/ministry/childrens-ministry.jpg',
  '727-student-ministry': '/images/ministry/youth-group.jpg',
  'adult-bible-fellowship': '/images/ministry/senior-fellowship.jpg',
  'womens-ministry': '/images/ministry/womens-ministry.jpg',
  'mens-ministry': '/images/ministry/mens-ministry.jpg',
  'music-ministry': '/images/ministry/music-worship.jpg',
  'prayer-ministry': '/images/cards/praying-hands-card.jpg',
  'childrens-church': '/images/ministry/childrens-ministry.jpg',
  'helping-hands-food-pantry': '/images/cards/helping-hands.jpg',
};

const backgroundImage = ministryImages[ministry.Slug || ''] || '/images/backgrounds/community-background.jpg';
```

---

### 6. MISSIONS PAGE (`/app/missions/page.tsx`)

#### Hero Section (Lines ~239-252)
**Replace:** Plain gradient
**With:** `missions-world.jpg` or `cross-sunset.jpg`

```tsx
<section
  className="relative bg-cover bg-center py-20 px-4 min-h-[400px]"
  style={{
    backgroundImage: "url('/images/ministry/missions-world.jpg')",
  }}
>
  <div className="absolute inset-0 bg-sky-900/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto text-center text-white">
    <h1 className="text-5xl md:text-6xl font-bold mb-6">
      Our Missionaries
    </h1>
    <p className="text-xl md:text-2xl max-w-3xl mx-auto">...</p>
  </div>
</section>
```

---

### 7. SERMONS PAGE (`/app/sermons/page.tsx`)

#### Hero Section
**Add:** Background image

```tsx
<section
  className="relative bg-cover bg-center py-20 px-4 min-h-[400px]"
  style={{
    backgroundImage: "url('/images/cards/open-bible-light.jpg')",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-800/70"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
    <h1 className="text-5xl font-bold mb-6">Sermons</h1>
    <p className="text-xl">Messages from God's Word</p>
  </div>
</section>
```

---

#### Featured Sermon Card (Lines ~47-79)
**Add:** Background image

```tsx
<div className="relative overflow-hidden rounded-lg shadow-xl h-96">
  <Image
    src="/images/ministry/music-worship.jpg"
    alt="Worship"
    fill
    className="object-cover"
    quality={90}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>

  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
    <div className="text-sm font-semibold text-sky-400 mb-2">LATEST SERMON</div>
    <h2 className="text-3xl font-bold mb-3">{sermon.Title}</h2>
    <p className="text-lg mb-2">{sermon["Pastor/Speaker Name"]}</p>
    <p className="text-sm text-gray-300 mb-4">{formatDate(sermon.Date)}</p>
    {/* Watch Now button */}
  </div>
</div>
```

---

### 8. GIVING PAGE (`/app/giving/page.tsx`)

#### Hero Section
**Replace:** Plain gradient
**With:** Background image

```tsx
<section
  className="relative bg-cover bg-center py-20 px-4 min-h-[400px]"
  style={{
    backgroundImage: "url('/images/backgrounds/wheat-field.jpg')",
  }}
>
  <div className="absolute inset-0 bg-sky-900/75"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
    <h1 className="text-5xl font-bold mb-6">Give</h1>
    <p className="text-xl">Supporting God's work through Calvary Fellowship</p>
  </div>
</section>
```

**Alternative images:**
- `wheat-field.jpg` - Harvest/abundance theme
- `helping-hands.jpg` - Service/support theme

---

### 9. CONTACT PAGE (`/app/contact/page.tsx`)

#### Hero Section
**Add:** Background image

```tsx
<section
  className="relative bg-cover bg-center py-20 px-4 min-h-[400px]"
  style={{
    backgroundImage: "url('/images/backgrounds/community-background.jpg')",
  }}
>
  <div className="absolute inset-0 bg-sky-900/70"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
    <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
    <p className="text-xl">We'd love to hear from you</p>
  </div>
</section>
```

---

## SEASONAL IMPLEMENTATION

### Christmas Season (November - December)

Replace hero backgrounds temporarily:
- Homepage → `christmas-nativity.jpg`
- About → Keep standard
- Visit → `christmas-nativity.jpg`

### Easter Season (Lent - Easter)

Replace hero backgrounds temporarily:
- Homepage → `cross-sunset.jpg` or `easter-empty-tomb.jpg`
- About → Keep standard
- Visit → `cross-light-rays.jpg`

### Implementation:
```tsx
const getCurrentSeasonImage = () => {
  const month = new Date().getMonth(); // 0-11

  if (month >= 10 || month === 0) {
    // November, December, January
    return '/images/sections/christmas-nativity.jpg';
  } else if (month >= 2 && month <= 4) {
    // March, April, May (Lent/Easter season)
    return '/images/sections/easter-empty-tomb.jpg';
  } else if (month === 8) {
    // September (Back to School)
    return '/images/sections/back-to-school.jpg';
  } else if (month === 10) {
    // November (Thanksgiving)
    return '/images/sections/thanksgiving-harvest.jpg';
  }

  return '/images/backgrounds/homepage-hero.jpg'; // Default
};
```

---

## PERFORMANCE OPTIMIZATION

### 1. Use Next.js Image Component with Priority

```tsx
<div className="relative h-96 w-full">
  <Image
    src="/images/backgrounds/homepage-hero.jpg"
    alt="Hero background"
    fill
    className="object-cover"
    priority // Load immediately for above-fold images
    quality={85}
    sizes="100vw"
  />
</div>
```

### 2. Lazy Load Below-Fold Images

```tsx
<div className="relative h-96 w-full">
  <Image
    src="/images/ministry/youth-group.jpg"
    alt="Youth ministry"
    fill
    className="object-cover"
    loading="lazy" // Lazy load for below-fold
    quality={80}
  />
</div>
```

### 3. Provide Multiple Formats

```tsx
// Create WebP versions alongside JPG
// Next.js will automatically serve WebP to supporting browsers
/images/backgrounds/homepage-hero.jpg
/images/backgrounds/homepage-hero.webp
```

### 4. Responsive Images

```tsx
<Image
  src="/images/backgrounds/homepage-hero.jpg"
  alt="Hero"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
  quality={85}
/>
```

---

## ACCESSIBILITY CONSIDERATIONS

### 1. Always Use Alt Text

```tsx
// Decorative background (empty alt)
<Image src="/images/backgrounds/wood-texture.jpg" alt="" fill />

// Meaningful image
<Image src="/images/cards/praying-hands.jpg" alt="Hands folded in prayer" fill />
```

### 2. Ensure Text Contrast

```tsx
// Use dark overlay for light images
<div className="absolute inset-0 bg-black/50"></div>

// Use light overlay for dark images
<div className="absolute inset-0 bg-white/30"></div>
```

### 3. Provide Text Alternatives

```tsx
<section className="relative" aria-label="About our church">
  <Image src="..." alt="" fill /> {/* Decorative */}
  <div className="relative z-10">
    <h2>About Calvary Fellowship</h2> {/* Text provides context */}
    <p>...</p>
  </div>
</section>
```

---

## TESTING CHECKLIST

- [ ] All images load correctly on desktop
- [ ] All images load correctly on mobile
- [ ] Text is readable over all background images
- [ ] Contrast ratio meets WCAG AA standards (4.5:1 minimum)
- [ ] Images optimized (under 200KB for heroes, under 100KB for cards)
- [ ] WebP versions created for modern browsers
- [ ] Lazy loading implemented for below-fold images
- [ ] Priority loading for above-fold hero images
- [ ] Alt text provided where appropriate
- [ ] No layout shift (CLS) when images load
- [ ] Images look good on all screen sizes (mobile, tablet, desktop)
- [ ] Seasonal images rotate correctly (if implemented)

---

## FILE SIZE TARGETS

| Image Type | Target Size | Max Size | Notes |
|------------|-------------|----------|-------|
| Hero background (1920x1080) | 100-150KB | 250KB | High compression acceptable |
| Card image (1200x800) | 50-80KB | 150KB | Balance quality and speed |
| Texture background | 30-50KB | 100KB | Can be heavily compressed |
| Ministry photo | 60-100KB | 200KB | Keep faces recognizable |

Use tools: TinyJPG, Squoosh, ImageOptim

---

This implementation will transform the website from a flat, icon-based design to a rich, immersive visual experience while maintaining excellent performance and accessibility.
