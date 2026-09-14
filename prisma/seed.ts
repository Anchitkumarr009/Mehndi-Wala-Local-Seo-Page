import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with locality pages...");

  // Clean existing records
  await prisma.localityInterlink.deleteMany({});
  await prisma.faq.deleteMany({});
  await prisma.localityPage.deleteMany({});

  // 1. Anand Vihar Page (Matches screen.png exactly)
  const anandVihar = await prisma.localityPage.create({
    data: {
      country: "india",
      city: "delhi",
      district: "east-delhi",
      locality: "anand-vihar",
      countryLabel: "India",
      cityLabel: "Delhi",
      districtLabel: "East Delhi",
      localityLabel: "Anand Vihar",
      metaTitle: "Mehndi Artist in Anand Vihar, East Delhi | Verified Henna Booking",
      metaDescription:
        "Book verified mehndi artists in Anand Vihar, East Delhi. Upfront locked pricing, organic henna paste, on-time arrival guarantee near ISBT & Railway Station.",
      h1: "Mehndi Artist in Anand Vihar: A No-Stress Way to Book for Your Next Function",
      dek: "Why finding a trusted, verified henna artist near Anand Vihar ISBT & Railway Station doesn't have to be a last-minute WhatsApp scramble.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1599818816933-289d0c64bead?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Traditional Bridal Mehndi Artistry • Anand Vihar Celebrations",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-15"),
      readTime: "11 min read",
      ratingValue: 4.8,
      reviewCount: 214,
      streetAddress: "Vikas Marg Extension, Anand Vihar",
      latitude: 28.6469,
      longitude: 77.3164,
      priceGuest: "₹250 - ₹500",
      priceParty: "₹1,000 - ₹3,500",
      priceBridal: "₹5,000 - ₹15,000",
      priceDisclaimer: "(Prices vary by travel time/agreed upfront before booking)",
      bodyHtml: `

<p>Anand Vihar isn't like most East Delhi neighbourhoods. Between the ISBT, the railway station, and how many families here are constantly hosting relatives passing through or settling in for a function, life moves fast — and that's exactly why booking something as personal as mehndi often gets left till the last minute.</p>
<p>Sound familiar? You're three days out from an engagement or a Karwa Chauth get-together, and suddenly you're scrolling through old WhatsApp chats trying to find <em>"that mehndi didi from last year"</em> — except she's changed her number, or she's fully booked, or she's simply stopped replying because she's swamped.</p>

<div class="custom-callout">
  <div class="callout-kicker">THE REALITY ON THE GROUND</div>
  <p>You don't lack good mehndi artists; it's that finding one who's actually free, actually good, and actually upfront about pricing takes more effort than it should.</p>
</div>

<h2>The Real Problem With Booking Mehndi Locally</h2>
<p>Ask anyone in Anand Vihar how they usually find a mehndi artist, and you'll hear some version of the same story: a neighbour's recommendation, an old visiting card, or a random Instagram page with a few reels and no way to actually check availability.</p>
<p>This creates a few very common headaches:</p>

<div class="custom-problem-grid">
  <div class="custom-problem-card">
    <div class="problem-num">1</div>
    <h4>Design Scope Ambiguity</h4>
    <p>You don't know if the artist does simple designs, fine bridal work, or both until they arrive.</p>
  </div>
  <div class="custom-problem-card">
    <div class="problem-num">2</div>
    <h4>Mystery Pricing</h4>
    <p>Pricing is a mystery until you personally message, wait hours for a reply, or get quoted unexpectedly.</p>
  </div>
  <div class="custom-problem-card">
    <div class="problem-num">3</div>
    <h4>Unconfirmed Dates</h4>
    <p>There's no way to confirm they're actually free on your date until the very last minute.</p>
  </div>
  <div class="custom-problem-card">
    <div class="problem-num">4</div>
    <h4>Zero Accountability</h4>
    <p>If the final pattern doesn't match what was promised, there's nowhere to raise it or get a resolution.</p>
  </div>
</div>

<p>For a market as busy and transit-heavy as Anand Vihar — where families are often juggling guests arriving from out of town alongside the actual function — this kind of uncertainty is the last thing anyone needs.</p>

<figure class="rich-figure">
  <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop" alt="Precision fine-line application by verified specialists" />
  <figcaption>Precision fine-line application by verified specialists</figcaption>
</figure>

<h2>What a Good Mehndi Booking Experience Should Actually Look Like</h2>
<p>Whether it's a small family puja or a full wedding function, a few basics make the difference between a smooth booking and a stressful one:</p>

<div class="custom-checklist">
  <div class="custom-checklist-item">
    <div class="checklist-num">1</div>
    <div class="checklist-body">
      <h4>Ask to see recent work</h4>
      <p>Designs and finishing evolve — a portfolio from a year ago doesn't tell you much about current quality. Ask specifically for photos from the last couple of months.</p>
    </div>
  </div>
  <div class="custom-checklist-item">
    <div class="checklist-num">2</div>
    <div class="checklist-body">
      <h4>Match the artist to the occasion</h4>
      <p>An artist who is brilliant at quick, elegant Arabic patterns for guests isn't necessarily the right fit for detailed bridal mehndi with fine linework. Be clear about what you need before booking.</p>
    </div>
  </div>
  <div class="custom-checklist-item">
    <div class="checklist-num">3</div>
    <div class="checklist-body">
      <h4>Get pricing in writing</h4>
      <p>Whether it's the per-hand, per-person, or a package for the whole function, confirm this upfront — not after the mehndi is already on.</p>
    </div>
  </div>
  <div class="custom-checklist-item">
    <div class="checklist-num">4</div>
    <div class="checklist-body">
      <h4>Check on travel and timing</h4>
      <p>If you need the artist to come home, confirm how far in advance they'll arrive and whether travel charges apply, especially important in Anand Vihar given how spread out the area is around the transport hub.</p>
    </div>
  </div>
  <div class="custom-checklist-item">
    <div class="checklist-num">5</div>
    <div class="checklist-body">
      <h4>Look for real accountability</h4>
      <p>Reviews from actual past customers tell you far more than a follower count ever will.</p>
    </div>
  </div>
</div>

<h2>How Mehndi Wala Helps in Anand Vihar</h2>
<p>We built <strong>Mehndi Wala</strong> because this exact problem — good artists, disorganised discovery — repeats itself in almost every neighbourhood in Delhi, and Anand Vihar is no exception.</p>
<p>On Mehndi Wala, instead of chasing numbers and waiting on replies, you get:</p>

<div class="custom-feature-panel">
  <div class="feature-grid">
    <div class="feature-item">
      <span class="feature-icon">✓</span>
      <div>
        <h4>Verified Artist Profiles</h4>
        <p>Genuine, non-reposted photos and transparent artist profiles so you know exactly what you're booking.</p>
      </div>
    </div>
    <div class="feature-item">
      <span class="feature-icon">✓</span>
      <div>
        <h4>Upfront Pricing</h4>
        <p>Clear breakdown per hand and package, so there's no guessing game before you even start the conversation.</p>
      </div>
    </div>
    <div class="feature-item">
      <span class="feature-icon">✓</span>
      <div>
        <h4>Real-Time Availability</h4>
        <p>Instant visibility on open slots so you're not left wondering if your date and time slot works.</p>
      </div>
    </div>
    <div class="feature-item">
      <span class="feature-icon">✓</span>
      <div>
        <h4>Genuine Trust Score</h4>
        <p>Built from real customer verification and post-event reviews, not just star ratings that can be gamed.</p>
      </div>
    </div>
  </div>
  <div class="feature-highlight">
    The goal is simple: booking a mehndi artist in Anand Vihar should feel as easy as booking anything else you plan for a function — not an exercise to test your patience.
  </div>
</div>

<h2>Final Thoughts</h2>
<p>Anand Vihar has plenty of skilled mehndi artists working quietly across its residential lanes and markets — the challenge has just been discovery, not talent. A little planning, and knowing what to check for before you book, makes all the difference between a stress-free function and a last-minute scramble.</p>
<p>If you've got a wedding, festival, or family function coming up in Anand Vihar, take a look at the verified artists near you on Mehndi Wala before you start the usual WhatsApp hunt.</p>
`,
      faqs: {
        create: [
          {
            question: "How do I find a reliable mehndi artist in Anand Vihar?",
            answer:
              "Search on Mehndi Wala by date, occasion, and design preference. All listed artists have verified portfolios, background checks, and locked upfront pricing.",
            order: 1,
          },
          {
            question: "What's the average cost of mehndi in Anand Vihar?",
            answer:
              "Guest mehndi starts from ₹250–₹500 per hand. Semi-bridal packages range from ₹1,000–₹3,500, while full bridal packages range between ₹5,000–₹15,000 with locked upfront pricing.",
            order: 2,
          },
          {
            question: "How far in advance should I book for a wedding function?",
            answer:
              "For peak wedding seasons (October to February) and festivals like Karwa Chauth, we recommend booking 2 to 4 weeks in advance to secure top-rated artists.",
            order: 3,
          },
          {
            question: "Do mehndi artists in Anand Vihar offer home service?",
            answer:
              "Yes, verified artists on Mehndi Wala provide doorstep home services across Anand Vihar, Surajmal Vihar, Yojna Vihar, and surrounding East Delhi sectors.",
            order: 4,
          },
          {
            question: "How long does bridal mehndi usually take?",
            answer:
              "Full bridal mehndi (both hands front and back up to elbows, plus feet up to calves) typically takes between 4 to 6 hours depending on intricacy.",
            order: 5,
          },
          {
            question:
              "Is it safe to get mehndi done by any artist, or should I ask about the paste they use?",
            answer:
              "Always insist on 100% natural, chemical-free henna paste made with pure henna powder, essential oils (like eucalyptus or cajeput), and lemon juice. Avoid black or chemical henna that contains harmful PPD.",
            order: 6,
          },
        ],
      },
    },
  });

  // 2. Ghazipur Page (From HTML reference)
  const ghazipur = await prisma.localityPage.create({
    data: {
      country: "india",
      city: "delhi",
      district: "east-delhi",
      locality: "ghazipur",
      countryLabel: "India",
      cityLabel: "Delhi",
      districtLabel: "East Delhi",
      localityLabel: "Ghazipur",
      metaTitle:
        "Mehndi Artists in Ghazipur, East Delhi — Verified Bridal & Guest Booking | Mehndi Wala",
      metaDescription:
        "Book verified mehndi artists in Ghazipur, East Delhi. Price-locked bridal & guest mehndi, natural henna, direct online booking — no calling around.",
      h1: "Verified Mehndi Artists in Ghazipur: Transparent Pricing & Direct Booking",
      dek: "Skip the WhatsApp haggling. Browse verified portfolios, lock your date, and book top henna artists in Ghazipur with platform-backed protection.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1599818816933-289d0c64bead?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Bridal Henna Artistry in Ghazipur, East Delhi",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-14"),
      readTime: "9 min read",
      ratingValue: 4.8,
      reviewCount: 198,
      streetAddress: "Ghazipur Main Road, East Delhi",
      latitude: 28.6355,
      longitude: 77.3222,
      priceGuest: "₹200 - ₹450",
      priceParty: "₹1,200 - ₹3,000",
      priceBridal: "₹4,000 - ₹15,000",
      priceDisclaimer: "(Prices vary by travel time/agreed upfront before booking)",
      bodyHtml: `

<p>Planning a wedding or family gathering in Ghazipur? Booking a skilled mehndi artist shouldn't mean endless phone calls and uncertain pricing. With Mehndi Wala, you get complete transparency from portfolio discovery to on-time arrival at your venue.</p>

<div class="custom-callout">
  <div class="callout-kicker">PRICING CLARITY</div>
  <p>The price you see on your booking screen is locked. No last-minute travel additions or hidden venue surcharge.</p>
</div>

<h2>What Makes Booking in Ghazipur Different</h2>
<p>Ghazipur's vibrant community hosts thousands of weddings and festival celebrations every year. Here is why choosing verified artists makes your celebration stress-free:</p>

<div class="custom-problem-grid">
  <div class="custom-problem-card">
    <div class="problem-num">1</div>
    <h4>Price Lock Guarantee</h4>
    <p>Advance booking locks the exact quoted price before you pay a single rupee.</p>
  </div>
  <div class="custom-problem-card">
    <div class="problem-num">2</div>
    <h4>Identity Verification</h4>
    <p>The specific artist whose portfolio you selected is the artist who arrives at your doorstep.</p>
  </div>
  <div class="custom-problem-card">
    <div class="problem-num">3</div>
    <h4>100% Organic Henna</h4>
    <p>Strict safety checks ensure no harmful PPD chemicals or artificial dyes are ever used.</p>
  </div>
  <div class="custom-problem-card">
    <div class="problem-num">4</div>
    <h4>Replacement Cover</h4>
    <p>If an artist falls ill, our team arranges an equivalent top-rated backup at zero surcharge.</p>
  </div>
</div>

<h2>Booking Guidelines for Ghazipur Families</h2>
<div class="custom-checklist">
  <div class="custom-checklist-item">
    <div class="checklist-num">1</div>
    <div class="checklist-body">
      <h4>Select Your Style</h4>
      <p>Choose from Rajasthani traditional, modern Arabic, Indo-Western fusion, or fine portraiture.</p>
    </div>
  </div>
  <div class="custom-checklist-item">
    <div class="checklist-num">2</div>
    <div class="checklist-body">
      <h4>Lock Your Slot</h4>
      <p>Secure your date and time with a small nominal advance.</p>
    </div>
  </div>
  <div class="custom-checklist-item">
    <div class="checklist-num">3</div>
    <div class="checklist-body">
      <h4>Receive Digital Confirmation</h4>
      <p>Instant booking ID, digital invoice, and direct artist chat open in-app.</p>
    </div>
  </div>
</div>
`,
      faqs: {
        create: [
          {
            question: "How much does bridal mehndi cost in Ghazipur, East Delhi?",
            answer:
              "Bridal mehndi in Ghazipur typically ranges from ₹4,000 to ₹15,000 depending on coverage (hands only vs. hands and feet), design density, and artist experience.",
            order: 1,
          },
          {
            question: "Can I book a mehndi artist in Ghazipur for the same day?",
            answer:
              "Same-day booking depends on live artist availability in Ghazipur and nearby East Delhi localities. Search by date and time to see open slots.",
            order: 2,
          },
          {
            question: "Is natural henna used, or chemical/black henna?",
            answer:
              "Verified artists on Mehndi Wala declare their paste ingredients on their profile, and PPD-based black henna is not permitted for listing.",
            order: 3,
          },
        ],
      },
    },
  });

  // 3. Laxmi Nagar Page
  const laxmiNagar = await prisma.localityPage.create({
    data: {
      country: "india",
      city: "delhi",
      district: "east-delhi",
      locality: "laxmi-nagar",
      countryLabel: "India",
      cityLabel: "Delhi",
      districtLabel: "East Delhi",
      localityLabel: "Laxmi Nagar",
      metaTitle: "Mehndi Artists in Laxmi Nagar, East Delhi | Bridal & Festival Henna",
      metaDescription:
        "Find and book certified mehndi artists across Laxmi Nagar market and residential sectors. Guaranteed organic paste and upfront pricing.",
      h1: "Top Mehndi Artists in Laxmi Nagar: Bridal, Arabic & Party Henna",
      dek: "From quick festive designs to elaborate Rajasthani bridal patterns, book verified local henna specialists across Vikas Marg and Laxmi Nagar.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Laxmi Nagar Mehndi Artistry",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-16"),
      readTime: "10 min read",
      ratingValue: 4.9,
      reviewCount: 310,
      bodyHtml: `<p>Laxmi Nagar is one of East Delhi's bustling commercial and cultural centers. Booking a verified mehndi artist here gives you guaranteed service at your doorstep.</p>`,
      faqs: {
        create: [
          {
            question: "Are doorstep visits available in Laxmi Nagar?",
            answer:
              "Yes, all artists listed on Mehndi Wala provide home visits across Laxmi Nagar blocks, Shakarpur, and Nirman Vihar.",
            order: 1,
          },
        ],
      },
    },
  });

  // 4. Preet Vihar Page
  const preetVihar = await prisma.localityPage.create({
    data: {
      country: "india",
      city: "delhi",
      district: "east-delhi",
      locality: "preet-vihar",
      countryLabel: "India",
      cityLabel: "Delhi",
      districtLabel: "East Delhi",
      localityLabel: "Preet Vihar",
      metaTitle: "Mehndi Artists in Preet Vihar, East Delhi | Luxury Bridal Henna",
      metaDescription:
        "Premium bridal mehndi artists in Preet Vihar. High-detail portrait mehndi, Rajasthani royal patterns, and chemical-free stains.",
      h1: "Luxury Bridal Mehndi Artists in Preet Vihar",
      dek: "Specialist portrait and royal bridal henna artists serving Preet Vihar, Swasthya Vihar, and Gagan Vihar.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1599818816933-289d0c64bead?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Preet Vihar Bridal Henna Design",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-17"),
      readTime: "8 min read",
      ratingValue: 5.0,
      reviewCount: 175,
      priceGuest: "₹350 - ₹700",
      priceParty: "₹1,500 - ₹4,500",
      priceBridal: "₹8,000 - ₹25,000",
      priceDisclaimer: "(Luxury bespoke bridal packages include trial session and premium essential oils)",
      bodyHtml: `<p>Preet Vihar is known for sophisticated bridal ceremonies and premium event requirements. Our verified luxury mehndi specialists bring exquisite fine-line technique directly to your home.</p>`,

      faqs: {
        create: [
          {
            question: "Do artists offer trials in Preet Vihar?",
            answer:
              "Yes, multiple premium artists offer pre-wedding trial sessions to finalize your bespoke bridal design.",
            order: 1,
          },
        ],
      },
    },
  });

  // 5. Mayur Vihar Page
  const mayurVihar = await prisma.localityPage.create({
    data: {
      country: "india",
      city: "delhi",
      district: "east-delhi",
      locality: "mayur-vihar",
      countryLabel: "India",
      cityLabel: "Delhi",
      districtLabel: "East Delhi",
      localityLabel: "Mayur Vihar",
      metaTitle: "Mehndi Artists in Mayur Vihar (Phase 1, 2 & 3) | Mehndi Wala",
      metaDescription:
        "Book trusted bridal and guest mehndi artists across Mayur Vihar Phase 1, Phase 2, and Pocket 1. Verified profiles and instant booking.",
      h1: "Mehndi Artists in Mayur Vihar: Phase 1, 2 & 3 Booking",
      dek: "Direct online booking for home service mehndi artists across all phases of Mayur Vihar.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Mayur Vihar Mehndi Artists",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-18"),
      readTime: "12 min read",
      ratingValue: 4.8,
      reviewCount: 240,
      bodyHtml: `<p>Connecting Mayur Vihar residents with top verified henna artists across East Delhi.</p>`,
      faqs: {
        create: [
          {
            question: "How many artists are available in Mayur Vihar?",
            answer:
              "Over 45+ verified artists serve Mayur Vihar Phase 1, Phase 2, and Phase 3.",
            order: 1,
          },
        ],
      },
    },
  });

  // 6. Karkardooma Page
  const karkardooma = await prisma.localityPage.create({
    data: {
      country: "india",
      city: "delhi",
      district: "east-delhi",
      locality: "karkardooma",
      countryLabel: "India",
      cityLabel: "Delhi",
      districtLabel: "East Delhi",
      localityLabel: "Karkardooma",
      metaTitle: "Mehndi Artists in Karkardooma, East Delhi | Verified Henna Services",
      metaDescription:
        "Book verified mehndi artists near Karkardooma Metro and Court complex. Upfront pricing, organic henna paste, on-time arrival guarantee.",
      h1: "Verified Mehndi Artists in Karkardooma",
      dek: "Effortless online mehndi booking for bridal and family occasions in Karkardooma.",
      heroImageUrl:
        "https://images.unsplash.com/photo-1599818816933-289d0c64bead?q=80&w=1200&auto=format&fit=crop",
      heroImageAlt: "Karkardooma Mehndi Services",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-19"),
      readTime: "9 min read",
      ratingValue: 4.7,
      reviewCount: 160,
      bodyHtml: `<p>Karkardooma verified mehndi artists available for festive occasions and weddings.</p>`,
      faqs: {
        create: [
          {
            question: "What is the starting price for guest mehndi in Karkardooma?",
            answer: "Simple guest mehndi starts at ₹250 per hand.",
            order: 1,
          },
        ],
      },
    },
  });

  // Setup Interlinks for Anand Vihar: Laxmi Nagar, Preet Vihar, Mayur Vihar, Karkardooma, Ghazipur
  const anandViharInterlinks = [laxmiNagar.id, preetVihar.id, mayurVihar.id, karkardooma.id, ghazipur.id];
  for (const toId of anandViharInterlinks) {
    await prisma.localityInterlink.create({
      data: {
        fromId: anandVihar.id,
        toId: toId,
      },
    });
  }

  // Interlinks for Ghazipur
  const ghazipurInterlinks = [anandVihar.id, mayurVihar.id, laxmiNagar.id, preetVihar.id];
  for (const toId of ghazipurInterlinks) {
    await prisma.localityInterlink.create({
      data: {
        fromId: ghazipur.id,
        toId: toId,
      },
    });
  }

  // Interlinks for Laxmi Nagar
  const laxmiInterlinks = [anandVihar.id, preetVihar.id, karkardooma.id, mayurVihar.id];
  for (const toId of laxmiInterlinks) {
    await prisma.localityInterlink.create({
      data: {
        fromId: laxmiNagar.id,
        toId: toId,
      },
    });
  }

  console.log("✅ Database successfully seeded with 6 rich locality pages and cross-interlinks!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
