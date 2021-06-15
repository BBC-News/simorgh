# How to test on multiple devices during development for accessibility
When developing any feature for this project we ensure we check our site is as accessible to as many users as we can by completing an [a11y swarm](https://bbc.github.io/accessibility-news-and-you/guides/accessibility-swarms.html).  When developing any feature for this project we ensure we check our site is as accessible to as many users as we can. We often need to test a branch of Simorgh across multiple devices, e.g. on mobile device and an [A11y](https://www.a11yproject.com/about/#what-does-the-term-a11y-mean) laptop with the [Assistive Technology we support](https://bbc.github.io/accessibility-news-and-you/accessibility-and-supported-assistive-technology), such as screen readers. 
In this document we specify some instructions to allow you to test cross device with Simorgh; we assume the dev machine is MacOS, any device can be used for accessibility testing. The instructions allow you to load a locally running instance of Simorgh on your local WiFi network.

1. Ensure any local VPNs are disabled before attempting these steps.
2. In Simorgh's route directory navigate to [`webpack.config.client.js`](https://github.com/bbc/simorgh/blob/latest/webpack.config.client.js)
3. Replace `localhost` on [line 33](https://github.com/bbc/simorgh/blob/65743560d6721eef69ae64cc66d6b569cfd2d000/webpack.config.client.js#L33) and [line 40](https://github.com/bbc/simorgh/blob/65743560d6721eef69ae64cc66d6b569cfd2d000/webpack.config.client.js#L40) to `0.0.0.0`
4. Open up a new terminal window and type `ifconfig`
5. CMD + F for `inet` and find your local network IP address, it will likely be in this format `inet 192.168.0.xx` with the `xx` being your devices IP number.
6. In the `local.env` file, change [these lines](https://github.com/bbc/simorgh/blob/4521b30e356673c68472cef2c67c234955e889b3/envConfig/local.env#L2..L3) to match your dev machine's IP address: `http://192.168.0.xx:7080`
7. Replace [this line](https://github.com/bbc/simorgh/blob/4521b30e356673c68472cef2c67c234955e889b3/src/server/index.jsx#L64) with the following code: `const injectCspHeaderProdBuild = skipMiddleware;` to disable the csp policy for testing; allowing javascript files to be loaded in the browser from your dev machine.
8. Start up your Simorgh with a production build: `npm run build && npm run start` and visit http://192.168.0.xx:7080/mundo/23263889
9. Now you should be able to access any page on any device that's connected on your local network by prefixing your Simorgh's host machines IP http://192.168.0.xx:7080/foobar instead of http://localhost:7080/foobar