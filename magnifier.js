
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

export const magnifierClass = "img-magnifing-glass";
export const magnifierSize = "35vw";

// Adapted from: https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
export function magnify(img, zoom) {

  // Find largest srcset image, if present
  let largestImgUrl = findLargestImgUrl(img, img.src);
  
  // Create magnifier glass div
  const magNode = document.createElement("div");
  magNode.setAttribute("class", magnifierClass);

  // Calculate size of zoomed image
  const zoomedWidth = img.width * zoom;
  const zoomedHeight = img.height * zoom;
  
  // Set background properties for it
  magNode.style.width = magNode.style.height = magnifierSize;
  magNode.style.position = "absolute";
  magNode.style.backgroundRepeat = "no-repeat";
  magNode.style.borderRadius = "50%";
  magNode.style.backgroundImage = `url('${largestImgUrl}')`;
  magNode.style.backgroundSize = `${zoomedWidth}px ${zoomedHeight}px`;
  
  // Insert it at the top level
  document.body.appendChild(magNode);
  
  // Get half the magnifier's width and height in pixels
  const magNodeWidth2 = magNode.offsetWidth / 2; 
  const magNodeHeight2 = magNode.offsetHeight / 2;

  // Execute a function when someone moves the magnifier glass over
  // the image (via mouse or touch event)
  magNode.addEventListener("mousemove", moveMagnifier);
  magNode.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
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
    
    // Get the cursor's x and y positions
    let [x, y] = getCursorPos(e);
    
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

  function getCursorPos(e) {
    e = e || window.event;
    
    // Calculate the cursor's x and y coordinates, in pixels, relative to the image
    let x = e.pageX// - imgBounds.left;
    let y = e.pageY// - imgBounds.top;

    // Consider any page scrolling
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return [x, y];
  }
}

