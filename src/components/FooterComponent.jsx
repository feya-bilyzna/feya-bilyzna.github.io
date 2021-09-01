import React from 'react'
import {Footer} from "react-materialize"
import contactsData from "../data/contactsData"
import {NavLink} from "react-router-dom"

const FooterComponent = () => {
    return <Footer
            className={"pink accent-4"}
            copyrights="Нижнее бельё по доступным ценам"
            moreLinks={<NavLink
                className="white-text right"
                to={"/contacts"}
            >
                Больше контактов
            </NavLink>}
            links={
                <ul>
                    <li>
                        <a
                            className="grey-text text-lighten-3"
                            href={contactsData.contacts[0].link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contactsData.contacts[0].name}
                        </a>
                    </li>
                    <li>
                        <a
                            className="grey-text text-lighten-3"
                            href={contactsData.contacts[1].link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contactsData.contacts[1].name}
                        </a>
                    </li>
                    <li>
                        <a
                            className="grey-text text-lighten-3"
                            href={contactsData.contacts[2].link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contactsData.contacts[2].name}
                        </a>
                    </li>
                </ul>}
        >
            <h5>Ссылки на соц сети:</h5>
        </Footer>
}

export default FooterComponent