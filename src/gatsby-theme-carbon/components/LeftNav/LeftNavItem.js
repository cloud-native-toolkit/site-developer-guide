import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import cx from 'classnames';
import useNetwork from 'react-use/lib/useNetwork';

import {
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
} from 'carbon-components-react';

import styles from 'gatsby-theme-carbon/src/components/LeftNav/LeftNav.module.scss';

import NavContext from 'gatsby-theme-carbon/src/util/context/NavContext';
import usePathprefix from 'gatsby-theme-carbon/src/util/hooks/usePathprefix';
import useMetadata from 'gatsby-theme-carbon/src/util/hooks/useMetadata';

export const SERVICE_WORKER_UPDATE_FOUND = 'GTC-ServiceWorkerUpdateFound';

const LeftNavItem = (props) => {
    const { items, category, hasDivider } = props;
    const { toggleNavState } = useContext(NavContext);
    const { isServiceWorkerEnabled } = useMetadata();
    const isOnline = useNetwork();

    const handleClick = (event, to) => {
        toggleNavState('leftNavIsOpen', 'close');
        if (isServiceWorkerEnabled) {
            if (isOnline && window[SERVICE_WORKER_UPDATE_FOUND] === true) {
                event.preventDefault();
                window.location.href = to;
            }
        }
    };

    const pathPrefix = usePathprefix();

    return (
        <Location>
            {({ location }) => {
                const pathname = pathPrefix
                    ? location.pathname.replace(pathPrefix, '')
                    : location.pathname;

                const isActive = items.some(
                    (item) => (item.path || '').split('/')[1] === pathname.split('/')[1]
                );

                if (items.length === 1) {
                    const to = items[0].path;
                    return (
                        <>
                            <SideNavLink
                                onClick={(e) => handleClick(e, to)}
                                icon={<span>dummy icon</span>}
                                element={Link}
                                className={cx({
                                    [styles.currentItem]: isActive,
                                })}
                                isActive={isActive}
                                to={to}>
                                {category}
                            </SideNavLink>
                            {hasDivider && <hr className={styles.divider} />}
                        </>
                    );
                }
                return (
                    <>
                        <SideNavMenu
                            icon={<span>dummy icon</span>}
                            isActive={isActive} // TODO similar categories
                            defaultExpanded={isActive}
                            title={category}>
                            <SubNavItems
                                onClick={handleClick}
                                items={items}
                                pathname={pathname}
                                isActive={isActive}
                                handleClick={handleClick}
                                level={1}
                                category={category}
                            />
                        </SideNavMenu>
                        {hasDivider && <hr className={styles.divider} />}
                    </>
                );
            }}
        </Location>
    );
};

const SubNavItems = ({ items, pathname, category, onClick, isActive, handleClick, level }) =>
    items.map((item, i) => {
        const hasActiveTab =
            `${(item.path || '').split('/')[1]}/${(item.path || '').split('/')[2]}` ===
            `${pathname.split('/')[1]}/${pathname.split('/')[2]}`;
        const to = item.path;
        if (item.pages && item.pages.length > 0) {
            return (
                <SideNavMenu
                    className={`sidenav${level}`}
                    icon={<span>dummy icon</span>}
                    isActive={isActive} // TODO similar categories
                    defaultExpanded={isActive}
                    title={item.title}>
                    <SubNavItems
                        category={`${category}-${item.title}`}
                        onClick={handleClick}
                        items={item.pages}
                        pathname={pathname}
                        level={level+1}
                    />
                </SideNavMenu>
            )
        }

        const key = `${category}-${item.title}`.replace(/ /g, '-').toLowerCase();
        return (
            <SideNavMenuItem
                to={to}
                className={cx({
                    [styles.linkText__dark]: pathname === '/',
                })}
                onClick={(e) => onClick(e, to)}
                element={Link}
                isActive={hasActiveTab}
                key={key}>
        <span
            className={cx(styles.linkText, {
                [styles.linkText__active]: hasActiveTab,
            })}>
          {item.title}
        </span>
            </SideNavMenuItem>
        );
    });

export default LeftNavItem;
