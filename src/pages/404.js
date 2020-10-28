import React from 'react'
import { Link } from 'gatsby'
import Layout from "../components/Layout"
import notFoundStyles from '../styles/pages/404.module.scss'

export default function NotFound() {
  return (
    <Layout>
      <div className={notFoundStyles.container}>
        <div className={notFoundStyles.content}>
          <p><b>404 NOT FOUND</b></p>
          <p>You seem to be lost.</p>
          <h1>
            <Link to="/">
              Click here to return home.
            </Link>
          </h1>
        </div>
      </div>
    </Layout>
  )
}
