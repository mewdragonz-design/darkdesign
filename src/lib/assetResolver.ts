// Map of local asset paths to their imported modules
// This is needed because paths like "/src/assets/..." don't work in production

import projectHoloPhone from "@/assets/project-holo-phone.png";
import projectLaptopCam from "@/assets/project-laptop-cam.png";
import projectSpeaker from "@/assets/project-speaker.png";
import projectAudioDevice from "@/assets/project-audio-device.png";
import projectRoboticHead from "@/assets/project-robotic-head.png";
import projectAirPurifier from "@/assets/project-air-purifier.png";
import projectTowerSpeaker from "@/assets/project-tower-speaker.png";
import projectKeyboard from "@/assets/project-keyboard.png";
import projectCamera from "@/assets/project-camera.png";
import projectArPortrait from "@/assets/project-ar-portrait.png";
import projectStealthDrone from "@/assets/project-stealth-drone.png";
import projectSmartSwitch from "@/assets/project-smart-switch.png";
import projectControlPanel from "@/assets/project-control-panel.png";
import projectRobot from "@/assets/project-robot.png";

// Gallery placeholder images
import galleryPlaceholder1 from "@/assets/gallery-placeholder-1.webp";
import galleryPlaceholder2 from "@/assets/gallery-placeholder-2.webp";
import galleryPlaceholder3 from "@/assets/gallery-placeholder-3.webp";
import galleryPlaceholder4 from "@/assets/gallery-placeholder-4.webp";

const assetMap: Record<string, string> = {
  "/src/assets/project-holo-phone.png": projectHoloPhone,
  "/src/assets/project-laptop-cam.png": projectLaptopCam,
  "/src/assets/project-speaker.png": projectSpeaker,
  "/src/assets/project-audio-device.png": projectAudioDevice,
  "/src/assets/project-robotic-head.png": projectRoboticHead,
  "/src/assets/project-air-purifier.png": projectAirPurifier,
  "/src/assets/project-tower-speaker.png": projectTowerSpeaker,
  "/src/assets/project-keyboard.png": projectKeyboard,
  "/src/assets/project-camera.png": projectCamera,
  "/src/assets/project-ar-portrait.png": projectArPortrait,
  "/src/assets/project-stealth-drone.png": projectStealthDrone,
  "/src/assets/project-smart-switch.png": projectSmartSwitch,
  "/src/assets/project-control-panel.png": projectControlPanel,
  "/src/assets/project-robot.png": projectRobot,
  // Gallery placeholders
  "/src/assets/gallery-placeholder-1.webp": galleryPlaceholder1,
  "/src/assets/gallery-placeholder-2.webp": galleryPlaceholder2,
  "/src/assets/gallery-placeholder-3.webp": galleryPlaceholder3,
  "/src/assets/gallery-placeholder-4.webp": galleryPlaceholder4,
};

/**
 * Resolves an image URL - if it's a local /src/assets path, returns the bundled asset URL.
 * Otherwise returns the original URL (for Supabase storage URLs, etc.)
 */
export const resolveImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  // Check if it's a local asset path
  if (url.startsWith("/src/assets/") || url.startsWith("src/assets/")) {
    const normalizedPath = url.startsWith("/") ? url : `/${url}`;
    return assetMap[normalizedPath] || null;
  }
  
  // Return the original URL for external URLs (Supabase storage, etc.)
  return url;
};
