interface ProjectInfoProps {
  longDescription?: string | null;
  year?: number | null;
  role?: string | null;
}

const ProjectInfo = ({ longDescription, year, role }: ProjectInfoProps) => {
  if (!longDescription && !year && !role) return null;

  return (
    <section className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-12 lg:gap-24">
          {/* Left Column - Description */}
          <div className="space-y-6">
            <span className="text-sm text-muted-foreground">[ Projects ]</span>
            {longDescription && (
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {longDescription}
              </p>
            )}
          </div>

          {/* Right Column - Year & Role */}
          <div className="space-y-8">
            {year && (
              <div className="flex items-baseline gap-3">
                <span className="text-lg md:text-xl font-medium text-foreground">Year</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-lg md:text-xl text-muted-foreground">{year}</span>
              </div>
            )}
            {role && (
              <div className="flex items-baseline gap-3">
                <span className="text-lg md:text-xl font-medium text-foreground">Role</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-lg md:text-xl text-muted-foreground uppercase tracking-wide">{role}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
