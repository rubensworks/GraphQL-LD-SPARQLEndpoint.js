#!/usr/bin/env node

import * as fs from 'fs';
import {Client} from "graphql-ld";
import minimist = require('minimist');
import {QueryEngineSparqlEndpoint} from "../lib/QueryEngineSparqlEndpoint";

const args = minimist(process.argv.slice(2));
if (args._.length !== 3 || args.h || args.help) {
  process.stderr.write(`usage: graphql-ld-sparqlendpoint [--help] context query endpoint
  context:  a JSON object, e.g.
            { "hero": "http://example.org/hero", "name": "http://example.org/name" }
            or the path to such a context file
  query:    a GraphQL query, e.g.
            { hero { name } }
            or the path to such a query file
  endpoint: A SPARQL endpoint URL, e.g. http://dbpedia.org/sparql
`);
  process.exit(1);
}

// allow both files as direct JSON objects for context
const context = JSON.parse(fs.existsSync(args._[0]) ? fs.readFileSync(args._[0], 'utf8') : args._[0]);
const query = fs.existsSync(args._[1]) ? fs.readFileSync(args._[1], 'utf8') : args._[1];
const url = args._[2];

async function run() {
  const client = new Client({ context, queryEngine: new QueryEngineSparqlEndpoint(url) });
  const { data } = await client.query({ query });
  process.stdout.write(JSON.stringify(data, null, '  '));
}
run();
