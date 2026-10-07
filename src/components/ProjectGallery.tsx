import { resolveImageUrl } from "@/lib/assetResolver";

// Default placeholder images for projects without gallery
const PLACEHOLDER_IMAGES = [
  "/src/assets/gallery-placeholder-1.webp",
  "/src/assets/gallery-placeholder-2.webp",
  "/src/assets/gallery-placeholder-3.webp",
  "/src/assets/gallery-placeholder-4.webp",
];

interface ProjectGalleryProps {
  images?: string[] | null;
  projectTitle: string;
}

const ProjectGallery = ({ images, projectTitle }: ProjectGalleryProps) => {
  // Use placeholder images if no gallery images exist
  const galleryImages = images && images.length > 0 ? images : PLACEHOLDER_IMAGES;
  const isPlaceholder = !images || images.length === 0;

  return (
    <section className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-24">
        {/* Section Header */}
        <span className="text-sm text-muted-foreground mb-12 block">[ More Renders ]</span>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={resolveImageUrl(image) || ""}
                alt={`${projectTitle} - Render ${index + 1}`}
                className="w-full object-cover aspect-[4/5] transition-all duration-300 group-hover:brightness-110"
              />
              {/* Caption overlay for placeholders */}
              {isPlaceholder && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 md:p-6">
                  <p className="text-xs md:text-sm text-muted-foreground italic">
                    Sample render • Replace with your own artwork via the admin panel
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
