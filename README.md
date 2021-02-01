# Unionize Server

## App Summary

Unionize is an app designed to put you in touch with unions that serve your industry. We believe that every worker has the right to unionize and that no employer should be given absolute power over their employees, which is why Unionize makes it easy to find and join a union.

                        
Users can navigate to the 'Find a Union' page and enter in their search parameters to filter through the list of unions operating in the United States. They can filter by industry or try entering in words in the search bar to see if anything turns up. 


Users can also navigate to FAQ section to learn more about what unions are and find resources for starting their own union.

## Endpoints

There are three endpoints for this application, and they all support GET requests.

1. `/api/industries` returns a list of industries from the 'industry' table of the database.

Requests for this endpoint should look as follows:

`fetch('http://some-endpoint/api/industries', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer {API_TOKEN}'
})`

Responses should look as follows: 
    `[
        {
            "industries": "Industry 1"
        }
    ]`


2. `/api/unions` allows you the option of entering in search parameters into the query. All requests return an object that includes a list of unions, a result count, and a pageCount. 

Requests should always include a page number and have the option to include a search term under the key 'q'. An example request would look as follows:

`fetch('http://some-endpoint/api/unions/?page=1&q=someSearchTerm', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer {API_TOKEN}'
})`

And an expected response would look thus:

`{
    "unions": [ { "name": "union1", "desc": "a description", "industry": 1, "webURL": "http://someurl.com"}],
    "count": 1,
    "pageCount": 1
}`

3. `/api/unions/industry` expects an industry to be specified in the query and gives you the option of submitting search parameters as well. The structure of the response is the same as those given with the previous endpoint. 

Like the above endpoint, requests should always include a page number in request, but should also include an industry which must match with one listed in the 'industry' table of the database.

Requests should look like so:

`fetch('http://some-endpoint/api/unions/?page=1&industry=Industry%201&q=someSearchTerm', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer {API_TOKEN}'
})`

If there is no union which matches the parameters given, the unions array will return empty and count and pageCount will both be set to 0. 

All endpoints require an API Token Key to access. Any request which does not have a bearer token in the header will be returned back as an unauthorized request. 

## Technologies used

The server for this application was built using Express.js and Node.js with PostgreSQL for the database and postgrator for the database migrations. The client side of this application was built using React [and the repository can be found here.](https://github.com/alannabouloy/unionize-app)

## Setting up database

In order to set up the database you will need to run the migrations using postgrator. Make sure you have an `.env` file that sets the database URLs for the regular database as well as the test database. The script to run the migrations is `npm run migrate` and to run the test migrations it's `npm run migrate:test`, however if you want the tests to pass, you will need to only run the test database to the second migration. Otherwise you will seed the database prematurely and the tests will fail. In addition, there is a seed file located in the seeds folder which was used during development if you would prefer not to work with the entire dataset while coding. In that case, only run to migration 2 and instead run the `/seeds/seed.tables.sql` file to seed the database with a dummy dataset.