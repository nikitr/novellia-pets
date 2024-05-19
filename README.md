<details>
  <summary>Getting Started with Create React App</summary>
  
  This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

</details>

## Novellia Pets Project Summary
Novellia take home quiz: gather and display medical records for your furry friend.
- novellia-pets contains client side code
- novellia-pets-server contains server side code
- please run the server with `npm start` then the app with `npm start` alongside it.

## Technical Decisions
[System Design](https://drive.google.com/file/d/1gnSTtLvr3XNYzxoS_2IIkiU75akAfFUD/view?usp=sharing) 

Tech Stack Summary:
- React + NodeJS for front end and server implementation
- Prisma ORM for simple, intuitive API for querying the DB
- SQL db for structured, predefined schemas. Most familiar with Postgres --> Neon serverless Postgres database

Packages:
- react-router-dom: Routing configuration
- react-datepicker: Date selection for pet dob and vaccine dates

## App structure
- A general user will hit the homepage which contains the pet creation form and the subsequent display of that pet information. Once a user has created their pet successfully, they can add a vaccine record and/or allergy record. They will see this reflected on the page once created. Admins can currently hit the `/admin` link which provides a read-only mode of all pets in the db with corresponding pet data.
- I built the pages this way for simplicity, with the general user experience including pet creation/viewing on one page and the admin dashboard on another. Ideally, once we add auth, we'd log the user in and then allow them to see their pet data.
- Created a ReactContext for pet so I don't have to pass the current "user" (pet) amongst components. This is useful as we need to know which pet was just created so that we can view the appropriate pet data and add records for that pet. 
- Created a reusable component `PetItem` which can be shared between the user view and admin view. This is a simple component which presents all the pet data (taking the pet, its vaccines, and allergies, as props).
- Created two separate components for vaccine and allergy forms because the fields are different and they make different backend queries.
- The component states are pretty straightforward and mirror the backend.
- I envisioned that a table/chart would be the best way to convey the medical records for a pet.

## [API](https://github.com/nikitr/novellia-pets-server) structure
- The queries mostly matched what I scoped out in my system design diagram/discussion.
- Ended up separating out the add record requests for vaccines vs allergies. Since the fields are different (and differences may grow over time), it seemed more straightforward to create two different requests, rather than messily combine the logic (which would probably require odd conditionals).
- Also ended up needing 2 queries to get the different types of records. This came out of a need to show the user that their records have been successfully added, on the front end.

## Backend structure
- I figured it would be cleanest to have a separate table for vaccine records and for allergy records. Each record table has a pet id foreign key which references each record to its corresponding unique pet. This way, the immediate pet data remains separate from the medical record data. This also allows us to build cleanly in the case that we want to add future record types.
- Straightforward data types per field in tables.

## Improvements
- Remove the "any" and "@ts-ignore" where added. Flesh out the types. There's probably a way to use prisma model to import data types.
- Styling! Very barebones right now. Pretty ugly.
- Validation: We probably want a list of pets we support, some checks on the pet creation form for the pet type. We should add some restrictions on the datepicker for dob and vaccine to only allow dates before current date.
- Once there is authentication, we can rely on logged in user info to provide current pet data. We can also separate out the admin experience.
- Since allergy severity only has two options currently (mild or severe) we should make that a dropdown so the entries remain consistent with expectations.
- The admin page UI could be cleaner (maybe we list out the pet names and the admin can click on a pet to view more, rather than displaying all info in its entirety). And/or add pagination as the db grows to maintain load times.
- There might be some minor duplicated code in queries.ts which can be pulled out into a function (the logic to get all vaccines and allergies for a pet is reused).
- Only show PetDisplay once pet is created.
- The edit pet feature must be fleshed out and improved. Should include dob and records. Should have a cancel button to return to pet display. Can also improve the `editPet` query to just pass through the fields that have been changed (currently, I pass through all the fields).

## Reflections
- First time using Prisma, docs are well done and the setup is very fast. 
- Same goes for Neon! Great UI to view and update tables. Fast and simple setup.
- Seamless integration between Prisma x Neon: easy to update table schemas. `npx prisma db push`

## Resources
- Decision to use Neon to host Postgres database: https://hasura.io/blog/top-postgresql-database-free-tier-solutions
- Prisma with Neon setup: https://neon.tech/docs/guides/prisma

