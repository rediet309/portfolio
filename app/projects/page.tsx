"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import ProjectTimeline from "@/components/project-timeline"

const allProjectsData = [
  // 2025 Projects
  {
    id: "skins-dire-dawa",
    title: "sKINs: Dire Dawa",
    year: 2025,
    category: "Films",
    medium: "Documentary Film",
    description: "A documentary exploring the textile traditions and cultural identity of Dire Dawa, Ethiopia.",
    detailedDescription:
      "sKINs: Dire Dawa is a documentary that delves into the intricate relationship between skin, fabric, and cultural memory in Eastern Ethiopia. This film explores how traditional textile practices continue to shape contemporary identity in Dire Dawa, examining the connections between personal and cultural narratives through the lens of textile heritage. Available through private Google Drive link.",
    image: "/images/skins-diredawa.webp",
    tags: ["documentary", "migration", "culture"],
    videoUrl: "https://drive.google.com/file/d/1A7-FUXr5hK2-l2IoXyvif2LRU8qOCETl/preview",
    location: "Dire Dawa, Ethiopia",
    position: "Director, producer, cinematographer, writer and narrator",
  },
  {
    id: "skins-east-ethiopia",
    title: "sKINs: East Ethiopia Textile Installation",
    year: 2025,
    category: "Installation",
    medium: "Large-scale textile installation",
    description:
      "An immersive textile installation exploring the relationship between skin, fabric, and cultural identity in Eastern Ethiopia.",
    detailedDescription:
      "This large-scale installation features traditional textiles from Eastern Ethiopia arranged in a contemporary gallery context, creating dialogue between historical textile practices and modern artistic expression. The work transforms gallery space into a meditation on cultural memory and material heritage. Currently available for sale, this installation represents the culmination of extensive research into Ethiopian textile traditions.",
    image: "/images/01_front.webp",
    tags: ["textile", "handmade", "visual culture"],
    materials: ["Traditional textiles", "Contemporary display systems", "Lighting", "Sound"],
    photoCount: 4,
    imageDescriptions: [
      "Front side view/suspended tent structure incapsulating the sKins film screening within/, hand dyed and embroidered textile mixed with traditional garment fabrics of Dire Dawa, 2025",
      "Right side view, black textile, silver string textile knotted, love letter of the artists' parents from the 80's encapsulated, 2025",
      "Left side view, hand printed yellow floral textile with cutouts, and embroidery mixed with traditional garment fabrics of Dire Dawa, 2025.",
      "Back side view, black tea dyed textile with hand embroidery, Image of artists' mother form 80's, henna paste hand painted decorative art, 2025.",
    ],
    images: ["/images/01_front.webp", "/images/04_right.webp", "/images/02_left.webp", "/images/03_back.webp"],
    position: "Textile artist",
  },
  {
    id: "yal-exhibition",
    title: "YAL Exhibition",
    year: 2025,
    category: "Installation",
    medium: "Mixed media exhibition",
    description: "YAL / Ye Abayn Lij explores ritual and design, named for the paradox of lacking one's own abundance.",
    detailedDescription:
      "The YAL (Young African Leaders) exhibition features multimedia installations that examine leadership, youth culture, and artistic innovation in modern Ethiopia. The exhibition includes 17 distinct photographic works alongside an immersive walkthrough video experience that guides viewers through the conceptual framework of contemporary Ethiopian artistic practice.",
    image: "/images/IMG_2859.webp",
    tags: ["ritual", "beautification", "functional design"],
    materials: ["Photography", "Video installations", "Interactive displays", "Sound systems"],
    photoCount: 17,
    videoUrl: "https://drive.google.com/file/d/1AV8mLySkKCYWztSNfcE5uOuKVSwCGzb7/view?usp=sharing",
    images: [
      "/images/IMG_2859.webp",
      "/images/IMG_4340.webp",
      "/images/IMG_4341.webp",
      "/images/IMG_5008.webp",
      "/images/IMG_5009.webp",
      "/images/IMG_5010.webp",
      "/images/IMG_5011.webp",
      "/images/IMG_5012.webp",
      "/images/IMG_5013.webp",
      "/images/IMG_5014.webp",
      "/images/IMG_5021.webp",
      "/images/IMG_5020.webp",
      "/images/IMG_5019.webp",
      "/images/IMG_5018.webp",
      "/images/IMG_5017.webp",
      "/images/IMG_5016.webp",
      "/images/IMG_5015.webp",
    ],
    position: "Artist and curator",
  },
  {
    id: "heart-of-a-child",
    title: "Heart of a Child",
    year: 2025,
    category: "Commissioned",
    medium: "Music Video",
    description:
      "A heartwarming commercial film exploring childhood innocence and dreams through Ethiopian cultural lens.",
    detailedDescription: "",
    image: "/images/HOC.webp?height=600&width=800&text=Heart+of+a+Child",
    tags: [],
    type: "film",
    videoUrl: "https://youtu.be/bLUtlsYxqpU?si=eU5MdCaaTsTjOGsJ",
    position: "",
  },
  {
    id: "skins-north-ethiopia",
    title: "sKINs: North Ethiopia",
    year: 2025,
    category: "In Studio",
    medium: "Photography",
    description:
      "This sub-collection honors ancestral skin markings as symbols of protection, beauty, and spirituality. Inspired by the artist's late great-grandmother, transforms these sacred symbols into garments that carry memory, meaning, and resilience.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/skins-all_04.webp",
    tags: ["kinship", "aesthetics", "architecture"],
    images: [
      "/images/skins-all_01.webp",
      "/images/skins-all_02.webp",
      "/images/skins-all_03.webp",
      "/images/skins-all_04.webp",
    ],
    position: "Filmmaker and textile artist",
  },
  {
    id: "yal-studio",
    title: "YAL",
    year: 2025,
    category: "In Studio",
    medium: "",
    description: "YAL / Ye Abayn Lij explores ritual and design, named for the paradox of lacking one's own abundance.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/kins.webp",
    tags: ["ritual", "beautification", "functional design"],
    videoUrl: "/vid/Yal launch 8 bit video.mp4?height=1080&width=1920&text=YAL+Video",
    position: "Artist and curator",
  },
  {
    id: "sheret-project",
    title: "Sheret Project",
    year: 2025,
    category: "In Studio",
    medium: "Textile",
    description:
      "The Sheret/Sarong is a tubular textile from Indonesia, used in East Africa for hot climates, rituals, and protection, and to wrap fallen soldiers.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/b-11.webp",
    tags: ["documentation", "photography", "cultural practices"],
    images: [
      "/images/b-11.webp",
      "/images/a-11.webp",
      "/images/c-11.webp",
      "/images/IMG_0612 (2).webp",
      "/images/00_Coat.webp",
      "/images/Convertable.webp",
    ],
    position: "Textile Artist and researcher",
  },

  // 2024 Projects
  {
    id: "the-river",
    title: "The River",
    year: 2024,
    category: "Films",
    medium: "Film",
    description:
      "A contemplative short documentary about the relationship between communities and water sources in Ethiopia.",
    detailedDescription: "",
    image: "/images/river.webp?height=600&width=800&text=The+River",
    tags: ["community", "women", "water"],
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=mbFQK0oZc8tatslH",
    location: "Ethiopia",
  },
  {
    id: "msfts-ethiopia-skate-film",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Films",
    medium: "Brand Collaboration Documentary",
    description:
      "A dynamic documentary capturing the emerging skateboarding culture in Ethiopia through the lens of fashion and youth expression.",
    detailedDescription:
      "This collaborative film captures the vibrant skateboarding scene in Ethiopia, showcasing how young Ethiopians are embracing and redefining skateboarding culture within their own cultural context. The film follows several skaters as they navigate urban landscapes and create their own unique style.",
    image: "/images/c4-1.webp?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    tags: ["youth", "community", "skateboarding"],
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    location: "Addis Ababa, Ethiopia",
    position: "Creative Direction, stylist, and video contributions",
  },
  {
    id: "arada-easter-commercial",
    title: "Arada Easter Commercial",
    year: 2024,
    category: "Commissioned",
    medium: "Commercial advertisement",
    description:
      "A vibrant commercial celebrating Ethiopian Easter traditions in the historic Arada district of Addis Ababa.",
    detailedDescription: "",
    image: "/images/arada.webp?height=600&width=800&text=Arada+Easter+Commercial",
    tags: ["easter", "market", "beverage"],
    type: "film",
    videoUrl: "https://youtu.be/gHnCjF4GLHk?si=X7Zleobndl873NaO",
    position: "Director, Producer, stylist",
    duration: "2:30",
  },
  {
    id: "the-river-commission",
    title: "The River",
    year: 2024,
    category: "Commissioned",
    medium: "Film",
    description:
      "A commissioned documentary trailer exploring water rights and environmental conservation along Ethiopian rivers.",
    detailedDescription: "",
    image: "/images/river.webp?height=600&width=800&text=The+River+Commission",
    tags: ["community", "women", "water"],
    type: "film",
    videoUrl: "https://youtu.be/z_ijqn0ewM0?si=CwfuWOyAfWqHjDK6",
    position: "Production designer and set designer",
    duration: "4:20",
  },
  {
    id: "msfts-ethiopia-skate-commission",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Commissioned",
    medium: "Collaboration video",
    description:
      "A creative collaboration documenting the emerging skateboarding culture in Ethiopia through fashion and lifestyle perspectives.",
    detailedDescription:
      "A commissioned work for MSFTS that captures the intersection of global skateboarding culture with Ethiopian urban youth expression, featuring authentic documentation of skate culture development in Ethiopian cities. The project demonstrates how global youth movements adapt and transform within local cultural contexts.",
    image: "/images/c4-1.webp?height=600&width=800&text=MSFTS+Ethiopia+Skate+Commission",
    tags: ["youth", "community", "skateboarding"],
    type: "photo",
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    position: "Creative Direction, stylist, and video contributions",
    photoCount: 8,
    images: [
      "/images/c1-1.webp",
      "/images/c2-1.webp",
      "/images/c3-1.webp",
      "/images/c4-1.webp",
      "/images/c5-1.webp",
      "/images/c6-1.webp",
      "/images/c7-1.webp",
      "/images/c8-1.webp",
    ],
  },
  /* {
    id: "msfts-ethiopia-skate-photos",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Archive",
    medium: "Photography archive",
    description: "Comprehensive photographic archive from the MSFTS x Ethiopia skateboarding collaboration.",
    detailedDescription:
      "This archive contains 24 photographs from the MSFTS collaboration, including 5 landscape format images (16:9 ratio) and 19 portrait format images (9:16 ratio), capturing candid moments, alternative shots, and process documentation that didn't make it into the final campaign. The archive provides insight into the creative process and cultural exchange that occurred during this unique collaboration.",
    image: "/images/c1-1.webp",
    tags: ["photography", "skateboarding", "behind-the-scenes"],
    location: "Studio Archive",
    status: "Digital Archive",
    photoCount: 24,
    images: [
      // 5 landscape photos (16:9 ratio)
      "/images/a1-1.webp",
      "/images/a3-1.webp",
      "/images/a12-1.webp",
      "/images/a4-1.webp",
      "/images/b2-1.webp",
      // 19 portrait photos (9:16 ratio)
      "/images/c4-1.webp",
      "/images/c9-1.webp",
      "/images/c8-1.webp",
      "/images/c7-1.webp",
      "/images/c6-1.webp",
      "/images/c5-1.webp",
      "/images/c3-1.webp",
      "/images/c2-1.webp",
      "/images/c1-1.webp",
      "/images/b1-1.webp",
      "/images/a13-1.webp",
      "/images/a11-1.webp",
      "/images/a10-1.webp",
      "/images/a9-1.webp",
      "/images/a8-1.webp",
      "/images/a7-1.webp",
      "/images/a6-1.webp",
      "/images/a5-1.webp",
      "/images/a2-1.webp",
    ],
  }, */

  // 2023 Projects
  {
    id: "ashes-modeling-commission",
    title: "Except this time nothing returns from the ashes",
    year: 2023,
    category: "Commissioned",
    medium: "Modeling",
    description:
      "A high-fashion modeling project exploring themes of transformation, renewal, and resilience through Ethiopian aesthetic frameworks.",
    detailedDescription: "",
    image: "/images/a6-0.webp",
    tags: [],
    type: "photo",
    position: "Model",
    photoCount: 8,
    images: [
      "/images/a1-0.webp",
      "/images/a2-0.webp",
      "/images/a3-0.webp",
      "/images/a4-0.webp",
      "/images/a5-0.webp",
      "/images/a6-0.webp",
      "/images/a7-0.webp",
      "/images/a8-0.webp",
    ],
  },
  /*{
    id: "tilla-photoshoot",
    title: "Tilla Photoshoot",
    year: 2023,
    category: "Archive",
    medium: "Photography",
    description:
      "Archive of a fashion photoshoot exploring traditional Ethiopian gold jewelry and contemporary styling.",
    detailedDescription: "",
    image: "/images/a1-3.webp",
    tags: [],
    location: "Studio Archive",
    status: "Fashion Archive",
    photoCount: 4,
    position: "Stylist",
    images: ["/images/a3-3.webp", "/images/a2-3.webp", "/images/a4-3.webp", "/images/a1-3.webp"],
  }, */

  // 2022 Projects
  {
    id: "hulet-neteb",
    title: "Hulet Neteb",
    year: 2022,
    category: "Films",
    medium: "Experimental Film",
    description: "An experimental film exploring the philosophical concept of duality in Ethiopian culture.",
    detailedDescription:
      "Hulet Neteb (meaning 'two things' in Amharic) examines the tensions and harmonies between tradition and modernity, individual and collective identity, past and present. Through innovative cinematographic techniques and thoughtful narrative structure, the film creates a meditative exploration of Ethiopian philosophical concepts.",
    image: "/images/05_Maya Sight_d.webp?height=600&width=800&text=Hulet+Neteb",
    tags: ["symbology", "textile art", "ethiopian history"],
    videoUrl: "https://drive.google.com/file/d/1mF4sGEPb7YrYdEeUFYA2vZERRdR9F7G5/view?usp=sharing",
    location: "Ethiopia",
  },
  {
    id: "bet-bota",
    title: "Bet Bota",
    year: 2022,
    category: "Installation",
    medium: "Architectural intervention",
    description:
      "Bet/Bota reimagines the Ethiopian home, exploring memory and history through immersive sets and everyday objects.",
    detailedDescription:
      "Bet/Bota reimagines the Ethiopian home as a space where memory and history intersect with imagination. Set against 1970s Addis Ababa, the project unfolds through eight immersive sets ranging from elemental abstractions to reconstructed living spaces. At its heart, a dining room unites these worlds, revealing the quiet power of everyday objects. Both house and archive, Bet/Bota invites reflection on how space shapes us, and how we, in turn, shape space.",
    image: "/images/a4a.webp",
    tags: ["set design", "conceptual storytelling", "immersive design"],
    materials: ["Traditional textiles", "Architectural elements", "Lighting systems", "Interactive spaces"],
    photoCount: 20,
    slidesLayout: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    images: [
      "/images/a1_of fire.webp",
      "/images/a1a.webp",
      "/images/a2_of water.webp",
      "/images/a2a.webp",
      "/images/a3_of earth.webp",
      "/images/a3a.webp",
      "/images/a4_of air.webp",
      "/images/a4a.webp",
      "/images/a5_merger.webp",
      "/images/a5a.webp",
      "/images/a6_portal.webp",
      "/images/a6a.webp",
      "/images/a7_monochrome.webp",
      "/images/a7a.webp",
      "/images/a7b.webp",
      "/images/a7c.webp",
      "/images/a8_nostalgia.webp",
      "/images/a8_nostalgia_a.webp",
      "/images/a8a.webp",
      "/images/a9_gathering.webp",
    ],
    position: "Model, Director",
  },
  {
    id: "hulet-neteb-installation",
    title: "Hulet Neteb Installation",
    year: 2022,
    category: "Installation",
    medium: "Interactive installation",
    description:
      "Hulet Neteb / Two Dots uses the Ethiopian ':' to explore identity and heritage through hand-painted and pre-owned garments.",
    detailedDescription:
      "Building on the themes from the experimental film of the same name, this installation creates an immersive environment where visitors can physically engage with the concept of 'Hulet Neteb' (two things). The work demonstrates how philosophical concepts can be experienced through spatial and tactile engagement, documented through 7 comprehensive photographs.",
    image: "/images/IMG_4342.webp",
    tags: ["symbology", "textile art", "ethiopian history"],
    materials: ["Interactive sensors", "Digital displays", "Physical objects", "Sound design"],
    photoCount: 7,
    images: [
      "/images/IMG_4342.webp",
      "/images/FUA19675.webp",
      "/images/FUA19684.webp",
      "/images/FUA19689.webp",
      "/images/FUA19719.webp",
      "/images/FUA19745.webp",
      "/images/FUA19755.webp",
    ],
    position: "Director, Producer, Curator, and Textile Artist",
  },
  {
    id: "hulet-neteb-project",
    title: "Hulet neteb project",
    year: 2022,
    category: "In Studio",
    medium: "Studio documentation",
    description:
      "Hulet Neteb / Two Dots uses the Ethiopian ':' to explore identity and heritage through hand-painted and pre-owned garments.",
    detailedDescription:
      "This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/images/FUA10675.webp",
    tags: ["symbology", "textile art", "ethiopian history"],
    images: [
      "/images/FUA10675.webp",
      "/images/FUA10801.webp",
      "/images/FUA11079.webp",
      "/images/FUA11046.webp",
      "/images/energies.webp",
      "/images/Flames.webp",
      "/images/FUA13887.webp",
      "/images/FUA13681.webp",
      "/images/northern lines.webp",
      "/images/FUA13854.webp",
      "/images/FUA11650.webp",
      "/images/FUA11459.webp",
      "/images/FUA11137.webp",
      "/images/FUA13721.webp",
      "/images/FUA13850.webp",
      "/images/FUA13739.webp",
    ],
    position: "Director, Producer, Curator, and Textile Artist",
  },
  /* {
    id: "to-identify-photos-archive",
    title: "To Identify",
    year: 2022,
    category: "Archive",
    medium: "Identity exploration",
    description:
      "Personal photographic exploration of individual and collective identity within Ethiopian diaspora communities.",
    detailedDescription: "",
    image: "/images/vnfn-8.webp?height=600&width=800&text=To+Identify+Archive",
    tags: ["identity", "patriotism"],
    location: "Global locations",
    status: "Personal Archive",
    photoCount: 18,
    slidesLayout: [1, 5, 7, 6], // 1 photo in first slide, 5 in second slide, 7 in third, 6 in fourth
    images: [
      // 17 small 9:16 images
      "/images/a1-8.webp",
      "/images/a2-8.webp",
      "/images/a3-8.webp",
      "/images/a4-8.webp",
      "/images/a5-8.webp",
      "/images/b1-8.webp",
      "/images/b2-8.webp",
      "/images/b3-8.webp",
      "/images/b4-8.webp",
      "/images/b5-8.webp",
      "/images/b6-8.webp",
      "/images/b7-8.webp",
      "/images/c2-8.webp",
      "/images/c3-8.webp",
      "/images/c4-8.webp",
      "/images/c5-8.webp",
      "/images/c6-8.webp",
      // 1 landscape image
      "/images/c1-8.webp",
    ],
  }, */
 /* {
    id: "tibeb-be-adebabay-archive",
    title: "Tibeb Be Adebabay",
    year: 2022,
    category: "Archive",
    medium: "Cultural documentation",
    description:
      "Photographic documentation of traditional Ethiopian art forms and their contemporary interpretations.",
    detailedDescription: "",
    image: "/images/a1-2.webp",
    tags: ["consumerism", "cultural documentation", "exchange"],
    location: "Addis Ababa, Ethiopia",
    status: "Cultural Archive",
    photoCount: 4,
    images: ["/images/a1-2.webp", "/images/a2-2.webp", "/images/a3-2.webp", "/images/a4-2.webp"],
  }, */
 /* {
    id: "in-red-photos-archive",
    title: "In Red",
    year: 2022,
    category: "Archive",
    medium: "Artistic photography",
    description:
      "A photographic series exploring the color red in Ethiopian culture, from traditional clothing to landscapes.",
    detailedDescription: "",
    image: "/images/a1-4.webp?height=600&width=800&text=In+Red+Archive",
    tags: ["photography", "red"],
    location: "Various locations",
    status: "Artistic Archive",
    photoCount: 6,
    images: [
      // 3 small 9:16 images
      "/images/a7-4.webp",
      "/images/a3-4.webp",
      "/images/a4-4.webp",
      // 3 landscape images
      "/images/a2-4.webp",
      "/images/a5-4.webp",
      "/images/a1-4.webp",
      "/images/a6-4.webp",
    ],
  }, */
  {
    id: "portal-to-u-thiopia-archive",
    title: "Portal to U-thiopia",
    year: 2022,
    category: "Archive",
    medium: "Conceptual photography",
    description: "Conceptual photographs imagining alternative realities and utopian visions of Ethiopian society.",
    detailedDescription: "",
    image: "/images/j.webp?height=600&width=800&text=Portal+U-thiopia+Archive",
    tags: ["alternate reality", "concept study"],
    location: "Conceptual Archive",
    status: "Conceptual Archive",
    photoCount: 4,
    images: ["/images/d.webp", "/images/a.webp", "/images/b.webp", "/images/c.webp"],
  },
  /* {
    id: "vibrant-hues-archive",
    title: "Vibrant Hues",
    year: 2022,
    category: "Archive",
    medium: "Color studies",
    description: "An exploration of color in Ethiopian culture, from traditional dyes to contemporary color palettes.",
    detailedDescription: "",
    image: "/images/a2-6.webp?height=600&width=800&text=Vibrant+Hues+Archive",
    tags: ["color study", "identity", "experiment"],
    location: "Color Archive",
    status: "Study Collection",
    photoCount: 18,
    images: [
      // 11 small 9:16 images
      "/images/a1-6.webp",
      "/images/a4-6.webp",
      "/images/a3-6.webp",
      "/images/a4-7.webp",
      "/images/a5-6.webp",
      "/images/a6-6.webp",
      "/images/b1-6.webp",
      "/images/b2-6.webp",
      "/images/c2-6.webp",
      "/images/c3-6.webp",
      "/images/a7-7.webp",
      // 7 landscape images
      "/images/a5-7.webp",
      "/images/a2-6.webp",
      "/images/a2-7.webp",
      "/images/c1-6.webp",
      "/images/a3-7.webp",
      "/images/a2-7.webp",
      "/images/a1-7.webp",
    ],
  }, */

  // 2021 Projects
  {
    id: "decoding-legends",
    title: "Decoding Legends",
    year: 2021,
    category: "Films",
    medium: "Documentary Series",
    description:
      "A documentary series that decodes ancient Ethiopian legends through contemporary perspectives, examining how traditional stories continue to influence modern Ethiopian identity.",
    detailedDescription:
      "Decoding Legends is a documentary series that delves into the rich tapestry of Ethiopian folklore and mythology, examining how these ancient stories continue to shape contemporary Ethiopian identity and culture. Through interviews with elders, historians, and cultural practitioners, the series reveals the hidden meanings and enduring wisdom embedded in traditional legends.",
    image: "/images/DecodingLegends.webp?height=600&width=800&text=Decoding+Legends",
    tags: ["history", "story telling", "costume"],
    videoUrl: "https://youtu.be/0v1vwgnqHRU?si=uJkjUumPFlwMwHJy",
    location: "Ethiopia",
  },
  {
    id: "decoding-legends-installation",
    title: "Decoding Legends Installation",
    year: 2021,
    category: "Installation",
    medium: "Multimedia installation",
    description:
      "Ete'ya reimagines traditional Ethiopian attire with a blue cloak, red pants, and headscarf, honoring the legendary queen.",
    detailedDescription:
      "Created during the prestigious Gojo residency program, this immersive work combines video, sound, textile, and sculptural elements to create an environment where visitors can experience legendary narratives through multiple sensory channels. The installation demonstrates how traditional storytelling can be transformed through contemporary artistic methodologies, documented through 12 comprehensive photographs.",
    image: "/images/IMG_5082.webp",
    tags: ["history", "story telling", "costume"],
    materials: ["Video screens", "Traditional artifacts", "Audio systems", "Lighting", "Textiles"],
    photoCount: 12,
    images: [
      "/images/IMG_5082.webp",
      "/images/IMG_5093.webp",
      "/images/IMG_5100.webp",
      "/images/IMG_5109.webp",
      "/images/IMG_5124.webp",
      "/images/photo_2021-09-24_22-16-46.webp",
      "/images/photo_2021-09-24_22-16-49.webp",
      "/images/photo_2021-09-24_22-16-51.webp",
      "/images/photo_2021-09-24_22-16-55.webp",
      "/images/a1-5.webp",
      "/images/a2-5.webp",
      "/images/a3-5.webp",
    ],
    position: "Creative director, costume design",
  },
  // 2020 Projects
   /* {
    id: "graphic-posters-illustrations-archive",
    title: "Graphic Posters",
    year: 2020,
    category: "Archive",
    medium: "Graphic design",
    description: "Collection of graphic design work including posters and visual identity projects.",
    detailedDescription: "",
    image: "/images/04_Hulet neteb.webp?height=600&width=800&text=Graphic+Posters+Archive",
    tags: ["graphic design", "posters"],
    location: "Design Archive",
    status: "Design Collection",
    photoCount: 5,
    instagramUrl: "https://www.instagram.com/red_studyo/",
    images: [
      "/images/05_unauthorized.webp",
      "/images/03_Bet Bota.webp",
      "/images/01_YAL.webp",
      "/images/02_YAL.webp",
      "/images/04_Hulet neteb.webp",
    ],
  }, */
]

export default function AllProjectsPage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects" />

      <div className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Header */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mb-12 sm:mb-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-stardom text-black mb-4 sm:mb-6 pt-4 sm:pt-7 leading-tight">
              All Projects
            </h1>
          </div>
        </div>

        {/* Projects Timeline */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <ProjectTimeline projects={allProjectsData} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
