# Wikipedia Search and Analysis Tool - Frontend

This is the frontend application for the Wikipedia Search and Analysis Tool, built with React.js.

## Project Overview

The goal of this project is to provide a minimalistic, single-page React application that efficiently searches and presents Wikipedia results. The emphasis is on swift performance and secure interactions.

## Features

- **User authentication:** Signup, Login and Logout
- **Wikipedia Search:** Utilize the Wikipedia API to search for articles.
- **Relevance-Based Sorting:** Display search results with relevance-based sorting.
- **Virtualized Lists:** Employ virtualized lists for improved performance.
- **Search History:** Keep track of user search history for authenticated users

## Setup Instructions

```bash
git clone <frontend-repository-url>
cd wikipedia-search-frontend
npm install
npm start
```

1. Clone the frontend repository:

   ```bash
   git clone git@github.com:maaizelahi/wikipedia-search-app.git
   cd wikipedia-search-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the server:

   ```bash
   npm start
   ```

   The server will be running on http://localhost:3000 by default.

Open your browser and visit http://localhost:3000.

## Project Structure

- src/components: Contains React components.
- src/services: Includes service files for API interactions.
- src/contexts: Contains contexts
- src/utils: Houses utility functions.
- src/tests: Stores test files.

## Performance Optimization

- Applied input debouncing to reduce search latency.
- Employed virtualized lists for improved rendering performance.
- Have Paginated API's
- Used react useMemo and useCallback hooks where ever possible for optimization

## Security

- User Authentication
- Wikipedia search snippet sanitization
- Input validation and sanitization.

## Testing

```bash
npm run test

```

Test cases need to be added

## Author

Maaiz Elahi
