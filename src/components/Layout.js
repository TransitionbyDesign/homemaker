import React from "react"
import Header from "./Header"
import Helmet from "react-helmet"
import useSiteMetadata from "../static_queries/useSiteMetadata"
import layoutStyles from "../styles/components/layout.module.scss"

export default function Layout(props) {
  const { title, description } = useSiteMetadata()
  const classes = [layoutStyles.layout];
  if (props.page === "splash") {
    classes.push(layoutStyles.splash_page);
  }
  return (
    <section
    className={classes.join(' ')}
    style={{
      backgroundColor: props.bgColor,
    }}
    >
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header page={props.page} title={title} />
      <div className={layoutStyles.content}>{props.children}</div>
    </section>
  )
}
