import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';


const MyCarousel = ({ data }) => {
  const { width } = Dimensions.get('window');
  const ITEM_WIDTH = width * 0.75; // Each item is 80% of screen width
const SIDE_SPACING = (width - ITEM_WIDTH) / 2.5; // Space to show left/right images
const [forceUpdate, setForceUpdate] = useState(false);


  const carouselRef = useRef(null);
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
      <Bold label={item.title} style={styles.title}/>
      <Regular label={item.description} style={styles.slidertitle}/>
      </View>
    );
  }

  return (
 
    <Carousel
    
          key={forceUpdate} 
          ref={carouselRef}
          data={data}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={ITEM_WIDTH}
          inactiveSlideScale={0.85}
          inactiveSlideOpacity={0.7}
          loop={true}
          autoplay={false}
          enableSnap={true}
          loopClonesPerSide={2} //  Prevents clipping of edges
          snapToAlignment="center"
          pagingEnabled={false} //  Allows proper free scrolling
          decelerationRate="fast"
          contentContainerCustomStyle={{
            paddingHorizontal: SIDE_SPACING, //  Ensures edges are visible
          }}
          slideStyle={{ alignSelf: 'center' }}
        />
  );
}
export default MyCarousel;
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderRadius: mvs(5),
    borderColor:colors.primary,
    borderWidth: mvs(2),
    paddingVertical: mvs(20),
  },
  title: {
    marginBottom: mvs(10),
  },
});