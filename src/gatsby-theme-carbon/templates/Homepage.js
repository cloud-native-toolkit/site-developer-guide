import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import g from "./Globals";
import { calloutLink } from './Homepage.module.scss';

import Carbon from '../../images/catalyst.svg';

const FirstLeftText = () => <p>{g.longName}</p>;

const FirstRightText = () => (
  <p>
      This is the developer guide for the {g.longName}. The {g.shortName} creates a {g.env} that empowers cloud-native application development teams to deliver business value quickly
      using {g.ocp} and {g.iks} on {g.ic}.
    <a
      className={calloutLink}
      href="https://www.ibm.com/cloud"
    >
        {g.ic} →
    </a>
  </p>
);

const SecondLeftText = () => <p>Garage Method</p>;

const SecondRightText = () => (
  <p>
      The {g.longName} environment automates and supports developing cloud-native applications
      using the {g.method} principles and practices.
    <a
      className={calloutLink}
      href="https://www.ibm.com/garage/method"
    >
        {g.method} →
    </a>
  </p>
);

const BannerText = () => <h1>{g.longName}<br/>Developer Guide</h1>;

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
