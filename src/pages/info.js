import React from "react"
import { Link } from "gatsby";
import MapLayout from "../components/MapLayout"
import infoStyles from "../styles/pages/info.module.scss"
import useSiteMetaData from "../static_queries/useSiteMetadata"
import WindowFrame from "../components/WindowFrame";
import windowFrame from "../styles/components/windowFrame.module.scss";

export default function Info() {
  const { infoData } = useSiteMetaData()
  return (
    <MapLayout figureDisabled={true} gradient={true}>
        <WindowFrame className={windowFrame.info}>
          <header>Read more Story</header>

          <div style={{columnCount: 2, columnGap: "2rem", marginBottom: "2rem"}}>
            <p>
              Humanity is moving ever deeper into crisis — a crisis without precedent.
            </p>
            <p>
              First, it is a crisis brought about by cosmic evolution irrevocably intent 
              upon completely transforming omnidisintegrated humanity from a complex 
              of around-the-world, remotely-deployed-from-one-another, differently colored,
              differently credoed, differently cultured, differently communicating, 
              and differently competing entities into a completely integrated, comprehensively
              interconsiderate, harmonious whole.
            </p>

            <p>
              Second, we are in an unprecedented crisis because cosmic evolution is also 
              irrevocably intent upon making omni-integrated humanity omnisuccessful, 
              able to live sustainingly at an unprecedentedly higher standard of living for 
              all Earthians than has ever been experienced by any; able to live entirely 
              within its cosmic-energy income instead of spending its cosmic-energy savings account (i.e., the fossil fuels) or spending its cosmic-capital plant and 
              equipment account (i.e., atomic energy) — the atoms with which our Spaceship Earth and its biosphere are structured and equipped — a spending folly 
              no less illogical than burning your house-and-home to keep the family warm 
              on an unprecedentedly cold midwinter night.
            </p>
            <p>
              Humanity’s cosmic-energy income account consists entirely of our 
              gravity- and star (99 percent Sun)-distributed cosmic dividends of waterpower,
              tidal power, wavepower, windpower, vegetation-produced alcohols, 
              methane gas, vulcanism, and so on. Humanity’s present rate of total energy 
              consumption amounts to only one four-millionth of one percent of the rate 
              of its energy income. 
            </p>

          </div>
          <Link to="/map" className={windowFrame.button}>BACK TO MAP</Link>
          <footer>This is a footer</footer>
        </WindowFrame>

        {/*
            <section className={infoStyles.info_blurb}>
            <h2>
            <div dangerouslySetInnerHTML={{__html: infoData.description}}></div>
            <div dangerouslySetInnerHTML={{__html: infoData.cta}}></div>
            </h2>
            <ul>
            <li>
            <p>
            <a href={`mailto:${infoData.contact.email}`}>Email: {infoData.contact.email}</a>
            </p>
            </li>
            <li>
            <p>
            <a href={`https://twitter.com/${infoData.contact.twitter_handle}`}>
            Twitter: @{infoData.contact.twitter_handle}
            </a>
            </p>
            </li>
            <li>
            <p>
            <a href={`https://github.com/${infoData.contact.github_handle}`}>Github: {infoData.contact.github_handle}</a>
            </p>
            </li>
            </ul>
            </section>
          */}
    </MapLayout>
  )
}
