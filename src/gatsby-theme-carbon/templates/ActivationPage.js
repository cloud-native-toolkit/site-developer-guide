import React from 'react';
import { useStaticQuery,graphql} from "gatsby";
import {ArticleCard,Row,Column} from "gatsby-theme-carbon";
import _ from 'lodash';

// Create a Helper Method
function getArticles(data,tileColor) {

    if (_.isUndefined(data))
        return [];

    let articles = []

    // Outer loop to create parent
    data.forEach(function(article,index){

        const subtitle = article.subtitle ? article.subtitle : "";

        //Create the parent and add the children
        articles.push(

            <Column colMd={4} colLg={4} noGutterMdLeft >
                <ArticleCard
                    className={tileColor}
                    title={article.title}
                    author={article.author}
                    subTitle = {subtitle}
                    href={article.href}
                    color={article.color}
                    actionIcon="arrowRight"
                >
                </ArticleCard>
            </Column>
        );
    });

    return articles;

}

export default ({content,tileColor}) => {

    const data = useStaticQuery(graphql`
    {
      allDataJson {
        nodes {
          kubernetes {
            title
            subtitle
            author
            language
            href
            color
          }
          containers {
            title
            subtitle
            author
            language
            href
            color
          }
          openshift_dev {
            title
            subtitle
            author
            href
            color
          }
          openshift_adv {
            title
            subtitle
            author
            href
            color
          }
          openshift {
            title
            subtitle
            author
            href
            color
          }
          cnd {
            title
            subtitle
            author
            href
            color
          }
          cndp {
            title
            subtitle
            author
            href
            color
          }
          gmd {
            title
            subtitle
            author
            href
            color
          }
          argocd {
            color
            href
            subtitle
            title
          }
        }
      }
    }
  `)
    return (
        <>

            <Row>
            {getArticles(data.allDataJson.nodes[0][content],tileColor)}
            </Row>
        </>
    )
}

