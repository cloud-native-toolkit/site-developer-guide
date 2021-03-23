import React from 'react';
import Layout from 'gatsby-theme-carbon/src/components/Layout';
import { HomepageBanner, HomepageCallout } from 'gatsby-theme-carbon/src/components/Homepage';
import Carbon from 'gatsby-theme-carbon/src/images/carbon.jpg';
import Main from 'gatsby-theme-carbon/src/components/Main';
import useMetadata from 'gatsby-theme-carbon/src/util/hooks/useMetadata';
import Utils from 'gatsby-theme-carbon/src/components/Utils';

// Copy of gatsby-theme-carbon/src/templates/Homepage with NextPrevious removed

const Homepage = ({
                      children,
                      Banner,
                      FirstCallout,
                      SecondCallout,
                      location,
                      pageContext,
                  }) => {
    const { frontmatter = {}, titleType } = pageContext;
    const { title, description, keywords } = frontmatter;
    const { homepageTheme } = useMetadata();

    return (
        <Layout
            pageTitle={title}
            pageDescription={description}
            pageKeywords={keywords}
            titleType={titleType}
            homepage
            theme={homepageTheme}>
            {Banner}
            {FirstCallout}
            <Main>{children}</Main>
            {SecondCallout}
            {/*Remove NextPrevious*/}
            <Utils />
        </Layout>
    );
};
Homepage.defaultProps = {
    Banner: (
        <HomepageBanner
            renderText={() => (
                <h1>
                    Carbon
                    <br />
                    Design System
                </h1>
            )}
            image={Carbon}
        />
    ),
    FirstCallout: <HomepageCallout />,
    SecondCallout: (
        <HomepageCallout color="inverse01" backgroundColor="#061f80" />
    ),
};

export default Homepage;
