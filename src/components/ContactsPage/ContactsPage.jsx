import React from 'react'
import { useTranslation } from "react-i18next"
import { Collection, CollectionItem } from 'react-materialize'
import contactsData from "../../data/contactsData"
import { Helmet } from 'react-helmet-async'

const ContactsPage = () => {
    const { t } = useTranslation()
    return <>
        <Helmet>
            <title>Контактна інформація-Фея</title>
            <meta
                name="description"
                content="Соціальні мережі та адреса"
            />
            <link href="https://feya-bilyzna.github.io/contacts" />
        </Helmet>
        <h3 style={{ textAlign: "center" }}>{t("Контактная информация")}</h3>
        <Collection style={{ margin: "0 clamp(1rem, 5vw + 1rem, 1rem)" }}>
            {contactsData.contacts.map((contact, index) =>
                <CollectionItem
                    href={contact.link}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    key={index}
                >
                    {contact.svgIcon}

                    <div style={{ display: "inline-block", position: "absolute", paddingTop: "1vw", paddingLeft: "1vw" }}>
                        {t(contact.description)}
                        {t(contact.name)}
                    </div>
                </CollectionItem>)}
        </Collection>
    </>
}

export default ContactsPage
