# Architecture

- Demos are custom-coded React components registered in `src/demos/registry.tsx`; the CMS links a post to a demo via its `demo_path` (e.g. `/demos/<slug>`). Adding a demo = code the component + add a registry entry.
- Blog content is stored as Markdown in `public.posts.content` and rendered with react-markdown + remark-gfm; references are inline links plus a References list authored at the end of the content.
- Page color system: homepage screens declare their dark/light theme and an IntersectionObserver inside the snap container updates SiteHeader; other pages set SiteHeader variant directly, so navigation remains readable across exhibit transitions.
- Full-page scroll snapping applies to landing/section pages only; blog posts scroll freely.
- Homepage curation uses posts.show_on_home, display_order, home_presentation, and home_summary; selection/presentation helpers are shared and tested so the archive remains independent of the exhibition.
- ResearchFigure renders uploaded covers or illustrative sample scientific diagrams, keeping placeholder exhibits visual without inventing research results.
