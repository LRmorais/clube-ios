import React from 'react';
import { Image, Text, View } from 'react-native';
import createStyle from '../../utils/style';


const UserBoxModal = (props) => {
    const styles = createStyle((theme) => ({
        title: {
          fontFamily: theme.typography.fontFamily.bold,
          fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
          color: props.color,
          marginBottom: 5,
          marginRight: 50,
          width: '70%',
        },
        subTitle: {
            fontFamily: theme.typography.fontFamily.bold,
            fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
            color: props.color,

        },
        container:{
            marginTop: 20,
            marginBottom: 20,
            justifyContent: 'flex-start',
            height: 83,
            backgroundColor: props.background,
            flexDirection: 'row',


        },
        img:{
            width: 63,
            height: 61,
            marginLeft: 0,
            marginRight: 30,
            marginLeft: 30,
            marginTop: 12,
            marginBottom: 12,
            borderRadius: 50,

        },
        elementsText:{
            justifyContent: 'center',

        }
      }));

      if (!props.name.trim()) return null;

  return (
        <View style={styles.container}>
            {props.photo ? (
                <Image source={{uri: props.photo}} style={styles.img} />
            ) : null}
            <View style={styles.elementsText}>
                <Text style={styles.title} ellipsizeMode='tail'>{props.name}</Text>
                <Text style={styles.subTitle}>{props.email}</Text>
            </View>
        </View>
  );
};

export default UserBoxModal;
