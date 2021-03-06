# The Pegas' SWE Project

## The Pegas Quiz 
We built a trivia quiz website that everyone can enjoy. We will require users to log in before they could start a quiz. Our quizzes are diverse in genre and forms, and all the questions come from the Open Trivia DB Api.  
We use Flask in the backend with Postgresql to build our api which will be then consumed by a React frontend to provide information pertinent to the logged in user + store persistent statistics as users play. We will also make use of an external api Open Trivia DB.


[Heroku Link](https://swe-trivia-2.herokuapp.com/)

## Linting

We disabled:

**eslint-disable react/no-array-index-key**: we are not reordering items or delete them, as such using the index as the key is not an issue for our functionalities.

**eslint-disable no-console**: for dev purpose, we actually want to console log some errors. 

**eslint-disable react/prop-types**: we list props in the component definition. 

**eslint-disable react/no-danger**: we are forced to disable react/no-danger in order to use dangerouslySetInnerHTML which allow us to have the questions coming from open trivia db in plain text.

**eslint-disable react/jsx-filename-extension**: we disable this so that we don't have to have the .jsx extention for all our js files. 

**react/jsx-props-no-spreading**: We disallow JSX props spreading because we are passing an attribute with a lot of props, so not spreading it would make it much harder to read. 


## Development Instructions

To allow for simultaneous and speedy development of both the backend and frontend, this repo has both together so that members working on one are able to use the current most stable push by the other while working.

**For frontend development:**

You will need to ensure you have run `npm install` and `npm install --dev` for optimal workflow.

1. Run the backend using `python run.py` from the `backend` folder.
2. Start the React development server from the `frontend` directory using `npm start`.
3. When usage of some API route is needed within the frontend, such as `/users`, simply list that endpoint in the code where fetches/requests are performed. The React server will automatically proxy these requests to the local running backend.
4. Once the app has reached a state where a build can be performed, use command `npm run build` to start the process. Files will automatically be placed in the directory from which the backend will serve them.

If you do not run the backend, the React development server will not be able to properly use the API as needed.

**For backend development:**

While you can use the React development server to test backend changes, you can conserve resources by simply using the Flask-served React app that is sourced from the build files.

1. Simply run `python run.py`. The entire page will be available at `http://127.0.0.1:5000`, with the React app at the main endpoint (provided a valid build has been performed).
