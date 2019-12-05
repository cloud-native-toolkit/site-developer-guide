import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [

  {
    title: 'IBM Cloud',
    href: 'https://www.ibm.com/cloud',
  },
  {
    title: 'Garage Method',
    href: 'https://www.ibm.com/garage/method',
  },
  {
    title: 'Dev Tools Github Org',
    href: 'https://github.com/ibm-garage-cloud',
  },
  {
    title: 'IBM Cloud Terraform Provider',
    href: 'https://ibm-cloud.github.io/tf-ibm-docs/',
  }

];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
