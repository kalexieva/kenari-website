import type { APIContext } from "astro";
import eventsData from "../data/events.json";

// This route exists so the same event data can be used in two places:
//
// 1) Astro components at build time can import the JSON directly from src/data
// 2) The browser can still request /events.json for FullCalendar
//
// That keeps one source of truth for events while still supporting both
// Astro rendering and client-side fetching.
export function GET(_context: APIContext) {
  // Return the shared event data as a real JSON response.
  // FullCalendar expects to fetch a URL, so Astro serves this file
  // as /events.json during build.
  return new Response(JSON.stringify(eventsData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
