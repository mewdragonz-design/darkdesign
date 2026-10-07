import { cn } from "@/lib/utils";

interface PolaroidCardProps {
  image: string;
  name?: string;
  subtitle?: string;
  showCaption?: boolean;
  /**
   * Visual opacity applied to the photo only (keeps the frame opaque so you don't
   * see other cards "through" it).
   */
  imageOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PolaroidCard = ({ 
  image, 
  name, 
  subtitle, 
  showCaption = true,
  imageOpacity = 1,
  className, 
  style 
}: PolaroidCardProps) => {
  return (
    <div 
      className={cn(
        "relative bg-[#d4d4d4] p-3 shadow-2xl",
        showCaption ? "pb-16" : "pb-3",
        "w-[280px] md:w-[340px]",
        className
      )}
      style={style}
    >
      {/* Photo area */}
      <div className="relative aspect-square overflow-hidden bg-muted z-[4]">
        <img 
          src={image} 
          alt={name || "Photo"}
          className="w-full h-full object-cover"
          style={{ opacity: imageOpacity }}
        />
      </div>
      
      {/* Caption area - only shown if showCaption is true */}
      {showCaption && name && subtitle && (
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg md:text-xl font-semibold text-[#1a1a1a]">{name}</h3>
          <p className="text-sm text-[#666666]">{subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default PolaroidCard;
