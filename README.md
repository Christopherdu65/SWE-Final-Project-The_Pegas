# The Pegas' SWE Project

[Heroku Link](https://swe-trivia.herokuapp.com/)

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
