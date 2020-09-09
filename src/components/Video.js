import React from "react";
import AspectRatio from 'react-aspect-ratio';

// Lifted from https://www.gatsbyjs.com/docs/working-with-video/

const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <AspectRatio className="video" ratio={props.ratio || 1} style={props.style || {}}>
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  </AspectRatio>
);

export default Video;
