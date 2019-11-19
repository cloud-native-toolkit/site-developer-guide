import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import { calloutLink } from './Homepage.module.scss';

import Carbon from '../../images/catalyst.svg';

const FirstLeftText = () => <p>IBM Garage for Cloud Developer Tools</p>;

const FirstRightText = () => (
  <p>
      This is the developer guide for the IBM Garage for Cloud Developer Tools. The Developer Tools environment 
      empowers cloud-native application development teams to deliver business value quickly 
      using Red Hat OpenShift and IBM Kubernetes Service on IBM Cloud.
    <a
      className={calloutLink}
      href="https://www.ibm.com/cloud"
    >
      IBM Cloud →
    </a>
  </p>
);

const SecondLeftText = () => <p>Garage Method</p>;

const SecondRightText = () => (
  <p>
      The Developer Tools environment automates and supports developing cloud-native applications 
      using the IBM Garage Method principles and practices. 
    <a
      className={calloutLink}
      href="https://www.ibm.com/garage/method"
    >
      IBM Garage Method →
    </a>
  </p>
);

const BannerText = () => <h1>IBM Garage for Cloud Developer Tools <br/>Developer Guide</h1>;

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={Carbon} />,
  FirstCallout: (
    <HomepageCallout
      backgroundColor="#030303"
      color="white"
      leftText={FirstLeftText}
      rightText={FirstRightText}
    />
  ),
  SecondCallout: (
    <HomepageCallout
      leftText={SecondLeftText}
      rightText={SecondRightText}
      color="white"
      backgroundColor="#061f80"
    />
  ),
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
