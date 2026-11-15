# Yaatharth Bawankar — Portfolio

A personal portfolio for Yaatharth Bawankar, a Computer Science Engineering student focused on artificial intelligence, machine learning, and data science. Built with React 19, TypeScript, Vite, Framer Motion, and a custom design system.

## Run locally

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Build

```bash
npm run typecheck
npm run build
npm run preview
```

## Content

All personal facts live in two files:

- `src/data/profile.ts` — contact details, navigation, skills, education, certifications, project-based experience, and resume path.
- `src/data/projects.ts` — the three verified projects, their write-ups, technology stacks, and live links.

Every claim on the site is traceable to the supplied resume. Do not add skills, job titles, dates, repositories, or achievements that are not verifiable.

The resume is served from `public/Yaatharth_Bawankar_Resume.pdf` and downloads as `Yaatharth_Bawankar_Resume.pdf`.

## Contact form

The form sends to the included Vercel serverless function at `/api/contact`. Configure these environment variables in Vercel before deploying:

```bash
RESEND_API_KEY="..."
CONTACT_TO_EMAIL="yaatharth754@gmail.com"
CONTACT_FROM_EMAIL="Portfolio <hello@your-verified-domain.com>"
```

`CONTACT_FROM_EMAIL` must use a domain verified with Resend. For another backend, set `VITE_CONTACT_ENDPOINT` to its JSON POST URL. Local Vite serves the frontend only; use `vercel dev` to test the function locally.

## Media

- The only video is an original, canvas-rendered night scene at `public/media/yaatharth-scene.mp4`. It appears exclusively inside the letterforms of "YAATHARTH" in the About section.
- Project artwork is original inline SVG; there are no stock images, photographs, or project screenshots.
- The glass winged Y logo is a shared inline SVG with a dark blue halo.

## Structure

```
src/
  components/   page sections, logo system, carousel, modal, loading screen
  data/         verified personal content
  hooks/        active section, focus trap, body scroll lock, media queries
  styles/       tokens, layout, logo animation, content, responsive rules
public/
  media/        original video
  favicon.svg   static mark
```

## Accessibility & motion

- Skip link, semantic landmarks, visible focus rings, keyboard carousel controls, focus-trapped menu and modal, and live status messages.
- `prefers-reduced-motion` disables automatic rotation, video playback, and non-essential animation.
- The interface uses black, glass white, and lime green. The logo halo is dark blue.

## License

MIT. All personal content and the angelic Y identity belong to Yaatharth Bawankar.
