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

const fetchEmojiFlag = (countryCode) => {
  return emoji[`flag-${countryCode?.toLowerCase()}`];
};

const runTraceroute = (uri) => {
  let tr = new Traceroute(uri);
  tr.on("hop", async (hop) => {
    const countryCode = await fetchCountryCode(hop.ip);
    hop["country"] = fetchEmojiFlag(countryCode);
    console.log(hop);
  });
  tr.start();
};

program.argument("<uri>").action((uri) => {
  runTraceroute(uri);
});

program.parse();
