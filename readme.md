# Mock-api-server

> A mock API server or mock server API imitates a real API server by providing realistic mock API responses to requests. They can be on your local machine or the public Internet. Responses can be static or dynamic, and simulate the data the real API would return, matching the schema with data types, objects, and arrays.

### Install

#### Using DECK

- Step1 : Open the deck application
- Step2 : Go to the marketplace and select the Mocks Stack.
- Step3 : Click on the install button in the top right corner.
- Step4 : Fill the form and save.
- Step5 : On the project list you can see your project name. Now you can start the project by clicking the play button.

### How to set-up and use custom api's

- Step1 : Go to the app code path and you can see the mocks folder there.
- Step2 : You can create your json file for api. For instance, if you want to create users api then create users.json
- Step3 : Add your custom api content like below:

```console
{
  "request": {
    "method": "GET",
    "path": "/v1/users"
  },
  "response": {
    "body": [
      { "id": 1, "name": "John" },
      { "id": 2, "name": "Marry" }
    ]
  }
}
```

You can set the method GET, POST, PUT, DELETE etc. and your api content will be inside of the `response>>body` object

- Step4 : Restart the project from deck app
- Step5 : Check your custom api from the browser. example:

```
http://{project_host}/v1/users
```

#### How to set-up using curl and other projects

- Step1 : Open deck app and select your mocks api project.
- Step2 : Open right side bar and go to Actions & Insights
- Step3 : Get host and port for connecting to other projects by copying the same
