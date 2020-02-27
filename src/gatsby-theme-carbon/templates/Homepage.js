import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import g from "./Globals";
import { calloutLink } from './Homepage.module.scss';

import Carbon from '../../images/catalyst.svg';

const FirstLeftText = () => <p>{g.longName}</p>;

const FirstRightText = () => (
  <p>
      This is the developer guide for the {g.longName}. The {g.env} empowers cloud-native application development teams to deliver business value quickly
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
      The {g.longName} environment automates and supports developing cloud-native applications
      using the IBM Garage Method principles and practices. 
    <a
      className={calloutLink}
      href="https://www.ibm.com/garage/method"
    >
      IBM Garage Method →
    </a>
  </p>
);

const BannerText = () => <h1>{g.shortName}<br/>Developer Guide</h1>;

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
