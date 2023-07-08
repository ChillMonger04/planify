// Select the events list element
const eventsList = document.querySelector('.events-list');

// Function to add an event to the dashboard
function addEventToDashboard(event) {
  // Create a new list item for the event
  const eventItem = document.createElement('li');
  eventItem.classList.add('event-item');
  
  // Create a Date object for the event date
  const eventDate = new Date(event.year, event.month - 1, event.day);
  const eventDay = eventDate.toLocaleString('en', { day: 'numeric' });
  const eventYear = eventDate.getFullYear();

  // Populate the event item with title, date, and time
  eventItem.innerHTML = `
    <div class="event-title">${event.title}</div>
    <div class="event-date">${eventDate.toLocaleString('default', { month: 'long' })} ${eventDay}, ${eventYear}</div>
    <div class="event-time">${event.time}</div>
  `;
  
  // Append the event item to the events list
  eventsList.appendChild(eventItem);
}

// Load events from local storage
function loadEvents() {
  // Retrieve events from local storage
  const events = JSON.parse(localStorage.getItem('events'));
  if (events) {
    // Create an object to group events by month
    const eventsByMonth = {};

    // Iterate over each event object
    events.forEach((eventObj) => {
      // Extract day, month, year, and events array from the event object
      const { day, month, year, events } = eventObj;
      // Create a Date object based on the extracted values
      const date = new Date(year, month - 1, day);
      // Get the month name from the date
      const monthName = date.toLocaleString('default', { month: 'long' });

      // Check if the month name exists in the eventsByMonth object,
      // if not, create an empty array for that month
      if (!eventsByMonth[monthName]) {
        eventsByMonth[monthName] = [];
      }

      // Push each event into the corresponding month array
      events.forEach((event) => {
        eventsByMonth[monthName].push({
          ...event,
          day,
          month,
          year,
        });
      });
    });

    // Iterate over each month in eventsByMonth object
    Object.keys(eventsByMonth).forEach((monthName) => {
      // Get the events array for the current month
      const eventsOfMonth = eventsByMonth[monthName];

      // Create a separator element for the month
      const separator = document.createElement('li');
      separator.classList.add('month-separator');
      separator.textContent = monthName;
      // Append the separator to the events list
      eventsList.appendChild(separator);

      // Iterate over each event in the current month
      eventsOfMonth.forEach((event) => {
        // Add the event to the dashboard
        addEventToDashboard(event);
      });
    });
  }
}

// Call the loadEvents function to populate the dashboard with events
loadEvents();
