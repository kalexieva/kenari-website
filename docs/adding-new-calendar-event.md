# Guide: Adding a New Calendar Event

Follow these steps to add a new future event to the website's calendar.

### 1. Locate the Data File

All calendar events are stored in a single JSON file. Open:
`src/data/events.json`

### 2. Add the Event Entry

Add a new object to the `events` array. Depending on whether the event is one-time or recurring, the structure will differ.

#### One-Time Event

One-time events use a standard structure with a specific start and optional end time.

**Example format:**

```json
{
  "title": "Event Title",
  "start": "2026-04-05T18:30:00-07:00",
  "end": "2026-04-05T20:30:00-07:00",
  "location": {
    "name": "Location Name",
    "address": "Full Address",
    "url": "https://maps.google.com/..."
  }
}
```

#### Recurring Event

Recurring events use the `rrule` format. Refer to the [FullCalendar RRule documentation](https://fullcalendar.io/docs/rrule-plugin) for advanced configurations.

See the `Practice` event in `events.json` for an example of a weekly recurring event.

---

### 3. Field Reference

The following fields are available for each event object:

| Field                 | Type     | Required | Description                                                                                              |
| :-------------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------- |
| `title`               | string   | **Yes**  | The name displayed on the calendar.                                                                      |
| `start`               | datetime | No       | Start time of event in ISO 8601 format (e.g., `YYYY-MM-DDTHH:MM:SS-00:00`).                              |
| `end`                 | datetime | No       | End time of event in ISO 8601 format (e.g., `YYYY-MM-DDTHH:MM:SS-00:00`).                                |
| `allDay`              | boolean  | No       | Set to `true` for all-day events. Defaults to `false`.                                                   |
| `excludeFromUpcoming` | boolean  | No       | If `true`, the event will not appear in the "Upcoming Events" list on the home page. Defaults to `false` |
| `location`            | object   | No       | Custom field. Contains `name` (required), `address` (required), and `url` (optional).                    |

> [!WARNING]
> **Time Zones:** Always include the time zone offset (e.g., `-07:00`) in your ISO strings to ensure the event displays correctly across different regions.

---

### 4. Verification

After making changes, you must verify the calendar's behavior locally and in a production-like environment.

1.  **Development Test:** Run the site locally to check the calendar and popovers:
    ```bash
    npm run dev
    ```
2.  **Production Check:** Verify the production build, as time zones can sometimes behave differently compared to local development:
    ```bash
    npm run build
    npm run preview
    ```

For more advanced options, consult the official [FullCalendar documentation](https://fullcalendar.io/docs/event-object). Note that `location` and `excludeFromUpcoming` are project-specific custom fields and are not covered in the official docs.
