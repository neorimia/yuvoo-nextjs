/**
 * Clubs Seed Data
 *
 * Comprehensive seed data for sports clubs in Romania.
 * All clubs include complete field data as per schema requirements.
 */

import {
  generateSlug,
  getCityCoordinates,
  generateAgeGroups,
  generateLevels,
  generateSchedule,
  generatePricing,
  generateImageUrls,
} from "./helpers";

/**
 * Club seed data type (matches database schema)
 */
export interface ClubSeedData {
  name: string;
  slug: string;
  description: string;
  sportType: string; // Will be sportId when sports table is created
  city: string;
  district?: string;
  address: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  email?: string;
  website?: string;
  schedule?: { day: string; time: string }[];
  pricing?: { type: "monthly" | "per_class" | "per_semester"; amount: number; currency: "RON" }[];
  ageGroups?: number[];
  experienceLevels?: string[];
  galleryUrls?: string[];
  logoUrl?: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  profileComplete: boolean;
  verificationStatus: "pending" | "in_review" | "approved" | "rejected";
}

/**
 * Generate comprehensive club seed data
 */
function createClub(data: Omit<ClubSeedData, "slug" | "profileComplete">): ClubSeedData {
  const slug = generateSlug(data.name);
  const coords = getCityCoordinates(data.city);

  // Ensure pricing is always an array (required by schema)
  const pricing = data.pricing || [generatePricing("monthly")];

  // Ensure schedule is always an array (required by schema)
  const schedule = data.schedule || generateSchedule(3, "16:00", 90);

  return {
    ...data,
    slug,
    latitude: coords?.lat.toString(),
    longitude: coords?.lng.toString(),
    profileComplete: true,
    ageGroups: data.ageGroups || generateAgeGroups(data.sportType),
    experienceLevels: data.experienceLevels || generateLevels(true, true, data.verified),
    schedule,
    pricing,
    galleryUrls: data.galleryUrls || generateImageUrls(3),
  };
}

/**
 * Comprehensive clubs seed data
 * 50-75 clubs across Romania with all fields populated
 */
