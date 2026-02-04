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
      "sKINs is a film and textile-based documentary project that traces the movement of visual elements such as motifs, symbols, rituals, and garments across mediums, cultures, and generations. It explores how visual language is exchanged, transformed, and reinterpreted through time. Rooted in the idea that our lives are extensions of our skin: surfaces where culture, memory, and place imprint themselves. The title plays on ‘KIN’, pointing to kinship and shared humanity, while the “s” speaks to skin as both protection and adornment",
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
      "sKINs, Film screening inside a Textile art tent Installation: Suspended tappering tent structure incapsulating the film screening within. Bottom 3m x 3m, top 2.3m x 2.3 m, height 2m",
    detailedDescription:
      "sKINs, Film screening inside a Textile art tent Installation: Suspended tappering tent structure incapsulating the film screening within. Bottom 3m x 3m, top 2.3m x 2.3 m, height 2m",
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
      "YAL/Ye Abayn Lij/ is an evolving body of work that houses a growing number of sub-collections each narrating a story focused on ritual, beautification, and functional design. The Amharic phrase “Ye Abayn Lij Weha Temaw” translates to “Thirsty is the child of the Nile” symbolizing the paradox of not benefiting from one’s own abundant resources.",
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
      "",
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
      "This sub-collection/middle/ honors ancestral skin markings, where traditional tattoos serve as protection against illness, symbols of strength, expressions of beauty, and are interwoven with spiritual and social symbolism. The project draws personal inspiration from a photograph of the artist’s late great-grandmother /top/, whose neck bears these sacred markings. Her image serves as a quiet yet powerful thread connecting past and present. sKINs N.E. celebrates ancestral body adornment as a form of wearable art, transforming symbols once etched into skin into garments that carry memory, meaning, and resilience. (This sub-project is currently on hold due to ongoing instability in the northern regions of Ethiopia.)",
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
      "The Sheret/Sarong/ is a tubular textile usually worn as a long skirt, or scarf by men. Through its dynamic patterns and colorways, it conveys a story from far away /originally from Indonesia/ and has made its way into East African traditions. It is vital in hot climates and preferred during khat chewing rituals/as shown in sKINs: Dire Dawa opening scene/ where it provides a breathable silhouette. For warriors in Ethiopia, it serves as protection from harsh sun and wind; a practical solution when carrying minimal items. During battle its role deepens even more; fallen soldiers are wrapped in their own Sheret when burials aren’t possible.",
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
  // {
  //   id: "the-river",
  //   title: "The River",
  //   year: 2024,
  //   category: "Commissioned",
  //   medium: "Film",
  //   description:
  //     "A contemplative short documentary about the relationship between communities and water sources in Ethiopia.",
  //   detailedDescription: "",
  //   image: "/images/river.webp?height=600&width=800&text=The+River",
  //   tags: ["community", "women", "water"],
  //   videoUrl: "https://youtu.be/z_ijqn0ewM0?si=mbFQK0oZc8tatslH",
  //   location: "Ethiopia",
  // },
  /*
  {
    id: "msfts-ethiopia-skate-film",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Commissioned",
    medium: "Brand Collaboration Documentary",
    description:
      "A dynamic documentary capturing the emerging skateboarding culture in Ethiopia through the lens of fashion and youth expression.",
    detailedDescription:
      "",
    image: "/images/c4-1.webp?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    tags: ["youth", "community", "skateboarding"],
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    location: "Addis Ababa, Ethiopia",
    position: "Creative Direction, stylist, and video contributions",
  },
  */
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
    medium: "Creative Director",
    description:
      "A creative collaboration documenting the emerging skateboarding culture in Ethiopia through fashion and lifestyle perspectives.",
    detailedDescription:
      "",
    image: "/images/c4-1.webp?height=600&width=800&text=MSFTS+Ethiopia+Skate+Commission",
    tags: ["youth", "community", "skateboarding"],
    type: "photo",
    videoUrl: "https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    position: "Creative Direction, stylist, and video contributions",
    photoCount: 0,
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
      "",
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
    description: "",
    detailedDescription:
      "Hulet Neteb / Two Dots takes its name from the Ethiopian punctuation mark “:”, a symbol that both separates and connects words in Amharic writing. This project is an exploration of identity, history, and culture drawing from moments near and far in time, all rooted in Ethiopia’s rich heritage. Through a thoughtful interplay of accessories, makeup, and a diverse range of garments including hand-painted pieces and thoughtfully chosen pre-owned clothing, the artist embraces the transformative power of revival in fashion. By reimagining these elements, Hulet Neteb creates a living bond between herself and her environment, weaving personal presence and cultural narrative into a vibrant visual language. This process of embodiment, bringing to life a blend of remembered and imagined stories, unfolds across a series of concepts. Here, clothing becomes more than adornment; it is a medium through which history, identity, and creativity converse and coexist.",
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
      "",
    detailedDescription:
      "Bet/Bota reimagines the domestic interior as a site where memory, history, and imagination converge. Against the backdrop of 1970s Addis Ababa, the exhibition explores how architecture and the everyday objects we live with shape our emotions, identities, and collective memory. Through eight immersive sets, the work moves between elemental abstractions:- fire, air, water, earth and reconstructions of lived Ethiopian spaces, from the monochrome photo studios to the compact bachelor rooms of the 1970s. A dining room at the center binds these worlds together, its suspended sack of household items exposing what is often hidden: the quiet significance of what we keep and carry. Bet/Bota is both house and history, exhibition and archive- an invitation to reflect on how space holds us, and how we in turn hold space.",
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
      "/images/Bet bota project photo.webp",
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
      "",
    detailedDescription:
      "Hulet Neteb / Two Dots takes its name from the Ethiopian punctuation mark “:”, a symbol that both separates and connects words in Amharic writing. This project is an exploration of identity, history, and culture drawing from moments near and far in time, all rooted in Ethiopia’s rich heritage. Through a thoughtful interplay of accessories, makeup, and a diverse range of garments including hand-painted pieces and thoughtfully chosen pre-owned clothing, the artist embraces the transformative power of revival in fashion. By reimagining these elements, Hulet Neteb creates a living bond between herself and her environment, weaving personal presence and cultural narrative into a vibrant visual language. This process of embodiment, bringing to life a blend of remembered and imagined stories, unfolds across a series of concepts. Here, clothing becomes more than adornment; it is a medium through which history, identity, and creativity converse and coexist.",
    image: "/images/FUA19675.webp",
    tags: ["symbology", "textile art", "ethiopian history"],
    materials: ["Interactive sensors", "Digital displays", "Physical objects", "Sound design"],
    photoCount: 7,
    images: [
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
      "",
    detailedDescription:
      "Hulet Neteb / Two Dots takes its name from the Ethiopian punctuation mark “:”, a symbol that both separates and connects words in Amharic writing. This project is an exploration of identity, history, and culture drawing from moments near and far in time, all rooted in Ethiopia’s rich heritage. Through a thoughtful interplay of accessories, makeup, and a diverse range of garments including hand-painted pieces and thoughtfully chosen pre-owned clothing, the artist embraces the transformative power of revival in fashion. By reimagining these elements, Hulet Neteb creates a living bond between herself and her environment, weaving personal presence and cultural narrative into a vibrant visual language. This process of embodiment, bringing to life a blend of remembered and imagined stories, unfolds across a series of concepts. Here, clothing becomes more than adornment; it is a medium through which history, identity, and creativity converse and coexist.",
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
    medium: "Creative director and stylist",
    description: "",
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
      "",
    detailedDescription:
      "“Ete’ya,” a tribute to the revered Queen of Ethiopia, draws inspiration from her iconic blue cloak. This project modernizes traditional Ethiopian garments, featuring a hand-dyed cotton cloak with extended sleeves in homage to the queen. Complementing the cloak, the red wrap pant prioritizes comfort and flexibility for the dancer, tied at the wrists and embroidered with wing imagery symbolizing Ete’ya’s angelic disappearance. Inspired by the tradition in Gojam, where women shave their heads and wear black headscarves in tribute to Ete’ya, this project incorporates a red headscarf, symbolizing love and devotion to the queen. Set in the lively Merkato market in Addis Ababa, the dancer moves through the bustling crowd, embodying the struggle to preserve identity amid change. The choreography captures the beauty of fearlessness, creating a powerful tribute to Queen Ete’ya’s legacy.",
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
      "",
    detailedDescription:
      "“Ete’ya,” a tribute to the revered Queen of Ethiopia, draws inspiration from her iconic blue cloak. This project modernizes traditional Ethiopian garments, featuring a hand-dyed cotton cloak with extended sleeves in homage to the queen. Complementing the cloak, the red wrap pant prioritizes comfort and flexibility for the dancer, tied at the wrists and embroidered with wing imagery symbolizing Ete’ya’s angelic disappearance. Inspired by the tradition in Gojam, where women shave their heads and wear black headscarves in tribute to Ete’ya, this project incorporates a red headscarf, symbolizing love and devotion to the queen. Set in the lively Merkato market in Addis Ababa, the dancer moves through the bustling crowd, embodying the struggle to preserve identity amid change. The choreography captures the beauty of fearlessness, creating a powerful tribute to Queen Ete’ya’s legacy.",
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
