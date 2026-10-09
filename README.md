# DarkDesign

Create a full-screen hero section (100vh) that matches the attached reference image (second image).

1) Layout (desktop)

Hero section height: 100vh.

Overall layout is two columns:

Left column: large name/title.

Right column: role label.

The bottom area contains a projects carousel strip with 4 visible project cards at a time.

2) Navbar (top)

Place a navbar at the top (inside the hero).

Navbar layout:

Left: 3 text links: Projects, About, Contact

Right: a large menu icon/button (use the attached menu image).

Align links horizontally with spacing similar to the reference.

Keep navbar minimal, clean, and aligned to the hero padding.

3) Typography

Use Inter everywhere.

Left title (name)

Text: “Emma Rose” (two lines like the reference).

Font: Inter

Weight: 500 (Medium)

Size: 120px

Color: light gray on dark background.

Position: left side, vertically centered-ish (like reference).

Right role label

Text: [ 3D Designer ]

Font: Inter

Weight: 500 (Medium)

Size: 50px

Letter spacing: -5%

Align it on the right side, around the mid-height of the hero (like reference).

4) Background / decorative lines layer

Add the attached background lines element as a decorative overlay: (image 1 named "Background Element.svg")

Position: absolute

Cover the hero area.

Behind all content (z-index lower than everything).

It must not block clicks (pointer-events: none).

Hero background color: very dark gray/black.

5) Bottom projects carousel (infinite loop)

At the bottom of the hero, create a horizontal row of project cards.

Visible cards

Show exactly 4 project cards visible at once (like reference).

These 4 images are “projects” (use the attached images as the card media).

Card structure

Each card should have:

An image thumbnail filling most of the card.

A small label/tag bar at the bottom (like reference), including:

Project name (e.g. “Apple Project”, “Dog Project”, etc.)

A tag chip like “#3D”

Card style:

Clean, minimal, slightly separated from background.

Similar sizing/spacing to the reference.

Animation behavior (important)

The cards must scroll continuously from right to left.

It must be infinite loopable:

When the last card exits left, it continues seamlessly (no jump).

The list of projects is not limited to 4; it should support any number of projects and still loop.

Smooth constant speed (no easing spikes).

Pause on hover is optional, but keep motion smooth.

6) Spacing + alignment

Keep padding around the hero content similar to the reference (generous breathing room).

Make sure the background lines remain visible but subtle behind elements.

7) Responsive notes

On smaller screens:

Reduce title size proportionally (but keep the same hierarchy).

Keep the carousel working and still looping.

Navbar stays usable (links can collapse if needed, but keep the menu icon visible).

Build this hero section with correct layering (background lines behind, content above), correct typography, and the infinite looping bottom carousel.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e755fe45-a7a1-41f2-b452-d59724cb1d49).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
