# movieexplorer

This website is an implementation of both the TMDB and MediaWiki APIs, demonstrating how requests to external sources can be used to create a dynamic webpage that relies on them to serve data to the user. Flask is used as the framework of choice for providing content to the user.

## Technologies Used

-   [Python 3](https://www.python.org/)
-   [Python Requests](https://docs.python-requests.org/en/latest/)
-   [Flask](https://flask.palletsprojects.com/en/2.0.x/)
-   [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
-   [Flask-Login](https://flask-login.readthedocs.io/en/latest/)
-   [Pylint](https://pylint.org/)
-   [Node.js](https://nodejs.org/en/)
-   [React](https://reactjs.org/)
-   [Babel](https://babeljs.io/)
-   [ESLint](https://eslint.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [gunicorn](https://gunicorn.org/)
-   [Bulma](https://bulma.io/)
-   [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction)
-   [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page)
-   [Git](https://git-scm.com/)
-   [Heroku](https://www.heroku.com/)

## Dev Notes

The user comments dashboard is rendered using a React component, which is compiled from JSX using Babel. If you'd like to modify this component, you can edit the source in `src/comments.js`, after which you should lint and recompile the source. You may also create your own within the same directory.

*You will first need to install Node.js, and run `npm install` from the project root.*

To lint: `npm run lint`

To build: `npm run build` (automatically outputs to `static/js` folder within Flask project)

To build automatically on changes: `npm run watch`

## Setup Instructions

_You will need to request access to the TMDB API to get an API key with which to authenticate your requests. This can be done [here](https://www.themoviedb.org/settings/api)._

1. Install Python 3.5+, if not already installed. Pip, the default package manager, is also required.
    1. You will need to ensure your Python and Pip installations are in your PATH environment variable before continuing.
2. From the root directory, use the command `pip install -r requirements.txt` to install all dependencies for this application.
3. Install the latest version Heroku, and authenticate using `heroku login` from your console.
4. Provision a Postgres instance using `heroku addons:create heroku-postgresql:hobby-dev`.

From here, depending on whether you plan to host the application locally or spin it up on a remote Heroku server, instructions will differ.

-   **HOSTING LOCALLY**
    1. Create a `.env` file in the root directory.
    2. Within the file, place the line `TMDB_API_KEY={YOUR_KEY_HERE}`, replacing the placeholder with your key retrieved from the TMDB account dashboard.
    3. Use `heroku config:get DATABASE_URL` to get your Postgres database URL, and copy paste the output onto a new line within the `.env` file.
        - The provided URL from Heroku uses the incorrect protocol prefix `postgres://`; you can change this manually to `postgresql://` if you desire, but this is handled internally by the application in the case that the user does not.
    4. Add a secret key that will be used for authentication and hashing to a new line inside `.env`, using the format `SECRET_KEY={YOUR_KEY_HERE}`.
    5. Install gunicorn however applicable for your system; what's necessary is that your console responds to the command `gunicorn` without issue.
        - **Note:** Windows users will need to use Windows Subsystem for Linux or equivalent to proceed here, as gunicorn only supports running from \*nix plaforms.
    6. From the root directory, run `heroku local` to spin up the instance. You may now access it from your browser at `127.0.0.1:5000`, unless you've changed the configuration.

-   **HOSTING REMOTELY**
    1. Run `heroku create` to create the app on Heroku's end.
    2. Add the required API key to the Heroku config using `heroku config:set TMDB_API_KEY={YOUR_KEY_HERE}`, replacing the placeholder with your key retrieved from the TMDB account dashboard.
    4. Add a secret key that will be used for authentication and hashing to your Heroku config using the format `heroku config:set SECRET_KEY={YOUR_KEY_HERE}`.
    3. Run `git push heroku main` to push the app to your remote server and build, as the previous command will add a new remote to your local repository.
    4. Once complete, allocate a dyno to the app using `heroku ps:scale web=1`.
    5. Your app should be live. Use `heroku open` to quickly open your app in the browser.

## Considerations

Some issues encountered are as follows:

1. Originally, I planned to prompt the user with an edit interface in the same location as where the comment they wanted to edit was being displayed. It was to look the same as the original comment submission interface found on the movie pages. However, considering the state for comments held a list which was rendered out with a forEach loop, I didn't have a way to selectively pick out the comment and place the edit dialog there. Or at least, it would end up convoluted. Fortunately, I was able to find on the Bulma documentation that it had support for modal interfaces, which I ended up using to show the user an edit interface, pulling comment data from a state that kept the edit in memory until it was committed to the comments state.

2. I had some difficulty at the beginning determining how best to make the React component mingle with the pre-existing Flask infrastructure. My issue was that I wanted to use some Jinja2 conveniences, such as being able to pull the current user directly using Flask-Login and insert it where necessary in the comments component. I determined one method to do this was by directly create the React component within the HTML page, rather than creating an entire React app as with the start code (found on the React documentation). It simply required importing the React/ReactDOM modules from a CDN, along with Babel as I wanted to use JSX. I was able to make this more optimally performant by pulling out the code into the separate `src` folder, and setting up a Node.js project that would assist with linting and transpiling with Babel.

3. I wasn't sure how to make the message that would show on save attempt to only show when that attempt was made. Normally, I'd use a flashed message using flask, but that wasn't possible with the React component being made to make the request and update itself without refresh. I was able to find from some searching that HTML has a `hidden` attribute, which when set true, will remove from view and layout any element. Thus, I premade a message box and set it to be hidden, and added to the update method a section that would show a notification based on whether the update succeeded or failed. 

Biggest difficulties and learning from the project overall:

1. Honestly, I wasn't too shaken by this project. I've already experience with a project in the past using the MEAN stack to connect frontend to backend to database. The only difference was the technologies used, but with the concepts still familiar, it wasn't hard at all to get a grasp of what was happening once I read some documentation. I've used the technologies we did this time as well, just not all together like this. If I had to pick the one most difficult thing from the project, it would definitely be the frontend aspect. I usually tended to just prototype my ideas and personal projects with a severely lacking frontend that would just get the job done. This time, I was forced to focus on making the frotend at least somewhat appealing, and it helped me to pick up Bootstrap and later Bulma. With the first revision in Bootstrap and the rewrite using Bulma in the second milestone, I must've taken several hours just making things sit properly and figuring out how the layout systems worked. But, I feel I became a lot more comfortable with and efficient at creating visually appealing interfaces as a result.