/**
 * Database Seed Script
 *
 * Populates the database with sample data for development and testing.
 * Run with: npx tsx src/lib/db/seed.ts
 *
 * This script creates:
 * - Sports list (as clubs with different sport types)
 * - Sample clubs (30+ sports clubs in Romania)
 * - Sample doctors (5-10 pediatric specialists)
 * - Test users (parent accounts)
 */

import * as dotenv from "dotenv";
import { db } from "./index";
import { clubs, doctors, users } from "./schema";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Note: Sports and cities are embedded in the sample data below
// Sports covered: fotbal, baschet, tenis, inot, gimnastica, dans, karate, judo, volei, handbal, atletism, ciclism, echitatie, schi, patinaj, hochei, scrima, tenis-de-masa, badminton, rugby
// Cities covered: București, Cluj-Napoca, Timișoara, Iași, Constanța, Craiova, Brașov, Galați, Ploiești

/**
 * Sample Clubs Data
 */
const sampleClubs = [
  // Fotbal
  {
    name: "Fotbal Club Junior București",
    description:
      "Club de fotbal pentru copii cu programe pentru toate vârstele. Antrenori certificați și facilități moderne.",
    sportType: "fotbal",
    city: "București",
    address: "Strada Sportului 10, Sector 1",
    phone: "+40 21 123 4567",
    email: "contact@fcjunior.ro",
    website: "https://fcjunior.ro",
    verified: true,
    featured: true,
    rating: 5,
  },
  {
    name: "Academia de Fotbal Steaua",
    description: "Academia de fotbal cu tradiție, programe pentru copii de la 5 ani.",
    sportType: "fotbal",
    city: "București",
    address: "Bulevardul Ghencea 35",
    phone: "+40 21 234 5678",
    email: "info@academiasteaua.ro",
    verified: true,
    featured: false,
    rating: 4,
  },
  {
    name: "FC Junior Cluj",
    description: "Club de fotbal pentru copii în Cluj-Napoca.",
    sportType: "fotbal",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 123 456",
    verified: false,
    featured: false,
    rating: 4,
  },
  // Baschet
  {
    name: "Baschet Club Junior București",
    description: "Club de baschet pentru copii cu programe competitive și recreative.",
    sportType: "baschet",
    city: "București",
    address: "Calea Floreasca 111",
    phone: "+40 21 345 6789",
    email: "contact@bcjunior.ro",
    verified: true,
    featured: true,
    rating: 5,
  },
  {
    name: "Academia de Baschet Dinamo",
    description: "Academia de baschet cu programe pentru toate vârstele.",
    sportType: "baschet",
    city: "București",
    address: "Strada Maior Coravu 2",
    phone: "+40 21 456 7890",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Tenis
  {
    name: "Tenis Club Junior",
    description: "Club de tenis pentru copii cu terenuri acoperite și în aer liber.",
    sportType: "tenis",
    city: "București",
    address: "Bulevardul Iuliu Maniu 7",
    phone: "+40 21 567 8901",
    email: "info@tenisjunior.ro",
    verified: true,
    featured: true,
    rating: 5,
  },
  {
    name: "Tenis Club Cluj",
    description: "Club de tenis pentru copii în Cluj-Napoca.",
    sportType: "tenis",
    city: "Cluj-Napoca",
    address: "Strada Observatorului 34",
    phone: "+40 264 234 567",
    verified: false,
    featured: false,
    rating: 4,
  },
  // Înot
  {
    name: "Clubul de Înot Junior",
    description: "Club de înot pentru copii cu bazin olimpic și antrenori specializați.",
    sportType: "inot",
    city: "București",
    address: "Bulevardul Basarabia 37-39",
    phone: "+40 21 678 9012",
    email: "contact@inotjunior.ro",
    website: "https://inotjunior.ro",
    verified: true,
    featured: true,
    rating: 5,
  },
  {
    name: "Academia de Înot Olimpia",
    description: "Academia de înot cu programe pentru începători și avansați.",
    sportType: "inot",
    city: "București",
    address: "Strada Amzei 10",
    phone: "+40 21 789 0123",
    verified: true,
    featured: false,
    rating: 4,
  },
  {
    name: "Clubul de Înot Constanța",
    description: "Club de înot pentru copii în Constanța.",
    sportType: "inot",
    city: "Constanța",
    address: "Bulevardul Mamaia 255",
    phone: "+40 241 123 456",
    verified: false,
    featured: false,
    rating: 4,
  },
  // Gimnastică
  {
    name: "Clubul de Gimnastică Artistică",
    description: "Club de gimnastică artistică pentru copii cu programe competitive.",
    sportType: "gimnastica",
    city: "București",
    address: "Strada Gheorghe Manu 2-4",
    phone: "+40 21 890 1234",
    email: "info@gimnasticajunior.ro",
    verified: true,
    featured: true,
    rating: 5,
  },
  {
    name: "Gimnastică Ritmică Junior",
    description: "Club de gimnastică ritmică pentru fete.",
    sportType: "gimnastica",
    city: "București",
    address: "Calea Victoriei 120",
    phone: "+40 21 901 2345",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Dans
  {
    name: "Academia de Dans Junior",
    description: "Academia de dans cu programe de balet, dans modern și latino.",
    sportType: "dans",
    city: "București",
    address: "Strada Franceză 15",
    phone: "+40 21 012 3456",
    email: "contact@dansjunior.ro",
    verified: true,
    featured: true,
    rating: 5,
  },
  {
    name: "Balet Studio Cluj",
    description: "Studio de balet pentru copii în Cluj-Napoca.",
    sportType: "dans",
    city: "Cluj-Napoca",
    address: "Strada Memorandumului 28",
    phone: "+40 264 345 678",
    verified: false,
    featured: false,
    rating: 4,
  },
  // Karate
  {
    name: "Karate Dojo Junior",
    description: "Dojo de karate pentru copii cu programe tradiționale și moderne.",
    sportType: "karate",
    city: "București",
    address: "Strada Calea Vitan 55",
    phone: "+40 21 123 4567",
    verified: true,
    featured: false,
    rating: 4,
  },
  {
    name: "Karate Club Timișoara",
    description: "Club de karate pentru copii în Timișoara.",
    sportType: "karate",
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 123 456",
    verified: false,
    featured: false,
    rating: 4,
  },
  // Judo
  {
    name: "Judo Club Junior",
    description: "Club de judo pentru copii cu antrenori certificați.",
    sportType: "judo",
    city: "București",
    address: "Strada Gheorghe Manu 2-4",
    phone: "+40 21 234 5678",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Volei
  {
    name: "Volei Club Junior",
    description: "Club de volei pentru copii cu programe competitive.",
    sportType: "volei",
    city: "București",
    address: "Strada Sportului 10",
    phone: "+40 21 345 6789",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Handbal
  {
    name: "Handbal Club Junior",
    description: "Club de handbal pentru copii cu programe pentru toate vârstele.",
    sportType: "handbal",
    city: "București",
    address: "Bulevardul Iuliu Maniu 7",
    phone: "+40 21 456 7890",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Atletism
  {
    name: "Atletism Club Junior",
    description: "Club de atletism pentru copii cu programe de pregătire.",
    sportType: "atletism",
    city: "București",
    address: "Strada Basarabia 37-39",
    phone: "+40 21 567 8901",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Ciclism
  {
    name: "Ciclism Club Junior",
    description: "Club de ciclism pentru copii cu programe de antrenament.",
    sportType: "ciclism",
    city: "București",
    address: "Calea Floreasca 111",
    phone: "+40 21 678 9012",
    verified: false,
    featured: false,
    rating: 3,
  },
  // Echiță
  {
    name: "Echiță Club Junior",
    description: "Club de echiță pentru copii cu cai și instructori specializați.",
    sportType: "echitatie",
    city: "București",
    address: "Șoseaua Chitila 1",
    phone: "+40 21 789 0123",
    verified: true,
    featured: true,
    rating: 5,
  },
  // Schi
  {
    name: "Schi Club Junior Brașov",
    description: "Club de schi pentru copii în Brașov.",
    sportType: "schi",
    city: "Brașov",
    address: "Strada Poiana Brașov 1",
    phone: "+40 268 123 456",
    verified: true,
    featured: true,
    rating: 5,
  },
  // Patinaj
  {
    name: "Patinaj Club Junior",
    description: "Club de patinaj artistic pentru copii.",
    sportType: "patinaj",
    city: "București",
    address: "Bulevardul Basarabia 37-39",
    phone: "+40 21 890 1234",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Hochei
  {
    name: "Hochei Club Junior",
    description: "Club de hochei pe gheață pentru copii.",
    sportType: "hochei",
    city: "București",
    address: "Strada Sportului 10",
    phone: "+40 21 901 2345",
    verified: false,
    featured: false,
    rating: 3,
  },
  // Scrimă
  {
    name: "Scrimă Club Junior",
    description: "Club de scrimă pentru copii cu programe competitive.",
    sportType: "scrima",
    city: "București",
    address: "Strada Gheorghe Manu 2-4",
    phone: "+40 21 012 3456",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Tenis de masă
  {
    name: "Tenis de Masă Club Junior",
    description: "Club de tenis de masă pentru copii.",
    sportType: "tenis-de-masa",
    city: "București",
    address: "Bulevardul Iuliu Maniu 7",
    phone: "+40 21 123 4567",
    verified: false,
    featured: false,
    rating: 3,
  },
  // Badminton
  {
    name: "Badminton Club Junior",
    description: "Club de badminton pentru copii.",
    sportType: "badminton",
    city: "București",
    address: "Calea Floreasca 111",
    phone: "+40 21 234 5678",
    verified: false,
    featured: false,
    rating: 3,
  },
  // Rugby
  {
    name: "Rugby Club Junior",
    description: "Club de rugby pentru copii cu programe de antrenament.",
    sportType: "rugby",
    city: "București",
    address: "Strada Sportului 10",
    phone: "+40 21 345 6789",
    verified: true,
    featured: false,
    rating: 4,
  },
  // Additional clubs for variety
  {
    name: "Fotbal Club Iași",
    description: "Club de fotbal pentru copii în Iași.",
    sportType: "fotbal",
    city: "Iași",
    address: "Strada Sărărie 15",
    phone: "+40 232 123 456",
    verified: false,
    featured: false,
    rating: 4,
  },
  {
    name: "Baschet Club Timișoara",
    description: "Club de baschet pentru copii în Timișoara.",
    sportType: "baschet",
    city: "Timișoara",
    address: "Bulevardul Revoluției din 1989, nr. 5",
    phone: "+40 256 234 567",
    verified: false,
    featured: false,
    rating: 4,
  },
  {
    name: "Înot Club Galați",
    description: "Club de înot pentru copii în Galați.",
    sportType: "inot",
    city: "Galați",
    address: "Bulevardul George Coșbuc 62",
    phone: "+40 236 123 456",
    verified: false,
    featured: false,
    rating: 3,
  },
  {
    name: "Gimnastică Club Craiova",
    description: "Club de gimnastică pentru copii în Craiova.",
    sportType: "gimnastica",
    city: "Craiova",
    address: "Strada Calea Unirii 15",
    phone: "+40 251 123 456",
    verified: false,
    featured: false,
    rating: 3,
  },
  {
    name: "Dans Club Ploiești",
    description: "Club de dans pentru copii în Ploiești.",
    sportType: "dans",
    city: "Ploiești",
    address: "Strada Independenței 1",
    phone: "+40 244 123 456",
    verified: false,
    featured: false,
    rating: 3,
  },
];

/**
 * Sample Doctors Data
 */
const sampleDoctors = [
  {
    firstName: "Maria",
    lastName: "Popescu",
    specialty: "Ortopedie pediatrică",
    bio: "Doctor specialist în ortopedie pediatrică cu peste 15 ani de experiență. Specializată în tratarea problemelor de postură și accidentărilor sportive la copii.",
    city: "București",
    phone: "+40 21 111 1111",
    email: "maria.popescu@yuvoo.ro",
    verified: true,
    acceptingNewPatients: true,
    rating: 5,
  },
  {
    firstName: "Ion",
    lastName: "Ionescu",
    specialty: "Nutriție pediatrică",
    bio: "Doctor specialist în nutriție pediatrică. Ajută copiii sportivi să mențină o alimentație echilibrată și sănătoasă.",
    city: "București",
    phone: "+40 21 222 2222",
    email: "ion.ionescu@yuvoo.ro",
    verified: true,
    acceptingNewPatients: true,
    rating: 5,
  },
  {
    firstName: "Elena",
    lastName: "Georgescu",
    specialty: "Psihologie sportivă",
    bio: "Psiholog specializat în psihologie sportivă pentru copii. Ajută copiii să gestioneze anxietatea și stresul în sport.",
    city: "București",
    phone: "+40 21 333 3333",
    email: "elena.georgescu@yuvoo.ro",
    verified: true,
    acceptingNewPatients: true,
    rating: 4,
  },
  {
    firstName: "Alexandru",
    lastName: "Constantinescu",
    specialty: "Medicină sportivă pediatrică",
    bio: "Doctor specialist în medicină sportivă pentru copii. Evaluări medicale sportive și consultații pentru copiii sportivi.",
    city: "Cluj-Napoca",
    phone: "+40 264 111 111",
    email: "alexandru.constantinescu@yuvoo.ro",
    verified: true,
    acceptingNewPatients: true,
    rating: 5,
  },
  {
    firstName: "Ana",
    lastName: "Dumitrescu",
    specialty: "Ortopedie pediatrică",
    bio: "Doctor specialist în ortopedie pediatrică cu experiență în tratarea problemelor de dezvoltare la copiii sportivi.",
    city: "Timișoara",
    phone: "+40 256 111 111",
    email: "ana.dumitrescu@yuvoo.ro",
    verified: true,
    acceptingNewPatients: false,
    rating: 4,
  },
  {
    firstName: "Mihai",
    lastName: "Stoica",
    specialty: "Cardiologie pediatrică",
    bio: "Doctor specialist în cardiologie pediatrică. Consultații pentru copiii care practică sporturi competitive.",
    city: "București",
    phone: "+40 21 444 4444",
    email: "mihai.stoica@yuvoo.ro",
    verified: true,
    acceptingNewPatients: true,
    rating: 5,
  },
  {
    firstName: "Carmen",
    lastName: "Radu",
    specialty: "Fizioterapie pediatrică",
    bio: "Fizioterapeut specializat în recuperarea copiilor după accidentări sportive.",
    city: "București",
    phone: "+40 21 555 5555",
    email: "carmen.radu@yuvoo.ro",
    verified: true,
    acceptingNewPatients: true,
    rating: 4,
  },
  {
    firstName: "Radu",
    lastName: "Marinescu",
    specialty: "Nutriție pediatrică",
    bio: "Doctor specialist în nutriție pediatrică cu focus pe alimentația copiilor sportivi.",
    city: "Iași",
    phone: "+40 232 111 111",
    email: "radu.marinescu@yuvoo.ro",
    verified: false,
    acceptingNewPatients: true,
    rating: 4,
  },
];

/**
 * Test Users Data
 */
const testUsers = [
  {
    stackUserId: "test-user-1",
    email: "parent1@test.yuvoo.ro",
    role: "parent" as const,
    firstName: "Ion",
    lastName: "Părinte",
    phone: "+40 700 000 001",
  },
  {
    stackUserId: "test-user-2",
    email: "parent2@test.yuvoo.ro",
    role: "parent" as const,
    firstName: "Maria",
    lastName: "Mamă",
    phone: "+40 700 000 002",
  },
  {
    stackUserId: "test-user-3",
    email: "parent3@test.yuvoo.ro",
    role: "parent" as const,
    firstName: "Alexandru",
    lastName: "Tată",
    phone: "+40 700 000 003",
  },
];

/**
 * Main seed function
 */
async function seed() {
  try {
    console.log("🌱 Starting database seed...\n");

    // Seed Users
    console.log("📝 Seeding test users...");
    for (const user of testUsers) {
      try {
        await db.insert(users).values({
          id: crypto.randomUUID(),
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        console.log(`   ✅ Created user: ${user.email}`);
      } catch (_error) {
        console.log(`   ⚠️  User ${user.email} might already exist, skipping...`);
      }
    }

    // Seed Clubs
    console.log("\n🏃 Seeding clubs...");
    let clubsCreated = 0;
    for (const club of sampleClubs) {
      try {
        await db.insert(clubs).values({
          id: crypto.randomUUID(),
          ...club,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        clubsCreated++;
        console.log(`   ✅ Created club: ${club.name} (${club.sportType})`);
      } catch (_error) {
        console.log(`   ⚠️  Club ${club.name} might already exist, skipping...`);
      }
    }
    console.log(`   📊 Total clubs created: ${clubsCreated}/${sampleClubs.length}`);

    // Seed Doctors
    console.log("\n👨‍⚕️ Seeding doctors...");
    let doctorsCreated = 0;
    for (const doctor of sampleDoctors) {
      try {
        await db.insert(doctors).values({
          id: crypto.randomUUID(),
          ...doctor,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        doctorsCreated++;
        console.log(
          `   ✅ Created doctor: ${doctor.firstName} ${doctor.lastName} (${doctor.specialty})`
        );
      } catch (_error) {
        console.log(
          `   ⚠️  Doctor ${doctor.firstName} ${doctor.lastName} might already exist, skipping...`
        );
      }
    }
    console.log(`   📊 Total doctors created: ${doctorsCreated}/${sampleDoctors.length}`);

    console.log("\n✅ Database seed completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Users: ${testUsers.length}`);
    console.log(`   - Clubs: ${clubsCreated}`);
    console.log(`   - Doctors: ${doctorsCreated}`);
    console.log(
      `   - Sports covered: ${new Set(sampleClubs.map((c) => c.sportType)).size} different sports`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed if called directly
if (require.main === module) {
  seed()
    .then(() => {
      console.log("\n✨ Seed process finished!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seed process failed:", error);
      process.exit(1);
    });
}

export { seed };
