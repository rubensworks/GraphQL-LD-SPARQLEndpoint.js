import {IQueryEngine} from "graphql-ld";
import {Algebra} from "sparqlalgebrajs";
import translate from "sparqlalgebrajs/lib/sparqlAlgebra";
import {QueryEngineSparqlEndpoint} from "../lib/QueryEngineSparqlEndpoint";
const streamifyString = require('streamify-string');

// tslint:disable:object-literal-key-quotes

describe('QueryEngineSparqlEndpoint', () => {
  let queryEngine: IQueryEngine;
  let sparqlAlgebra: Algebra.Operation;

  beforeEach(() => {
    queryEngine = new QueryEngineSparqlEndpoint('http://example.org/sparql', {
      fetch: () => Promise.resolve(<Response> {
        body: streamifyString(`{
  "head": { "vars": [ "book" , "title" ]
  } ,
  "results": {
    "bindings": [
      {
        "book": { "type": "uri" , "value": "http://example.org/book/book6" } ,
        "title": { "type": "literal" , "value": "Harry Potter and the Half-Blood Prince" }
      } ,
      {
        "book": { "type": "uri" , "value": "http://example.org/book/book7" } ,
        "title": { "type": "literal" , "value": "Harry Potter and the Deathly Hallows" }
      } ,
      {
        "book": { "type": "uri" , "value": "http://example.org/book/book5" } ,
        "title": { "type": "literal" , "value": "Harry Potter and the Order of the Phoenix" }
      } ,
      {
        "book": { "type": "uri" , "value": "http://example.org/book/book4" } ,
        "title": { "type": "literal" , "value": "Harry Potter and the Goblet of Fire" }
      } ,
      {
        "book": { "type": "uri" , "value": "http://example.org/book/book2" } ,
        "title": { "type": "literal" , "value": "Harry Potter and the Chamber of Secrets" }
      } ,
      {
        "book": { "type": "uri" , "value": "http://example.org/book/book3" } ,
        "title": { "type": "literal" , "value": "Harry Potter and the Prisoner Of Azkaban" }
      } ,
      {
        "book": { "type": "uri" , "value": "http://example.org/book/book1" } ,
        "title": { "type": "literal" , "value": "Harry Potter and the Philosopher's Stone" }
      }
    ]
  }
}`),
        headers: new Headers({ 'Content-Type': 'application/sparql-results+json' }),
        status: 200,
      }),
    });
    sparqlAlgebra = translate('SELECT * WHERE { ?x ?y ?z }');
  });

  describe('query', () => {
    it('should return a JSON object', async () => {
      expect(await queryEngine.query(sparqlAlgebra)).toEqual({
        "head": { "vars": [ "book" , "title" ] },
        "results": {
          "bindings": [
            {
              "book": { "type": "uri" , "value": "http://example.org/book/book6" } ,
              "title": { "type": "literal" , "value": "Harry Potter and the Half-Blood Prince" },
            } ,
            {
              "book": { "type": "uri" , "value": "http://example.org/book/book7" } ,
              "title": { "type": "literal" , "value": "Harry Potter and the Deathly Hallows" },
            } ,
            {
              "book": { "type": "uri" , "value": "http://example.org/book/book5" } ,
              "title": { "type": "literal" , "value": "Harry Potter and the Order of the Phoenix" },
            } ,
            {
              "book": { "type": "uri" , "value": "http://example.org/book/book4" } ,
              "title": { "type": "literal" , "value": "Harry Potter and the Goblet of Fire" },
            } ,
            {
              "book": { "type": "uri" , "value": "http://example.org/book/book2" } ,
              "title": { "type": "literal" , "value": "Harry Potter and the Chamber of Secrets" },
            } ,
            {
              "book": { "type": "uri" , "value": "http://example.org/book/book3" } ,
              "title": { "type": "literal" , "value": "Harry Potter and the Prisoner Of Azkaban" },
            } ,
            {
              "book": { "type": "uri" , "value": "http://example.org/book/book1" } ,
              "title": { "type": "literal" , "value": "Harry Potter and the Philosopher's Stone" },
            },
          ],
        },
      });
    });
  });
});
