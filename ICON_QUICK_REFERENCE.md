# Icon Quick Reference Guide

## Complete Icon Mapping Table

| Current Emoji | File Path | Size | Pages Used | Priority |
|---------------|-----------|------|------------|----------|
| 📅 | `/icons/navigation/calendar-event.png` | 512x512 | homepage, events gallery | HIGH |
| ⏰ | `/icons/navigation/clock-time.png` | 512x512 | events gallery | MEDIUM |
| 📍 | `/icons/navigation/location-pin.png` | 512x512 | contact, footer, location link, missions | HIGH |
| 🙏 | `/icons/ministry/praying-hands.png` | 512x512 | homepage, events gallery | HIGH |
| 👥 | `/icons/ministry/community-people.png` | 512x512 | homepage, contact | HIGH |
| 📚 | `/icons/ministry/bible-book.png` | 512x512 | homepage, visit | HIGH |
| 📖 | `/icons/ministry/bible-book.png` | 512x512 | visit page (same as above) | HIGH |
| ⛪ | `/icons/ministry/church-building.png` | 512x512 | giving page | MEDIUM |
| 🤝 | `/icons/ministry/handshake-welcome.png` | 512x512 | visit page | MEDIUM |
| ❤️ | `/icons/ministry/heart-care.png` | 512x512 | visit page | MEDIUM |
| 📞 | `/icons/contact/phone-call.png` | 512x512 | contact, footer (2x) | HIGH |
| ✉️ | `/icons/contact/email-envelope.png` | 512x512 | contact, footer (2x), missions | HIGH |
| 💬 | `/icons/contact/message-bubble.png` | 512x512 | contact page | LOW |
| 💳 | `/icons/giving/credit-card.png` | 512x512 | giving page | MEDIUM |
| 🎤 | `/icons/media/sermon-microphone.png` | 512x512 | sermons page | MEDIUM |
| 📘 | `/icons/media/facebook-video.png` | 512x512 | sermons page | MEDIUM |
| ▶️ | `/icons/media/youtube-play.png` | 512x512 | sermons page | MEDIUM |
| 📄 | `/icons/media/powerpoint-document.png` | 512x512 | sermons page | MEDIUM |

## SVG Icons (Optional Replacements)

| Current SVG | File Path | Size | Notes |
|-------------|-----------|------|-------|
| Arrow Right | `/icons/navigation/arrow-right.png` | 128x128 | Can keep as SVG |
| Arrow Left | `/icons/navigation/arrow-left.png` | 128x128 | Can keep as SVG |
| Chevron Down | `/icons/navigation/chevron-down.png` | 128x128 | Can keep as SVG |
| Globe/World | `/icons/media/website-globe.png` | 512x512 | Missions page |
| Location Pin (SVG) | `/icons/navigation/location-pin.png` | 512x512 | Missions page |
| Envelope (SVG) | `/icons/contact/email-envelope.png` | 512x512 | Missions, ministries |
| Home/House | `/icons/contact/mailing-address.png` | 512x512 | Missions page |
| Clock (SVG) | `/icons/ministry/meeting-schedule.png` | 512x512 | Ministry detail pages |
| Cross | `/icons/values/cross-faith.png` | 512x512 | Favicon replacement |

---

## Folder Structure at a Glance

```
/public/icons/
├── navigation/
│   ├── calendar-event.png
│   ├── clock-time.png
│   ├── location-pin.png
│   ├── arrow-right.png (optional)
│   ├── arrow-left.png (optional)
│   └── chevron-down.png (optional)
│
├── contact/
│   ├── phone-call.png
│   ├── email-envelope.png
│   ├── message-bubble.png
│   └── mailing-address.png
│
├── ministry/
│   ├── praying-hands.png
│   ├── community-people.png
│   ├── bible-book.png
│   ├── church-building.png
│   ├── handshake-welcome.png
│   ├── heart-care.png
│   └── meeting-schedule.png
│
├── media/
│   ├── sermon-microphone.png
│   ├── facebook-video.png
│   ├── youtube-play.png
│   ├── powerpoint-document.png
│   └── website-globe.png
│
├── giving/
│   ├── credit-card.png
│   ├── offering-plate.png (optional)
│   └── mail-envelope-giving.png
│
└── values/
    └── cross-faith.png
```

---

## Files That Need Updating

