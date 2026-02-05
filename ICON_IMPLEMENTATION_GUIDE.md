# Icon Implementation Guide
## How to Replace Emojis with AI-Generated Icons

---

## QUICK START

After receiving icons from Nano-Banana:

1. Place all PNG files in `/public/icons/` organized by subfolder
2. Import Next.js `Image` component where needed
3. Replace emoji text with `<Image>` components
4. Verify sizing and alignment
5. Test on mobile devices

---

## FILE-BY-FILE IMPLEMENTATION

### 1. HOME PAGE (`/app/page.tsx`)

**Icons needed:**
- `/public/icons/navigation/calendar-event.png`
- `/public/icons/ministry/praying-hands.png`
- `/public/icons/ministry/community-people.png`
- `/public/icons/ministry/bible-book.png`

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// LINE 46: Replace event emoji
// BEFORE:
image: "📅",

// AFTER:
image: "/icons/navigation/calendar-event.png",

// LINES 134-135: Replace praying hands emoji
// BEFORE:
<div className="text-5xl mb-4">🙏</div>
<h3 className="text-2xl font-bold mb-3">Strong Faith</h3>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/praying-hands.png"
    alt="Praying hands"
    width={64}
    height={64}
    className="object-contain"
  />
</div>
<h3 className="text-2xl font-bold mb-3">Strong Faith</h3>

// LINES 148-149: Replace people emoji
// BEFORE:
<div className="text-5xl mb-4">👥</div>
<h3 className="text-2xl font-bold mb-3">Real Community</h3>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/community-people.png"
    alt="Community"
    width={64}
    height={64}
    className="object-contain"
  />
</div>
<h3 className="text-2xl font-bold mb-3">Real Community</h3>

// LINES 162-163: Replace books emoji
// BEFORE:
<div className="text-5xl mb-4">📚</div>
<h3 className="text-2xl font-bold mb-3">Spiritual Growth</h3>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/bible-book.png"
    alt="Bible study"
    width={64}
    height={64}
    className="object-contain"
  />
</div>
<h3 className="text-2xl font-bold mb-3">Spiritual Growth</h3>
```

---

### 2. EVENTS GALLERY (`/app/components/EventsGallery.tsx`)

**Icons needed:**
- `/public/icons/ministry/praying-hands.png`
- `/public/icons/navigation/calendar-event.png`
- `/public/icons/navigation/clock-time.png`

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// LINE 49: Replace initial event emoji
// BEFORE:
image: "🙏",

// AFTER:
image: "/icons/ministry/praying-hands.png",

// LINE 166: Replace default event emoji
// BEFORE:
image: event.image || "📅",

// AFTER:
image: event.image || "/icons/navigation/calendar-event.png",

// Update render to use Image component instead of emoji text
// AROUND LINE 203-210: Replace emoji rendering
// BEFORE:
<div className="text-6xl mb-4">{currentEvent.image}</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src={currentEvent.image}
    alt={currentEvent.name}
    width={80}
    height={80}
    className="object-contain"
  />
</div>

// LINE 182: Replace clock emoji
// BEFORE:
<div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
  <span>⏰</span>
  <span className="font-medium">{displayTime}</span>
</div>

// AFTER:
<div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
  <Image
    src="/icons/navigation/clock-time.png"
    alt="Time"
    width={20}
    height={20}
    className="object-contain"
  />
  <span className="font-medium">{displayTime}</span>
</div>
```

---

### 3. GIVING PAGE (`/app/giving/page.tsx`)

**Icons needed:**
- `/public/icons/giving/credit-card.png`
- `/public/icons/ministry/church-building.png`
- `/public/icons/giving/mail-envelope-giving.png`

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// LINES 47-48: Replace credit card emoji
// BEFORE:
<div className="text-5xl mb-4">💳</div>
<h3 className="text-2xl font-bold text-gray-900 mb-3">

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/giving/credit-card.png"
    alt="Credit card"
    width={64}
    height={64}
    className="object-contain"
  />
</div>
<h3 className="text-2xl font-bold text-gray-900 mb-3">

// LINES 66-67: Replace church emoji
// BEFORE:
<div className="text-5xl mb-4">⛪</div>
<h3 className="text-2xl font-bold text-gray-900 mb-3">

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/church-building.png"
    alt="Church building"
    width={64}
    height={64}
    className="object-contain"
  />
