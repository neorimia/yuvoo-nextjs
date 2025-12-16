/**
 * Doctors Seed Data
 *
 * Comprehensive seed data for pediatric specialists in Romania.
 * All doctors include complete field data as per schema requirements.
 */

import { generateSlug, generateDoctorSchedule } from "./helpers";

/**
 * Doctor seed data type (matches database schema)
 */
export interface DoctorSeedData {
  firstName: string;
  lastName: string;
  slug: string;
  title?: string;
  specialty: string;
  secondarySpecialties?: string[];
  credentials?: string[];
  bio: string;
  yearsOfExperience?: number;
  languages?: string[];
  city: string;
  district?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  acceptingNewPatients: boolean;
  onlineConsultations: boolean;
  schedule?: { day: string; time: string }[];
  photoUrl?: string;
  verified: boolean;
  rating: number;
  profileComplete: boolean;
  verificationStatus: "pending" | "in_review" | "approved" | "rejected";
}

/**
 * Generate comprehensive doctor seed data
 */
function createDoctor(data: Omit<DoctorSeedData, "slug" | "profileComplete">): DoctorSeedData {
  const slug = generateSlug(`${data.firstName} ${data.lastName}`);

  // Ensure schedule is always an array (required by schema)
  const schedule = data.schedule || generateDoctorSchedule();

  // Ensure credentials is always an array (required by schema)
  const credentials = data.credentials || ["MD", `Specialist în ${data.specialty}`];

  // Ensure languages is always an array (required by schema)
  const languages = data.languages || ["Română", "Engleză"];

  return {
    ...data,
    slug,
    profileComplete: true,
    languages,
    schedule,
    photoUrl:
      data.photoUrl ||
      `https://picsum.photos/seed/doctor-${data.firstName}-${data.lastName}/400/400`,
    credentials,
  };
}

/**
 * Comprehensive doctors seed data
 * 15-20 pediatric specialists across Romania
 */
