import React from 'react';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';
import g from "./Globals";
import { calloutLink } from './Homepage.module.scss';

import Carbon from '../../images/catalyst.svg';

const FirstLeftText = () => <p>{g.longName}</p>;

const FirstRightText = () => (
  <p>
      The {g.shortName} enables application development and support teams to deliver business value quickly
      using {g.ocp} and {g.kube} on {g.ibmcloud}. This guide provides information to help Developers, Administrators,
      and Site Reliability Engineers use the Toolkit to support delivering business applications through the entire
      Software Development Life Cycle (SDLC).
    <a
      className={calloutLink}
      href="https://www.ibm.com/cloud"
    >
        {g.ic} →
    </a>
  </p>
);

const SecondLeftText = () => <p>Fit to purpose</p>;

const SecondRightText = () => (
  <p>
      The {g.longName} environment has been built to support the principles of a robust SDLC while
      being flexible enough to fit into a wide range of development environments and toolchains.
      The {g.shortName} supports different tool selections, from open source versions of tools like Artifactory and
      SonarQube to enterprise-class software like IBM Cloud Pak for Applications and IBM Multicloud Manager.
    <a
      className={calloutLink}
      href="https://www.ibm.com/cloud/paks/"
    >
        {g.cloudpaks} →
    </a>
  </p>
);

const BannerText = () => <h1>{g.shortName}<br/>Guide</h1>;

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
