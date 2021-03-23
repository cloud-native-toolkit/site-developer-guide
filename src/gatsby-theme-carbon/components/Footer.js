import React from 'react';
import {graphql, useStaticQuery} from "gatsby";
import {content, footer, grid, listItem, nav} from "gatsby-theme-carbon/src/components/Footer/Footer.module.scss";
import {Column, Grid, Row} from "gatsby-theme-carbon/src/components/Grid";

import {default as Globals} from '../templates/Globals';

const currentYear = new Date().getFullYear();

const Content = ({buildTime}) => {
    return (
        <>
            <p>
                Have questions? open
                <br /> an issue on{' '}
                <a
                    style={{ textDecoration: 'underline' }}
                    href="https://github.com/cloud-native-toolkit/planning/issues/new/choose">
                    GitHub.
                </a>
            </p>
            <p>
                Last updated {buildTime}
            </p>
            <p>
                Copyright © {currentYear} Cloud-Native Toolkit Authors
            </p>
        </>
    );
}

const links = {
    firstCol: [
        {
            href: '/contributing',
            linkText: `Contribute to the ${Globals.get('longName')}`,
        },
        {
            href: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
            linkText: 'Site licensed under CC BY-NC-SA 4.0'
        }
    ],
};

const LicensingDisclaimer = () => (
    <>
        Unless otherwise noted, the content of this site is licensed under
        the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) License</a>,
        and code samples are licensed under
        the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0 License</a>.
    </>
);

const MyFooter = ({ Content, links, DisclaimerContent }) => {
    const { firstCol } = links;
    const { site } = useStaticQuery(graphql`
    query {
      site {
        buildTime(formatString: "DD MMMM YYYY")
      }
    }
  `);
    return (
        <footer className={footer}>
            <Grid className={grid}>
                <Row>
                    <Column colLg={4} colMd={4}>
                        <ul className={nav}>
                            {firstCol &&
                            firstCol.map((link, i) => (
                                <li key={i} className={listItem} style={{ padding: '5px 0' }}>
                                    <a href={link.href} aria-label={link.linkText}>
                                        {link.linkText}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Column>
                    <Column
                        className={content}
                        colLg={4}
                        colMd={4}
                        colSm={3}
                        offsetLg={2}>
                        <Content buildTime={site.buildTime} />
                    </Column>
                </Row>
                <Row>
                    <Column
                        className={content}
                        colLg={12}>
                        <DisclaimerContent />
                    </Column>
                </Row>
            </Grid>
        </footer>
    );
};

const CustomFooter = () => <MyFooter links={links} Content={Content} DisclaimerContent={LicensingDisclaimer} />;

export default CustomFooter;
