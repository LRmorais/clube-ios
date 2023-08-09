import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Linking} from 'react-native';

import PaddingContainer from '../paddingContainer';
import HorizontalList from '../horizontalList/customHorizontalList';
import ImageWithLoading from '../imageWithLoading';
import FloatingButton from '../../components/button/feed_button';
import ReadMore from '../readMore';
import CommonButton from '../button/common';
import createStyle, {theme} from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';
import {useAnalyticsContext} from '../../hocs/analytics';

const PartnerHead = props => {
  console.log(props.social.site);
  const {screenWidth} = useLayoutContext();
  const {dispatchRecord} = useAnalyticsContext();

  function handlePressHOF(url, what) {
    try {
      dispatchRecord('Contactar', {
        value: what,
      });
      Linking.openURL(`${url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
    } catch {
      //
    }
  }

  return (
    <View style={{backgroundColor: props.color.background}}>
      <HorizontalList
        style={styles.imagesList}
        data={props.images}
        renderItem={({item}) => (
          <ImageWithLoading
            containerStyle={[styles.image, {width: screenWidth, height: 250}]}
            source={{uri: item}}
          />
        )}
        keyExtractor={item => item}
      />
      <PaddingContainer>
        {props.text.title ? (
          <Text style={[styles.title, {color: props.color.text}]}>
            {props.text.title.toUpperCase()}
          </Text>
        ) : null}

        <View style={{flexDirection: 'row'}}>
          {props.text.slug ? (
            <Text style={[styles.subTitle, {color: props.color.text}]}>
              {`${props.text.slug}  -  `}
            </Text>
          ) : null}

          <Text style={[styles.subTitle, {color: props.color.text}]}>
            <Icon name={'map-marker-alt'} size={20} color={props.color.text} />
            {`  ${props.text.distance} `}
          </Text>
        </View>

        {props.text.description ? (
          <ReadMore
            containerProps={{
              style: styles.descriptionContainer,
            }}
            collapsedStyle={[
              styles.description,
              styles.collapsedDescription,
              {color: props.color.text},
            ]}
            expandedStyle={[styles.description, {color: props.color.text}]}
            numberOfLines={3}
            onLinkPress={props.onLinkPress}
            renderExpandCaller={handlePress => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler mais"
                  // backgroundColor={props.color.description.background}
                  textColor={props.color.description.background}
                  size="medium"
                  onPress={handlePress}
                />
              </View>
            )}
            renderCollapseCaller={handlePress => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler menos"
                  // backgroundColor={props.color.description.background}
                  textColor={props.color.description.background}
                  size="medium"
                  onPress={handlePress}
                />
              </View>
            )}>
            {props.text.description}
          </ReadMore>
        ) : null}

        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <View style={{width: '50%'}}>
              {props.social.facebook === '' &&
              props.social.instagram === '' ? null : (
                <>
                  <Text
                    style={[styles.socialTitles, {color: props.color.text}]}>
                    REDES SOCIAIS:
                  </Text>
                </>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: 15,
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handlePressHOF(props.social.facebook, 'Facebook');
                  }}>
                  {props.social.facebook !== '' ? (
                    <Icon
                      name={'facebook'}
                      size={30}
                      color={props.color.text}
                      style={{marginHorizontal: 10}}
                    />
                  ) : null}
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handlePressHOF(props.social.instagram, 'Instagram');
                  }}>
                  {props.social.instagram !== '' ? (
                    <Icon
                      name={'instagram'}
                      size={30}
                      color={props.color.text}
                      style={{marginHorizontal: 5}}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{width: '50%'}}>
              {props.social.whatsapp === '' &&
              props.social.contactPhone === '' &&
              props.social.site === '' ? null : (
                <>
                  <Text
                    style={[styles.socialTitles, {color: props.color.text}]}>
                    CONTATO:
                  </Text>
                </>
              )}

              <View style={{flexDirection: 'row', marginTop: 15}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handlePressHOF(
                      `https://wa.me/55${props.social.whatsapp}`,
                      'WhatsApp',
                    );
                  }}>
                  {props.social.whatsapp !== '' ? (
                    <Icon
                      name={'whatsapp'}
                      size={30}
                      color={props.color.text}
                      style={{marginHorizontal: 10}}
                    />
                  ) : null}
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handlePressHOF(`tel:${props.social.contactPhone}`, 'Phone');
                  }}>
                  {props.social.contactPhone !== '' ? (
                    <Icon
                      name={'phone-alt'}
                      size={30}
                      color={props.color.text}
                      style={{marginHorizontal: 10}}
                    />
                  ) : null}
                </TouchableOpacity>

                {props.social.site !== '' ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      handlePressHOF(props.social.site, 'Site');
                    }}>
                    <Icon
                      name={'globe'}
                      size={30}
                      color={props.color.text}
                      style={{marginHorizontal: 10}}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </>

        {props.purchaseURL ? (
          <FloatingButton
            text="COMPRAR INGRESSOS"
            textColor={props.color.text}
            styles={{marginLeft: 0, marginRight: 0, marginBottom: 15}}
            onPress={props.onLinkPress}
          />
        ) : null}
      </PaddingContainer>
    </View>
  );
};

PartnerHead.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    description: PropTypes.shape({
      background: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string,
  icons: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  meta: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
  onLinkPress: PropTypes.func,
  text: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle(theme => ({
  socialTitles: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  imagesList: {
    marginBottom: theme.spacing(3),
  },
  image: {
    overflow: 'hidden',
    // alignSelf: 'center',
    resizeMode: 'contain',
    aspectRatio: 2 / 1,
    borderRadius: 2,
  },
  date: {
    marginBottom: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(21),
  },
  subTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(15),
    paddingTop: theme.spacing(2),
  },
  iconsContainer: {
    alignItems: 'center',
    marginTop: theme.spacing(3.5),
  },
  descriptionContainer: {
    marginTop: theme.spacing(2.5),
  },
  description: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'justify',
    lineHeight: 25,
  },
  collapsedDescription: {
    fontFamily: theme.typography.fontFamily.regular,
  },
  descriptionButton: {
    alignSelf: 'center',
    marginTop: theme.spacing(1),
  },
}));

export default PartnerHead;
