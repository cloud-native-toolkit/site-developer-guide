import React from 'react';
import Footer from 'gatsby-theme-carbon/src/components/Footer';

const currentYear = new Date().getFullYear();
const lastUpdated = "Autumn 2019";

const version = "1.0.0";

const Content = () => (
    <>
        <p>
            Have questions? Email us or open
            <br /> an issue on{' '}
            <a
                style={{ textDecoration: 'underline' }}
                href="https://github.com/carbon-design-system/carbon-website/issues/new">
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
            href: 'https://www.carbondesignsystem.com/how-to-contribute/overview',
            linkText: 'Contribute',
        },
        { href: 'https://www.ibm.com/privacy', linkText: 'Privacy' },
        { href: 'https://www.ibm.com/legal', linkText: 'Terms of use' },
        { href: 'https://www.ibm.com/', linkText: 'IBM.com' },
    ],
    secondCol: [
        { href: 'https://medium.com/carbondesign', linkText: 'Medium' },
        { href: 'https://twitter.com/_carbondesign', linkText: 'Twitter' }
    ],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;