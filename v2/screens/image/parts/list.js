import React from 'react';
import {View, Image} from 'react-native';
import moment from 'moment';

import FlatListWithPaging from '../../../components/flatListWithPaging';
import ImageWithLoading from '../../../components/imageWithLoading';
import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import SumUserInfo from '../../../components/userInfo/sum';
import createStyle from '../../../utils/style';
import {ASSET_PREFIX} from '../../../constants/env';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const List = () => {
  const {theme, screenWidth} = useLayoutContext();
  const {data, index, newUnit} = useContext();

  function renderItem({item}) {
    let url = item.image;
    let user = item.ClientGazetum;

    if (newUnit) {
      url = item;
    }

    return (
      <ImageWithLoading
        containerStyle={[styles.image, {width: screenWidth}]}
        resizeMode="contain"
        source={{uri: ASSET_PREFIX + url}}>
        {user && (
          <View style={styles.footerContainer}>
            <Image
              style={styles.footerShadow}
              source={require('../../../images/vectors/imageBottomShadow.png')}
              resizeMode="stretch"
            />
            <Box background="transparent">
              <PaddingContainer>
                <SumUserInfo
                  color={{
                    image: theme.secondColorShade,
                    text: {
                      primary: theme.contrastTextColor,
                      secondary: theme.contrastTextColor,
                    },
                    VIP: {
                      background: theme.VIPBackground,
                      text: theme.VIPBackground,
                      icon: theme.primaryColorShade,
                    },
                  }}
                  image={{uri: user.photo}}
                  text={{
                    primary: user.name,
                    secondary: moment(user.createdAt).format(
                      'DD [de] MMMM, YYYY',
                    ),
                  }}
                />
              </PaddingContainer>
            </Box>
          </View>
        )}
      </ImageWithLoading>
    );
  }

  return (
    <FlatListWithPaging
      index={index}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      getItemLayout={(data, index) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
      })}
      bounces={false}
      overScrollMode="never"
    />
  );
};

const styles = createStyle({
  image: {
    justifyContent: 'flex-end',
    height: '100%',
  },
  footerContainer: {
    justifyContent: 'flex-end',
    position: 'relative',
    height: 140,
  },
  footerShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default List;
