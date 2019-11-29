import React from 'react';
import { useStaticQuery,graphql} from "gatsby";
import {ArticleCard,Row,Column} from "gatsby-theme-carbon";
import _ from 'lodash';

// Create a Helper Method
function getArticles(data) {

    if (_.isUndefined(data))
        return [];

    let articles = []

    // Outer loop to create parent
    data.forEach(function(article,index){

        const subtitle = article.subtitle ? article.subtitle : "";

        //Create the parent and add the children
        articles.push(

            <Column colMd={4} colLg={4} noGutterMdLeft>
                <ArticleCard
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

export default ({content}) => {

    const data = useStaticQuery(graphql`
    {
      allDataJson {
        nodes {
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
            language
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
            {getArticles(data.allDataJson.nodes[0][content])}
            </Row>
        </>
    )
}

/*
<h3>Data</h3>

            <pre>{JSON.stringify(data.allDataJson.nodes[0]["cnd"], null, 2)}</pre>


        <h3 className="landing-page__subheading">
        Garage Method Development
        </h3>
        <br></br>
        <p>
        Use the following links to help you deep dive in IBM Cloud Garage development best practices
        </p>
        <br></br>
        <Row>
        {getArticles(new Array())}
        </Row>

        <h3 className="landing-page__subheading">
        Cloud-native Development
        </h3>
        <br></br>
        <p>
        Use the following links to help you deep dive in Cloud Native Development
        </p>
        <br></br>
        <Row>
        {getArticles(new Array())}
        </Row>

        <h3 className="landing-page__subheading">
        Cloud-native Deployment
        </h3>
        <br></br>
        <p>
        Use the following links to help you deep dive in Cloud Native Deployment
        </p>

        <br></br>
        <Row>
        {getArticles(new Array())}
        </Row>
 */
/*
    <pre>{JSON.stringify(data.allDataJson.nodes[0]["cnd"], null, 2)}</pre>
 */
