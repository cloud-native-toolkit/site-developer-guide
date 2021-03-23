import React from 'react';
import slugify from 'slugify';
import {graphql, useStaticQuery} from 'gatsby';

import Utils from 'gatsby-theme-carbon/src/components/Utils';
import Layout from 'gatsby-theme-carbon/src/components/Layout';
import PageHeader from 'gatsby-theme-carbon/src/components/PageHeader';
import EditLink from 'gatsby-theme-carbon/src/components/EditLink';
import PageTabs from 'gatsby-theme-carbon/src/components/PageTabs';
import Main from 'gatsby-theme-carbon/src/components/Main';
import useMetadata from 'gatsby-theme-carbon/src/util/hooks/useMetadata';

// Copy of gatsby-theme-carbon/src/templates/Default with the NextPrevious widget removed

const Default = ({ pageContext, children, location, Title }) => {
    const { frontmatter = {}, relativePagePath, titleType } = pageContext;
    const {
        tabs,
        title,
        theme: frontmatterTheme,
        description,
        keywords,
    } = frontmatter;

    const { interiorTheme } = useMetadata();

    // get the path prefix if it exists
    const {
        site: { pathPrefix },
    } = useStaticQuery(graphql`
    query PATH_PREFIX_QUERY1 {
      site {
        pathPrefix
      }
    }
  `);

    // let gatsby handle prefixing
    const slug = pathPrefix
        ? location.pathname.replace(pathPrefix, '')
        : location.pathname;

    const getCurrentTab = () => {
        if (!tabs) return '';
        return (
            slug.split('/').filter(Boolean).slice(-1)[0] ||
            slugify(tabs[0], { lower: true })
        );
    };

    const currentTab = getCurrentTab();

    const theme = frontmatterTheme || interiorTheme;

    return (
        <Layout
            tabs={tabs}
            homepage={false}
            theme={theme}
            pageTitle={title}
            pageDescription={description}
            pageKeywords={keywords}
            titleType={titleType}>
            <PageHeader
                title={Title ? <Title /> : title}
                label="label"
                tabs={tabs}
                theme={theme}
            />
            {tabs && <PageTabs slug={slug} tabs={tabs} currentTab={currentTab} />}
            <Main padded>
                {children}
                <EditLink relativePagePath={relativePagePath} />
            </Main>
            {/*Remove NextPrevious*/}
            <Utils />
        </Layout>
    );
};

export default Default;
