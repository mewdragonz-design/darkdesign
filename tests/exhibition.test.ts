import { describe, test, expect } from "bun:test";
import { orderedExhibits, openingHighlights, exhibitionPresentation } from "../src/lib/exhibition";
import type { Post } from "../src/hooks/usePosts";

const post = (id: string, overrides: Partial<Post> = {}): Post => ({
  id, title: id, slug: id, excerpt: null, content: null, hero_image: null,
  is_highlight: false, demo_path: null, display_order: 0, is_visible: true,
  show_on_home: true, home_presentation: "abstract", home_summary: null,
  created_at: "2026-10-07", updated_at: "2026-10-07", ...overrides,
});
describe("curated exhibition", () => {
  test("only selected published work is exhibited", () => {
    expect(orderedExhibits([post("selected"), post("archive", { show_on_home: false }), post("draft", { is_visible: false })]).map(p => p.id)).toEqual(["selected"]);
  });
  test("manual order takes precedence over publication date", () => {
    expect(orderedExhibits([post("second", { display_order: 2, created_at: "2026-10-08" }), post("first", { display_order: 1 })]).map(p => p.id)).toEqual(["first", "second"]);
  });
  test("opening contains one large and at most two small published highlights", () => {
    expect(openingHighlights([post("draft", { is_visible: false, is_highlight: true }), ...[1,2,3,4].map(n => post(String(n), { is_highlight: true, display_order: n }))]).map(p => p.id)).toEqual(["1", "2", "3"]);
  });
  test("each project has exactly one chosen presentation", () => {
    expect(exhibitionPresentation(post("figure"), true)).toBe("abstract");
    expect(exhibitionPresentation(post("live", { home_presentation: "demo" }), true)).toBe("demo");
  });
  test("a missing demo falls back to a visual abstract", () => {
    expect(exhibitionPresentation(post("missing", { home_presentation: "demo" }), false)).toBe("abstract");
  });
});