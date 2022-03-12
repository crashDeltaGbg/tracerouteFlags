#!/usr/bin/env node

import axios from "axios";
import Traceroute from "traceroute-lite";
import emoji from "./emoji.js";

let tr = new Traceroute("googe.com");

const fetchCountryCode = async (ip) => {
  const response = await axios.get(
    `http://ip-api.com/json/${ip}?fields=countryCode`
  );
  return response.data["countryCode"];
};

tr.on("hop", async (hop) => {
  const countryCode = await fetchCountryCode(hop.ip);

  hop["country"] = emoji[`flag-${countryCode?.toLowerCase()}`];
  console.log(hop);
});

tr.start();
