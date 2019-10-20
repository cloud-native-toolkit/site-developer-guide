import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import { calloutLink } from './Homepage.module.scss';

import Carbon from '../../images/catalyst.svg';

const FirstLeftText = () => <p>Project</p>;

const FirstRightText = () => (
  <p>
      This is the developer guide for the IBM Garage for Cloud Developer Tools. This project was created to enable
      IBM Garage teams to deliver business value quickly using the IBM Kubernetes Service, Red Hat OpenShift and IBM Cloud.
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
      It is focused on enabling developer consistency across IBM Kubernetes Service and Red Hat OpenShift. Its foundation is
      the IBM Garage Method principles and practices.
    <a
      className={calloutLink}
      href="https://www.ibm.com/garage/method"
    >
      IBM Garage Method →
    </a>
  </p>
);

const BannerText = () => <h1>Developer Guide</h1>;

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
