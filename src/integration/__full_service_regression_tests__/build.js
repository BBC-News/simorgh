/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const prettier = require('prettier');
const acorn = require('acorn');
const walk = require('acorn-walk');
const escodegen = require('escodegen');
const glob = require('glob');

global.Cypress = { env: () => 'local' };
const getPaths = require('../../../cypress/support/helpers/getPaths');
const servicesConfig = require('../../../cypress/support/config/services');

const GENERATED_TEST_FILES_DIR = '__GENERATED_TEST_FILES__';

rimraf.sync(path.join(__dirname, GENERATED_TEST_FILES_DIR));
console.log(path.join(__dirname, '..'));

const buildIntegrationTests = async ({
  service,
  variant = '',
  pageType,
  pathname,
}) => {
  glob(
    `../pages/${pageType}/*.test.js`,
    {
      cwd: path.join(__dirname),
    },
    (error, files) => {
      if (error) {
        console.log(error);
        return;
      }

      files.forEach(async (filePath) => {
        const fileName = filePath.split('/').pop();
        const tests = fs.readFileSync(path.join(__dirname, filePath), 'utf8');

        const node = acorn.parse(tests, { sourceType: 'module' });

        walk.simple(node, {
          CallExpression(_node) {
            if (
              _node.callee.property &&
              _node.callee.property.name === 'toMatchInlineSnapshot'
            ) {
              _node.arguments = [];
            }
          },
          ImportDeclaration(_node) {
            if (/^\.\.\//.test(_node.source.value)) {
              _node.source.value = `../../${variant ? '../' : ''}${
                _node.source.value
              }`;
            }
          },
        });

        const fileContent = `
          /**
           * @service ${service}
           * @pathname ${pathname}
           * 
           * THIS TEST SUITE WAS GENERATED BY A BUILD SCRIPT. DO NOT EDIT THIS FILE.
           */
  
          ${escodegen.generate(node)}
        `;

        const prettierConfig = await prettier.resolveConfig(
          path.join(__dirname, filePath),
        );
        const prettyFileContent = prettier.format(fileContent, {
          ...prettierConfig,
          parser: 'babel',
        });

        fs.mkdirSync(
          path.join(
            __dirname,
            GENERATED_TEST_FILES_DIR,
            service,
            variant,
            pageType,
          ),
          {
            recursive: true,
          },
        );

        fs.writeFileSync(
          path.join(
            __dirname,
            GENERATED_TEST_FILES_DIR,
            service,
            variant,
            pageType,
            fileName,
          ),
          prettyFileContent,
          'utf8',
        );
      });
    },
  );
};

Object.keys(servicesConfig).forEach((serviceId) => {
  const config = servicesConfig[serviceId];
  const service = config.name;
  const variant = config.variant !== 'default' ? config.variant : '';

  Object.keys(config.pageTypes)
    .filter((pageType) => !pageType.startsWith('error'))
    .forEach((pageType) => {
      const paths = getPaths(serviceId, pageType);

      paths.forEach((pathname) => {
        buildIntegrationTests({ service, pageType, pathname, variant });
      });
    });
});
