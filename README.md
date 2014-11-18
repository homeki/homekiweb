# homekiweb

The web interface to [homekicore](../../../homekicore).

## Run locally

Prereqs needed:
 * nodejs and npm

1. Start a homekicore server (follow the instructions on the readme for homekicore).
2. `git clone https://github.com/homeki/homekiweb.git`
3. `cd homekiweb`
4. `npm install`
5. To be able to communicate with the REST API you need to specify where to find your development homekicore server. Edit the file `app/scripts/services/api.js` and set the variable `DEV_SERVER` to localhost or your local IP (if you want to reach the server from the "outside" such as a mobile device, you need to set your local IP).
5. `grunt serve`

This will start a web server on port 9000. Access it using http://localhost:9000/. If you want to run in minified mode (as in production), use `grunt serve:dist`.

## Build release

Releases are available in a Debian repository at http://repository.homeki.com. There are two "suites", `unstable` and `stable`. `git push` to `develop` updates the package in `unstable`, `git push` to `master` updates the package in `stable`.