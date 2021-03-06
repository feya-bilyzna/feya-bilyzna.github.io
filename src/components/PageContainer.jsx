import React from 'react'
import styles from '../css.module/PageContainer.module.css'
import cx from "classnames";

const PageContainer = ({ children }) => {
    return <div
        className={cx(styles.container, "z-depth-1")}
        style={{
            flex: 1,
            backgroundColor: "white",
            zIndex: 1
        }}
    >
        {children}
    </div>
}

export default PageContainer
