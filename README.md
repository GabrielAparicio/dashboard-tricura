# Policy Review Dashboard - Frontend Assessment

This is an implementation of the frontend assessment for Tricura Insurance Group. Core layout and interactions were implemented.

## Setup instructions

Clone and run the project:

```
git clone git@github.com:GabrielAparicio/dashboard-tricura.git
cd dashboard-tricura
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend expected at: http://localhost:4000

## Tech Stack

- React 19
- TypeScript
- TanStack Router
- TanStack Query
- Material UI
- Zod
- Axios

## Requirements that were implemented

1. Explore policies

- Display a list of policies using the /policies endpoint 
- Support pagination 
- Implement search and filtering 

2. Inspect policy details

- Load full policy data using /policies/:id
- Display nested data (compliance, pending reviews, financials)
- Present complex data in a clear and usable way

3. Manage policies

- Create new policies
- Edit existing policies

4. Handle real-world states

- Loading states (Skeleton for policies table is implemented, loading message for policies details is displayed but the architecture to finish the ui for this loading state is already in place)
- Empty states (implemented for policies table)
- Error states (retry and error states for policies table and policies details are missing but the architecture, organization and component boundaries are already in place, error boundaries were included to easily add retry and error logic and react query was configured to interact with error boundaries smoothly)
- Disabled states for actions (implemented for the toolbar while the policies table is loading/fetching)

## Considerations

1. API integration

- Clear separation between data fetching and UI
- Efficient use of endpoints
- Avoided unnecessary or duplicated requests (react query)

2. State management

- Route state is the source of truth

3. Performance awareness

- Focused on component boundaries and granular subscriptions instead of premature memoization
- Components only subscribe to the route state they consume
- Reduced unnecessary rerenders through state isolation

4. Code quality

- Readable, maintainable structure
- Sensible component boundaries
- Appropriate use of TypeScript

5. UX implementation

- Clear, usable interface (UI is responsive. Table columns are hidden when necessary)

## Tradeoffs or decisions to revisit

- Filtering by region was implemented, but checkboxes were replaced by radio inputs due to the fact the backend only supports one region as a query param
- The designs indicated that multiple regions could be used to filter policies but the backend didn't support this feature, a workaround on the frontend could have been implemented but the best practice for this kind of case is to let the backend handle it. I could go back to checkboxes as soon as the backend supports multiple regions.


## Things to improve with more time

- Add tests
- Complete delete policy feature
- Complete retry/error state for the policies table
- Complete retry/error state for the policies details (expandable section)
- Improve accessibility
- Add virtualization for very large datasets
- Add localization/internationalization
- Add dark mode



