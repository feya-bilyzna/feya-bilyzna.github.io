import React from 'react'
import { Button, Icon } from "react-materialize"
import { useTranslation } from "react-i18next"
import { useCookies } from "react-cookie"
import cx from 'classnames'

const WishlistButton = ({ id, isSubcategory, wishlist }) => {

    const [, setCookie] = useCookies(['wishlist'])
    const isAdded = wishlist.has(id)
    const { t } = useTranslation()

    const addToWishlist = () => { setCookie('wishlist', [...wishlist, id]) }
    const removeFromWishlist = () => {
        if (!window.confirm(t("Вы уверены, что хотите убрать данный товар из списка желаний?"))) return
        setCookie(
            'wishlist',
            [...wishlist].filter(wishlistId => wishlistId !== id)
        )
    }

    return <Button style={{ bottom: isSubcategory ? 5 : 0, right: 5, }}
        className={cx('notranslate', isSubcategory ?
            "green hoverable halfway-fab waves-effect waves-light" :
            "green hoverable waves-effect waves-light")}
        floating
        icon={<Icon>{isAdded ? "favorite" : "favorite_border"}</Icon>}
        node="button"
        tooltip={t(!isAdded ? "Добавить в избранное" : "Убрать из избранного")}
        tooltipOptions={{
            position: 'bottom'
        }}
        onClick={() => isAdded ? removeFromWishlist() : addToWishlist()}
    />
}

export default WishlistButton