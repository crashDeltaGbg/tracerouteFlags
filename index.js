#!/usr/bin/env node

import axios from "axios";
import { Command } from "commander";
import Traceroute from "traceroute-lite";
import emoji from "./emoji.js";

const program = new Command();

const fetchCountryCode = async (ip) => {
  const response = await axios.get(
    `http://ip-api.com/json/${ip}?fields=countryCode`
  );
  return response.data["countryCode"];
};

program.argument("<uri>").action((uri) => {
  console.log(uri);
  let tr = new Traceroute(uri);

  tr.on("hop", async (hop) => {
    const countryCode = await fetchCountryCode(hop.ip);

    hop["country"] = emoji[`flag-${countryCode?.toLowerCase()}`];
    console.log(hop);
  });

  tr.start();
});

program.parse();
