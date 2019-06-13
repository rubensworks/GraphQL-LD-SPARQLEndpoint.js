# SPARQL Endpoint for GraphQL-LD

[![Build Status](https://travis-ci.org/rubensworks/graphql-ld-sparqlendpoint.js.svg?branch=master)](https://travis-ci.org/rubensworks/graphql-ld-sparqlendpoint.js)
[![Coverage Status](https://coveralls.io/repos/github/rubensworks/graphql-ld-sparqlendpoint.js/badge.svg?branch=master)](https://coveralls.io/github/rubensworks/graphql-ld-sparqlendpoint.js?branch=master)
[![npm version](https://badge.fury.io/js/graphql-ld-sparqlendpoint.svg)](https://www.npmjs.com/package/graphql-ld-sparqlendpoint) [![Greenkeeper badge](https://badges.greenkeeper.io/rubensworks/graphql-ld-sparqlendpoint.js.svg)](https://greenkeeper.io/)

This is a [GraphQL-LD](https://github.com/rubensworks/graphql-ld.js) engine for executing queries against a remote _SPARQL endpoint_.

## Usage

```javascript
import {Client} from "graphql-ld";
import {QueryEngineSparqlEndpoint} from "graphql-ld-sparqlendpoint";

// Define a JSON-LD context
const context = {
  "@context": {
    "label": { "@id": "http://www.w3.org/2000/01/rdf-schema#label" }
  }
};

// Create a GraphQL-LD client based on a SPARQL endpoint
const endpoint = 'http://dbpedia.org/sparql';
const client = new Client({ context, queryEngine: new QueryEngineSparqlEndpoint(endpoint) });

// Define a query
const query = `
  query @single {
    label
  }`;

// Execute the query
const { data } = await client.query({ query });
```

## License
This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
