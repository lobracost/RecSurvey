# RecSurvey
Provides surveys with recorded answers.
## Set up
1. Install node JS (>10) and npm
2. git clone https://github.com/lobracost/RecSurvey
3. cd RecSurvey
4. npm install

## Run
1. cd RecSurvey
2. npm start

The server is now running on your terminal. Navigate to https://localhost:5000/ to acess the app from your browser.

## Output
Navigate into the recordings directory where audio files are stored. 
The name of each file contains information about the speaker the task.

Example:
1_male_1_3_2020-12-15T16:46:35.686Z gives the following information:

1. It refers to the first task of the survey
2. The speaker is a male
3. Speakers english fluency is acceptable
4. Speaker speaks english once per month
5. Date and time of recornding is 2020-12-15T16:46:35

## Basic scripts
The basic scripts to manipulate are the following:

1. views/index.ejs
    Provides the Html for the basic page of the app.
2. public/javascripts/global.js
    Contains all of the javascript scripts that are necessary for the frontend operations.
3. routes/index.js
    Catches all the post and get requests from the server side.
4. public/stylesheets/style.css
    Css formatting.

## Make your survey

