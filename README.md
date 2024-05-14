## Getting To Know the System:</br>
'Fitbook' is a social media platform designed for fitness enthusiasts. It allows users to share their fitness 
journeys, workouts, healthy meals, and progress through pictures, videos, and status updates. Users can 
create and share workout plans, meal plans, and interact with each other through likes, comments, and 
following profiles. ‘Fitbook’ prioritizes user-friendliness and will be available as a client web application.

The user interface was built with React.js. To connect this interface to the data storage, I used Java
Spring Boot to create a secure REST API. Spring Security and Spring OAuth2 handles user logins and
access permissions within the application.

## Key Features:</br>
• Easy Media Sharing: Upload pictures and videos (up to 3 photos or 30 seconds) showcasing 
workouts, meals, and progress.</br>
• Real-Time Workout Tracking: Track and share workout metrics (distance, repetitions, weight 
lifted) using templates and providing descriptions.</br>
• Collaborative Workout & Meal Plan Sharing: Design and share customized workout plans and 
meal plans with routines, exercises, sets, recipes, nutritional information, portion sizes and 
repetitions using built-in templates.</br>
• Social Interaction: Enables users to interact with each other by liking and commenting on posts. 
Users can also follow other users' profiles, with all profiles being publicly visible. The platform 
notifies users of likes and comments on their posts, fostering engagement within the community.</br>
• User Authentication: The application allows users to log in using their existing accounts on popular
services such as social media, enhancing convenience and accessibility.</br>

## Running the project

**You’ll need to have Node installed on your local development machine**. You can then clone this repo

```sh
git clone --depth=1 https://github.com/saranshkataria/frontend-starter-toolkit.git <YOUR_PROJECT_NAME>
```

You can then start building your own project based on the project that gets cloned. You can also remove the remote to the repo to avoid accidentally pushing to it.

Once you have a copy of the project, you need to install the dependencies. Run the command `npm install` or `yarn` in the command line.
After that you can run one of the following commands in the command line:

- `npm dev` or `yarn dev` to run a development server using webpack dev server. Each time you hit save, changes get hot reloaded using hot module replacement
- `npm prod` or `yarn prod` to create a production build
- `npm prod:debug` or `yarn prod:debug` to run webpack in debug mode while using the production configuration
- `npm dev:debug` or `yarn dev:debug` to run webpack in debug mode while using the development configuration
- `npm lint` or `yarn lint` for running ESLint to type check your source code
- `npm test` or `yarn test` for running Jest to run your test cases

It is also recommended that you install the Prettier extension for your IDE/Editor since the project supports it out of the box. Prettier has also been integrated as a pre commit hook to ensure that all files are formatted correctly.
