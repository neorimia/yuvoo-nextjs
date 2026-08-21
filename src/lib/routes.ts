/**
 * Application Routes & Paths
 *
 * Single source of truth for all routes and links used throughout the application.
 * Use this file for navigation, Link components, and redirects.
 *
 * @example
 * ```tsx
 * import { routes } from "@/lib/routes";
 * <Link href={routes.home}>Home</Link>
 * ```
 */

/**
 * Public Routes - No authentication required
 *
 * SEO-friendly routes using Romanian language for better search engine optimization.
 * These routes are indexed by search engines and should use Romanian keywords.
 */
export const routes = {
  neorimia: "https://neorimia.ro",
  // Home & Landing
  home: "/",
  home2: "/home-2",
  home3: "/home-3",

  // Public App Pages - SEO-friendly Romanian paths
  // Sports (Sporturi)
  sports: {
    list: "/sporturi",
    detail: (slug: string) => `/sporturi/${slug}`,
  },
  // Parent guides (Ghiduri) — long-tail SEO / AEO
  guides: {
    list: "/ghiduri",
    detail: (slug: string) => `/ghiduri/${slug}`,
  },
  // Clubs (Cluburi)
  clubs: {
    list: "/cluburi",
    premium: "/pentru-cluburi#pricing",
    landing: "/pentru-cluburi", // Landing page for clubs to join as Founding Clubs
    pricing: "/pentru-cluburi#pricing",
    caseStudies: "/pentru-cluburi/povesti-de-succes", // Case studies / success stories page
    roiCalculator: "/pentru-cluburi/calculator-roi", // ROI calculator standalone page
    howItWorks: "/pentru-cluburi/cum-functioneaza", // Detailed "How It Works" page
    helpCenter: "/pentru-cluburi/ajutor", // FAQ / Help Center page
    detail: (slug: string) => `/cluburi/${slug}`,
    category: (category: string) => `/cluburi/categorie/${category}`,
    reviews: (slug: string) => `/cluburi/${slug}/recenzii`,
    location: (locationSlug: string) => `/cluburi/locatie/${locationSlug}`,
  },
  // Doctors (Doctori)
  doctors: {
    list: "/doctori",
    landing: "/pentru-doctori", // Landing page for doctors to join as Verified Pediatric Experts
    detail: (slug: string) => `/doctori/${slug}`,
  },
  // Quiz (Chestionar)
  quiz: {
    intro: "/chestionar",
    container: "/chestionar/container",
    preview: "/chestionar/previzualizare",
    results: (id: string) => `/chestionar/rezultate/${id}`,
    // Payment flow routes
    emailGate: (quizId: string) => `/chestionar/email/${quizId}`,
    teaser: (quizId: string) => `/chestionar/teaser/${quizId}`,
    paywall: (quizId: string) => `/chestionar/paywall/${quizId}`,
    paymentSuccess: (quizId: string) => `/chestionar/payment/success/${quizId}`,
    paymentFailure: (quizId: string) => `/chestionar/payment/failure/${quizId}`,
    report: (accessToken: string) => `/chestionar/raport/${accessToken}`,
  },
  // Leads (Cereri) - Public guest payment routes
  leads: {
    guestPayment: (leadId: string) => `/cereri/${leadId}/plata-guest`,
    guestPaymentSuccess: (leadId: string) => `/cereri/${leadId}/plata-guest/success`,
  },
  // Search
  search: "/cautare",

  // Authentication - Internal routes (English OK)
  // Note: Auth pages live at /login, /register, etc. (not /auth/*)
  login: "/login",
  register: "/register",
  registerWithRole: (role: "parent" | "club_admin" | "doctor") => `/register?role=${role}` as const,
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  emailConfirmation: "/email-confirmation",
  verificationPending: "/verification-pending",
  chooseRole: "/choose-role",
  authRedirect: "/auth/redirect",

  // Public Information Pages - SEO-friendly Romanian paths
  about: "/despre-noi",
  partners: "/parteneri",
  press: "/presa",
  contact: "/contact",
  faq: "/intrebari-frecvente",
  testimonials: "/testimonials", // Keep English for now, can be changed to "/testimoniale" later
  gallery: "/gallery", // Keep English for now, can be changed to "/galerie" later
  help: "/ajutor",

  // Legal Pages - SEO-friendly Romanian paths
  privacy: "/confidentialitate",
  terms: "/termeni",
  cookies: "/cookies",
  gdpr: "/gdpr-parinti",
  unsubscribe: "/dezabonare",

  // Legacy Kindedo Routes (to be migrated/removed or redirected)
  // These routes should redirect to new SEO-friendly routes
  legacy: {
    // Classes (will redirect to Clubs)
    classes: "/classes",
    classDetails: (id: string) => `/class-details/${id}`,
    // Programs (will redirect to Sports)
    programs: "/programs",
    programDetails: (id: string) => `/program-details/${id}`,
    // Teachers (will redirect to Doctors)
    teachers: "/teachers",
    teacherDetails: (id: string) => `/teacher-details/${id}`,
    // News/Blog (may be kept or removed)
    news: "/news",
    newsClassic: "/news-classic",
    newsSidebar: "/news-sidebar",
    newsDetails: (id: string) => `/news-details/${id}`,
    // Shop (may be removed for MVP)
    shop: "/shop",
    shopDetails: (id: string) => `/shop-details/${id}`,
    cart: "/cart",
    checkout: "/checkout",
    wishlist: "/wishlist",
    // Other pages
    timeTables: "/time-tables",
    errorPage: "/error-page",
    // Legacy English routes (should redirect to Romanian SEO routes)
    clubs: "/clubs",
    clubsDetails: (id: string) => `/clubs/${id}`,
    doctors: "/doctors",
    doctorsDetails: (id: string) => `/doctors/${id}`,
    quiz: "/quiz",
    about: "/about",
    faq: "/faq",
    privacy: "/privacy",
    terms: "/terms",
  },

  // Protected Routes - Authentication required
  // Internal routes (English OK, not SEO-sensitive)
  // Parent Dashboard
  parent: {
    dashboard: "/parent/dashboard",
    gettingStarted: "/parent/getting-started",
    children: {
      list: "/parent/children",
      add: "/parent/children/add",
      edit: (id: string) => `/parent/children/${id}/edit`,
      detail: (id: string) => `/parent/children/${id}`,
      quizzes: (id: string) => `/parent/children/${id}/quizzes`,
    },
    savedItems: "/parent/saved",
    settings: "/parent/settings",
    emailPreferences: "/parent/email-preferences",
    profile: "/parent/profile",
    bookings: "/parent/bookings",
    bookingsDetails: (id: string) => `/parent/bookings/${id}`,
    // GDPR Privacy Settings (Phase 1 - Legal Compliance)
    privacy: "/parent/settings/privacy", // Consent management, data export, account deletion
  },

  // Club Portal Routes
  club: {
    dashboard: "/club/dashboard",
    profile: "/club/profile",
    classes: {
      list: "/club/classes",
      add: "/club/classes/add",
      edit: (id: string) => `/club/classes/${id}/edit`,
    },
    bookings: "/club/bookings",
    settings: "/club/settings",
    leads: {
      list: "/club/dashboard/leaduri",
      detail: (leadId: string) => `/club/dashboard/leaduri/${leadId}`,
      payment: (leadId: string) => `/club/dashboard/leaduri/${leadId}/plata`,
    },
    premium: "/club/dashboard/premium",
  },

  // Doctor Portal Routes
  doctor: {
    dashboard: "/doctor/dashboard",
    profile: "/doctor/profile",
    bookings: "/doctor/bookings",
    availability: "/doctor/availability",
    settings: "/doctor/settings",
  },

  // Admin Routes
  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    clubs: {
      list: "/admin/clubs",
      detail: (id: string) => `/admin/clubs/${id}`,
    },
    doctors: {
      list: "/admin/doctors",
      detail: (id: string) => `/admin/doctors/${id}`,
    },
    verifications: "/admin/verifications",
  },

  // Onboarding Routes - Complete flows for all roles
  onboarding: {
    // Parent onboarding (5 steps)
    parent: {
      welcome: "/onboarding/parent/welcome",
      addChild: "/onboarding/parent/add-child",
      tour: "/onboarding/parent/tour",
      quizIntro: "/onboarding/parent/quiz-intro",
      complete: "/onboarding/parent/complete",
    },
    // Club admin onboarding (7 steps)
    club: {
      welcome: "/onboarding/club/welcome",
      basicInfo: "/onboarding/club/basic-info",
      contactSchedule: "/onboarding/club/contact-schedule",
      pricingAges: "/onboarding/club/pricing-ages",
      photos: "/onboarding/club/photos",
      verification: "/onboarding/club/verification",
      complete: "/onboarding/club/complete",
    },
    // Doctor onboarding (8 steps)
    doctor: {
      welcome: "/onboarding/doctor/welcome",
      basicInfo: "/onboarding/doctor/basic-info",
      bioExperience: "/onboarding/doctor/bio-experience",
      locationContact: "/onboarding/doctor/location-contact",
      photo: "/onboarding/doctor/photo",
      verification: "/onboarding/doctor/verification",
      availability: "/onboarding/doctor/availability",
      complete: "/onboarding/doctor/complete",
    },
    // General
    gettingStarted: "/onboarding/getting-started",
  },

  // Email Management
  email: {
    unsubscribe: "/email/unsubscribe",
  },

  // API Routes
  api: {
    // Auth
    auth: {
      signIn: "/api/auth/sign-in",
      signOut: "/api/auth/sign-out",
      signUp: "/api/auth/sign-up",
      session: "/api/auth/session",
    },
    // Quiz
    quiz: {
      submit: "/api/quiz/submit",
      results: (id: string) => `/api/quiz/${id}`,
    },
    // Clubs
    clubs: {
      list: "/api/clubs",
      details: (id: string) => `/api/clubs/${id}`,
      search: "/api/clubs/search",
      book: "/api/clubs/book",
    },
    // Doctors
    doctors: {
      list: "/api/doctors",
      details: (id: string) => `/api/doctors/${id}`,
      search: "/api/doctors/search",
      book: "/api/doctors/book",
    },
    // Children
    children: {
      list: "/api/children",
      create: "/api/children",
      update: (id: string) => `/api/children/${id}`,
      delete: (id: string) => `/api/children/${id}`,
    },
    // Bookings
    bookings: {
      list: "/api/bookings",
      create: "/api/bookings",
      update: (id: string) => `/api/bookings/${id}`,
      cancel: (id: string) => `/api/bookings/${id}/cancel`,
    },
    // Favorites
    favorites: {
      list: "/api/favorites",
      add: "/api/favorites",
      remove: (id: string) => `/api/favorites/${id}`,
    },
    // Upload
    upload: {
      image: "/api/upload/image",
    },
  },

  // Error Pages
  notFound: "/404",
  error: "/error",
} as const;

