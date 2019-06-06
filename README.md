# weather_JS

A lightweight node app with a vanilla JS front-end for getting weather data.

NOTES:
For starters, in the root of the weather_js_API directory, you will need to create a file called .env

In the .env file, you need to add your google key for accessing their geocode API, as well as adding your darkSky key for accessing the <a href="https://darksky.net/dev/docs">darkSky API</a>.

The .env file should have the following (case sensitive):

<pre>GOOGLE_KEY=[your google key]</pre><br>
<pre>DARKSKY_KEY=[your darkSky key]</pre><br>
<pre>WEATHER_JS_PORT=[arbitrary port]</pre><br>

Note that whatever port you choose to run the node application on, you will need to change the PORT variable in weather_js_UI/ui.js to match it.

The front-end uses the google geocode api to convert a worlwide address/location search to lat/long values, which are then used to get current, hourly, and daily weather data to display.
