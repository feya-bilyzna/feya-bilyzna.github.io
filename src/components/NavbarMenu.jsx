import React from 'react'
import {NavLink} from "react-router-dom"
import {Dropdown, Icon, Navbar} from "react-materialize"
import PropTypes from "prop-types"
import {categoriesData} from "../data"

Navbar.propTypes = {
    ...Navbar.propTypes,
    alignLinks: PropTypes.oneOf(['right sidenav-close']),
}

const NavbarMenu = () => {

    return (
        <>
            <Navbar
                className={"pink accent-4"}
                brand={<NavLink className="brand-logo" to="/">Главная</NavLink>}
                centerChildren
                id="mobile-nav"

                menuIcon={<Icon>menu</Icon>}

                alignLinks='right sidenav-close'
                sidenav={
                    <>
                        {Object.values(categoriesData.categories).map(categoryData =>
                            <li key={categoryData.route}>
                                <NavLink to={categoryData.route}>{categoryData.name}</NavLink>
                            </li>
                        )}
                        {Object.values(categoriesData.uncategorizedSubcategories).map(subcategoryData =>
                            <li key={subcategoryData.route}>
                                <NavLink to={subcategoryData.route}>{subcategoryData.name}</NavLink>
                            </li>
                        )}
                        <li><NavLink to="/contacts">Контакты</NavLink></li>
                    </>
                }
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true,
                    closeOnClick: true,
                }}
            >
                <Dropdown
                    options={{
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: false,
                        container: null,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250,
                    }}

                    trigger={<a href="#!">Все товары{' '}</a>}
                >
                    {Object.values(categoriesData.categories).map(categoryData =>
                        <NavLink key={categoryData.route} to={categoryData.route}>
                            {categoryData.name}
                        </NavLink>
                    )}
                    {Object.values(categoriesData.uncategorizedSubcategories).map(subcategoryData =>
                        <NavLink key={subcategoryData.route} to={subcategoryData.route}>
                            {subcategoryData.name}
                        </NavLink>
                    )}
                </Dropdown>
                <NavLink to="/contacts">Контакты</NavLink>
            </Navbar>
        </>
    )
}

export default NavbarMenu