| File Path | Icons to Replace | Imports Needed |
|-----------|------------------|----------------|
| `/app/page.tsx` | 4 emojis | `import Image from "next/image"` |
| `/app/components/EventsGallery.tsx` | 3 emojis | `import Image from "next/image"` |
| `/app/giving/page.tsx` | 3 emojis | `import Image from "next/image"` |
| `/app/contact/page.tsx` | 5 emojis | `import Image from "next/image"` |
| `/app/visit/page.tsx` | 3 emojis | `import Image from "next/image"` |
| `/app/sermons/page.tsx` | 4 emojis | Already has Image import |
| `/app/sermons/CollapsibleYearSection.tsx` | 4 emojis | `import Image from "next/image"` |
| `/app/components/Footer.tsx` | 3 emojis | `import Image from "next/image"` |
| `/app/components/LocationLink.tsx` | 1 emoji | `import Image from "next/image"` |
| `/app/missions/page.tsx` | 0 emojis, 5 SVGs | Already has Image import |
| `/app/ministries/[slug]/page.tsx` | 0 emojis, 2 SVGs | Already has Image import |

**Total Files to Update: 11**

---

## Color Palette Reference

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Sky Blue | `#0ea5e9` | `14, 165, 233` | Primary icon color |
| Sky Blue Dark | `#0284c4` | `2, 132, 196` | Gradients, hover states |
| Warm Tan | `#d2b48c` | `210, 180, 140` | Secondary accents |
| Saddle Brown | `#8b4513` | `139, 69, 19` | Earthy tones |
| White | `#ffffff` | `255, 255, 255` | Backgrounds |
| Gray 900 | `#111827` | `17, 24, 39` | Dark text |

---

## Generation Prompt Template

Use this template for each icon in Nano-Banana:

```
[ICON DESCRIPTION], minimalist flat design, sky blue (#0ea5e9) primary color,
warm tan (#d2b48c) secondary accent, rounded corners, soft drop shadow,
clean modern style, professional church website aesthetic, 512x512px,
transparent PNG background
```

**Example:**
```
Praying hands icon in profile view, minimalist flat design, sky blue (#0ea5e9)
primary color, warm tan (#d2b48c) secondary accent, rounded corners, soft drop
shadow, clean modern style, professional church website aesthetic, 512x512px,
transparent PNG background
```

---

## Typical Image Component Usage

```tsx
// Large icon (hero sections, features)
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/praying-hands.png"
    alt="Prayer"
    width={64}
    height={64}
    className="object-contain"
  />
</div>

// Medium icon (cards, sections)
<div className="relative w-12 h-12">
  <Image
    src="/icons/media/sermon-microphone.png"
    alt="Sermon"
    width={48}
    height={48}
    className="object-contain"
  />
</div>

// Small inline icon
<Image
  src="/icons/navigation/clock-time.png"
  alt="Time"
  width={20}
  height={20}
  className="object-contain inline-block"
/>

// Footer/compact
<Image
  src="/icons/contact/phone-call.png"
  alt="Phone"
  width={24}
  height={24}
  className="mt-0.5"
/>
```

---

## Step-by-Step Implementation

1. **Generate icons** using Nano-Banana with prompts from `AI_IMAGE_PROMPTS.md`
2. **Download all PNGs** and verify they're 512x512px with transparent backgrounds
3. **Organize into folders** as shown above in `/public/icons/`
4. **Test one page first** (recommend starting with homepage)
5. **Verify appearance** on desktop, tablet, and mobile
6. **Continue with remaining pages** following `ICON_IMPLEMENTATION_GUIDE.md`
7. **Run build** to ensure no errors: `npm run build`
8. **Check accessibility** with screen reader
9. **Optimize images** with TinyPNG or similar
10. **Deploy** and verify in production

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Icon too large | Reduce width/height props, add max-width class |
| Icon pixelated | Ensure source is 512x512px, use quality={100} |
| Icon not centered | Use `flex justify-center` or `mx-auto` |
| Wrong colors | Regenerate with exact hex codes |
| Inconsistent style | Regenerate all in same Nano-Banana session |
| Slow loading | Optimize with TinyPNG, use Next.js Image optimization |

---

## Testing Checklist

- [ ] Icons match color scheme (#0ea5e9, #d2b48c)
- [ ] All emojis successfully replaced
- [ ] No broken image links (check console)
- [ ] Icons visible on light backgrounds
- [ ] Icons visible on dark backgrounds (if applicable)
- [ ] Mobile sizing appropriate (not too large/small)
- [ ] Alt text present and meaningful
- [ ] Icons crisp on retina displays
- [ ] Page performance not degraded (check Lighthouse)
- [ ] Build completes without errors

---

## Estimated Time

- Icon generation (Nano-Banana): 30-45 minutes
- Download and organize: 15 minutes
- Code implementation (all 11 files): 2-3 hours
- Testing and refinement: 1 hour
- **Total: 4-5 hours**

---

## Need Help?

Reference these files:
- `AI_IMAGE_PROMPTS.md` - Complete prompts for Nano-Banana
- `ICON_IMPLEMENTATION_GUIDE.md` - Detailed code examples
- `ICON_QUICK_REFERENCE.md` - This file (overview)