/**
 * External Links - External URLs and social media
 */
export const externalLinks = {
  // Social Media (to be updated with Yuvoo accounts)
  facebook: "https://facebook.com/yuvooro",
  instagram: "https://instagram.com/yuvooro",
  twitter: "https://twitter.com/yuvooro",
  tiktok: "https://www.tiktok.com/@yuvooro",

  // Legal & Support - SEO-friendly Romanian paths
  terms: "/termeni",
  privacy: "/confidentialitate",
  cookies: "/cookies",
  gdpr: "/gdpr-parinti",
  support: "/ajutor",
  contactEmail: "mailto:contact@yuvoo.ro",
  supportEmail: "mailto:support@yuvoo.ro",

  // External Services
  stackAuth: "https://stack-auth.com",
  neon: "https://neon.tech",
  cloudinary: "https://cloudinary.com",
} as const;

/**
 * Static Asset Paths
 */
export const assets = {
  // Logo
  logo: "/assets/img/logo/logo.svg",
  logoWhite: "/assets/img/logo/logo-white.svg",
  favicon: "/favicon.ico",

  // Images
  images: {
    error404: "/assets/img/bg/error-404.svg",
    preloader: "/assets/img/bg/preloader.png",
  },

  // Fonts
  fonts: {
    fredoka: "/assets/fonts",
  },
} as const;

