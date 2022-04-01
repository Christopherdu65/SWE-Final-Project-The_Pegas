# SWE-Final-Project-The_Pegas

## Incentive
We developed a fake json server in order to test our frontend while other team members were still working on the frontend. 

## Testing && Setup

1. Clone the repo first
2. install json server with npm. ```npm install -g json-server```
3. go in the json-mock-api directory and start the JSON server: ```json-server --watch db.json```

The server should start up by now. to get all the users, go on Postman or your browser to: 
http://localhost:3000/users

you can also get a specific user by adding an id path parameter like this:
http://localhost:3000/users/1

this will return:
```
        {
            "id": 1,
            "username": "Pegasus65",
            "password": "Pegasus65",
            "totalPoints": 101
        }
```