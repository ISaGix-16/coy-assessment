import { prisma } from "../src/lib/prisma";
import { DEMO_USER_ID, SWIPE_DIRECTION } from "../src/lib/constants";

interface MockProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  occupation: string;
  interests: string[];
  photos: string[];
}

const MOCK_PROFILES: MockProfile[] = [
  {
    id: "profile-001",
    name: "Aanya Sharma",
    age: 23,
    bio: "Product designer by day, amateur pottery maker by weekend. Always hunting for the best filter coffee in town.",
    location: "Bengaluru, 2 km away",
    occupation: "Product Designer",
    interests: ["Pottery", "Filter Coffee", "Indie Films", "Design"],
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-002",
    name: "Rohan Verma",
    age: 25,
    bio: "Building distributed systems and training for my first half-marathon. Tell me your go-to late-night biryani spot.",
    location: "Hyderabad, 4 km away",
    occupation: "Backend Engineer",
    interests: ["Running", "System Design", "Biryani", "Sci-Fi"],
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-003",
    name: "Meera Nair",
    age: 24,
    bio: "Architect obsessed with sustainable spaces, jazz vinyls, and spontaneous coastal road trips.",
    location: "Mumbai, 3 km away",
    occupation: "Junior Architect",
    interests: ["Architecture", "Jazz", "Road Trips", "Sketching"],
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-004",
    name: "Kabir Malhotra",
    age: 26,
    bio: "Film photographer and creative producer. Let's swap book recommendations over cold brew.",
    location: "Delhi, 5 km away",
    occupation: "Creative Producer",
    interests: ["35mm Film", "Cold Brew", "Reading", "Cycling"],
    photos: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-005",
    name: "Diya Kapoor",
    age: 22,
    bio: "Data analyst who spends way too much time curating Spotify playlists and baking sourdough.",
    location: "Pune, 1 km away",
    occupation: "Data Analyst",
    interests: ["Baking", "Playlists", "Badminton", "Board Games"],
    photos: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-006",
    name: "Arjun Menon",
    age: 27,
    bio: "Founder of a tiny climate-tech startup. Huge fan of bouldering, ramen, and quiet Sunday mornings.",
    location: "Bengaluru, 6 km away",
    occupation: "Startup Founder",
    interests: ["Bouldering", "Ramen", "Climate Tech", "Podcasts"],
    photos: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-007",
    name: "Tara Deshmukh",
    age: 24,
    bio: "Clinical psychologist in training. Dog lover, watercolour painter, and unapologetic trivia nerd.",
    location: "Mumbai, 2 km away",
    occupation: "Psychology Fellow",
    interests: ["Watercolours", "Dogs", "Pub Trivia", "Yoga"],
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-008",
    name: "Vikramaditya Rao",
    age: 25,
    bio: "Aerospace engineer fascinated by drones, astrophotography, and street tacos.",
    location: "Hyderabad, 3 km away",
    occupation: "Aerospace Engineer",
    interests: ["Astrophotography", "Drones", "Tacos", "F1"],
    photos: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-009",
    name: "Nandini Joshi",
    age: 23,
    bio: "Editorial writer covering culture and food. Looking for someone to test new tapas places with.",
    location: "Delhi, 4 km away",
    occupation: "Culture Journalist",
    interests: [
      "Food Writing",
      "Museums",
      "Stand-up Comedy",
      "Thrift Shopping",
    ],
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-010",
    name: "Siddharth Kulkarni",
    age: 26,
    bio: "Acoustic guitarist and iOS developer. Weak spot for rainy evenings and classic rock.",
    location: "Pune, 3 km away",
    occupation: "iOS Developer",
    interests: ["Guitar", "Classic Rock", "Swift", "Trekking"],
    photos: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-011",
    name: "Kavya Reddy",
    age: 24,
    bio: "Biotech researcher by week, salsa dancer by Friday night. Always down for gelato.",
    location: "Hyderabad, 2 km away",
    occupation: "Research Associate",
    interests: ["Salsa", "Gelato", "Genomics", "Travel"],
    photos: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-012",
    name: "Devansh Sethi",
    age: 27,
    bio: "Venture analyst who reads too many newsletters and plays squash to stay sane.",
    location: "Bengaluru, 5 km away",
    occupation: "VC Analyst",
    interests: ["Squash", "Economics", "Espresso", "Chess"],
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-013",
    name: "Rhea Chatterjee",
    age: 25,
    bio: "UX researcher obsessed with human behavior, botanical gardens, and Bengali sweets.",
    location: "Kolkata, 3 km away",
    occupation: "UX Researcher",
    interests: ["Botany", "Psychology", "Art Galleries", "Baking"],
    photos: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-014",
    name: "Aarav Bansal",
    age: 24,
    bio: "Full-stack dev, mechanical keyboard enthusiast, and weekend tennis player.",
    location: "Gurugram, 4 km away",
    occupation: "Software Engineer",
    interests: ["Keyboards", "Tennis", "Open Source", "Matcha"],
    photos: [
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-015",
    name: "Sanya Mirza",
    age: 23,
    bio: "Fashion stylist with a soft spot for vintage bookstores and midnight drives.",
    location: "Mumbai, 6 km away",
    occupation: "Fashion Stylist",
    interests: ["Vintage Fashion", "Bookstores", "Night Drives", "Photography"],
    photos: [
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-016",
    name: "Pranav Iyer",
    age: 28,
    bio: "Cardiology resident surviving on hospital coffee and weekend coastal hikes.",
    location: "Chennai, 5 km away",
    occupation: "Medical Resident",
    interests: ["Hiking", "Specialty Coffee", "Documentaries", "Swimming"],
    photos: [
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-017",
    name: "Ananya Pillai",
    age: 24,
    bio: "Motion designer bringing illustrations to life. Looking for a co-op partner for Overcooked.",
    location: "Bengaluru, 1 km away",
    occupation: "Motion Designer",
    interests: ["Animation", "Co-op Gaming", "Anime", "Ramen"],
    photos: [
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-018",
    name: "Nikhil Choudhary",
    age: 26,
    bio: "Supply chain strategist and amateur bartender. Ask me about my mango habanero margarita.",
    location: "Delhi, 3 km away",
    occupation: "Operations Lead",
    interests: ["Mixology", "Cooking", "Football", "Travel"],
    photos: [
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-019",
    name: "Ishita Bose",
    age: 25,
    bio: "Environmental lawyer fighting for cleaner rivers. Weekend kayaker and poetry reader.",
    location: "Kolkata, 2 km away",
    occupation: "Environmental Lawyer",
    interests: ["Kayaking", "Poetry", "Sustainability", "Tea"],
    photos: [
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-020",
    name: "Karan Gill",
    age: 27,
    bio: "Sound engineer mixing indie records. Always carrying earplugs and a pocket notebook.",
    location: "Mumbai, 4 km away",
    occupation: "Audio Engineer",
    interests: ["Music Production", "Live Gigs", "Vinyl", "Skateboarding"],
    photos: [
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-021",
    name: "Shruti Hegde",
    age: 23,
    bio: "Robotics grad student teaching arms how to fold laundry. Fueled by masala dosa.",
    location: "Bengaluru, 3 km away",
    occupation: "Robotics Researcher",
    interests: ["Robotics", "Masala Dosa", "Sci-Fi", "Origami"],
    photos: [
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-022",
    name: "Aditya Saxena",
    age: 25,
    bio: "Quantitative researcher who loves poker nights, mountain biking, and street photography.",
    location: "Gurugram, 2 km away",
    occupation: "Quant Analyst",
    interests: ["Mountain Biking", "Poker", "Street Photography", "Math"],
    photos: [
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-023",
    name: "Pooja Menon",
    age: 26,
    bio: "Brand strategist and classical Bharatanatyam dancer. Equally happy at a gallery or a food truck.",
    location: "Chennai, 3 km away",
    occupation: "Brand Strategist",
    interests: ["Classical Dance", "Food Trucks", "Branding", "Cinema"],
    photos: [
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-024",
    name: "Harshvardhan Joshi",
    age: 28,
    bio: "Pastry chef experimenting with Indian spices in French desserts. Bring an appetite.",
    location: "Pune, 2 km away",
    occupation: "Pastry Chef",
    interests: ["Pastry", "Spices", "Farmers Markets", "Cycling"],
    photos: [
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-025",
    name: "Neha Kulkarni",
    age: 24,
    bio: "ML engineer working on speech models. Weekend birdwatcher and crossword addict.",
    location: "Hyderabad, 5 km away",
    occupation: "ML Engineer",
    interests: ["Birdwatching", "Crosswords", "NLP", "Filter Coffee"],
    photos: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-026",
    name: "Manish Tiwari",
    age: 26,
    bio: "Civil engineer building metro bridges. Loves historic forts, chai, and cricket.",
    location: "Delhi, 6 km away",
    occupation: "Structural Engineer",
    interests: ["History", "Chai", "Cricket", "Architecture"],
    photos: [
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-027",
    name: "Zoya Siddiqui",
    age: 23,
    bio: "Illustrator and zine publisher. Looking for someone to explore hidden bookstores with.",
    location: "Mumbai, 1 km away",
    occupation: "Illustrator",
    interests: ["Zines", "Illustration", "Indie Music", "Cats"],
    photos: [
      "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-028",
    name: "Rahul Nambiar",
    age: 27,
    bio: "Product manager by day, scuba diver whenever PTO allows. Always planning the next dive.",
    location: "Bengaluru, 4 km away",
    occupation: "Product Manager",
    interests: ["Scuba Diving", "Marine Life", "Product", "Board Games"],
    photos: [
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-029",
    name: "Simran Kaur",
    age: 25,
    bio: "Nutritionist who still believes pizza is a vital food group. Enthusiastic spin-class regular.",
    location: "Chandigarh, 2 km away",
    occupation: "Clinical Nutritionist",
    interests: ["Spin Class", "Neapolitan Pizza", "Wellness", "Hiking"],
    photos: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-030",
    name: "Varun Menon",
    age: 26,
    bio: "Game developer crafting indie narrative adventures. Big fan of rainy treks and ramen.",
    location: "Pune, 4 km away",
    occupation: "Game Developer",
    interests: ["Indie Games", "Storytelling", "Monsoon Treks", "Pixel Art"],
    photos: [
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-031",
    name: "Kritika Verma",
    age: 24,
    bio: "Public policy researcher debating urban transit over iced lattes.",
    location: "Delhi, 2 km away",
    occupation: "Policy Analyst",
    interests: ["Urbanism", "Public Transit", "Iced Lattes", "Non-Fiction"],
    photos: [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "profile-032",
    name: "Yashvardhan Singh",
    age: 27,
    bio: "Renewable energy consultant, amateur astronomer, and loyal golden retriever dad.",
    location: "Hyderabad, 3 km away",
    occupation: "Solar Consultant",
    interests: ["Astronomy", "Golden Retrievers", "Clean Energy", "Camping"],
    photos: [
      "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export async function seedDatabase() {
  // Clean existing records
  await prisma.match.deleteMany();
  await prisma.swipe.deleteMany();
  await prisma.user.deleteMany();

  // Demo user
  await prisma.user.create({
    data: {
      id: DEMO_USER_ID,
      name: "Aman Arya",
      age: 22,
      bio: "Full-stack builder & engineering student exploring clean product design.",
      location: "Hyderabad, India",
      occupation: "Software Developer",
      interests: JSON.stringify([
        "Full-Stack Dev",
        "UI Design",
        "Coffee",
        "Badminton",
      ]),
      photos: JSON.stringify([
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      ]),
    },
  });

  // Other profiles
  for (const profile of MOCK_PROFILES) {
    await prisma.user.create({
      data: {
        id: profile.id,
        name: profile.name,
        age: profile.age,
        bio: profile.bio,
        location: profile.location,
        occupation: profile.occupation,
        interests: JSON.stringify(profile.interests),
        photos: JSON.stringify(profile.photos),
      },
    });
  }

  // Pre-seed 10 incoming RIGHT likes (for demo user 001)
  const preLikedProfiles = MOCK_PROFILES.slice(0, 10);
  await prisma.swipe.createMany({
    data: preLikedProfiles.map((profile) => ({
      swiperId: profile.id,
      swipedId: DEMO_USER_ID,
      direction: SWIPE_DIRECTION.RIGHT,
    })),
  });
}

// Run when executed directly via CLI (`npx prisma db seed` or `npx tsx prisma/seed.ts`)
if (require.main === module) {
  seedDatabase()
    .then(async () => {
      console.log(
        "Seeded 1 demo user, 32 mock profiles, and 10 pre-existing incoming likes.",
      );
      await prisma.$disconnect();
    })
    .catch(async (error) => {
      console.error("Seed failed:", error);
      await prisma.$disconnect();
      process.exit(1);
    });
}
