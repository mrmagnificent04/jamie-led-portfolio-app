# jamieledesma.com

My personal portfolio: an interactive 3D beach scene that opens into a
Windows-95-styled "OS" holding my resume, projects, and writing.

The site is two separate apps that combine at runtime:

- **`outer/`** — the 3D scene (Three.js + Webpack). This is what loads at
  the root domain. It renders a desk on an island, and the computer
  monitor on that desk is a CSS3D-rendered `<iframe>` pointing at the
  inner app.
- **`inner/`** — the desktop "OS" (React + Create React App). This is what
  loads at the `os.` subdomain, both standalone in a browser and inside
  the monitor iframe in the 3D scene.

They're kept as two apps (not merged into one build) because they use
different toolchains — Webpack for the 3D scene, CRA for the OS UI — and
because the OS needs to run standalone at its own URL for the iframe to
embed it.

## Local development

Each app runs independently. From the repo root:

```bash
# 3D scene — http://localhost:8080
cd outer && npm install && npm run dev

# OS shell — http://localhost:3000
cd inner && npm install && npm run start
```

Run both at once (in separate terminals) to see the full experience:
the 3D scene's monitor iframe defaults to `https://os.jamieledesma.com/`
in production, and falls back to `http://localhost:3000/` when the page
is loaded with a `?dev` query param during local development.

## Deployment

Both apps deploy as **separate Vercel projects** pointed at this same
GitHub repo, each with its Root Directory set to its subfolder:

| Project | Root Directory | Build Command | Domain |
|---|---|---|---|
| outer | `outer` | `npm run build` | `jamieledesma.com` |
| inner | `inner` | `npm run build` | `os.jamieledesma.com` |

The outer app's build output goes to `outer/public/` (Webpack); the inner
app's goes to `inner/build/` (CRA). Both are gitignored — Vercel builds
them fresh from source on every deploy.

## Credits

Originally forked from [Henry Heffernan](https://henryheffernan.com)'s
open-source portfolio template (MIT licensed — see `outer/LICENSE.md`),
then rebuilt with my own content, projects, and design changes throughout.
