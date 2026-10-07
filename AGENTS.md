# Architecture

- Demos are custom-coded React components registered in `src/demos/registry.tsx`; the CMS links a post to a demo via its `demo_path` (e.g. `/demos/<slug>`). Adding a demo = code the component + add a registry entry.
- Blog content is stored as Markdown in `public.posts.content` and rendered with react-markdown + remark-gfm; references are inline links plus a References list authored at the end of the content.
- Page color system: dark tokens (`background`) for showcase pages (home, highlights, demos), light tokens (`paper`/`ink`) for text pages (posts, about, contact, CV). Header theme is set per page via `SiteHeader` variant.
- Full-page scroll snapping applies to landing/section pages only; blog posts scroll freely.
