/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, FontSize } from '../utils/styles';
import { ThemeContext } from './ThemeProvider';
import Title from './Title';

const MainScreen = ({
  isHomeScreen = false,
  showHeader = true,
  showHeaderLeft = true,
  showHeaderRight = true,
  headerLeft = null,
  headerRight = null,
  title = '',
  headerFloatingView = null,
  children = <></>,
  userDetails = {},
}) => {
  const { isDark } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const routes = headerFloatingView
    ? headerFloatingView?.map((tab, i) => ({
      key: `tab-${i}`,
      title: tab?.tabName,
    }))
    : [];

  const renderScene = headerFloatingView?.length
    ? SceneMap(
      headerFloatingView?.reduce((acc, tab, i) => {
        acc[`tab-${i}`] = tab.components;
        return acc;
      }, {}),
    )
    : null;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={isDark ? Colors.sectionBGDark : Colors.sectionBGLight} barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.mainContainer, { backgroundColor: isDark ? Colors.screenBGDark : Colors.screenBGLight }]}>
        {showHeader && (
          <View
            style={[
              styles.header,
              {
                borderBottomLeftRadius: headerFloatingView ? 0 : 8,
                borderBottomRightRadius: headerFloatingView ? 0 : 8,
                backgroundColor: isDark ? Colors.sectionBGDark : Colors.sectionBGLight,
              },
            ]}>
            {showHeaderLeft && (
              <View
                style={[styles.headerLeft, { flex: isHomeScreen ? 0.5 : 0.15 }]}>
                {isHomeScreen ? (
                  <View>
                    <Title title={'Welcome'} style={styles.welcomeText} />
                    <Title title={userDetails?.firstName ?? 'User'} style={styles.userName} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.iconContainerStyle}>
                      <Icon
                        name="chevron-back-outline"
                        size={20}
                        color={isDark ? Colors.textDark : Colors.textLight}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
            {!isHomeScreen && (
              <View style={styles.headerCenter}>
                <Title title={title} style={styles.pageTitle} />
              </View>
            )}
            {showHeaderRight && (
              <View
                style={[styles.headerRight, { flex: isHomeScreen ? 0.5 : 0.15 }]}>
                {headerRight}
              </View>
            )}
          </View>
        )}
        {headerFloatingView && (
          <View style={{ flex: 1 }}>
            <TabView
              style={styles.tabsViewStyle}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{
                width: Dimensions.get('window').width,
              }}
              renderTabBar={props => {
                return (
                  <TabBar
                    {...props}
                    indicatorStyle={[styles.indicatorStyle, { backgroundColor: isDark ? Colors.sectionBGLight : Colors.sectionBGDark }]}
                    style={[styles.tabsContainer, { backgroundColor: isDark ? Colors.sectionBGDark : Colors.sectionBGLight }]}
                    tabStyle={styles.tabsLabel}
                    activeColor={isDark ? Colors.textDark : Colors.textLight}
                    inactiveColor={isDark ? Colors.textDark : Colors.textLight}
                  />
                );
              }}
            />
          </View>
        )}
        {!headerFloatingView && (
          <View style={[styles.mainContent, { backgroundColor: isDark ? '#1E1E1E' : '#FAF9F6' }]}>
            <FlatList
              renderItem={() => children}
              nestedScrollEnabled
              data={['']}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    // marginTop: StatusBar.currentHeight,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    // backgroundColor: isDark ? '#FAF9F6' : '#1E1E1E',
    // height: Dimensions.get('window').height,
    // overflow: 'scroll',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    height: 55,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainerStyle: {
    padding: 6,
    paddingLeft: 0,
  },
  welcomeText: {
    fontSize: FontSize.s14,
    fontWeight: '400',
  },
  userName: {
    fontSize: FontSize.s15,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  headerCenter: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: FontSize.s18,
    fontWeight: 600,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabsViewStyle: {
    height: '100%',
  },
  tabsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#d1d1d1',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  indicatorStyle: {
    backgroundColor: 'white',
    height: 2,
  },
  tabsLabel: {
    fontSize: 20,
  },
  mainContent: {
    flex: 1,
  },
});
