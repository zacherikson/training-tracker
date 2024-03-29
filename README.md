# Training Tracker
### Elevator pitch
Do you ever wish that it were easier to stay motivated about exercising? The Training Tracker application excites and motivates the user to pursue their fitness goals. Uploading workouts, setting personlized goals, receiving the support of an uplifting community will all help you become the type of person you want to be. Whether you're a seasoned athlete or just starting, Training Tracker will be your dedicated companion in your quest for a healthier lifestyle.

### Design
![IMG_1315](https://github.com/zacherikson/training-tracker/assets/100091786/8c4b82c2-42cc-4834-80e2-cedd5f3a449a)

Displayed here is a user uploading a run.

### Key features
- Secure login over HTTPS
- Ability to upload workouts of different types
- Display past workouts
- Make weekly goals
- Display weekly, monthly, yearly totals
- Add friends and comment on each other's workouts
- Store workouts in a database
- Record journal entries

### Technologies
- Authentication:
  - User logins to their account. Name is displayed at the top.
- Database data:
  - Workouts are stored in a database. They are displayed in weekly, monthly, and yearly totals.
- WebSocket data:
  - Users comment on each other's activities.

### Login Deliverable
In this deliverable, I changed my way of storing data so that now each user can see their personlized history of workouts and goals. I accomplished that using MongoDB. I added user registration and user authentication.

1. 20% - Supports new user registration
  - Use the create button with an email and password on the login page.
20% - Supports existing user authentication
  - If a user submits a proper email and password then they can login.
20% - Stores application data in MongoDB
  - Users, workouts, and goals are stored in MongoDB.
20% - Stores and retrieves credentials in MongoDB
  - User authentication controlled through MongoDB.
20% - Restricts application functionality based upon authentication
  - If you don't login, you can't use the app at all.

### Service Deliverable
In this deliverable, I implemented a backend service with endpoints for uploading a workout, listing all workouts, setting goals, and retrieving goals. I had to switch over from using localStorage in this deliverable.

1. 40% - Create an HTTP service using Node.js and Express
  - I downloaded Node.js, did npm install express, and implemented it into my index.js file, and it all works.
2. 10% - Frontend served up using Express static middleware
  - Express static middleware found in the index.js.
3. 10% - Your frontend calls third party service endpoints
  - Quote can be found on the founder page. https://startup.trainingtracker260.com/founder.html
4. 20% - Your backend provides service endpoints
  - Backend service endpoints include workout, workouts, runGoal, runGoals, etc.
5. 20% - Your frontend calls your service endpoints
  - I did this using the fetch function. Frontend calls include uploading a workout using POST /workout, retrieving all workouts GET /workouts, uploading goals using POST /runGoal or /bikeGoal etc., and retrieving goals using GET

### JavaScript Deliverable
1. 20% JavaScript support for future login.
  - Login page uses a login() function and stores the username to localStorage
2. 20% JavaScript support for future database data.
  - Uploading workouts are stored in localStorage for now and can be seen on the History page
3. 20% JavaScript support for future WebSocket.
  - Uploading workouts notifies other users and yourself that you just worked out as seen in the left sidebar
4. 40% JavaScript support for your application's interaction logic.
  - Setting Goals on the Goals page alters the right sidebar. Uploading workouts with proper data will help the user reach their goals. 

### CSS Deliverable
I created a main.css file and specific .css files for my login, workout, history, profile, and founder pages. 

1. 30% Header, footer, and main content body
  - Header: Title of website
  - Footer: At bottom, contains link to founder page and GitHub
  - main: three sections: friends, whatever page its on, and weekly goals
2. 20% Navigation elements
  - Middle menu bar with links to the workout, history, and profile pages
3. 10% Responsive to window resizing
  - Utilized flex elements 
4. 20% Application elements
  - Buttons and links are a darker blue when hovered over, etc.
5. 10% Application text content
  - Placed text within div elements and spaced them evenly throughout the pages
6. 10% Application images
  - Founder page at bottom has a big picture centered in the middle of the page. 

### HTML Deliverable
1. 20% HTML pages for each component of your application 
- login, uploading workouts, past workouts, friend's workouts, profile, founder page
2. 10% Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
- I sure hope so
3. 10% Links between pages as necessary
- links in header, and one in footer
4. 10% Application textual content
- yes
5. 10% Placeholder for 3rd party service calls
- Quote by someone by me in founder.html
6. 10% Application images
- Founder info, standard profile pic
7. 10% Login placeholder, including user name display
- Login page
8. 10% Database data placeholder showing content stored in the database
- Workouts
9. 10% WebSocket data placeholder showing where realtime communication will go
- Friend updates on the left of most pages