export const DOCTORS_SEED_DATA: DoctorSeedData[] = [
  // ========== ORTOPEDIE PEDIATRICĂ (Pediatric Orthopedics) ==========
  createDoctor({
    firstName: "Maria",
    lastName: "Popescu",
    title: "Dr.",
    specialty: "Ortopedie pediatrică",
    secondarySpecialties: ["Traumatologie pediatrică"],
    bio: "Doctor specialist în ortopedie pediatrică cu peste 15 ani de experiență. Specializată în tratarea problemelor de postură, accidentărilor sportive și afecțiunilor de dezvoltare la copii. Colaborează activ cu cluburi sportive pentru prevenirea și tratarea accidentărilor la copiii sportivi.",
    yearsOfExperience: 15,
    languages: ["Română", "Engleză", "Franceză"],
    city: "București",
    district: "Sector 1",
    address: "Strada Amzei 10, Sector 1",
    phone: "+40 21 111 1111",
    email: "maria.popescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: true,
    verified: true,
    rating: 5,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Ana",
    lastName: "Dumitrescu",
    title: "Conf. Dr.",
    specialty: "Ortopedie pediatrică",
    secondarySpecialties: ["Traumatologie pediatrică", "Medicină sportivă"],
    bio: "Doctor specialist în ortopedie pediatrică cu experiență în tratarea problemelor de dezvoltare la copiii sportivi. Colaborează cu numeroase cluburi sportive pentru evaluări medicale și tratarea accidentărilor.",
    yearsOfExperience: 12,
    languages: ["Română", "Engleză"],
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 111 111",
    email: "ana.dumitrescu@yuvoo.ro",
    acceptingNewPatients: false,
    onlineConsultations: false,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Ion",
    lastName: "Stoica",
    title: "Dr.",
    specialty: "Ortopedie pediatrică",
    bio: "Doctor specialist în ortopedie pediatrică cu focus pe tratarea problemelor de postură și accidentărilor sportive la copii.",
    yearsOfExperience: 8,
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111, Sector 2",
    phone: "+40 21 222 2222",
    email: "ion.stoica@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Elena",
    lastName: "Marinescu",
    title: "Dr.",
    specialty: "Ortopedie pediatrică",
    bio: "Doctor specialist în ortopedie pediatrică cu experiență în tratarea accidentărilor sportive la copii.",
    yearsOfExperience: 10,
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 111 111",
    email: "elena.marinescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: true,
    verified: false,
    rating: 4,
    verificationStatus: "pending",
  }),

  // ========== NUTRIȚIE PEDIATRICĂ (Pediatric Nutrition) ==========
  createDoctor({
    firstName: "Ion",
    lastName: "Ionescu",
    title: "Dr.",
    specialty: "Nutriție pediatrică",
    secondarySpecialties: ["Endocrinologie pediatrică"],
    bio: "Doctor specialist în nutriție pediatrică. Ajută copiii sportivi să mențină o alimentație echilibrată și sănătoasă, adaptată nevoilor specifice ale fiecărui sport. Colaborează cu antrenori și părinți pentru dezvoltarea unor planuri nutriționale personalizate.",
    yearsOfExperience: 12,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 1",
    address: "Strada Amzei 10, Sector 1",
    phone: "+40 21 333 3333",
    email: "ion.ionescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: true,
    verified: true,
    rating: 5,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Radu",
    lastName: "Marinescu",
    title: "Dr.",
    specialty: "Nutriție pediatrică",
    bio: "Doctor specialist în nutriție pediatrică cu focus pe alimentația copiilor sportivi. Ajută la optimizarea performanței sportive prin planuri nutriționale adaptate.",
    yearsOfExperience: 8,
    languages: ["Română", "Engleză"],
    city: "Iași",
    address: "Strada Sărărie 15",
    phone: "+40 232 111 111",
    email: "radu.marinescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: false,
    rating: 4,
    verificationStatus: "pending",
  }),
  createDoctor({
    firstName: "Carmen",
    lastName: "Georgescu",
    title: "Dr.",
    specialty: "Nutriție pediatrică",
    secondarySpecialties: ["Endocrinologie pediatrică"],
    bio: "Doctor specialist în nutriție pediatrică cu experiență în tratarea problemelor de nutriție la copiii sportivi.",
    yearsOfExperience: 10,
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111, Sector 2",
    phone: "+40 21 444 4444",
    email: "carmen.georgescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: true,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),

  // ========== PSIHOLOGIE SPORTIVĂ (Sports Psychology) ==========
  createDoctor({
    firstName: "Elena",
    lastName: "Georgescu",
    title: "Psiholog",
    specialty: "Psihologie sportivă",
    secondarySpecialties: ["Psihologie pediatrică"],
    credentials: ["Psiholog licențiat", "Specialist în psihologie sportivă"],
    bio: "Psiholog specializat în psihologie sportivă pentru copii. Ajută copiii să gestioneze anxietatea și stresul în sport, să-și dezvolte încrederea și să-și atingă potențialul maxim. Colaborează cu antrenori și părinți pentru dezvoltarea unui mediu sportiv pozitiv.",
    yearsOfExperience: 10,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 1",
    address: "Strada Amzei 10, Sector 1",
    phone: "+40 21 555 5555",
    email: "elena.georgescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: true,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Andrei",
    lastName: "Constantinescu",
    title: "Psiholog",
    specialty: "Psihologie sportivă",
    credentials: ["Psiholog licențiat", "Specialist în psihologie sportivă"],
    bio: "Psiholog specializat în psihologie sportivă pentru copii, cu focus pe dezvoltarea motivației și gestionarea presiunii competitive.",
    yearsOfExperience: 7,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111, Sector 2",
    phone: "+40 21 666 6666",
    email: "andrei.constantinescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: true,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),

  // ========== MEDICINĂ SPORTIVĂ PEDIATRICĂ (Pediatric Sports Medicine) ==========
  createDoctor({
    firstName: "Alexandru",
    lastName: "Constantinescu",
    title: "Dr.",
    specialty: "Medicină sportivă pediatrică",
    secondarySpecialties: ["Cardiologie pediatrică"],
    bio: "Doctor specialist în medicină sportivă pentru copii. Efectuează evaluări medicale sportive și oferă consultații pentru copiii sportivi. Colaborează cu cluburi sportive pentru monitorizarea sănătății copiilor și prevenirea accidentărilor.",
    yearsOfExperience: 14,
    languages: ["Română", "Engleză", "Franceză"],
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 222 222",
    email: "alexandru.constantinescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 5,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Mihai",
    lastName: "Radu",
    title: "Dr.",
    specialty: "Medicină sportivă pediatrică",
    bio: "Doctor specialist în medicină sportivă pentru copii, cu experiență în evaluări medicale sportive și tratarea accidentărilor.",
    yearsOfExperience: 9,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 1",
    address: "Strada Amzei 10, Sector 1",
    phone: "+40 21 777 7777",
    email: "mihai.radu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),

  // ========== CARDIOLOGIE PEDIATRICĂ (Pediatric Cardiology) ==========
  createDoctor({
    firstName: "Mihai",
    lastName: "Stoica",
    title: "Prof. Dr.",
    specialty: "Cardiologie pediatrică",
    secondarySpecialties: ["Medicină sportivă"],
    bio: "Doctor specialist în cardiologie pediatrică. Oferă consultații pentru copiii care practică sporturi competitive, efectuând evaluări cardiace complete și monitorizând sănătatea cardiovasculară. Colaborează cu cluburi sportive pentru evaluări medicale pre-participare.",
    yearsOfExperience: 20,
    languages: ["Română", "Engleză", "Franceză", "Germană"],
    city: "București",
    district: "Sector 1",
    address: "Strada Amzei 10, Sector 1",
    phone: "+40 21 888 8888",
    email: "mihai.stoica@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 5,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Laura",
    lastName: "Pătrașcu",
    title: "Dr.",
    specialty: "Cardiologie pediatrică",
    bio: "Doctor specialist în cardiologie pediatrică cu focus pe evaluări cardiace pentru copiii sportivi.",
    yearsOfExperience: 11,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111, Sector 2",
    phone: "+40 21 999 9999",
    email: "laura.patrascu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),

  // ========== FIZIOTERAPIE PEDIATRICĂ (Pediatric Physiotherapy) ==========
  createDoctor({
    firstName: "Carmen",
    lastName: "Radu",
    title: "Fizioterapeut",
    specialty: "Fizioterapie pediatrică",
    credentials: ["Fizioterapeut licențiat", "Specialist în recuperare pediatrică"],
    bio: "Fizioterapeut specializat în recuperarea copiilor după accidentări sportive. Oferă programe de recuperare personalizate, colaborează cu antrenori pentru prevenirea accidentărilor și ajută copiii să-și revină rapid și sigur la activitatea sportivă.",
    yearsOfExperience: 12,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 1",
    address: "Strada Amzei 10, Sector 1",
    phone: "+40 21 000 0000",
    email: "carmen.radu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Daniel",
    lastName: "Ionescu",
    title: "Fizioterapeut",
    specialty: "Fizioterapie pediatrică",
    credentials: ["Fizioterapeut licențiat", "Specialist în recuperare pediatrică"],
    bio: "Fizioterapeut specializat în recuperarea copiilor după accidentări sportive, cu focus pe prevenirea accidentărilor recurente.",
    yearsOfExperience: 8,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 3",
    address: "Strada Calea Vitan 55, Sector 3",
    phone: "+40 21 111 0000",
    email: "daniel.ionescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),
  createDoctor({
    firstName: "Simona",
    lastName: "Dobrescu",
    title: "Fizioterapeut",
    specialty: "Fizioterapie pediatrică",
    credentials: ["Fizioterapeut licențiat"],
    bio: "Fizioterapeut specializat în recuperarea copiilor după accidentări sportive.",
    yearsOfExperience: 6,
    languages: ["Română"],
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 222 222",
    email: "simona.dobrescu@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: false,
    rating: 3,
    verificationStatus: "pending",
  }),

  // ========== KINEZITERAPIE PEDIATRICĂ (Pediatric Kinesiotherapy) ==========
  createDoctor({
    firstName: "Adrian",
    lastName: "Nicolae",
    title: "Kineziterapeut",
    specialty: "Kineziterapie pediatrică",
    credentials: ["Kineziterapeut licențiat", "Specialist în kineziterapie pediatrică"],
    bio: "Kineziterapeut specializat în dezvoltarea motricității și corectarea problemelor de postură la copiii sportivi. Oferă programe de exerciții personalizate pentru îmbunătățirea performanței și prevenirea accidentărilor.",
    yearsOfExperience: 10,
    languages: ["Română", "Engleză"],
    city: "București",
    district: "Sector 2",
    address: "Calea Floreasca 111, Sector 2",
    phone: "+40 21 222 0000",
    email: "adrian.nicolae@yuvoo.ro",
    acceptingNewPatients: true,
    onlineConsultations: false,
    verified: true,
    rating: 4,
    verificationStatus: "approved",
  }),
];
