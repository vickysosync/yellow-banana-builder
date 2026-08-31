// Mock/demo content for The Yellow Banana Preschool And Activity Club.
// All content lives here so the admin panel can replace it via localStorage.

import heroImg from "@/assets/hero-preschool.jpg";
import artImg from "@/assets/art-craft.jpg";
import danceImg from "@/assets/activities-dance.jpg";
import storyImg from "@/assets/story-time.jpg";

export const IMAGES = { hero: heroImg, art: artImg, dance: danceImg, story: storyImg };

export type Status = "active" | "inactive";

export interface Hero {
  badge: string;
  heading: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
}

export interface ApproachCard {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export interface About {
  heading: string;
  description: string;
  story: string;
  image: string;
  approach: ApproachCard[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  image: string;
  accent: "yellow" | "green" | "sky" | "coral";
  status: Status;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  emoji: string;
  image: string;
  status: Status;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  status: Status;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  status: Status;
  /** demo flag: replace with real reviews from the admin panel */
  demo: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  emoji: string;
  status: Status;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  status: Status;
}

export interface ContactInfo {
  businessName: string;
  phone: string;
  address: string;
  website: string;
  email: string;
}

export interface Settings {
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  website: string;
  footerText: string;
  primaryCta: string;
}

export type EnquiryStatus = "New" | "Contacted" | "Completed";

export interface Enquiry {
  id: string;
  parentName: string;
  childName: string;
  childAge: string;
  phone: string;
  program: string;
  message: string;
  date: string;
  status: EnquiryStatus;
}

export interface SiteData {
  hero: Hero;
  about: About;
  programs: Program[];
  activities: Activity[];
  skills: Skill[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  features: Feature[];
  facilities: Facility[];
  contact: ContactInfo;
  settings: Settings;
  enquiries: Enquiry[];
}

export const GALLERY_CATEGORIES = [
  "Classroom",
  "Activities",
  "Events",
  "Summer Camp",
  "Celebrations",
  "Learning",
  "Facilities",
];

export const initialData: SiteData = {
  hero: {
    badge: "Since 2017 • Chinchpokli, Mumbai",
    heading: "Where Little Minds Learn, Play & Grow",
    description:
      "Montessori-inspired, play-based early learning with a warm, safe and nurturing environment for children aged 1.10 to 6 years.",
    primaryCta: "Book a Visit",
    secondaryCta: "Explore Programs",
    image: heroImg,
  },
  about: {
    heading: "Growing Curious Minds Since 2017",
    description:
      "The Yellow Banana Preschool And Activity Club is a highly-rated early childhood educational institution in Chinchpokli, Mumbai. Since 2017, we have created a safe, hygienic and engaging environment where children can develop confidence, creativity, communication and foundational academic skills.",
    story:
      "What began as one warm little classroom has grown into a joyful learning home for hundreds of Mumbai families — built on patience, play and genuine care for every child who walks in.",
    image: storyImg,
    approach: [
      {
        id: "a1",
        title: "Child-Centric Learning",
        description:
          "Modern Montessori-based, play-centered learning designed around the child's natural curiosity.",
        emoji: "🌱",
      },
      {
        id: "a2",
        title: "Low Screen-Time",
        description:
          "Hands-on toys, physical learning materials and interactive activities encourage natural cognitive and motor development.",
        emoji: "🧩",
      },
      {
        id: "a3",
        title: "Personalized Care",
        description:
          "A strict 1:10 teacher-to-student ratio allows educators to provide individual attention and track progress.",
        emoji: "💛",
      },
    ],
  },
  programs: [
    {
      id: "p1",
      name: "Playgroup",
      description:
        "Age-focused early learning through play, movement, stories and sensory activities.",
      ageGroup: "1.10 – 2.5 Years",
      image: heroImg,
      accent: "yellow",
      status: "active",
    },
    {
      id: "p2",
      name: "Nursery",
      description: "Building communication, independence, social skills and early concepts.",
      ageGroup: "2.5 – 3.5 Years",
      image: storyImg,
      accent: "green",
      status: "active",
    },
    {
      id: "p3",
      name: "LKG",
      description: "Strengthening literacy, numeracy, creativity and classroom confidence.",
      ageGroup: "3.5 – 4.5 Years",
      image: artImg,
      accent: "sky",
      status: "active",
    },
    {
      id: "p4",
      name: "UKG",
      description: "Preparing children with strong foundational academic and social skills.",
      ageGroup: "4.5 – 6 Years",
      image: danceImg,
      accent: "coral",
      status: "active",
    },
  ],
  activities: [
    {
      id: "ac1",
      name: "Gymnastics",
      description: "Balance, flexibility and body confidence through guided, age-safe routines.",
      emoji: "🤸",
      image: danceImg,
      status: "active",
    },
    {
      id: "ac2",
      name: "Physical Training",
      description: "Fun fitness games that build stamina, coordination and healthy habits.",
      emoji: "⚽",
      image: danceImg,
      status: "active",
    },
    {
      id: "ac3",
      name: "Children's Dance",
      description: "Rhythm, expression and joyful movement in a supportive group setting.",
      emoji: "💃",
      image: danceImg,
      status: "active",
    },
    {
      id: "ac4",
      name: "Summer Camps",
      description: "Theme-based holiday camps packed with crafts, games, music and discovery.",
      emoji: "🌞",
      image: artImg,
      status: "active",
    },
    {
      id: "ac5",
      name: "Creative Activities",
      description: "Art, craft, clay and storytelling that nurture imagination and expression.",
      emoji: "🎨",
      image: artImg,
      status: "active",
    },
    {
      id: "ac6",
      name: "Interactive Learning",
      description: "Hands-on group learning that makes concepts click through doing.",
      emoji: "🧠",
      image: storyImg,
      status: "active",
    },
  ],
  skills: [
    {
      id: "s1",
      name: "Jolly Phonics",
      description:
        "Certified phonics learning for strong early reading and pronunciation skills.",
      emoji: "🔤",
    },
    {
      id: "s2",
      name: "Grammar",
      description: "Structured grammar development for confident communication.",
      emoji: "✏️",
    },
    {
      id: "s3",
      name: "Abacus Mental Math",
      description: "Developing concentration, visualization and mental calculation skills.",
      emoji: "🧮",
    },
    {
      id: "s4",
      name: "Creative Learning",
      description: "Hands-on activities encouraging imagination, problem-solving and expression.",
      emoji: "🌈",
    },
  ],
  gallery: [
    {
      id: "g1",
      title: "Montessori Work Time",
      category: "Classroom",
      description: "Children exploring wooden Montessori materials with their teacher.",
      image: heroImg,
      status: "active",
    },
    {
      id: "g2",
      title: "Story Circle",
      category: "Learning",
      description: "Daily story time on our reading rug.",
      image: storyImg,
      status: "active",
    },
    {
      id: "g3",
      title: "Art & Craft Corner",
      category: "Activities",
      description: "Painting session with our little artists.",
      image: artImg,
      status: "active",
    },
    {
      id: "g4",
      title: "Dance & Movement",
      category: "Activities",
      description: "Children's dance class in the activity room.",
      image: danceImg,
      status: "active",
    },
    {
      id: "g5",
      title: "Summer Camp Fun",
      category: "Summer Camp",
      description: "Theme week crafts during our summer camp.",
      image: artImg,
      status: "active",
    },
    {
      id: "g6",
      title: "Annual Day Celebration",
      category: "Celebrations",
      description: "Our tiny performers on stage.",
      image: danceImg,
      status: "active",
    },
    {
      id: "g7",
      title: "Learning Together",
      category: "Events",
      description: "Parent-teacher interaction morning.",
      image: storyImg,
      status: "active",
    },
    {
      id: "g8",
      title: "Bright, Safe Classrooms",
      category: "Facilities",
      description: "Ground-floor, child-safe and hygienic learning spaces.",
      image: heroImg,
      status: "active",
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Priya S.",
      role: "Parent of Preschool Student",
      quote:
        "An incredibly warm and caring environment. The teachers give personal attention and genuinely understand every child's needs.",
      rating: 5,
      status: "active",
      demo: true,
    },
    {
      id: "t2",
      name: "Rahul M.",
      role: "Parent of Nursery Student",
      quote:
        "My son went from shy to confident in three months. The phonics programme has been wonderful for his reading.",
      rating: 5,
      status: "active",
      demo: true,
    },
    {
      id: "t3",
      name: "Anjali K.",
      role: "Parent of LKG Student",
      quote:
        "Spotlessly clean premises and a very safe setup. As a working mother in Chinchpokli, that peace of mind means everything.",
      rating: 5,
      status: "active",
      demo: true,
    },
    {
      id: "t4",
      name: "Sneha D.",
      role: "Parent of Playgroup Student",
      quote:
        "Low screen time and lots of hands-on play — exactly what we wanted for our toddler's first school.",
      rating: 5,
      status: "active",
      demo: true,
    },
    {
      id: "t5",
      name: "Imran Q.",
      role: "Parent of UKG Student",
      quote:
        "The activity club is a lovely bonus. Gymnastics and dance have done wonders for my daughter's confidence.",
      rating: 4,
      status: "active",
      demo: true,
    },
    {
      id: "t6",
      name: "Meera J.",
      role: "Parent of Nursery Student",
      quote:
        "Teachers share regular updates and celebrate every small milestone. It truly feels like a partnership.",
      rating: 5,
      status: "active",
      demo: true,
    },
  ],
  features: [
    {
      id: "f1",
      title: "Experienced Educators",
      description: "Trained, patient teachers with years of early-childhood experience.",
      emoji: "👩‍🏫",
      status: "active",
    },
    {
      id: "f2",
      title: "1:10 Teacher-Student Ratio",
      description: "Small groups so every child is seen, heard and guided.",
      emoji: "🙌",
      status: "active",
    },
    {
      id: "f3",
      title: "Montessori-Based Learning",
      description: "Play-led, hands-on curriculum built around natural curiosity.",
      emoji: "🧩",
      status: "active",
    },
    {
      id: "f4",
      title: "Clean & Hygienic Premises",
      description: "Daily sanitisation and strict hygiene routines throughout the day.",
      emoji: "🧼",
      status: "active",
    },
    {
      id: "f5",
      title: "Child-Safe Environment",
      description: "Ground-floor premises with child-proofed furniture and supervision.",
      emoji: "🛡️",
      status: "active",
    },
    {
      id: "f6",
      title: "Transparent Parent Communication",
      description: "Regular progress updates and open conversations with families.",
      emoji: "💬",
      status: "active",
    },
  ],
  facilities: [
    {
      id: "fa1",
      name: "Ground-Floor Premises",
      description: "Easy, step-free access for toddlers and parents alike.",
      image: heroImg,
      status: "active",
    },
    {
      id: "fa2",
      name: "Child-Safe Infrastructure",
      description: "Rounded furniture, secure entry and constant supervision.",
      image: storyImg,
      status: "active",
    },
    {
      id: "fa3",
      name: "Clean & Hygienic Spaces",
      description: "Sanitised classrooms, washrooms and learning materials.",
      image: artImg,
      status: "active",
    },
    {
      id: "fa4",
      name: "Interactive Learning Areas",
      description: "Dedicated zones for reading, creative play and activities.",
      image: danceImg,
      status: "active",
    },
    {
      id: "fa5",
      name: "Easily Accessible Location",
      description: "A short walk from Chinchpokli Railway Station (East).",
      image: heroImg,
      status: "active",
    },
  ],
  contact: {
    businessName: "The Yellow Banana Preschool And Activity Club",
    phone: "+91 98201 07473",
    address:
      "Shop No. 11, Shree Motanka Tenants, Dattaram Lad Marg, Chinchpokli, Mumbai, Maharashtra 400012",
    website: "theyellowbananapreschool.com",
    email: "hello@theyellowbananapreschool.com",
  },
  settings: {
    businessName: "The Yellow Banana Preschool And Activity Club",
    tagline: "Where Little Minds Learn, Play & Grow",
    phone: "+91 98201 07473",
    address:
      "Shop No. 11, Shree Motanka Tenants, Dattaram Lad Marg, Chinchpokli, Mumbai, Maharashtra 400012",
    website: "theyellowbananapreschool.com",
    footerText: "© 2026 The Yellow Banana Preschool And Activity Club. All Rights Reserved.",
    primaryCta: "Book a Visit",
  },
  enquiries: [
    {
      id: "e1",
      parentName: "Kavita Rane",
      childName: "Aarav",
      childAge: "2 years",
      phone: "+91 90000 11111",
      program: "Playgroup",
      message: "Would like to visit this weekend.",
      date: "2026-08-12",
      status: "New",
    },
    {
      id: "e2",
      parentName: "Faisal Shaikh",
      childName: "Zara",
      childAge: "3 years",
      phone: "+91 90000 22222",
      program: "Nursery",
      message: "Please share fee structure and timings.",
      date: "2026-08-18",
      status: "Contacted",
    },
    {
      id: "e3",
      parentName: "Neha Patil",
      childName: "Ishaan",
      childAge: "4 years",
      phone: "+91 90000 33333",
      program: "LKG",
      message: "Interested in the abacus programme too.",
      date: "2026-08-21",
      status: "Completed",
    },
    {
      id: "e4",
      parentName: "Rohit Deshmukh",
      childName: "Anaya",
      childAge: "5 years",
      phone: "+91 90000 44444",
      program: "UKG",
      message: "Looking for after-school tuition support (ICSE).",
      date: "2026-08-25",
      status: "New",
    },
  ],
};
