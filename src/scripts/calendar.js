import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const calendarEl = document.getElementById('calendar');
if (calendarEl) {
	let calendarExclusions = [];

	const calendar = new Calendar(calendarEl, {
		plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
		initialView: 'dayGridMonth',
		timeZone: 'local',
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
		},
		events: async function(info, successCallback, failureCallback) {
			try {
				const response = await fetch('/events.json');
				const data = await response.json();
				
				let events = [];
				if (Array.isArray(data)) {
					events = data;
				} else {
					events = data.events || [];
					calendarExclusions = data.exclusions || [];
				}
				
				successCallback(events);
			} catch (error) {
				failureCallback(error);
			}
		},
		eventClick: function(info) {
			const event = info.event;
			const start = event.start.toLocaleString([], { 
				weekday: 'long', 
				month: 'long', 
				day: 'numeric', 
				hour: '2-digit', 
				minute: '2-digit' 
			});
			const location = event.extendedProps.location || 'No location provided';
			const description = event.extendedProps.description || 'No description provided';

			const popover = document.getElementById('event-details-popover');
			if (popover) {
				document.getElementById('popover-title').innerText = event.title;
				document.getElementById('popover-time').innerText = start;
				document.getElementById('popover-location').innerText = location;
				document.getElementById('popover-description').innerText = description;
				
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
			
			// Prevent the browser from following any link in the event
			info.jsEvent.preventDefault();
		},
		eventDidMount: function(info) {
			if (info.event.start) {
				// Use ISO string to get the date in the event's local time (which is the viewer's local time due to timeZone: 'local')
				// We need YYYY-MM-DD for exclusion matching. 
				// info.event.start is a native Date object in the browser's local time.
				const year = info.event.start.getFullYear();
				const month = String(info.event.start.getMonth() + 1).padStart(2, '0');
				const day = String(info.event.start.getDate()).padStart(2, '0');
				const dateStr = `${year}-${month}-${day}`;
				
				// Hide if in exclusions list
				if (calendarExclusions.includes(dateStr)) {
					info.el.style.display = 'none';
				}

				// Add a tooltip with full title and location
				const location = info.event.extendedProps.location;
				let tooltipText = info.event.title;
				if (location) {
					tooltipText += ` (${location})`;
				}
				info.el.setAttribute('title', tooltipText);
			}
		}
	});

	calendar.render();

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