</div>
<h3 className="text-2xl font-bold text-gray-900 mb-3">

// LINES 82-83: Replace envelope emoji
// BEFORE:
<div className="text-5xl mb-4">✉️</div>
<h3 className="text-2xl font-bold text-gray-900 mb-3">

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/giving/mail-envelope-giving.png"
    alt="Mail"
    width={64}
    height={64}
    className="object-contain"
  />
</div>
<h3 className="text-2xl font-bold text-gray-900 mb-3">
```

---

### 4. CONTACT PAGE (`/app/contact/page.tsx`)

**Icons needed:**
- `/public/icons/contact/phone-call.png`
- `/public/icons/contact/email-envelope.png`
- `/public/icons/navigation/location-pin.png`
- `/public/icons/contact/message-bubble.png`
- `/public/icons/ministry/community-people.png`

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// LINE 71: Phone icon
// BEFORE:
<div className="text-5xl mb-4">📞</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/contact/phone-call.png"
    alt="Phone"
    width={64}
    height={64}
    className="object-contain"
  />
</div>

// LINE 86: Email icon
// BEFORE:
<div className="text-5xl mb-4">✉️</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/contact/email-envelope.png"
    alt="Email"
    width={64}
    height={64}
    className="object-contain"
  />
</div>

// LINE 104: Location icon
// BEFORE:
<div className="text-5xl mb-4">📍</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/navigation/location-pin.png"
    alt="Location"
    width={64}
    height={64}
    className="object-contain"
  />
</div>

// LINE 121: Message icon
// BEFORE:
<div className="text-5xl mb-4">💬</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/contact/message-bubble.png"
    alt="Message"
    width={64}
    height={64}
    className="object-contain"
  />
</div>

// LINE 332: Team icon
// BEFORE:
<div className="text-4xl mb-4">👥</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/community-people.png"
    alt="Team"
    width={56}
    height={56}
    className="object-contain"
  />
</div>
```

---

### 5. VISIT PAGE (`/app/visit/page.tsx`)

**Icons needed:**
- `/public/icons/ministry/handshake-welcome.png`
- `/public/icons/ministry/bible-book.png`
- `/public/icons/ministry/heart-care.png`

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// LINE 142: Handshake
// BEFORE:
<div className="text-5xl mb-4">🤝</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/handshake-welcome.png"
    alt="Welcome"
    width={64}
    height={64}
    className="object-contain"
  />
</div>

// LINE 153: Bible
// BEFORE:
<div className="text-5xl mb-4">📖</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/bible-book.png"
    alt="Bible"
    width={64}
    height={64}
    className="object-contain"
  />
</div>

// LINE 164: Heart
// BEFORE:
<div className="text-5xl mb-4">❤️</div>

// AFTER:
<div className="mb-4 flex justify-center">
  <Image
    src="/icons/ministry/heart-care.png"
    alt="Love and care"
    width={64}
    height={64}
    className="object-contain"
  />
</div>
```

---

### 6. SERMONS PAGE (`/app/sermons/page.tsx`)

**Icons needed:**
- `/public/icons/media/facebook-video.png`
- `/public/icons/media/youtube-play.png`
- `/public/icons/media/powerpoint-document.png`
- `/public/icons/media/sermon-microphone.png`

**Changes:**

```tsx
// Add import at top (if not already there)
import Image from "next/image";

// Update the getIconForType function (around LINE 15-27)
// BEFORE:
const getIconForType = (type: string) => {
  switch (type) {
    case 'facebook':
      return '📘';
    case 'youtube':
      return '▶️';
    case 'powerpoint':
      return '📄';
    default:
      return '🎤';
  }
};

// AFTER:
const getIconForType = (type: string) => {
  switch (type) {
    case 'facebook':
      return '/icons/media/facebook-video.png';
    case 'youtube':
      return '/icons/media/youtube-play.png';
    case 'powerpoint':
      return '/icons/media/powerpoint-document.png';
    default:
      return '/icons/media/sermon-microphone.png';
  }
};

// Update the rendering (find where icon is displayed, likely around LINE 95-100)
// BEFORE:
<div className="text-3xl">{getIconForType(sermon.type)}</div>

// AFTER:
<div className="relative w-12 h-12">
  <Image
    src={getIconForType(sermon.type)}
    alt={sermon.type}
    width={48}
    height={48}
    className="object-contain"
  />
