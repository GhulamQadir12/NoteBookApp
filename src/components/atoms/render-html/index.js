import React from 'react';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

export default HtmlView = ({html = `<p/>`}) => {
  const {width} = useWindowDimensions();

  // Define styles for specific HTML tags
  const tagsStyles = {
    p: {
      color: 'black', // Example color
    },
    h4: {
      color: 'blue', // Example color
    },
    // Add more styles for other tags as needed
  };

  return (
    <RenderHtml
      contentWidth={width}
      source={{html: html}}
      tagsStyles={tagsStyles} // Apply the defined styles
    />
  );
};
