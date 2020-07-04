import {ISparqlEndpointFetcherArgs, SparqlEndpointFetcher} from "fetch-sparql-endpoint";
import {IQueryEngine} from "graphql-ld/lib/IQueryEngine";
import {Algebra, toSparql} from "sparqlalgebrajs";
import * as stringifyStream from "stream-to-string";

/**
 * Allows a SPARQL endpoint to be used by URL as a GraphQL-LD query engine.
 */
export class QueryEngineSparqlEndpoint implements IQueryEngine {

  private readonly fetcher: SparqlEndpointFetcher;
  private readonly url: string;

  constructor(url: string, fetcherOptions?: ISparqlEndpointFetcherArgs) {
    this.fetcher = new SparqlEndpointFetcher(fetcherOptions);
    this.url = url;
  }

  public async query(query: Algebra.Operation, options?: any): Promise<any> {
    const queryString: string = toSparql(query);
    const responseStream = (await this.fetcher.fetchRawStream(
      this.url, queryString, SparqlEndpointFetcher.CONTENTTYPE_SPARQL_JSON))[1];
    let output = await stringifyStream(responseStream);
    // Replace invalid JSON characters, which can occur for some endpoints.
    output = output.replace(/\x1a/g, ' ');
    return JSON.parse(output);
  }

}
