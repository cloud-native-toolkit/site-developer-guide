import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [

  {
    title: 'Cloud-Native Github Org',
    href: 'https://github.com/cloud-native-toolkit',
  },
  {
    title: 'Cloud-Native Project Planning',
    href: 'https://github.com/cloud-native-toolkit/planning/issues#zenhub',
  },
  {
    title: 'IBM Cloud',
    href: 'https://www.ibm.com/cloud',
  },
  {
    title: 'IBM Garage Method',
    href: 'https://www.ibm.com/garage/method',
  },
  {
    title: 'IBM Cloud Terraform Provider',
    href: 'https://ibm-cloud.github.io/tf-ibm-docs/',
  }

];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
