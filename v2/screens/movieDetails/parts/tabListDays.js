/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { ASSET_PREFIX } from '../../../constants/env';
import ImageWithLoading from '../../../components/imageWithLoading';
import FloatingButton from '../../../components/button/feed_button';
import createStyle from '../../../utils/style';

import { useContext } from '../context';
import { useLayoutContext } from '../../../hocs/layout';

export function TabListDays() {
  const { screenWidth } = useLayoutContext();
  const {
    movieById: movie,
    activeDay,
    setActiveDay,
    hasTickets,
    openPurchaseLink,
  } = useContext();
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ padding: 20 }}>
        {movie?.days?.map(item => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setActiveDay(item)}
            style={[
              activeDay == item ? styles.activeButton : styles.inativeButton,
              { padding: 10, borderBottomWidth: 4 },
            ]}>
            <View
              opacity={activeDay == item ? 1 : 0.5}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                padding: 8,
              }}>
              <Text style={[styles.tabDays]}>{item.split(':')[0]}</Text>
              <Text style={[styles.tabDaysOfWeek]}>{item.split(':')[1]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={movie?.partnerUnits}
        renderItem={({ item }) => {

          const filterTickets = hasTickets.filter(
            partner => partner.partnerId == item.partnerId && partner.avaible,
          );
          const dubbedSession = movie?.MoviesSessions.filter(element => {
            return (
              element.unit[0].includes(item.fantasyName) &&
              element.subtitled === 'Dublado' &&
              element.day === activeDay
            );
          }).sort((a, b) => {
            return a.hour > b.hour ? 1 : -1;
          });
          const subtitledSession = movie?.MoviesSessions.filter(element => {
            return (
              element.unit[0].includes(item.fantasyName) &&
              element.subtitled === 'Legendado' &&
              element.day === activeDay
            );
          }).sort((a, b) => {
            return a.hour > b.hour ? 1 : -1;
          });

          return (
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: screenWidth / 4 }}>
                  <ImageWithLoading
                    resizeMode="contain"
                    containerStyle={[styles.image]}
                    source={{ uri: ASSET_PREFIX + item.cover }}
                  />
                </View>
                <View style={{ marginLeft: 20, width: '70%' }}>
                  <Text style={styles.partnerTitle}>{item.fantasyName}</Text>
                  <Text style={styles.tagLabel}>Cinemas</Text>
                </View>
              </View>
              <View>
                {dubbedSession.length === 0 && subtitledSession.length === 0 ? (
                  <Text style={styles.noSessionLabel}>
                    Sem sessões disponíveis
                  </Text>
                ) : null}
                {dubbedSession.length === 0 || null || undefined ? null : (
                  <Text
                    style={[
                      styles.dubbedLabel,
                      {
                        marginTop: 20,
                      },
                    ]}>
                    Dublado
                  </Text>
                )}
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {dubbedSession.map(session => {
                    // console.log(item.fantasyName);

                    return (
                      <View
                        style={{
                          borderWidth: 2,
                          borderColor: '#30287b',
                          padding: 12,
                          marginRight: 10,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#30287b',
                            fontWeight: 'bold',
                            paddingHorizontal: 10,
                          }}>
                          {session.hour}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>

              <View>
                {subtitledSession.length === 0 || null || undefined ? null : (
                  <Text
                    style={[
                      styles.dubbedLabel,
                      {
                        marginTop: 20,
                      },
                    ]}>
                    Legendado
                  </Text>
                )}

                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {subtitledSession.map(session => {
                    return (
                      <View style={styles.hourContainer}>
                        <Text style={styles.hourLabel}>{session.hour}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
              {filterTickets.length !== 0 ? (
                <FloatingButton
                  text="COMPRAR VOUCHER"
                  textColor="#30287b"
                  styles={{ marginLeft: 0, marginRight: 0 }}
                  onPress={() => {
                    openPurchaseLink(item.partnerSlug);
                  }}
                />
              ) : null}
            </View>
          );
        }}
        showSeparator
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 15, width: '100%', backgroundColor: '#f7f7f7' }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = createStyle(theme => ({
  tabDays: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(25),
  },
  tabDaysOfWeek: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  activeButton: {
    borderColor: '#ffc133',
  },
  inativeButton: {
    borderColor: '#ffffff',
  },
  image: {
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 17 / 25,
    borderRadius: 15,
  },
  partnerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(20),
    color: theme.palette.primary.main,
  },
  tagLabel: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    color: theme.palette.primary.main,
    marginTop: 5,
  },
  dubbedLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(20),
    color: theme.palette.primary.main,
    marginBottom: 15,
  },
  hourContainer: {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
    padding: 12,
    marginRight: 10,
    borderRadius: 5,
  },
  hourLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(20),
    color: theme.palette.primary.main,
    paddingHorizontal: 10,
  },
  noSessionLabel: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(17),
    color: theme.palette.primary.main,
  },
}));
