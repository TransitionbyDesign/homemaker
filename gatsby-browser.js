//for importing global styles
import "./src/styles/reset.scss"
import "./src/styles/global.scss"
import { magnify } from "./magnifier";

const magnifierZoom = 4; // How much to zoom in the magnifier
const titleKeyword = "(magnified)"; // Only make images zoomable if this is in the title
const imageWrapperClass = 'gatsby-resp-image-image';

function insertMagnifier() {
  // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // for cross-browser looping through NodeList without polyfills
  const imageWrappers = document.querySelectorAll(`[title*='${titleKeyword}']`);
  
  // console.log(">>>",document.body.innerHTML);
  console.log("imageWrappers", imageWrappers, imageWrapperClass); // DEBUG
  imageWrappers.forEach(imageWrapper => magnify(imageWrapper, magnifierZoom));
}

export const onRouteUpdate = (apiCallbackContext, pluginOptions) => {

  // Sometimes - like when refreshing the site on an article - the
  // onRouteUpdate callback is invoked when there is no content in the page
  // - so the magnifier isn't inserted, because no images are found.
  // Triggering insertMagnifier after a zero delay works around
  // this. Clue from here: https://github.com/gatsbyjs/gatsby/issues/1625
  setTimeout(insertMagnifier, 0);
};


