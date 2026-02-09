import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';

const calendarEl = document.getElementById('calendar');

if (calendarEl) {
	// We can use mq to adjust the calendar layout for mobile and desktop devices
	const mq = window.matchMedia('(max-width: 50em)');
	let calendar = buildCalendar(mq.matches);
	calendar.render();

	// If the screen crosses the breakpoint, rebuild with mobile/desktop header + view.
	mq.addEventListener('change', (e) => {
		const currentDate = calendar.getDate();
		calendar.destroy();
		calendar = buildCalendar(e.matches);
		calendar.render();
		calendar.gotoDate(currentDate);
	});

	// Close popover logic
	const popover = document.getElementById('event-details-popover');
	const closeBtn = document.getElementById('close-popover');

	if (popover && closeBtn) {
		closeBtn.addEventListener('click', () => {
			popover.classList.add('popover-hidden');
		});

		// Close when clicking outside
		document.addEventListener('mousedown', (e) => {
			if (!popover.contains(e.target) && !e.target.closest('.fc-event')) {
				popover.classList.add('popover-hidden');
			}
		});
	}
}

function buildCalendar(isMobile) {
	return new Calendar(calendarEl, {
		plugins: [dayGridPlugin, timeGridPlugin, listPlugin, rrulePlugin],

		// Mobile: list is readable. Desktop: month grid is fine.
		initialView: isMobile ? 'listMonth' : 'dayGridMonth',

		timeZone: 'local',
		eventColor: 'var(--accent-regular)',

		// Mobile header: fewer controls to prevent squishing
		headerToolbar: isMobile
			? {left: 'prev,next', center: 'title', right: 'listMonth'}
			: {left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'},

		// Makes calendar less squished on mobile
		...(isMobile ? { height: 'auto' } : {}),

		events: async function (_info, successCallback, failureCallback) {
			try {
				const response = await fetch('/events.json');
				const data = await response.json();
				let events = data.events || [];
				successCallback(events);
			} catch (error) {
				failureCallback(error);
			}
		},

		// Open a popover with more event details on click
		eventClick: function (info) {
			const event = info.event;
			const start = event.start.toLocaleString([], {
				weekday: 'long',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
			const location = event.extendedProps.location || 'No location provided';

			const popover = document.getElementById('event-details-popover');
			if (popover) {
				document.getElementById('popover-title').innerText = event.title;
				document.getElementById('popover-time').innerText = start;
				document.getElementById('popover-location').innerText = location.name;
				document.getElementById('popover-address').innerText = location.address;
				document.getElementById('popover-location-link').href = location.url;

				popover.classList.remove('popover-hidden');

				// Position the popover
				const rect = info.el.getBoundingClientRect();
				const popoverRect = popover.getBoundingClientRect();

				let top = rect.top + window.scrollY - popoverRect.height - 10;
				let left = rect.left + window.scrollX + (rect.width / 2) - (popoverRect.width / 2);

				// Basic boundary checks
				if (top < window.scrollY) {
					top = rect.bottom + window.scrollY + 10;
				}
				if (left < 10) {
					left = 10;
				}
				if (left + popoverRect.width > window.innerWidth - 10) {
					left = window.innerWidth - popoverRect.width - 10;
				}

				popover.style.top = `${top}px`;
				popover.style.left = `${left}px`;
			}
		},

		eventDidMount: function (info) {
			if (info.event.start) {
				// Add a tooltip with full title
				info.el.setAttribute('title', info.event.title);
			}
		}
	});
}