</div>
```

---

### 7. COLLAPSIBLE YEAR SECTION (`/app/sermons/CollapsibleYearSection.tsx`)

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// Similar changes to getIconForType and rendering as sermons/page.tsx
// Update icon paths to use /icons/media/ directory
```

---

### 8. FOOTER (`/app/components/Footer.tsx`)

**Icons needed:**
- `/public/icons/navigation/location-pin.png`
- `/public/icons/contact/phone-call.png`
- `/public/icons/contact/email-envelope.png`

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// LINE 28: Location icon (in LocationLink - may need to update that component)
// LINE 35: Phone icon
// BEFORE:
<div className="flex items-start space-x-3 mb-3">
  <span className="text-xl">📞</span>
  <div>

// AFTER:
<div className="flex items-start space-x-3 mb-3">
  <Image
    src="/icons/contact/phone-call.png"
    alt="Phone"
    width={24}
    height={24}
    className="mt-0.5"
  />
  <div>

// LINE 40: Email icon
// BEFORE:
<div className="flex items-start space-x-3 mb-3">
  <span className="text-xl">✉️</span>
  <a

// AFTER:
<div className="flex items-start space-x-3 mb-3">
  <Image
    src="/icons/contact/email-envelope.png"
    alt="Email"
    width={24}
    height={24}
    className="mt-0.5"
  />
  <a

// Repeat for second contact info section (LINES 174, 182)
```

---

### 9. LOCATION LINK (`/app/components/LocationLink.tsx`)

**Icons needed:**
- `/public/icons/navigation/location-pin.png`

**Changes:**

```tsx
// Add import at top
import Image from "next/image";

// LINE 16: Location pin
// BEFORE:
📍 400 Walnut Avenue

// AFTER:
<span className="inline-flex items-center gap-1">
  <Image
    src="/icons/navigation/location-pin.png"
    alt=""
    width={16}
    height={16}
    className="inline-block"
  />
  400 Walnut Avenue
</span>
```

---

### 10. FAVICON (`/app/icon.svg`)

**Icon needed:**
- `/public/icons/values/cross-faith.png`

**Changes:**

1. Create new file: `/app/icon.png`
2. Use the generated cross-faith.png image
3. Resize to 32x32px and 16x16px versions
4. Next.js will automatically use icon.png if it exists

**OR** keep the existing SVG if you prefer vector favicon

---

## SIZING GUIDE

| Context | Width/Height | Notes |
|---------|--------------|-------|
| Hero sections | 64-80px | Large, prominent icons |
| Card headers | 48-64px | Medium-sized features |
| Inline icons | 20-24px | Small icons within text |
| List items | 16-20px | Compact inline usage |
| Footer | 24px | Balance with text size |

---

## RESPONSIVE CONSIDERATIONS

```tsx
// For responsive icons, use className with Tailwind:
<Image
  src="/icons/..."
  alt="..."
  width={64}
  height={64}
  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
/>
```

---

## ACCESSIBILITY

Always include meaningful alt text:

```tsx
// GOOD:
<Image src="/icons/contact/phone-call.png" alt="Call us" width={24} height={24} />

// GOOD (decorative):
<Image src="/icons/ministry/praying-hands.png" alt="" width={64} height={64} />
<h3>Strong Faith</h3> {/* Text already describes icon */}

// BAD:
<Image src="/icons/contact/phone-call.png" alt="icon" width={24} height={24} />
```

---

## TESTING CHECKLIST

After implementation:

- [ ] All emojis replaced with Image components
- [ ] Icons load correctly on all pages
- [ ] Mobile responsive sizing works
- [ ] Alt text added for accessibility
- [ ] No broken image links
- [ ] Icons maintain visual consistency
- [ ] Dark mode appearance (if applicable)
- [ ] Page load performance acceptable
- [ ] Icons crisp on retina displays

---

## OPTIONAL: Create Reusable Icon Component

For cleaner code, create `/app/components/Icon.tsx`:

```tsx
import Image from "next/image";

interface IconProps {
  name: string;
  alt?: string;
  size?: number;
  className?: string;
}

export default function Icon({ name, alt = "", size = 24, className = "" }: IconProps) {
  return (
    <Image
      src={`/icons/${name}.png`}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
```

**Usage:**
```tsx
<Icon name="contact/phone-call" alt="Phone" size={24} />
<Icon name="ministry/praying-hands" alt="Prayer" size={64} />
```

This makes future updates easier and code more maintainable!
