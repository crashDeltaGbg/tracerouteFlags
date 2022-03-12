#!/usr/bin/env node

import axios from "axios";
import Traceroute from "traceroute-lite";
import emoji from "./emoji.js";

let tr = new Traceroute("apple.com");

tr.on("hop", async (hop) => {
  const response = await axios.get(
    `http://ip-api.com/json/${hop.ip}?fields=countryCode`
  );

  hop["country"] = emoji[`flag-${response.data["countryCode"].toLowerCase()}`];
  console.log(hop);
});

tr.start();
