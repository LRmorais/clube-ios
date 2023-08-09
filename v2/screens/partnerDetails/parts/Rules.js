/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import ReadMore from '../../../components/readMore';

import CommonButton from '../../../components/button/common';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import createStyle from '../../../utils/style';

const Infos = () => {
  const {theme} = useLayoutContext();
  const {unit} = useContext();

  return (
    <Box>
      <PaddingContainer>
        <View>
          <Text style={[styles.title, {color: theme.primaryColor}]}>
            Regras de Uso
          </Text>

          <ReadMore
            containerProps={{style: styles.descriptionContainer}}
            collapsedStyle={[
              styles.description,
              styles.collapsedDescription,
              {color: theme.primaryColor},
            ]}
            expandedStyle={[styles.description, {color: theme.primaryColor}]}
            numberOfLines={3}
            // onLinkPress={props.onLinkPress}
            renderExpandCaller={handlePress => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler mais"
                  textColor="#ffc133"
                  size="medium"
                  onPress={handlePress}
                />
              </View>
            )}
            renderCollapseCaller={handlePress => (
              <View style={styles.descriptionButton}>
                <CommonButton
                  text="Ler menos"
                  textColor="#ffc133"
                  size="medium"
                  onPress={handlePress}
                />
              </View>
            )}>
            {unit.roles ? unit.roles : ''}
          </ReadMore>
        </View>
      </PaddingContainer>
    </Box>
  );
};

const styles = createStyle(theme => ({
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textTransform: 'uppercase',
  },
  descriptionContainer: {
    marginTop: theme.spacing(2.5),
  },
  description: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'justify',
    lineHeight: 19,
  },
  collapsedDescription: {
    fontFamily: theme.typography.fontFamily.regular,
  },
  descriptionButton: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing(1),
  },
}));

export default Infos;
