import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAdminPosts } from "@/hooks/usePosts";
import { useCreatePost, useUpdatePost } from "@/hooks/usePostMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { demoRegistry } from "@/demos/registry";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { data: posts } = useAdminPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [heroImage, setHeroImage] = useState<string | undefined>();
  const [isHighlight, setIsHighlight] = useState(false);
  const [demoPath, setDemoPath] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [showOnHome, setShowOnHome] = useState(false);
  const [homePresentation, setHomePresentation] = useState("abstract");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [homeSummary, setHomeSummary] = useState("");

  useEffect(() => {
    if (isEditing && posts) {
      const post = posts.find((p) => p.id === id);
      if (post) {
        setTitle(post.title);
        setSlug(post.slug || "");
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setHeroImage(post.hero_image || undefined);
        setIsHighlight(post.is_highlight);
        setDemoPath(post.demo_path || "");
        setIsVisible(post.is_visible ?? true);
        setShowOnHome(post.show_on_home);
        setHomePresentation(post.home_presentation);
        setDisplayOrder(post.display_order);
        setHomeSummary(post.home_summary || "");
      }
    }
  }, [isEditing, id, posts]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = {
      title,
      slug,
      excerpt: excerpt || null,
      content: content || null,
      hero_image: heroImage || null,
      is_highlight: isHighlight,
      demo_path: demoPath || null,
      is_visible: isVisible,
      show_on_home: showOnHome,
      home_presentation: homePresentation,
      display_order: displayOrder,
      home_summary: homeSummary || null,
    };

    if (id) {
      await updatePost.mutateAsync({ id, ...postData });
    } else {
      await createPost.mutateAsync(postData);
    }

    navigate("/admin");
  };

  const isPending = createPost.isPending || updatePost.isPending;

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
            {isEditing ? "Edit Post" : "New Post"}
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
            <Label htmlFor="excerpt">Short summary</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              placeholder={
                "Intro paragraph...\n\n## Section\n\nBody text with inline [links](https://example.com) and images:\n\n![Alt text](https://...)\n\n## References\n\n1. [Source](https://...)"
              }
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Supports Markdown: headings, links, images, footnotes as a
              References list at the bottom.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload value={heroImage} onChange={setHeroImage} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demoPath">Demo path (optional)</Label>
            <Input
              id="demoPath"
              value={demoPath}
              onChange={(e) => setDemoPath(e.target.value)}
              placeholder="/demos/wave-interference"
            />
            <p className="text-xs text-muted-foreground">
              Links this post to a coded interactive demo. Available:{" "}
              /demos/wave-interference
            </p>
          </div>

          <fieldset className="space-y-5 border-t border-border pt-6">
            <legend className="text-lg font-medium">Homepage exhibition</legend>
            <div className="flex items-center gap-3">
              <Switch id="showOnHome" checked={showOnHome} onCheckedChange={setShowOnHome} />
              <Label htmlFor="showOnHome">Include in exhibition</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="homePresentation">Presentation</Label>
                <Select value={homePresentation} onValueChange={setHomePresentation}>
                  <SelectTrigger id="homePresentation"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="abstract">White visual abstract</SelectItem><SelectItem value="demo">Black live demo</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label htmlFor="displayOrder">Display order</Label><Input id="displayOrder" type="number" step="1" value={displayOrder} onChange={e => setDisplayOrder(Number(e.target.value))} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="homeSummary">Exhibition caption (optional)</Label><Textarea id="homeSummary" rows={3} value={homeSummary} onChange={e => setHomeSummary(e.target.value)} /></div>
            {showOnHome && homePresentation === "demo" && !demoRegistry[demoPath.split("/").pop() || ""] && <p role="alert" className="text-sm text-muted-foreground">Choose an available demo path before saving a live demo.</p>}
          </fieldset>

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <Switch
                id="isVisible"
                checked={isVisible}
                onCheckedChange={setIsVisible}
              />
              <Label htmlFor="isVisible">Published</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="isHighlight"
                checked={isHighlight}
                onCheckedChange={setIsHighlight}
              />
              <Label htmlFor="isHighlight">Opening highlight</Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isPending || (showOnHome && homePresentation === "demo" && !demoRegistry[demoPath.split("/").pop() || ""])}>
              {isPending
                ? "Saving..."
                : isEditing
                ? "Update Post"
                : "Create Post"}
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

export default PostForm;
