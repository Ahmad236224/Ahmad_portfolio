# Leasy Link — case study artefacts

Drop the Figma exports here, then fill in `src` on the matching entry in
`CASE_SLOTS` in `src/Portfolio.jsx`. Until `src` is set, the site renders a
labelled placeholder — it never draws a stand-in screenshot.

| Slot key               | Suggested filename         | Ratio   | What belongs there |
|------------------------|----------------------------|---------|--------------------|
| `user-flow`            | `user-flow.webp`           | 16 / 9  | FigJam board: full tenancy lifecycle, listing through lease close |
| `wireframes`           | `wireframes.webp`          | 16 / 10 | The three low-fidelity directions, side by side |
| `prototype-screens`    | `prototype-screens.webp`   | 4 / 3   | Record payment · add tenant · sign lease |
| `design-system-tokens` | `design-system-tokens.webp`| 16 / 9  | Type scale, spacing, colour and status tokens |
| `final-ui`             | `final-ui.webp`            | 16 / 9  | Shipped mobile screens beside the admin dashboard |

Example once an export is in place:

```js
"user-flow": { label: "User flow", note: "…", ratio: "16 / 9", src: "/case/leasy-link/user-flow.webp" },
```

Export at 2x and convert to WebP — these load below the fold and are lazy-loaded.
