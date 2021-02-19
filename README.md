# OpenJS Node.js Services Developer (JSNSD)

##### NodeJS
Modules import and export
```js
const x = require('dependency');
module.exports = y;
```

Handling files
```js
const fs = require('fs').promises;
const countriesPath = path.join(__dirname, 'countries.json');

// file read - use JSON parse if content is a JSON
fs.readFile(countriesPath, 'utf-8');
JSON.parse(fileContent)

// file write - use JSON stringify if content is a JSON
JSON.stringify(fileContent)
fs.writeFile(outputPath, fileContent);
```	

Instantiating axios
```js
const Http = axios.create();
await Http.get('http://localhost:3000')
```
<br>

##### Express
Dependencies and basic configuration
```js
'use strict'

const express = require('express');

// controllers and/or middlewares
const { controllerMethod } = require('./service.controller');

// express init
const app = express();
const port = 3052;

// express listen
app.listen(port, () => {
  console.log('Listening on port', port)
}).on('error', err => {
  console.log('Error listening', err)
});
```

Body parser configuration

```js
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
```

Middleware configuration
```js
const middleware = (_req, _res, next) => {
	// Middleware logic
	next();
}
app.use(middleware); // general
app.use('/path', middleware); // path related
```

Routing and handlers
```js
app.get('/', controllerMethod);
app.post('/path', specificMiddleware, controllerMethod); // middleware being optional
```

Default route
```js
// create default error middleware
const errorMiddleware = (_req, res) => {
  res.status(404).send('Invalid URL');
};

app.get('/countries', getCountries);
// fallback route
app.get('*', errorMiddleware)
```


Path and query parameters
```js
app.get('/:id', controllerMethod);
const pathParam = req.params.id;
const queryParam = req.query.id;
```

Handling and forwarding errors
```js
catch (err) {
	res.sendStatus(500); // OR
	res.status(404).send(err);
}
```

Static file system
```js
const path = require('path');
const staticPath = path.join(__dirname, 'public');
app.use('/', express.static(staticPath, { fallthrough: false }));
```

Consuming multiple services
```js
const _cities = Http.get('http://localhost:3051/cities').then(res => res.data);
const _countries = Http.get('http://localhost:3052/countries').then(res => res.data);
const [cities, countries] = await Promise.all([_cities, _countries]);
```

Handle invalid paths
```js
app.get('*', handler); // como último servicio
```

Request forwarding
```js
// use default http for forwarding
const Http = require('http');

// handle posible invalid URL with try/catch
const url = new URL(urlParam);

const reqOpts = {
	port: url.port || 80,
	path: url.pathname || '/',
	protocol: url.protocol || 'http:',
	hostname: url.hostname,
	method: req.method,
	headers: req.headers,
}

// create the http connector
const connector = Http.request(reqOpts, response => {
    response.pipe(res).on('error', err => res.status(500).send(err))
});

// Pipe the original request into the connector
req.pipe(connector).on('error', err => res.status(500).send(err))
```

Basic security middlewares
```js
req.headers['x-skip-request']
	? res.status(403).json({ error: 'The request has been skipped' })
	: next()
```

Authentication middleware
```js
const validateUserAccess = (req, res, next) => {
	const tokenHeader = req.headers['authorization'];
	const token = tokenHeader && tokenHeader.split(' ')[1];
	
	if (!token) {
		res.sendStatus(401);
	} else {
		jwt.verify(token, JWT_TOKEN_SECRET, (err, tokenData) => {
			if (err) {
				res.sendStatus(403);
			} else {
				req.tokenData = tokenData;
				next();
			}
		});
	}
};
```


**Reminder: Handler and middleware order is essential**

<br>

##### Exam environment
CURL requests
```
Base:
curl -X GET/POST -H Header1 -H Header2 https://url.com

Common headers:
	-H 'Accept: application/json'
	-H 'Content-Type: application/json'
	-H 'Authorization: Bearer eyJhb...ghLA'

POST:
	--data '{"prop1": "value", "prop2": true}'

Full example:
curl -H 'Accept: application/json' -H "Authorization: Bearer eyJhb...ghLA" http://localhost:3000/api/countries
```

Useful APIs
```
NodeJS
Express
JS Mozilla
```

Common dependencies
```
express
body-parser
axios
fs
crypto/bcrypt
```

<br>

Credit to:
<table>
  <tr>
    <td align="center"><a href="https://github.com/damoresa"><img src="https://avatars.githubusercontent.com/u/12097023?s=460&u=47c9e20316120d24e0a8c83743eb056e3757b5dc&v=4" width="60" alt="damoresa"/><br /><sub><b>damoresa</b></sub></a></td>
    <td align="center"><a href="https://github.com/edsadr"><img src="https://avatars.githubusercontent.com/u/1189785?s=460&v=4" width="60" alt="edsadr"/><br /><sub><b>edsadr</b></sub></a></td>
    <td align="center"><a href="https://github.com/moialbla"><img src="https://avatars.githubusercontent.com/u/14232214?s=460&u=854e29ed6552b22200b46c07f83bf44b58e92240&v=4" width="60" alt="moialbla"/><br /><sub><b>moialbla</b></sub></a></td>
    <td align="center"><a href="https://github.com/agarciabz"><img src="https://avatars.githubusercontent.com/u/27777512?s=460&u=b03eec76be45fe3fa8a141f530bf7f9deb8b8b19&v=4" width="60" alt="agarciabz"/><br /><sub><b>agarciabz</b></sub></a></td>
  </tr>
</table>

Daniel for the Everis JSNSD training
Adrián Estrada for his interviews and gist with exercises to practice with
Moisés and Agustin for taking the course with me 😀