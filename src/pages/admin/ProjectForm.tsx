import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminProjects } from "@/hooks/useAdminProjects";
import { useCreateProject, useUpdateProject } from "@/hooks/useProjectMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { Link } from "react-router-dom";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { data: projects } = useAdminProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [mainImage, setMainImage] = useState<string | undefined>();
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [tags, setTags] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    if (isEditing && projects) {
      const project = projects.find((p) => p.id === id);
      if (project) {
        setTitle(project.title);
        setSlug(project.slug || "");
        setShortDescription(project.short_description || "");
        setLongDescription(project.long_description || "");
        setMainImage(project.main_image || undefined);
        setAdditionalImages(project.additional_images || []);
        setTags(project.tags?.join(", ") || "");
        setYear(project.year?.toString() || "");
        setRole(project.role || "");
        setIsVisible(project.is_visible ?? true);
        setDisplayOrder(project.display_order);
      }
    }
  }, [isEditing, id, projects]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title,
      slug,
      short_description: shortDescription || null,
      long_description: longDescription || null,
      main_image: mainImage || null,
      additional_images: additionalImages,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      year: year ? parseInt(year) : null,
      role: role || null,
      is_visible: isVisible,
      display_order: displayOrder,
    };

    if (isEditing) {
      await updateProject.mutateAsync({ id: id!, ...projectData });
    } else {
      await createProject.mutateAsync(projectData);
    }

    navigate("/admin");
  };

  const isPending = createProject.isPending || updateProject.isPending;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            {isEditing ? "Edit Project" : "New Project"}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated-from-title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea
              id="longDescription"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              rows={6}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="design, development"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Lead Designer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="isVisible"
              checked={isVisible}
              onCheckedChange={setIsVisible}
            />
            <Label htmlFor="isVisible">Published</Label>
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload value={mainImage} onChange={setMainImage} />
          </div>

          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <MultiImageUpload value={additionalImages} onChange={setAdditionalImages} />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : isEditing
                ? "Update Project"
                : "Create Project"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link to="/admin">Cancel</Link>
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProjectForm;
