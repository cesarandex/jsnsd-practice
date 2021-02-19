const Http = require('http');

/**
 * GET EP that reads an URL via query parameter and forwards the request to said URL.
 *  - Provided query parameter has to be validated, return bad request if required
 *  - Forward the received response from the target URL including status, headers and body
 */

const forwardingController = {
  get: async (req, res) => {
    const urlParam = req.query.url;
    if (urlParam) {
      try {
        const url = new URL(urlParam);

        const reqOpts = {
          port: url.port || 80,
          path: url.pathname || '/',
          protocol: url.protocol || 'http:',
          hostname: url.hostname,
          method: req.method,
          headers: req.headers,
        }
  
        /**
         * Connector request will propagate the body headers and query params to the target site.
         * On completion, it will forward the response to the original response.
         * 
         * Redirect option: res.redirect('https://app.example.io');
         */
  
        const connector = Http.request(reqOpts, response => {
          // response.writeHead(res.statusCode, res.headers);
          response.pipe(res).on('error', err => res.status(500).send(err))
        });
  
        // Pipe the original request into the connector
        req.pipe(connector).on('error', err => res.status(500).send(err))
      } catch {
        res.status(400).send('Invalid URL')
      }
    } else {
      res.status(400).send('Missing forwarding URL query param');
    }
  }
}

module.exports = {
  get: forwardingController.get
}