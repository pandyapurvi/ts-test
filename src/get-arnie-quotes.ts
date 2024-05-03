import { httpGet } from './mock-http-interface';

// TODO define this type properly
type TResult = { 'Arnie Quote': string } | { "FAILURE": string };

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  // TODO: Implement this function.
  let results = [];
  const requests = urls.map(async (url) => { // map over urls and make a request for each
    const response = await httpGet(url); // make a request
    const data = await JSON.parse(response.body); // parse the response body  to JSON
    return response.status === 200 // check if the response status is 200
      ? { 'Arnie Quote': data.message }
      : { "FAILURE": data.message };
  });

  for (let i = 0; i < requests.length; i++) { // loop over the requests
    results[i] = await requests[i]; // wait for the request to finish and store the result
  }
  return results; // return the results
}; 
