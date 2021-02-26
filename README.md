# reCAPTCHA examples
This projects gives working examples Google reCAPTCHA.  
To use the code, first clone this project.
```bash
git clone https://github.com/hanshsieh/recaptcha-example.git
```
Then, install the dependencies
```
cd recaptcha-example
npm install
```
Go to [reCAPTCHA console](https://www.google.com/recaptcha/admin) to generate site key and secret key.  
Use `localhost` as the domain, and select the type of the reCAPTCHA you want.  
See [here](https://developers.google.com/recaptcha/docs/versions) for the comparison.  
Update `server.js` and the files in `views` folder to put the site keys and secret keys.  
Run the server
```
npm start
```
Then, connect to http://localhost:3000  
That's it!
