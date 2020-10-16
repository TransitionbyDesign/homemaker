import React from "react"
import { useLocation } from '@reach/router';
import Header from "./Header"
import Helmet from "react-helmet"
import useSiteMetadata from "../static_queries/useSiteMetadata"
import layoutStyles from "../styles/components/layout.module.scss"
import mapLayout from "../styles/components/mapLayout.module.scss"
import cn from "classnames"

export default function Layout(props) {
  // Use the location to add a modal class if location.state.modal is set
  // This allows client-side navigation signal the page is a modal dialog.
  const location = useLocation();
  
  const { title, description } = useSiteMetadata()
  return (
    <section
      className={cn([layoutStyles.layout, props.className],
                    {[mapLayout.modal]: location?.state?.modal})}
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
