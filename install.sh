#!/bin/bash
if [ ! -f www/scripts/configuration.js ]; then
  echo "creating empty config file: www/scripts/configuration.js"
  cp www/scripts/configuration.js.sample www/scripts/configuration.js
fi
if [ ! -f server/config.js ]; then
    echo "creating empty config file for the server: server/config.js"
    cp server/config.js.sample server/config.js
fi
npm install
ionic state restore
ionic resources
cd ./server
npm install
cd ..
echo "All done."
echo "Now try this:  ionic serve -c -s --lab"
