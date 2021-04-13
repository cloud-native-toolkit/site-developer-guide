const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

// In the case where none of the nav items have child pages, an error occurs in the left nav
// that prevents the site from working because of the missing "title" field. Previous solutions
// were providing at least 1 nested page, but that resulted in the bottom navigation to that page
// reading "Resources: Resources" (as an example). By overriding the type definitions for
// NavItemsYaml we can allow the title to be nullable, which fixes this issue.

// Create medium feed schema incase the plugin isn't used or you're on an ✈️
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    `
  type NavItemsYamlPage {
    title: String
    path: String
    pages: [NavItemsYamlPage]
  }
  type NavItemsYaml implements Node {
    title: String!
    pages: [NavItemsYamlPage]!
    hasDivider: Boolean
  }`
  ];

  createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    NavItemsYamlPage: {
      pages: {
        resolve(source, args, context, info) {
          return source.pages || []
        },
      },
    },
  }
  createResolvers(resolvers)
}
