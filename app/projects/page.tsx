"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProjectTimeline } from "@/components/project-timeline"

const allProjectsData = [
  // 2025 Projects
  {
    id: "skins-dire-dawa",
    title: "sKINs: Dire Dawa",
    year: 2025,
    category: "Films",
    medium: "Documentary Film",
    description:
      "A documentary exploring the textile traditions and cultural identity of Dire Dawa, Ethiopia. This film delves into the intricate relationship between skin, fabric, and cultural memory in Eastern Ethiopia, examining how traditional textile practices continue to shape contemporary identity. Available through private Google Drive link, this work represents the culmination of extensive research into the sKINs project's exploration of Ethiopian textile heritage.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+Dire+Dawa",
    featured: true,
    awards: ["Best Documentary - Addis Film Festival 2025"],
    visitors: "15K",
    tags: ["documentary", "textile", "culture", "ethiopia"],
  },
  {
    id: "skins-east-ethiopia",
    title: "sKINs: East Ethiopia Textile Installation",
    year: 2025,
    category: "Installation",
    medium: "Large-scale textile installation",
    description:
      "An immersive textile installation exploring the relationship between skin, fabric, and cultural identity in Eastern Ethiopia. This large-scale work features traditional textiles arranged in a contemporary gallery context, creating dialogue between historical textile practices and modern artistic expression. The installation includes 4 comprehensive photographic documentation pieces and represents the culmination of extensive research into Ethiopian textile traditions. Currently available for sale, this work transforms gallery space into a meditation on cultural memory and material heritage.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+East+Ethiopia+1",
    featured: true,
    awards: ["Installation of the Year 2025"],
    visitors: "25K",
    tags: ["textile", "identity", "cultural heritage", "immersive"],
  },
  {
    id: "yal-exhibition",
    title: "YAL Exhibition",
    year: 2025,
    category: "Installation",
    medium: "Mixed media exhibition",
    description:
      "A comprehensive exhibition showcasing the evolution of contemporary Ethiopian art through multimedia installations. The YAL (Young African Leaders) exhibition features 3 distinct photographic series alongside an immersive walkthrough video experience that guides viewers through the conceptual framework of contemporary Ethiopian artistic practice. The exhibition examines leadership, youth culture, and artistic innovation in modern Ethiopia. Complete documentation available through Google Drive walkthrough: https://drive.google.com/file/d/1AV8mLySkKCYWztSNfcE5uOuKVSwCGzb7/view?usp=sharing",
    image: "/placeholder.svg?height=600&width=800&text=YAL+Exhibition+1",
    featured: false,
    awards: [],
    visitors: "18K",
    tags: ["contemporary", "multimedia", "youth", "leadership"],
  },
  {
    id: "heart-of-a-child",
    title: "Heart of a Child",
    year: 2025,
    category: "Commissioned",
    medium: "Commercial film",
    description:
      "A heartwarming commercial film exploring childhood innocence and dreams through Ethiopian cultural lens. This commissioned work captures the universal experience of childhood while celebrating specifically Ethiopian cultural values, family structures, and community relationships. The film combines professional commercial production values with authentic cultural storytelling, creating an emotionally resonant piece that speaks to both local and international audiences. Available on YouTube: https://youtu.be/bLUtlsYxqpU?si=eU5MdCaaTsTjOGsJ",
    image: "/placeholder.svg?height=600&width=800&text=Heart+of+a+Child",
    featured: false,
    awards: [],
    visitors: "10K",
    tags: ["commercial", "childhood", "cultural values", "emotional"],
  },
  {
    id: "skins-north-ethiopia",
    title: "sKINs: North Ethiopia",
    year: 2025,
    category: "In Studio",
    medium: "Photography and documentation",
    description:
      "Comprehensive photographic documentation of traditional skin practices and body art in Northern Ethiopia, representing the latest phase of the ongoing sKINs project. This studio-based work involves extensive field research and documentation of cultural practices related to body modification, traditional scarification, and ceremonial body art in Northern Ethiopian communities. The project serves as both artistic exploration and cultural preservation, creating a visual archive of practices that connect contemporary Ethiopian identity to ancestral traditions.",
    image: "/placeholder.svg?height=600&width=800&text=sKINs+North+Ethiopia",
    featured: false,
    awards: [],
    visitors: "6K",
    tags: ["documentation", "photography", "cultural practices", "preservation"],
  },

  // 2024 Projects
  {
    id: "the-river",
    title: "The River",
    year: 2024,
    category: "Films",
    medium: "Short Documentary",
    description:
      "A contemplative short documentary about the relationship between communities and water sources in Ethiopia. This film explores environmental conservation and water rights through intimate storytelling, examining how rivers shape both landscape and culture. The work features compelling cinematography that captures the essential role of water in Ethiopian communities. Available with YouTube trailer: https://youtu.be/z_ijqn0ewM0?si=mbFQK0oZc8tatslH",
    image: "/placeholder.svg?height=600&width=800&text=The+River",
    featured: false,
    awards: [],
    visitors: "8K",
    tags: ["documentary", "environment", "community", "water"],
  },
  {
    id: "msfts-ethiopia-skate-film",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Films",
    medium: "Brand Collaboration Documentary",
    description:
      "A dynamic documentary capturing the emerging skateboarding culture in Ethiopia through the lens of fashion and youth expression. This collaboration with MSFTS explores how global skateboarding culture intersects with Ethiopian urban life, featuring compelling footage of young skaters navigating both physical and cultural landscapes. The film documents a unique moment in Ethiopian youth culture. Available through Google Drive: https://drive.google.com/file/d/1EguZ8WEBDYJItUhAVcpyyAoVgcxfwnMA/view?usp=sharing",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Ethiopia+Skate",
    featured: false,
    awards: [],
    visitors: "30K",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration"],
  },
  {
    id: "arada-easter-commercial",
    title: "Arada Easter Commercial",
    year: 2024,
    category: "Commissioned",
    medium: "Commercial advertisement",
    description:
      "A vibrant commercial celebrating Ethiopian Easter traditions in the historic Arada district of Addis Ababa. This commissioned work captures the energy and spiritual significance of Ethiopian Orthodox Easter celebrations, featuring authentic community participation and traditional ceremonial elements. The commercial successfully balances commercial objectives with cultural authenticity, showcasing how traditional celebrations continue to thrive in urban Ethiopian contexts. Available on YouTube: https://youtu.be/gHnCjF4GLHk?si=X7Zleobndl873NaO",
    image: "/placeholder.svg?height=600&width=800&text=Arada+Easter+Commercial",
    featured: false,
    awards: [],
    visitors: "20K",
    tags: ["commercial", "easter", "traditions", "community"],
  },
  {
    id: "the-river-commission",
    title: "The River",
    year: 2024,
    category: "Commissioned",
    medium: "Documentary trailer",
    description:
      "A commissioned documentary trailer exploring water rights and environmental conservation along Ethiopian rivers. This trailer work demonstrates sophisticated understanding of both documentary filmmaking and environmental advocacy, creating compelling visual narratives that highlight the urgent need for water conservation in Ethiopia. The piece serves as both artistic expression and environmental activism, using cinematic techniques to draw attention to critical environmental issues. YouTube trailer: https://youtu.be/z_ijqn0ewM0?si=CwfuWOyAfWqHjDK6",
    image: "/placeholder.svg?height=600&width=800&text=The+River+Commission",
    featured: false,
    awards: [],
    visitors: "15K",
    tags: ["environmental", "water rights", "conservation", "documentary"],
  },
  {
    id: "msfts-ethiopia-skate-commission",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Commissioned",
    medium: "Brand collaboration video",
    description:
      "A creative collaboration documenting the emerging skateboarding culture in Ethiopia through fashion and lifestyle perspectives. This commissioned work for MSFTS captures the intersection of global skateboarding culture with Ethiopian urban youth expression, featuring authentic documentation of skate culture development in Ethiopian cities. The project demonstrates how global youth movements adapt and transform within local cultural contexts. Available through Drive link for comprehensive documentation of this cultural moment.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Ethiopia+Skate+Commission",
    featured: false,
    awards: [],
    visitors: "30K",
    tags: ["skateboarding", "youth culture", "fashion", "collaboration"],
  },
  {
    id: "msfts-ethiopia-skate-photos",
    title: "MSFTS x Ethiopia Skate",
    year: 2024,
    category: "Archive",
    medium: "Photography archive",
    description:
      "Comprehensive photographic archive from the MSFTS x Ethiopia skateboarding collaboration. This archive contains 24 photographs from the MSFTS collaboration, including 5 landscape format images (16:9 ratio) and 19 portrait format images (9:16 ratio), capturing candid moments, alternative shots, and process documentation that didn't make it into the final campaign. The archive provides insight into the creative process and cultural exchange that occurred during this unique collaboration.",
    image: "/placeholder.svg?height=600&width=800&text=MSFTS+Skate+Archive",
    featured: false,
    awards: [],
    visitors: "4K",
    tags: ["photography", "skateboarding", "behind-the-scenes", "collaboration"],
  },

  // 2023 Projects
  {
    id: "ashes-modeling-commission",
    title: "Except This Time Nothing Returns from the Ashes Modeling",
    year: 2023,
    category: "Commissioned",
    medium: "Fashion photography",
    description:
      "A high-fashion modeling project exploring themes of transformation, renewal, and resilience through Ethiopian aesthetic frameworks. This commissioned work challenges conventional fashion photography by incorporating cultural narratives of rebirth and transformation, using modeling and styling to explore how individuals and communities emerge from difficult circumstances. The project's title suggests themes of permanent change and growth, moving beyond cycles of destruction and renewal to embrace lasting transformation.",
    image: "/placeholder.svg?height=600&width=800&text=Ashes+Modeling+Commission",
    featured: false,
    awards: [],
    visitors: "8K",
    tags: ["fashion", "modeling", "transformation", "resilience"],
  },
  {
    id: "tilla-photoshoot",
    title: "Tilla Photoshoot",
    year: 2023,
    category: "Archive",
    medium: "Fashion photography",
    description:
      "Archive of a fashion photoshoot exploring traditional Ethiopian gold jewelry and contemporary styling. Tilla, meaning gold in Amharic, was a photoshoot that explored the beauty and cultural significance of traditional Ethiopian gold jewelry, combining heritage pieces with contemporary fashion. This archive contains 4 carefully curated photographs that capture the intersection of traditional craftsmanship and modern aesthetic sensibilities.",
    image: "/placeholder.svg?height=600&width=800&text=Tilla+Photoshoot+Archive",
    featured: false,
    awards: [],
    visitors: "4K",
    tags: ["fashion", "jewelry", "traditional", "gold"],
  },

  // 2022 Projects
  {
    id: "hulet-neteb",
    title: "Hulet Neteb",
    year: 2022,
    category: "Films",
    medium: "Experimental Film",
    description:
      "An experimental film exploring the philosophical concept of duality in Ethiopian culture. 'Hulet Neteb' (meaning 'two things' in Amharic) examines the tensions and harmonies between tradition and modernity, individual and collective identity, past and present. Through innovative cinematographic techniques and thoughtful narrative structure, the film creates a meditative exploration of Ethiopian philosophical concepts. Available through Google Drive: https://drive.google.com/file/d/1mF4sGEPb7YrYdEeUFYA2vZERRdR9F7G5/view?usp=sharing",
    image: "/placeholder.svg?height=600&width=800&text=Hulet+Neteb",
    featured: false,
    awards: [],
    visitors: "5K",
    tags: ["experimental", "philosophy", "duality", "culture"],
  },
  {
    id: "bet-bota",
    title: "Bet Bota",
    year: 2022,
    category: "Installation",
    medium: "Architectural intervention",
    description:
      "An architectural intervention that transforms domestic spaces through textile elements and cultural memory. 'Bet Bota' (meaning 'house place' in Amharic) reimagines the relationship between interior and exterior, private and public, through strategic placement of traditional textiles within contemporary architectural contexts. The installation is documented through 18 carefully composed photographs arranged in carousel slides (2 per slide), creating a visual narrative that explores how cultural objects transform spatial meaning and domestic experience.",
    image: "/placeholder.svg?height=600&width=800&text=Bet+Bota+1",
    featured: false,
    awards: [],
    visitors: "12K",
    tags: ["architecture", "domestic", "cultural memory", "space"],
  },
  {
    id: "hulet-neteb-installation",
    title: "Hulet Neteb Installation",
    year: 2022,
    category: "Installation",
    medium: "Interactive installation",
    description:
      "An interactive installation exploring the philosophical concept of duality through physical and digital elements. Building on the themes from the experimental film of the same name, this installation creates an immersive environment where visitors can physically engage with the concept of 'Hulet Neteb' (two things). The work is comprehensively documented through 7 photographs that capture both the installation's physical presence and visitor interactions, demonstrating how philosophical concepts can be experienced through spatial and tactile engagement.",
    image: "/placeholder.svg?height=600&width=800&text=Hulet+Neteb+Installation+1",
    featured: false,
    awards: [],
    visitors: "8K",
    tags: ["interactive", "philosophy", "duality", "digital"],
  },
  {
    id: "in-red-photos-archive",
    title: "In Red",
    year: 2022,
    category: "Archive",
    medium: "Artistic photography",
    description:
      "A photographic series exploring the color red in Ethiopian culture, from traditional clothing to landscapes. This photographic series documents the significance of red in Ethiopian culture, capturing everything from traditional red clothing and ceremonial objects to natural red landscapes and architectural elements. Contains 7 striking photographs that reveal the deep cultural meanings and emotional associations of this powerful color.",
    image: "/placeholder.svg?height=600&width=800&text=In+Red+Archive",
    featured: false,
    awards: [],
    visitors: "5K",
    tags: ["color study", "cultural significance", "photography", "red"],
  },
  {
    id: "portal-to-u-thiopia-archive",
    title: "Portal to U-thiopia",
    year: 2022,
    category: "Archive",
    medium: "Conceptual photography",
    description:
      "Conceptual photographs imagining alternative realities and utopian visions of Ethiopian society. This conceptual series creates visual portals to imagined versions of Ethiopia, exploring themes of possibility, hope, and alternative futures through surreal and dreamlike imagery. Features 4 conceptual photographs that challenge viewers to imagine different possibilities for Ethiopian society and culture.",
    image: "/placeholder.svg?height=600&width=800&text=Portal+U-thiopia+Archive",
    featured: false,
    awards: [],
    visitors: "4K",
    tags: ["conceptual", "utopia", "alternative reality", "surreal"],
  },

  // 2021 Projects
  {
    id: "decoding-legends",
    title: "Decoding Legends",
    year: 2021,
    category: "Films",
    medium: "Documentary Series",
    description:
      "A documentary series that decodes ancient Ethiopian legends through contemporary perspectives, examining how traditional stories continue to influence modern Ethiopian identity. The series combines historical research with contemporary storytelling techniques, featuring interviews with cultural historians, storytellers, and community elders. Each episode explores different legendary figures and their relevance to contemporary Ethiopian society. Available on YouTube: https://youtu.be/0v1vwgnqHRU?si=uJkjUumPFlwMwHJy",
    image: "/placeholder.svg?height=600&width=800&text=Decoding+Legends",
    featured: false,
    awards: [],
    visitors: "12K",
    tags: ["documentary", "legends", "storytelling", "heritage"],
  },
  {
    id: "decoding-legends-installation",
    title: "Decoding Legends Installation",
    year: 2021,
    category: "Installation",
    medium: "Multimedia installation",
    description:
      "A multimedia installation that brings ancient Ethiopian legends to life through contemporary art practices, created during the prestigious Gojo residency program. This immersive work combines video, sound, textile, and sculptural elements to create an environment where visitors can experience legendary narratives through multiple sensory channels. The installation is documented through 9 comprehensive photographs that capture the work's complexity and visitor engagement, demonstrating how traditional storytelling can be transformed through contemporary artistic methodologies.",
    image: "/placeholder.svg?height=600&width=800&text=Decoding+Legends+1",
    featured: false,
    awards: [],
    visitors: "15K",
    tags: ["legends", "multimedia", "storytelling", "heritage"],
  },
  {
    id: "decoding-legends-photos-archive",
    title: "Decoding Legends",
    year: 2021,
    category: "Archive",
    medium: "Documentary photography",
    description:
      "Photographic documentation supporting the Decoding Legends film series and installation work. This archive contains 3 key photographs from the extensive research and documentation that supported the Decoding Legends project, including location scouting, cultural research, and process documentation that provided the foundation for the larger multimedia project.",
    image: "/placeholder.svg?height=600&width=800&text=Decoding+Legends+Archive",
    featured: false,
    awards: [],
    visitors: "3K",
    tags: ["documentary", "research", "legends", "cultural documentation"],
  },
  {
    id: "to-identify-photos-archive",
    title: "To Identify",
    year: 2021,
    category: "Archive",
    medium: "Identity exploration",
    description:
      "Personal photographic exploration of individual and collective identity within Ethiopian diaspora communities. To Identify is a personal photographic project exploring questions of identity, belonging, and cultural connection within Ethiopian diaspora communities around the world. Contains 19 photographs arranged in a specific narrative sequence: 1 photo in the first carousel slide, 5 photos in the second carousel slide, 7 in the third, and 6 in the fourth, creating a visual journey through themes of identity and belonging.",
    image: "/placeholder.svg?height=600&width=800&text=To+Identify+Archive",
    featured: false,
    awards: [],
    visitors: "7K",
    tags: ["identity", "diaspora", "personal", "belonging"],
  },
  {
    id: "tibeb-be-adebabay-archive",
    title: "Tibeb Be Adebabay",
    year: 2021,
    category: "Archive",
    medium: "Cultural documentation",
    description:
      "Photographic documentation of traditional Ethiopian art forms and their contemporary interpretations. Tibeb Be Adebabay (meaning 'art in Addis Ababa') documents the rich artistic traditions of Ethiopia's capital city, capturing both traditional art forms and their contemporary evolution. Features 4 documentary photographs that showcase the continuity and transformation of artistic practices in urban Ethiopian contexts.",
    image: "/placeholder.svg?height=600&width=800&text=Tibeb+Be+Adebabay+Archive",
    featured: false,
    awards: [],
    visitors: "4K",
    tags: ["cultural documentation", "traditional art", "contemporary", "addis ababa"],
  },

  // 2020 Projects
  {
    id: "vibrant-hues-archive",
    title: "Vibrant Hues",
    year: 2020,
    category: "Archive",
    medium: "Color studies",
    description:
      "An exploration of color in Ethiopian culture, from traditional dyes to contemporary color palettes. This archive documents the rich color traditions of Ethiopian culture, exploring everything from traditional natural dyes and their cultural meanings to contemporary color applications in art and design. Contains two experiments: 11 photos in experiment 01 exploring traditional dye processes, and 7 photos in experiment 02 examining contemporary color applications.",
    image: "/placeholder.svg?height=600&width=800&text=Vibrant+Hues+Archive",
    featured: false,
    awards: [],
    visitors: "5K",
    tags: ["color theory", "traditional dyes", "cultural meaning", "design"],
  },
  {
    id: "graphic-posters-illustrations-archive",
    title: "Graphic Posters",
    year: 2020,
    category: "Archive",
    medium: "Graphic design",
    description:
      "Collection of graphic design work including posters and visual identity projects. This archive contains 5 graphic design projects including event posters and editorial work that explore Ethiopian cultural themes through contemporary design approaches. The collection demonstrates the application of traditional cultural elements within modern graphic design frameworks.",
    image: "/placeholder.svg?height=600&width=800&text=Graphic+Posters+Archive",
    featured: false,
    awards: [],
    visitors: "3K",
    tags: ["graphic design", "posters", "visual identity", "cultural themes"],
  },
  {
    id: "illustrations-red-studyo",
    title: "Illustrations",
    year: 2020,
    category: "Archive",
    medium: "Digital illustrations",
    description:
      "Collection of digital illustrations and ongoing creative work documented on Instagram. This collection showcases ongoing illustration work that explores Ethiopian cultural themes through digital art. The illustrations combine traditional motifs with contemporary digital techniques, creating a bridge between ancestral artistic traditions and modern creative expression. Follow the ongoing work on Instagram @red_studyo for the latest illustrations and creative process documentation.",
    image: "/placeholder.svg?height=600&width=800&text=Illustrations+Red+Studyo",
    featured: false,
    awards: [],
    visitors: "2K",
    tags: ["illustrations", "digital art", "cultural themes", "instagram"],
  },
]

export default function AllProjectsPage() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPath="/projects" />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="px-12 lg:px-20 mb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-stardom text-black mb-6 pt-7">All Projects</h1>
          </div>
        </div>

        {/* Projects Timeline */}
        <div className="px-12 lg:px-20">
          <ProjectTimeline projects={allProjectsData} isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
