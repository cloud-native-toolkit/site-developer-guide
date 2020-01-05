import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const currentYear = new Date().getFullYear();
const lastUpdated = "January 2020";

const version = "1.1.2";

const Content = () => (
    <>
        <p>
            Have questions? open
            <br /> an issue on{' '}
            <a
                style={{ textDecoration: 'underline' }}
                href="https://github.com/ibm-garage-cloud/planning/issues/new/choose">
                GitHub.
            </a>
        </p>
        <p>
            Components version {version}
            <br />
            Last updated {lastUpdated}
            <br />
            Copyright © {currentYear} IBM
        </p>
    </>
);

const links = {
    firstCol: [
        {
            href: '/contribute',
            linkText: 'Contribute',
        },
        { href: 'https://www.ibm.com/privacy', linkText: 'Privacy' },
        { href: 'https://www.ibm.com/legal', linkText: 'Terms of use' },

    ],
    secondCol: [
        { href: 'https://www.ibm.com/', linkText: 'IBM.com' }
    ],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;