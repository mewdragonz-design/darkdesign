import type { ComponentType } from "react";
import WaveDemo from "./WaveDemo";

export interface DemoEntry {
  title: string;
  description: string;
  component: ComponentType;
}

/**
 * Registry of custom-coded demo pages, keyed by the `demo_path` slug
 * stored on a post in the CMS (e.g. demo_path = "/demos/wave-interference").
 * Add a new entry here whenever a new demo is coded.
 */
export const demoRegistry: Record<string, DemoEntry> = {
  "wave-interference": {
    title: "Wave Interference",
    description:
      "Two point sources, one field — interference patterns emerging in real time.",
    component: WaveDemo,
  },
};
