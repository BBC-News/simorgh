# How our Cypress tests work
We have a very bespoke approach to testing. We split our tests in 3 sections: Application, Pages and Special Features (features that cannot be tested in a single page visit). 

We only run a subset of these integrations tests in CI and CD (those we always run are called smoke tests), but have a regular [cron job](https://en.wikipedia.org/wiki/Cron) that runs all integration tests (a.k.a. e2e tests) in this directory against localhost, test.bbc.com and www.bbc.com.

If you would like to run e2e tests as it runs on the cron pass this env variable to cypress `CYPRESS_SMOKE=false`, so your script could be something like `CYPRESS_SMOKE=false npm run test:e2e`.

## [Config used in the tests](../support/config)
It's important to familiarise yourself with the service.js config before writing e2e tests. Within there we define which combinations of services and page types should be tested, what the paths to test on are and whether something should be tested while only smoke testing.

## [Application](./application)
Here we test things that aren't pages such as manifest files and service workers. NB we don't test the .json endpoint for each page here because it's an implicit part of every 'page' test.

## [Pages](./pages)
This is where the overwhelming majority of e2es live. 
Key points:
  - The index.js of each page type directory must use the [runTestsForPage function](../support/runTestsForPage.js), this:
    - reduces the number of page visits to one visit to the canonical page and one visit to the [AMP](https://amp.dev/) version of the same page.
    - runs tests on every service automatically based on the service:page type combinations found in the [services config file](../support/config).
 - Files in the base of the pages directory run on all page types (as their naming suggests.
 - There is a directory per page type where each page's custom tests are written, the naming convention with each is exactly the same as every other one and should be kept this way for ease of comprehension.
 - In all cases tests should be written at the 'highest' possible level. The importance of this is that it tends our tests written to the highest possible level of coverage with the smallest possible amount of code. This means when writing a test you should write it based on this order of preference:
   - testsForALLPages.js
   - testsForALLAMPPages.js or testsForAllCanonicalPages.js
   - /[pageName]/tests.js
   - /[pageName]/testsForAMPOnly.js or /[pageName]/testsForCanonicalOnly.js
 - Inside each of the files in the list above there are three sets of tests:
   - **testsThatAlwaysRun** - as the name implies these will always run, use this sparingly because by default it will run for every service, page type and platform (canonical, AMP)! This is useful for features that vary between services.
     - We recommend using conditional logic to select just the services/pagetypes that are necessary. e.g. only run ATI analytics tests on `afaanoromoo, cymrufyw, japanese, naidheachdan, news` instead of all 44 services, since these cover all variants. 
   - **testsThatFollowSmokeTestConfig** - this is where most tests will go. These will only run on PRs if the `smoke` value is `true` for that service/pageType combination. [services config file](../support/config)
   - **testsThatNeverRunDuringSmokeTesting** - this is for tests that are very CPU intensive, long running or low priority. It's a good place for testing layout or page-width variants.


NB Despite all these rules, we don't favour highly abstracted tests, duplication of tests is preferred where it gives the same test coverage and enhances readability.

## [Special Features](./specialFeatures)
There are features on pages that cannot be tested in one page visit. The only such example is cookie banner/GDPR logic testing. It is not envisaged that any other tests would be added here.

