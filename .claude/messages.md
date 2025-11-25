# CFBC Website Development - Project Messages

## Project Overview
Building a professional website for Calvary Fellowship Baptist Church (CFBC) using the Web Launch Academy (WLA) methodology with Next.js, TypeScript, Tailwind CSS, and Airtable.

**Church:** Calvary Fellowship Baptist Church
**Location:** 727 Mentor Avenue, Painesville, OH 44077
**Domain:** cfbchurch.net
**Repository:** https://github.com/cfbpainesville/cfbrepo

---

## Key Objectives

1. **Attract New Members** - Create welcoming, mobile-optimized website for visitors from surrounding community
2. **Showcase Ministries** - Display all church programs and opportunities for involvement
3. **Clear Communication** - Easy access to service times, contact info, directions
4. **Church Ownership** - Full control of code (GitHub), domain, and data (Airtable)
5. **Mobile-First Design** - Many visitors will browse while on busy Mentor Avenue

---

## Important Church Information

### Leadership
- **Senior Pastor:** Doug Reeder (at CFBC since 1989, Senior Pastor since 2002)
- **Deacons:** Bill Beedie, Joe Burke, Jim Carnovale, Gene Hodgson
- **Trustees:** Dave Babuder, Doug Sabattis, Mike McKenna, George Dujanovic

### Mission Statement
"Proclaim the Good News of Jesus Christ to all people; Promote the Spiritual Growth of Believers through the study of God's Holy Word, the Bible; and Provide spiritual support through Prayer, Discipleship, and Fellowship."

### Church Character
"Small enough for you to quickly get to meet others in fellowship, but big enough to provide pertinent ministry and educational opportunities."

### Welcome Message
"If you are not greeted by at least three people, then we haven't done what's right, and I wouldn't expect you to come back."

---

## Weekly Schedule

**Sunday:**
- 10:00 AM - Sunday School
- 11:00 AM - Morning Worship
- 5:30 PM - AWANA, 727 Ministry, Adult Bible Study

**Wednesday:**
- 10:00 AM - Ladies Bible Study (Fellowship Hall, open to any woman)

**Thursday:**
- 10:00 AM - 2:00 PM - Helping Hands Food Pantry (open to public)
- 7:00 PM - Men's Bible Study

---

## Ministries Summary

### Children's Ministry
- Cubbies (4-5 years, parent accompanied)
- Sparks (K-2nd grade)
- Truth and Training/T&T (Grades 3-6)
- Sunday School (Nursery through 6th grade, 10-11 AM)
- Children's Church (Nursery, Toddler, Junior)
- AWANA (Bible-based, ages 4-6th grade, Sundays 5:30-7:00 PM)

### Adult Ministries
- Adult Bible Fellowships (ABF) - Small groups, Sundays 10-11 AM
- 727 Ministry - Student ministry, Sundays 5:30 PM

### Women's Ministries
- Women's Bible Study (Wednesdays 10 AM-12 PM)
- Secret Sister (Prayer and relationship building)
- Bereavement Dinners
- Showers (Baby & Wedding)
- Contact: Tracy Carnovale (Showers)

### Men's Ministries
- CFBC Fraternity (Monthly, authentic manhood development)
- Men's Bible Study (Thursdays 7 PM)

### Community Service
- **Helping Hands Food Pantry** - Thursdays 10 AM-12 PM, open to public
- Provides non-perishable food once/month per person
- Contact: Bonnie Tillery

### Music Ministry
- Blend of contemporary and traditional worship
- Goal: Prepare hearts for Holy Spirit and God's Word
- Part of 11 AM Sunday Worship

---

## Development Phases

### Phase 1: Foundation ✓
- GitHub repository setup (cfbrepo)
- Next.js + TypeScript initialization
- Environment configuration
- Claude settings files (config.json, messages.md)

### Phase 2: Core Pages
- Homepage with hero, welcome message, CTAs
- About page (mission, history, pastor bio)
- Visit Us page (service times, directions, first-time visitor guide)
- Contact page with form
- Layout components (header, footer, navigation)

### Phase 3: Airtable Integration
- Set up Airtable base (CFBC Website)
- Create tables: Events, Leadership, Ministries, Blog Posts, Contact Forms, Sermons
- Generate API key and environment variables
- Build API routes for data fetching
- Create data-fetching components

### Phase 4: Dynamic Pages
- Dynamic ministry pages (/ministries/[slug])
- Dynamic leader profiles (/leadership/[slug])
- Dynamic blog posts (/blog/[slug])
- Events/Calendar page with filtering
- Search functionality

### Phase 5: Forms & Submissions
- Contact form component (client + server action)
- Form validation
- Airtable submission integration
- Email notifications (optional)

### Phase 6: Giving Integration
- Stripe account setup
- Donation page
- Payment form implementation
- Transaction testing

### Phase 7: Design & Responsiveness
- Tailwind CSS styling
- Mobile-first responsive design
- Accessibility optimization
- Cross-device testing

### Phase 8: Deployment
- Vercel connection
- Environment variables in Vercel
- Custom domain configuration
- DNS setup at Namecheap
- Live site testing

### Phase 9: Optimization & Launch
- Image optimization
- Analytics setup (optional)
- Final QA testing
- SEO optimization & sitemap
- Search engine submission

---

## Technical Notes

- **TypeScript:** Full type safety for better developer experience
- **Tailwind CSS:** Utility-first CSS for rapid styling
- **Next.js App Router:** Modern routing with Server Components
- **Airtable:** Simple CMS for non-technical church staff updates
- **Vercel:** Automatic deployments from GitHub
- **Stripe:** Secure online giving integration

---

## Contact Information

**Church**
- Phone: (440) 354-8994
- Fax: (440) 354-3301
- Email: info@cfbchurch.net
- Address: 727 Mentor Avenue, Painesville, OH 44077

**Key Ministry Contacts**
- Tracy Carnovale - Women's Ministry (Showers)
- Bonnie Tillery - Helping Hands Food Pantry

---

## Last Updated
- Initial setup: Phase 1 Foundation Complete
- Next: Phase 2 - Core Pages Development
