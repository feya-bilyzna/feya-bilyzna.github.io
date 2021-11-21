import React, { Fragment, useState } from 'react'
import { Button, Col, Divider, MediaBox, Modal, Row } from "react-materialize"
import { useParams } from 'react-router'
import { gql, useQuery } from "@apollo/client"
import { useCookies } from 'react-cookie'
import { LoadingAnimation, VariantSelectors, AdditionalInfo, ProductInfoModal, CustomIcon } from '..'
import { alertsData, cartAndOrderLimits, categoriesData } from "../../data/index"
import { NavLink } from "react-router-dom"

const DetailPage = () => {

    const descriptionStyle = { fontSize: 13 }
    const modalMarginBottom = { marginBottom: "90px" }

    const ProductQuery = gql`
    query ProductQuery($id: Int!) {
        productById(id: $id) {
                categories
                description
                id
                images {
                  id
                  url
                }
                name
                remains {
                  id
                  price
                  variantId
                  variantName
                  variantStyle
                  remains
                }
                brandName
                vendorCode
              }
            }
    `

    const [selectedOptions, setselectedOptions] = useState({})
    const { productId } = useParams()

    const [cookies, setCookie] = useCookies(['cartProducts'])

    const { loading, error, data } = useQuery(ProductQuery, {
        variables: { id: productId },
    })

    if (loading) return <LoadingAnimation style={{ height: "50vh" }} />
    if (error) return <h5 style={{ textAlign: "center" }}>{alertsData.serverRequestFailed}</h5>
    if (data.productById === null)
        return <h5 style={{ textAlign: "center", margin: 30 }}>
            {alertsData.noSuchId}
        </h5>

    const allowedSelectors = new Set(['color', 'size', 'bandSize', 'cupSize'])
    const updateSelector = (selector, value) => {
        if (allowedSelectors.has(selector)) {
            if (selectedOptions[selector] === value) {
                setselectedOptions({ ...selectedOptions, [selector]: undefined })
            } else setselectedOptions({ ...selectedOptions, [selector]: value })
        }
    }

    const variantIsValid = variant => variant && Object.keys(variant).map(
        value => allowedSelectors.has(value)
    ).every(value => value)

    const intersection = sets => sets.reduce(
        (intersected, set) => new Set([...set].filter(x => intersected.has(x)))
    )

    const variantsData = {}
    const combinedVariants = {}
    const addOrCreate = (selector, value, relatedSelector, relatedValue) => {
        if (variantsData[selector] === undefined)
            variantsData[selector] = {}
        if (variantsData[selector][value] === undefined)
            variantsData[selector][value] = {}
        if (variantsData[selector][value][relatedSelector] === undefined)
            variantsData[selector][value][relatedSelector] = new Set()
        variantsData[selector][value][relatedSelector].add(relatedValue)

        if (combinedVariants[selector] === undefined)
            combinedVariants[selector] = new Set()
        combinedVariants[selector].add(value)
    }

    const variants = data.productById.remains.filter(
        remains => remains.remains && variantIsValid(remains.variantStyle)
    ).map(remains => remains.variantStyle)
    for (let variant of variants) {
        for (let [name, value] of Object.entries(variant)) {
            let { [name]: current, ...otherSelectors } = variant

            for (let [relatedName, relatedValue] of Object.entries(otherSelectors)) {
                addOrCreate(name, value, relatedName, relatedValue)
            }
        }
    }

    const optionIsDisabled = (selector, option) => {
        if (selectedOptions[selector] && selectedOptions[selector] !== option) return true
        let { [selector]: current, ...related } = variantsData

        return !intersection(Object.entries(related).map(
            ([relatedSelector, relatedData]) => {
                if (selectedOptions[relatedSelector] === undefined) return combinedVariants[selector]
                return relatedData[selectedOptions[relatedSelector]][selector]
            }
        )).has(option)
    }

    const unfilteredSelectorsData = {}
    for (let selector of Object.keys(variantsData)) {
        unfilteredSelectorsData[selector] = [...combinedVariants[selector]].map(
            option => {
                return {
                    value: option,
                    selected: selectedOptions[selector] === option,
                    disabled: optionIsDisabled(selector, option),
                }
            }
        )
    }
    const selectorsData = Object.fromEntries(
        Object.entries(unfilteredSelectorsData).filter(
            ([selector, options]) => options.length > 1
        )
    )

    const appropriateRemains = data.productById.remains.filter(
        remains =>
            remains.remains &&
            variantIsValid(remains.variantStyle) &&
            Object.entries(remains.variantStyle).reduce(
                (allAppropriate, [styleName, styleValue]) =>
                    allAppropriate && (
                        selectedOptions[styleName] === undefined ||
                        selectedOptions[styleName] === styleValue
                    ),
                true
            )
    )

    if (!appropriateRemains.length)
        return <>
            <h5 style={{ textAlign: "center", margin: 30 }}>
                {alertsData.invalidRemains}
            </h5>
            <div style={{ textAlign: "center" }}>
                <NavLink to={"/contacts"}><Button
                    className="red"
                    node="button"
                >Контакты</Button></NavLink></div>
        </>

    const tooMuchItemsInCart = cookies.cartProducts && Object.keys(cookies.cartProducts).length >= cartAndOrderLimits

    const addToCart = (remainId, variantId, price) => !tooMuchItemsInCart && setCookie('cartProducts',
        { ...(cookies.cartProducts || {}), [remainId]: { productId, variantId, amount: 1, price } }
    )

    const productAlreadyAdded =
        appropriateRemains.length === 1 && appropriateRemains[0].id in (cookies.cartProducts || {})

    // Много лишнего кода и ненужной вложенности.
    // Предлагаю переписать следуюшим образом:

    // Написать функцию, которая будет принимать аргументом список категорий товара и возвращать список вида [{name: 'Название категории', route: 'Маршрут категории'}].
    // По результатам этой функции написать гораздо более простой map, не делающий ничего кроме рендера кнопок.



    const categoriesNameRoutList = (categories) => {
        const list = []
        Object.values(categoriesData.categories).map(category =>
            Object.values(category.subcategories).map(subcategory =>
                data?.productById.categories.map(productCategoryName => {
                    if (productCategoryName === subcategory.name) list.push({ name: subcategory.name, route: subcategory.route })
                })
            )
        )
        Object.values(categoriesData.uncategorizedSubcategories).map(uncategorizedSubcategory =>
            data?.productById.categories.map(productCategoryName => {
                if (productCategoryName === uncategorizedSubcategory.name) list.push({ name: uncategorizedSubcategory.name, route: uncategorizedSubcategory.route })
            })
        )
        return list
    }

    return <Row className={"flow-text"}>
        <Col className="black-text" xl={6} m={6} s={12}>
            {
                categoriesNameRoutList(data?.productById.categories).map(productCategoryData => <Fragment key={productCategoryData.route}>
                    {
                        <NavLink to={productCategoryData.route}>
                            <Button className="pink accent-4"
                                style={{ marginTop: 13, marginRight: 13 }}
                            >
                                <CustomIcon left>
                                    arrow_back_ios
                                </CustomIcon>{productCategoryData.name}</Button>
                        </NavLink>
                    }
                </Fragment>)
            }
            {Object.values(data?.productById.images).map(image =>
                <div
                    className="z-depth-1-half"
                    key={image.id}
                    style={{
                        marginTop: 15,
                        borderRadius: "2px"
                    }}>
                    <MediaBox
                        options={{
                            inDuration: 250,
                            outDuration: 200
                        }}
                    >
                        <img
                            alt="Изображение товара"
                            src={image.url}
                            width="100%"
                        />
                    </MediaBox>
                </div>
            )}
        </Col>
        <Col xl={6} m={6} s={12}
            style={{
                position: "sticky",
                top: 0,
                padding: "10%",
            }}
        >
            <Row style={{ marginBottom: 10, marginTop: 10 }}>
                <Col className="black-text">
                    {data?.productById.vendorCode}
                </Col>
            </Row><Divider />
            <Row style={{ marginBottom: 10, marginTop: 10 }}>
                <Col className="black-text">
                    {data?.productById.brandName ? data?.productById.brandName : "Бренд не указан"}
                </Col>
            </Row><Divider />
            {variants.length > 1 ? <Row>
                <Col>
                    {appropriateRemains.length > 1 ? <h6>Выберите цвет и размер:</h6> : <></>}
                    <VariantSelectors selectorsData={selectorsData} updateSelector={updateSelector} />
                </Col>
            </Row> : <></>}
            {appropriateRemains.length === 1 ? <div>
                <AdditionalInfo header="Выбранный вариант">
                    <p style={descriptionStyle}>{appropriateRemains[0].variantName}</p>
                    <p style={descriptionStyle}>В наличии {appropriateRemains[0].remains} шт</p>
                </AdditionalInfo>
            </div> : <></>}
            <Row>
                <Col className="pink-text accent-4">
                    <h3 style={{ fontWeight: "bold" }}>{appropriateRemains[0].price} грн</h3>
                </Col>
            </Row>
            <Row>
                <Col className="black-text" s={12}>
                    <Modal style={modalMarginBottom}
                        actions={[
                            <div style={{ textAlign: "center" }}>
                                <NavLink to="/cart">
                                    <Button
                                        modal="close"
                                        className="pink accent-4"
                                        node="button"
                                        flat={true}
                                        waves="red"
                                        style={{
                                            color: 'white'
                                        }}
                                    >
                                        <Row>
                                            <Col style={{ marginLeft: 39 }}>
                                                Да
                                            </Col>
                                            <Col>
                                                <CustomIcon tiny>shopping_cart</CustomIcon>
                                            </Col>
                                        </Row>
                                    </Button>
                                </NavLink>
                                <Button
                                    modal="close"
                                    className="pink accent-4"
                                    node="button"
                                    flat={true}
                                    waves="red"
                                    style={{ margin: 5, color: 'white' }}
                                >
                                    <Row>
                                        <Col>Продолжить</Col>
                                    </Row>
                                </Button>
                            </div>
                        ]}
                        bottomSheet
                        trigger={<Button className="red"
                            disabled={appropriateRemains.length > 1
                                ||
                                appropriateRemains[0].id in (cookies.cartProducts || {})
                            }
                            node="button"
                            style={{ padding: 0 }}
                        >
                            <div style={{ padding: "0 20px 0 20px" }}
                                onClick={() => addToCart(appropriateRemains[0].id,
                                    appropriateRemains[0].variantId,
                                    appropriateRemains[0].price
                                )}>
                                {productAlreadyAdded ? "Добавлено" : "Купить"}
                                {!productAlreadyAdded ? <CustomIcon tiny right>attach_money</CustomIcon> : <></>}
                            </div>
                        </Button>}
                    >
                        <div style={{ textAlign: "center" }}>
                            <h5>{tooMuchItemsInCart ? alertsData.cartIsFull : "Добавлено в корзину!"}</h5>
                            <h6>Перейти к оформлению заказа?</h6>
                        </div>
                    </Modal>
                </Col>
            </Row>
            {<AdditionalInfo header="О товаре">
                {data?.productById.description ?
                    <p style={descriptionStyle}>{data?.productById.description}</p> : <></>}
                <ProductInfoModal name="Доставка" iconName="local_shipping">
                    <div style={{ textAlign: "center" }}>
                        <h6>Новой почтой по Украине - по тарифам перевозчика.</h6>
                        <h6>Укрпочтой по Украине - по тарифам перевозчика.</h6>
                    </div>
                </ProductInfoModal>
                <ProductInfoModal name="Оплата" iconName="local_atm">
                    <div style={{ textAlign: "center" }}>
                        <h6>Наложенным платежом.</h6>
                        <h6>Оплата на месте (наличные, терминал).</h6>
                        <h6>На карту ПриватБанка.</h6>
                    </div>
                </ProductInfoModal>
            </AdditionalInfo>}
        </Col>
    </Row>
}

export default DetailPage
