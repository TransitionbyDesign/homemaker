//for importing global styles
import "./src/styles/reset.scss"
import "./src/styles/global.scss"
import { magnify } from "./magnifier";

const magnifierZoom = 4;

export const onRouteUpdate = (apiCallbackContext, pluginOptions) => {
  const options = pluginOptions; //Object.assign({}, DEFAULT_OPTIONS, pluginOptions);
  const imageWrapperClass = 'gatsby-resp-image-image';
  
  // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // for cross-browser looping through NodeList without polyfills
  const imageWrappers = document.querySelectorAll("[title*='(zoomable)']");
  
  console.log("imageWrappers", imageWrappers, imageWrapperClass); // DEBUG
  imageWrappers.forEach(imageWrapper => magnify(imageWrapper, magnifierZoom));
};