export const CLUBS_SEED_DATA: ClubSeedData[] = [
  // ========== FOTBAL (Football/Soccer) ==========
  createClub({
    name: "Fotbal Club Junior București",
    description:
      "Club de fotbal pentru copii cu programe pentru toate vârstele de la 5 până la 14 ani. Antrenori certificați UEFA, facilități moderne cu terenuri sintetice și iarbă naturală. Programe competitive și recreative, cu focus pe dezvoltarea tehnică și spiritul de echipă.",
    sportType: "fotbal",
    city: "București",
    district: "Sector 1",
    address: "Strada Sportului 10, Sector 1",
    phone: "+40 21 123 4567",
    email: "contact@fcjunior.ro",
    website: "https://fcjunior.ro",
    verified: false,
    featured: false,
    rating: 5,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Academia de Fotbal Steaua",
    description:
      "Academia de fotbal cu tradiție de peste 20 de ani, programe pentru copii de la 5 ani. Antrenori cu experiență în fotbalul de performanță, facilități de top. Dezvoltăm atât jucători pentru echipele de performanță, cât și pasiunea pentru sport.",
    sportType: "fotbal",
    city: "București",
    district: "Sector 6",
    address: "Bulevardul Ghencea 35",
    phone: "+40 21 234 5678",
    email: "info@academiasteaua.ro",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "FC Junior Cluj",
    description: "Club de fotbal pentru copii în Cluj-Napoca cu programe pentru toate vârstele.",
    sportType: "fotbal",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 123 456",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "approved",
  }),
  createClub({
    name: "Fotbal Club Iași",
    description:
      "Club de fotbal pentru copii în Iași cu antrenori certificați și programe competitive.",
    sportType: "fotbal",
    city: "Iași",
    address: "Strada Sărărie 15",
    phone: "+40 232 123 456",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Fotbal Club Timișoara",
    description:
      "Club de fotbal pentru copii în Timișoara cu facilități moderne și programe pentru toate nivelurile.",
    sportType: "fotbal",
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 123 456",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== BASCHET (Basketball) ==========
  createClub({
    name: "Baschet Club Junior București",
    description:
      "Club de baschet pentru copii cu programe competitive și recreative. Antrenori cu experiență în baschetul de performanță, sală modernă cu parchet profesional. Programe pentru începători și avansați, cu focus pe tehnica individuală și jocul de echipă.",
    sportType: "baschet",
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111",
    phone: "+40 21 345 6789",
    email: "contact@bcjunior.ro",
    verified: false,
    featured: true,
    rating: 5,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Academia de Baschet Dinamo",
    description:
      "Academia de baschet cu programe pentru toate vârstele. Antrenori certificați, sală modernă cu facilități de top. Dezvoltăm atât jucători pentru echipele de performanță, cât și pasiunea pentru sport.",
    sportType: "baschet",
    city: "București",
    district: "Sector 1",
    address: "Strada Maior Coravu 2",
    phone: "+40 21 456 7890",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Baschet Club Timișoara",
    description: "Club de baschet pentru copii în Timișoara cu programe competitive.",
    sportType: "baschet",
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 234 567",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== TENIS (Tennis) ==========
  createClub({
    name: "Tenis Club Junior",
    description:
      "Club de tenis pentru copii cu terenuri acoperite și în aer liber. Antrenori certificați ITF, programe pentru toate vârstele de la 4 ani. Terenuri cu suprafață dură și zgură, cu focus pe dezvoltarea tehnică și tactică.",
    sportType: "tenis",
    city: "București",
    district: "Sector 1",
    address: "Bulevardul Iuliu Maniu 7",
    phone: "+40 21 567 8901",
    email: "info@tenisjunior.ro",
    verified: false,
    featured: false,
    rating: 5,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Tenis Club Cluj",
    description:
      "Club de tenis pentru copii în Cluj-Napoca cu terenuri moderne și antrenori experimentați.",
    sportType: "tenis",
    city: "Cluj-Napoca",
    address: "Strada Observatorului 34",
    phone: "+40 264 234 567",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== ÎNOT (Swimming) ==========
  createClub({
    name: "Clubul de Înot Junior",
    description:
      "Club de înot pentru copii cu bazin olimpic și antrenori specializați. Programe pentru începători și avansați, de la 4 ani. Bazin de 25m cu 6 benzi, cu focus pe tehnica corectă și siguranță în apă.",
    sportType: "inot",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Basarabia 37-39",
    phone: "+40 21 678 9012",
    email: "contact@inotjunior.ro",
    website: "https://inotjunior.ro",
    verified: false,
    featured: false,
    rating: 5,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Academia de Înot Olimpia",
    description:
      "Academia de înot cu programe pentru începători și avansați. Antrenori cu experiență în înotul de performanță, bazin modern cu facilități de top.",
    sportType: "inot",
    city: "București",
    district: "Sector 1",
    address: "Strada Amzei 10",
    phone: "+40 21 789 0123",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Clubul de Înot Constanța",
    description:
      "Club de înot pentru copii în Constanța cu bazin modern și programe pentru toate vârstele.",
    sportType: "inot",
    city: "Constanța",
    address: "Bulevardul Mamaia 255",
    phone: "+40 241 123 456",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Înot Club Galați",
    description: "Club de înot pentru copii în Galați cu programe recreative și competitive.",
    sportType: "inot",
    city: "Galați",
    address: "Bulevardul George Coșbuc 62",
    phone: "+40 236 123 456",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== GIMNASTICĂ (Gymnastics) ==========
  createClub({
    name: "Clubul de Gimnastică Artistică",
    description:
      "Club de gimnastică artistică pentru copii cu programe competitive. Antrenori cu experiență internațională, sală modernă cu echipament profesional. Programe pentru fete și băieți, de la 4 ani, cu focus pe flexibilitate, forță și grație.",
    sportType: "gimnastica",
    city: "București",
    district: "Sector 1",
    address: "Strada Gheorghe Manu 2-4",
    phone: "+40 21 890 1234",
    email: "info@gimnasticajunior.ro",
    verified: false,
    featured: false,
    rating: 5,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Gimnastică Ritmică Junior",
    description:
      "Club de gimnastică ritmică pentru fete. Antrenori specializați, programe competitive și recreative. Echipament profesional cu mături, coarde, cercuri și benzi.",
    sportType: "gimnastica",
    city: "București",
    district: "Sector 1",
    address: "Calea Victoriei 120",
    phone: "+40 21 901 2345",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Gimnastică Club Craiova",
    description: "Club de gimnastică pentru copii în Craiova cu programe pentru toate vârstele.",
    sportType: "gimnastica",
    city: "Craiova",
    address: "Strada Calea Unirii 15",
    phone: "+40 251 123 456",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== DANS (Dance) ==========
  createClub({
    name: "Academia de Dans Junior",
    description:
      "Academia de dans cu programe de balet, dans modern și latino. Antrenori cu experiență în dansul de performanță, sală modernă cu oglinzi și bare. Programe pentru toate vârstele, de la 4 ani, cu focus pe grație, flexibilitate și expresivitate.",
    sportType: "dans",
    city: "București",
    district: "Sector 2",
    address: "Strada Franceză 15",
    phone: "+40 21 012 3456",
    email: "contact@dansjunior.ro",
    verified: false,
    featured: false,
    rating: 5,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Balet Studio Cluj",
    description: "Studio de balet pentru copii în Cluj-Napoca cu programe clasice și moderne.",
    sportType: "dans",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 345 678",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Dans Club Ploiești",
    description: "Club de dans pentru copii în Ploiești cu programe de balet și dans modern.",
    sportType: "dans",
    city: "Ploiești",
    address: "Strada Independenței 1",
    phone: "+40 244 123 456",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== KARATE ==========
  createClub({
    name: "Karate Dojo Junior",
    description:
      "Dojo de karate pentru copii cu programe tradiționale și moderne. Antrenori certificați, sală modernă cu tatami profesional. Programe pentru toate vârstele, de la 5 ani, cu focus pe disciplina, respectul și tehnica corectă.",
    sportType: "karate",
    city: "București",
    district: "Sector 3",
    address: "Strada Calea Vitan 55",
    phone: "+40 21 123 4567",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Karate Club Timișoara",
    description:
      "Club de karate pentru copii în Timișoara cu antrenori certificați și programe competitive.",
    sportType: "karate",
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 123 456",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== JUDO ==========
  createClub({
    name: "Judo Club Junior",
    description:
      "Club de judo pentru copii cu antrenori certificați. Sală modernă cu tatami profesional, programe pentru toate vârstele. Focus pe disciplina, respectul și tehnica corectă de luptă.",
    sportType: "judo",
    city: "București",
    district: "Sector 1",
    address: "Strada Gheorghe Manu 2-4",
    phone: "+40 21 234 5678",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== VOLEI (Volleyball) ==========
  createClub({
    name: "Volei Club Junior",
    description:
      "Club de volei pentru copii cu programe competitive. Antrenori cu experiență, sală modernă cu terenuri profesionale. Programe pentru toate vârstele, de la 8 ani, cu focus pe tehnica individuală și jocul de echipă.",
    sportType: "volei",
    city: "București",
    district: "Sector 2",
    address: "Strada Sportului 10",
    phone: "+40 21 345 6789",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== HANDBAL (Handball) ==========
  createClub({
    name: "Handbal Club Junior",
    description:
      "Club de handbal pentru copii cu programe pentru toate vârstele. Antrenori cu experiență în handbalul de performanță, sală modernă cu terenuri profesionale. Focus pe viteza, agilitatea și coordonarea.",
    sportType: "handbal",
    city: "București",
    district: "Sector 1",
    address: "Bulevardul Iuliu Maniu 7",
    phone: "+40 21 456 7890",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== ATLETISM (Athletics) ==========
  createClub({
    name: "Atletism Club Junior",
    description:
      "Club de atletism pentru copii cu programe de pregătire. Antrenori cu experiență, pista modernă cu facilități complete. Programe pentru toate disciplinele: alergare, sărituri și aruncări.",
    sportType: "atletism",
    city: "București",
    district: "Sector 2",
    address: "Strada Basarabia 37-39",
    phone: "+40 21 567 8901",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== CICLISM (Cycling) ==========
  createClub({
    name: "Ciclism Club Junior",
    description:
      "Club de ciclism pentru copii cu programe de antrenament. Antrenori certificați, programe pentru toate vârstele. Focus pe siguranță, tehnica corectă și rezistența.",
    sportType: "ciclism",
    city: "București",
    district: "Sector 3",
    address: "Calea Floreasca 111",
    phone: "+40 21 678 9012",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== ECHIȚĂ (Equestrian) ==========
  createClub({
    name: "Echiță Club Junior",
    description:
      "Club de echiță pentru copii cu cai și instructori specializați. Manej modern, programe pentru toate vârstele de la 6 ani. Focus pe echilibrul, coordonarea și responsabilitatea, creând o legătură specială cu caii.",
    sportType: "echitatie",
    city: "București",
    district: "Sector 1",
    address: "Șoseaua Chitila 1",
    phone: "+40 21 789 0123",
    verified: false,
    featured: false,
    rating: 5,
    verificationStatus: "pending",
  }),

  // ========== SCHI (Skiing) ==========
  createClub({
    name: "Schi Club Junior Brașov",
    description:
      "Club de schi pentru copii în Brașov. Antrenori cu experiență, programe pentru toate vârstele. Acces la pârtii moderne, cu focus pe siguranță și tehnica corectă.",
    sportType: "schi",
    city: "Brașov",
    address: "Strada Poiana Brașov 1",
    phone: "+40 268 123 456",
    verified: false,
    featured: false,
    rating: 5,
    verificationStatus: "pending",
  }),

  // ========== PATINAJ (Skating) ==========
  createClub({
    name: "Patinaj Club Junior",
    description:
      "Club de patinaj artistic pentru copii. Antrenori cu experiență, patinoar modern cu gheață artificială. Programe pentru toate vârstele, de la 4 ani, cu focus pe grație, echilibru și coordonare.",
    sportType: "patinaj",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Basarabia 37-39",
    phone: "+40 21 890 1234",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== HOCHEI (Hockey) ==========
  createClub({
    name: "Hochei Club Junior",
    description:
      "Club de hochei pe gheață pentru copii. Antrenori cu experiență, patinoar modern. Programe pentru toate vârstele, de la 6 ani, cu focus pe echilibrul, coordonarea și jocul de echipă.",
    sportType: "hochei",
    city: "București",
    district: "Sector 1",
    address: "Strada Sportului 10",
    phone: "+40 21 901 2345",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== SCRIMĂ (Fencing) ==========
  createClub({
    name: "Scrimă Club Junior",
    description:
      "Club de scrimă pentru copii cu programe competitive. Antrenori cu experiență internațională, sală modernă cu piste profesionale. Programe pentru toate vârstele, de la 6 ani, cu focus pe coordonare, reflexe rapide și concentrare.",
    sportType: "scrima",
    city: "București",
    district: "Sector 1",
    address: "Strada Gheorghe Manu 2-4",
    phone: "+40 21 012 3456",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== TENIS DE MASĂ (Table Tennis) ==========
  createClub({
    name: "Tenis de Masă Club Junior",
    description:
      "Club de tenis de masă pentru copii. Antrenori certificați, sală modernă cu mese profesionale. Programe pentru toate vârstele, de la 6 ani, cu focus pe reflexe rapide și coordonare.",
    sportType: "tenis-de-masa",
    city: "București",
    district: "Sector 2",
    address: "Bulevardul Iuliu Maniu 7",
    phone: "+40 21 123 4567",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== BADMINTON ==========
  createClub({
    name: "Badminton Club Junior",
    description:
      "Club de badminton pentru copii. Antrenori cu experiență, sală modernă cu terenuri profesionale. Programe pentru toate vârstele, de la 6 ani, cu focus pe agilitate, coordonare și rezistență.",
    sportType: "badminton",
    city: "București",
    district: "Sector 3",
    address: "Calea Floreasca 111",
    phone: "+40 21 234 5678",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== RUGBY ==========
  createClub({
    name: "Rugby Club Junior",
    description:
      "Club de rugby pentru copii cu programe de antrenament. Antrenori cu experiență, teren modern cu iarbă naturală. Programe pentru toate vârstele, de la 8 ani, cu focus pe forță, rezistență și spirit de echipă.",
    sportType: "rugby",
    city: "București",
    district: "Sector 1",
    address: "Strada Sportului 10",
    phone: "+40 21 345 6789",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== ADDITIONAL CLUBS FOR VARIETY ==========
  // More Fotbal clubs
  createClub({
    name: "Fotbal Club Sector 2",
    description:
      "Club de fotbal pentru copii în Sector 2, București, cu programe pentru toate vârstele.",
    sportType: "fotbal",
    city: "București",
    district: "Sector 2",
    address: "Calea Vitan 55",
    phone: "+40 21 111 2222",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Fotbal Club Sector 3",
    description: "Club de fotbal pentru copii în Sector 3, București.",
    sportType: "fotbal",
    city: "București",
    district: "Sector 3",
    address: "Strada Vitan-Bârzești 7",
    phone: "+40 21 222 3333",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Fotbal Club Sector 4",
    description: "Club de fotbal pentru copii în Sector 4, București, cu facilități moderne.",
    sportType: "fotbal",
    city: "București",
    district: "Sector 4",
    address: "Bulevardul Olteniței 35",
    phone: "+40 21 333 4444",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Fotbal Club Sector 5",
    description: "Club de fotbal pentru copii în Sector 5, București.",
    sportType: "fotbal",
    city: "București",
    district: "Sector 5",
    address: "Strada Giurgiului 266",
    phone: "+40 21 444 5555",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Fotbal Club Sector 6",
    description: "Club de fotbal pentru copii în Sector 6, București, cu programe competitive.",
    sportType: "fotbal",
    city: "București",
    district: "Sector 6",
    address: "Bulevardul Ghencea 35",
    phone: "+40 21 555 6666",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // More Baschet clubs
  createClub({
    name: "Baschet Club Sector 2",
    description: "Club de baschet pentru copii în Sector 2, București.",
    sportType: "baschet",
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111",
    phone: "+40 21 666 7777",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Baschet Club Cluj",
    description: "Club de baschet pentru copii în Cluj-Napoca cu programe competitive.",
    sportType: "baschet",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 456 789",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // More Tenis clubs
  createClub({
    name: "Tenis Club Sector 3",
    description: "Club de tenis pentru copii în Sector 3, București, cu terenuri moderne.",
    sportType: "tenis",
    city: "București",
    district: "Sector 3",
    address: "Strada Calea Vitan 55",
    phone: "+40 21 777 8888",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Tenis Club Timișoara",
    description: "Club de tenis pentru copii în Timișoara cu terenuri acoperite.",
    sportType: "tenis",
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 345 678",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // More Înot clubs
  createClub({
    name: "Înot Club Sector 4",
    description: "Club de înot pentru copii în Sector 4, București, cu bazin modern.",
    sportType: "inot",
    city: "București",
    district: "Sector 4",
    address: "Bulevardul Olteniței 35",
    phone: "+40 21 888 9999",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Înot Club Iași",
    description: "Club de înot pentru copii în Iași cu programe pentru toate vârstele.",
    sportType: "inot",
    city: "Iași",
    address: "Strada Sărărie 15",
    phone: "+40 232 234 567",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Gimnastică clubs
  createClub({
    name: "Gimnastică Club Sector 2",
    description: "Club de gimnastică pentru copii în Sector 2, București.",
    sportType: "gimnastica",
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111",
    phone: "+40 21 999 0000",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Gimnastică Club Timișoara",
    description: "Club de gimnastică pentru copii în Timișoara cu programe competitive.",
    sportType: "gimnastica",
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 456 789",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Dans clubs
  createClub({
    name: "Dans Club Sector 1",
    description:
      "Club de dans pentru copii în Sector 1, București, cu programe de balet și dans modern.",
    sportType: "dans",
    city: "București",
    district: "Sector 1",
    address: "Calea Victoriei 120",
    phone: "+40 21 000 1111",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Dans Club Iași",
    description: "Club de dans pentru copii în Iași cu programe de balet și dans modern.",
    sportType: "dans",
    city: "Iași",
    address: "Strada Sărărie 15",
    phone: "+40 232 345 678",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Karate clubs
  createClub({
    name: "Karate Club Sector 4",
    description: "Club de karate pentru copii în Sector 4, București.",
    sportType: "karate",
    city: "București",
    district: "Sector 4",
    address: "Bulevardul Olteniței 35",
    phone: "+40 21 111 2222",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Karate Club Cluj",
    description: "Club de karate pentru copii în Cluj-Napoca cu antrenori certificați.",
    sportType: "karate",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 567 890",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Judo clubs
  createClub({
    name: "Judo Club Sector 2",
    description: "Club de judo pentru copii în Sector 2, București.",
    sportType: "judo",
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111",
    phone: "+40 21 222 3333",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Judo Club Iași",
    description: "Club de judo pentru copii în Iași cu programe competitive.",
    sportType: "judo",
    city: "Iași",
    address: "Strada Sărărie 15",
    phone: "+40 232 456 789",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Volei clubs
  createClub({
    name: "Volei Club Sector 1",
    description: "Club de volei pentru copii în Sector 1, București.",
    sportType: "volei",
    city: "București",
    district: "Sector 1",
    address: "Strada Maior Coravu 2",
    phone: "+40 21 333 4444",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Volei Club Cluj",
    description: "Club de volei pentru copii în Cluj-Napoca cu programe competitive.",
    sportType: "volei",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 678 901",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Handbal clubs
  createClub({
    name: "Handbal Club Sector 3",
    description: "Club de handbal pentru copii în Sector 3, București.",
    sportType: "handbal",
    city: "București",
    district: "Sector 3",
    address: "Strada Calea Vitan 55",
    phone: "+40 21 444 5555",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Handbal Club Iași",
    description: "Club de handbal pentru copii în Iași cu programe competitive.",
    sportType: "handbal",
    city: "Iași",
    address: "Strada Sărărie 15",
    phone: "+40 232 567 890",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Atletism clubs
  createClub({
    name: "Atletism Club Sector 5",
    description: "Club de atletism pentru copii în Sector 5, București, cu pista modernă.",
    sportType: "atletism",
    city: "București",
    district: "Sector 5",
    address: "Strada Giurgiului 266",
    phone: "+40 21 555 6666",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Atletism Club Cluj",
    description: "Club de atletism pentru copii în Cluj-Napoca cu programe competitive.",
    sportType: "atletism",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 789 012",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Patinaj clubs
  createClub({
    name: "Patinaj Club Sector 6",
    description: "Club de patinaj pentru copii în Sector 6, București, cu patinoar modern.",
    sportType: "patinaj",
    city: "București",
    district: "Sector 6",
    address: "Bulevardul Ghencea 35",
    phone: "+40 21 666 7777",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createClub({
    name: "Patinaj Club Brașov",
    description: "Club de patinaj pentru copii în Brașov cu programe pentru toate vârstele.",
    sportType: "patinaj",
    city: "Brașov",
    address: "Strada Poiana Brașov 1",
    phone: "+40 268 234 567",
    verified: false,
    featured: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // More Scrimă clubs
  createClub({
    name: "Scrimă Club Sector 1",
    description: "Club de scrimă pentru copii în Sector 1, București, cu programe competitive.",
    sportType: "scrima",
    city: "București",
    district: "Sector 1",
    address: "Strada Gheorghe Manu 2-4",
    phone: "+40 21 777 8888",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // More Rugby clubs
  createClub({
    name: "Rugby Club Sector 2",
    description: "Club de rugby pentru copii în Sector 2, București.",
    sportType: "rugby",
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111",
    phone: "+40 21 888 9999",
    verified: false,
    featured: false,
    rating: 4,
    verificationStatus: "pending",
  }),
];
