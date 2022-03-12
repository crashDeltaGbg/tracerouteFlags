#!/usr/bin/env node

import traceroute from "traceroute-lite"

var tr = new traceroute('google.com');

tr.on('hop', function(hop) {
  console.log('Add API IP to Flag emoji call here')
  hop['country'] = "Sweden"
  console.log(hop); // { counter: 1, ip: '1.2.3.4', ms: 12 }
});

tr.start();