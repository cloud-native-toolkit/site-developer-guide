import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Launch20 from '@carbon/icons-react/es/launch/20';
import Download20 from '@carbon/icons-react/es/download/20';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import Error20 from '@carbon/icons-react/es/error/20';
import Email20 from '@carbon/icons-react/es/email/20';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class StarterKitCard extends React.Component {
  static propTypes = {
    children: PropTypes.node,

    /**
     * Set url for card
     */
    href: PropTypes.string,

    /**
     * Title
     */
    title: PropTypes.string,

    /**
     * sub title
     */
    subTitle: PropTypes.string,

    /**
     * Author
     */
    language: PropTypes.string,

    /**
     * date
     */
    date: PropTypes.string,

    /**
     * Reat time of StarterKit
     */
    readTime: PropTypes.string,

    /**
     * Action icon, default is blank, options are Launch, ArrowRight, Download
     */
    actionIcon: PropTypes.string,

    /**
     * set to "dark" for dark background card
     */
    color: PropTypes.string,

    /**
     * Use for disabled card
     */
    disabled: PropTypes.bool,

    /**
     * Specify a custom class
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    color: 'light',
    disabled: false,
    actionIcon: '',
  };

  render() {
    const {
      children,
      href,
      title,
      subTitle,
      language,
      date,
      readTime,
      color,
      disabled,
      actionIcon,
      className,
    } = this.props;

    let isLink;
    if (href !== undefined) {
      isLink = href.charAt(0) === '/';
    }
    let hrefGen = href+"/generate";

    const StarterKitCardClassNames = classnames([`${prefix}--article-card`], {
      [className]: className,
      [`${prefix}--article-card--disabled`]: disabled,
      [`${prefix}--article-card--dark`]: color === 'dark',
    });

    const aspectRatioClassNames = classnames(
      [`${prefix}--aspect-ratio`],
      [`${prefix}--aspect-ratio--2x1`]
    );

    const carbonTileclassNames = classnames(
      [`${prefix}--tile`],
      [`${prefix}--tile--clickable`]
    );

    const cardContent = (
      <>
        <div className={`${prefix}--article-card__img`}>{children}</div>
        <div className={aspectRatioClassNames}>        

          <div
            className={`${prefix}--aspect-ratio--object ${prefix}--starterkit-card__tile`}
          >

            {title ? (
              <h4 className={`${prefix}--article-card__title`}>
                  <div className={`${prefix}--starterkit-card__icon--action`}>
                    {language === 'TypeScript' ?(
                      <img
                        src={`${process.env.PUBLIC_URL}/node-32.png`}
                        alt="Node"
                      />            
                    ) : null}
                    {language === 'Java' ?(
                      <img
                        src={`${process.env.PUBLIC_URL}/java-32.png`}
                        alt="Java"
                      />            
                    ) : null}
                    {language === 'React' || language === "Angular" ?(
                      <img
                        src={`${process.env.PUBLIC_URL}/webui-32.png`}
                        alt="Java"
                      />            
                    ) : null}
                  </div>    
                  {title}  
                  
              </h4>
            ) : null}

            {subTitle ? (
              <h5 className={`${prefix}--starterkit-card__subtitle`}>
                {subTitle}
              </h5>
            ) : null}


            <div className={`${prefix}--article-card__info`}>
              {language ? (
                <p className={`${prefix}--article-card__author`}>
                {language}</p>
              ) : null}
              {date ? (
                <p className={`${prefix}--article-card__date`}>{date}</p>
              ) : null}
              {readTime ? (
                <p className={`${prefix}--article-card__read-time`}>
                  {readTime}
                </p>
              ) : null}
            </div>

            <div className="icon-row">
             
              <div className={`${prefix}--article-card__icon--action`}>
              
                {actionIcon === 'launch' && !disabled ? (
                  <Launch20 aria-label="Open" />
                ) : null}
                {actionIcon === 'arrowRight' && !disabled ? (
                  <ArrowRight20 aria-label="Open" />
                ) : null}
                {actionIcon === 'download' && !disabled ? (
                  <Download20 aria-label="Download" />
                ) : null}
                {actionIcon === 'email' && !disabled ? (
                  <Email20 aria-label="Email" />
                ) : null}
                {actionIcon === 'disabled' || disabled === true ? (
                  <Error20 aria-label="disabled" />
                ) : null}
              </div>

              <div className={`${prefix}--github__icon--action`}>
                <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={href}
                    >  
                    <div>
                      <img
                        src={`${process.env.PUBLIC_URL}/github-icon.png`}
                        alt="Github"
                      />                              
                    </div>      
                    </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );

    let cardContainer;
    if (disabled === true) {
      cardContainer = <div className={carbonTileclassNames}>{cardContent}</div>;
    } else if (isLink === true) {
      cardContainer = (
        <div to={href} className={carbonTileclassNames}>
          {cardContent}
        </div>
      );
    } else {
      cardContainer = (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={hrefGen}
          className={carbonTileclassNames}
        >
          {cardContent}
        </a>
      );
    }

    return <div className={StarterKitCardClassNames}>{cardContainer}</div>;
  }
}