/**
 * Helper function to build query string URLs
 */
export function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * Helper function to check if a route is protected (requires authentication)
 */
export function isProtectedRoute(path: string): boolean {
  const protectedPaths = [
    routes.parent.dashboard,
    routes.parent.children.list,
    routes.parent.bookings,
    routes.parent.savedItems,
    routes.parent.settings,
    routes.parent.profile,
    routes.club.dashboard,
    routes.doctor.dashboard,
    routes.admin.dashboard,
    "/onboarding/parent",
    "/onboarding/club",
    "/onboarding/doctor",
  ];

  return protectedPaths.some((protectedPath) => path.startsWith(protectedPath));
}

/**
 * Helper function to get the route group from a path
 */
export function getRouteGroup(
  path: string
): "public" | "auth" | "parent" | "club" | "doctor" | "admin" | "api" {
  if (path.startsWith("/api")) return "api";
  if (path.startsWith("/admin")) return "admin";
  if (path.startsWith("/doctor")) return "doctor";
  if (path.startsWith("/club")) return "club";
  if (path.startsWith("/parent")) return "parent";
  if (path.startsWith("/auth")) return "auth";
  if (isProtectedRoute(path)) return "auth";
  return "public";
}

/**
 * Helper function to check if a route is a public SEO route (Romanian)
 */
export function isPublicSeoRoute(path: string): boolean {
  const publicSeoPaths = [
    routes.sports.list,
    routes.clubs.list,
    routes.clubs.landing,
    routes.doctors.list,
    routes.quiz.intro,
    routes.about,
    routes.partners,
    routes.contact,
    routes.faq,
    routes.help,
    routes.privacy,
    routes.terms,
    routes.cookies,
    routes.gdpr,
  ];

  return (
    path === routes.home ||
    publicSeoPaths.some((seoPath) => path.startsWith(seoPath)) ||
    path.startsWith("/sporturi/") ||
    path.startsWith("/cluburi/") ||
    path.startsWith("/doctori/") ||
    path.startsWith("/chestionar/")
  );
}
