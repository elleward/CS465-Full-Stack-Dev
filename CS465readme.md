# CS 465 Full Stack Development with MEAN Stack

## Architecture

The Travlr Getaways project used three different frontend approaches. The customer-facing pages started as Express HTML rendered server-side, then moved to Handlebars templates to eliminate repeated markup across pages. JavaScript handled client-side logic and API calls. The Angular SPA replaced the admin interface entirely, loading once and updating the page without server round-trips for every action, which makes the admin experience faster and more responsive.

MongoDB was the right choice for the backend because trip data does not fit neatly into relational tables. Documents map directly to JavaScript objects, which keeps the data format consistent across the full stack. It also makes it easier to change the shape of the data without rewriting a schema.

## Functionality

JSON is a data format. JavaScript is the language that reads and writes it. JSON acts as the bridge between the frontend and backend: Angular sends JSON requests to the Express API, and the API sends JSON back. That shared format is what allows two separate parts of the application to communicate cleanly.

Refactoring happened throughout the project. Converting static HTML to Handlebars templates was the first major improvement, cutting out duplicated markup across every page. Building reusable Angular components for trip cards meant the same UI logic could render any trip returned from the API without repeating code.

## Testing

The API handles GET, POST, and PUT requests for trip data. GET retrieves trips, POST creates new ones, and PUT updates existing records. Testing endpoints in Postman confirmed routes returned the correct status codes before connecting the frontend. Adding JWT authentication required testing both valid and invalid token cases to confirm the middleware was rejecting unauthorized requests correctly.

## Reflection

This course gave me a clearer picture of how a web application actually works. Before this, I understood pieces separately: I knew what a database was, I knew what an API was, but I had never built something that tied all of it together. Going through every layer of the MEAN stack changed that.

For someone going into UI/UX and HCI, knowing the full stack matters more than it might seem. Design decisions do not happen in a vacuum. Knowing how data gets from a database to a screen changes how I think about what is realistic to design, and it makes conversations with developers a lot easier.

Angular gave me hands-on experience with component-based architecture, which is the same way design systems are organized. Working through JWT authentication gave me context for how security affects user flows, which is something UX designers have to think about whether they realize it or not. I want to work at the intersection of design and technology, and this course helped me get there.
