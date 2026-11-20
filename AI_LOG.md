# AI Usage Log

I worked through this assignment using Claude as a sparring partner: I directed the work, made the decisions and reviewed the output. The uses below fall under the course AI policy's allowed uses (brainstorming, config syntax, debugging specific errors, and formatting written documentation from my notes).

**Tool used:** Claude (Anthropic)
**Date:** 18 November 2026
**Purpose:** Brainstorming architecture between Vite with React and Next.js App Router for the JavaScript Frameworks course requirements.
**Outcome:** Decided on Next.js App Router to get practice with Server Components for API fetching and file-system routing. Wrote the project setup and components myself.

**Tool used:** Claude (Anthropic)
**Date:** 18 November 2026
**Purpose:** Explanation of Next.js 16 dynamic route typing, where `params` in `app/product/[id]/page.tsx` was throwing a TypeScript error because it is a Promise.
**Outcome:** Understood that route parameters now resolve asynchronously in Next.js 16. Updated the props interface to `Promise<{ id: string }>` and unwrapped it with `await params`.

**Tool used:** Claude (Anthropic)
**Date:** 18 November 2026
**Purpose:** Help with a regular expression pattern for validating email addresses according to the contact form brief requirements.
**Outcome:** Implemented the regex validation check alongside my manual character length checks for name, subject and message.

**Tool used:** Claude (Anthropic)
**Date:** 18 November 2026
**Purpose:** Debugging a hydration mismatch error in the console when loading cart items from `localStorage` on initial page render.
**Outcome:** Understood that the server pre-render does not have access to browser `localStorage`. Fixed it by using a two-phase client mount pattern with `useEffect` and an `isLoaded` state before syncing.

**Tool used:** Claude (Anthropic)
**Date:** 20 November 2026
**Purpose:** Help with formatting and structuring my written reflection report from my own rough notes and experiences.
**Outcome:** The technical reflections, decisions, and opinions are entirely my own; AI helped format the markdown structure and clean prose. Documented here as required.
