
/*
   // Magnifier div
   .img-magnifier-glass {
   width: x
   height: x
   background-repeat: no-repeat;
   display: none;
   position: absolute;
   border-radius: 50%;
   }
   // Image wrapper div
   .gatsby-resp-image-image {
   
   }
 */

export const magnifierClass = "img-magnifying-glass";
export const magnifierSize = "35vw";

// Adapted from: https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
export function magnify(img, zoom) {

  // Stop the magnifier triggering scrollbars on the the body element
  // when it touches the edge of the screen.
  document.body.style.overflow = "hidden";

  // Calculate size of zoomed image
  const zoomedWidth = img.width * zoom;
  const zoomedHeight = img.height * zoom;
  
  // Find largest srcset image, if present
  const largestImgUrl = findLargestImgUrl(img, img.src);
  const backgroundImage = `url("${largestImgUrl}")`;
  
  // Find any pre-existing magnifier (should be one per image)
  let magNode = document.querySelector(`.${magnifierClass}[style*='${backgroundImage}']`);
  if (!magNode) {
    // Create a magnifier glass div
    magNode = document.createElement("div");
    magNode.setAttribute("class", magnifierClass);
    magNode.id = magnifierClass;
    
    
    // Set background properties for it
    magNode.style.width = magNode.style.height = magnifierSize;
    magNode.style.position = "absolute";
    magNode.style.backgroundRepeat = "no-repeat";
    magNode.style.borderRadius = "50%";
    magNode.style.backgroundSize = `${zoomedWidth}px ${zoomedHeight}px`;
    magNode.style.backgroundImage = backgroundImage;
    
    // Insert it at the top level
    document.body.appendChild(magNode);
    
    // Handle move events over the magnifier
    magNode.addEventListener("mousemove", moveMagnifier);
    magNode.addEventListener("touchmove", moveMagnifier);
  }

  // Since we're changing routes, always hide the magnifier
  magNode.style.display = "none";

  img.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  // These events make the magnifier disappear when the cursor is not over the image
  img.addEventListener("mouseenter", () => magNode.style.display = "block");
  img.addEventListener("mouseleave", () => magNode.style.display = "none");
  
  // console.log("magnifier", magNodeWidth2, magNodeHeight2); // DEBUG
  return;
  
  // Iterate through the srcset attribute, and return the URL with
  // the largest associated number. Note, we don't distinguish
  // between numbers with different suffixes, so we are implicitly
  // assuming they all use the same sort.
  //
  /// If img is null, or there is no srcset, return the default URL
  function findLargestImgUrl(img, defaultUrl = "") {
    if (!img || !img.srcset)
      return defaultUrl;

    return img.srcset
              .split(",")
              .reduce(
                (acc, item) => {
                  let [url, width] = item.trim().split(" ");
                  width = parseInt(width);
                  if (width > acc.width)
                    return { width, url };
                  return acc;
                },
                { width: -1, url: defaultUrl }
              ).url;
  }
  
  function moveMagnifier(e) {
    // Prevent any other actions that may occur when moving over the image
    e.preventDefault();

    // Make the magnifier visible if it isn't
    magNode.style.display = "block";

    // Get half the magnifier's width and height in pixels, for use later
    // (this is computed to include any border and padding styled)
    const magNodeWidth2 = magNode.offsetWidth / 2; 
    const magNodeHeight2 = magNode.offsetHeight / 2;
    
    // Get the cursor's x and y pixel positions relative to the page
    const x = e.pageX - window.pageXOffset;
    const y = e.pageY - window.pageYOffset;
    
    // Get the x and y positions of the image
    const imgBounds = img.getBoundingClientRect();

    // Calculate the pixel coordinates of the cursor on the image
    const cursorImgX = x - imgBounds.left;
    const cursorImgY = y - imgBounds.top;

    // Calculate the fractional coordinates of the cursor on the image
    const fCursorImgX = cursorImgX/imgBounds.width;
    const fCursorImgY = cursorImgY/imgBounds.height;

    // Calculate the fractional coordinates of the top left corner of
    // the magnifier on the zoomed image
    const fMagNodeZoomedX = fCursorImgX - magNodeWidth2/(zoom*imgBounds.width);
    const fMagNodeZoomedY = fCursorImgY - magNodeHeight2/(zoom*imgBounds.height);

    // Calculate the pixel coordinates of the top left corner of the magnifier on the zoomed image
    const magNodeFullX = fMagNodeZoomedX*zoomedWidth;
    const magNodeFullY = fMagNodeZoomedY*zoomedHeight;
    
    // Set the position of the magnifier glass, in pixels, relative to the image
    magNode.style.left = `${x - magNodeWidth2}px`;//(x - magNodeWidth2) + "px";
    magNode.style.top = `${y - magNodeHeight2}px`;//(y - magNodeHeight2) + "px";

    // Position the background image at the correct location
    magNode.style.backgroundPosition =
      `${-magNodeFullX}px ${-magNodeFullY}px`;

    // console.debug("move", [x, y], [fCursorImgX, fCursorImgY], [magNodeFullX, magNodeFullY]); // DEBUG    
  }
}

