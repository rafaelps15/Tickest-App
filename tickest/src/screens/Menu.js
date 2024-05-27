
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import Home from './Home';
import Perfil from './Perfil';
import CriarTicket from './CriarTicket';
import Historico from './Historico';


const TabArr = [
  {
    route: 'Home', // Nome da rota
    label: 'Home', // Texto do menu
    activeIcon: 'grid', // Icone ativo
    inActiveIcon: 'grid-outline', // Icone desativado
    component: Home, // component
  },
  {
    route: 'CriarTicket',
    label: 'CriarTicket',
    activeIcon: 'add-circle',
    inActiveIcon: 'add-circle-outline',
    component: CriarTicket, //Página
  },
  {
    route: 'Historico',
    label: 'Historico',
    activeIcon: 'time',
    inActiveIcon: 'time-outline',
    component: Historico,
  },
  {
    route: 'Perfil',
    label: 'Perfil',
    activeIcon: 'person',
    inActiveIcon: 'person-outline',
    component: Perfil,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.0 },
        1: { scale: 1.5 },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.2 },
        1: { scale: 1 },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}
    >
      <Animatable.View ref={viewRef} duration={150}>
        <Ionicons
          name={focused ? item.activeIcon : item.inActiveIcon}
          color='#696CFF' size={20}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function Menu() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 50,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: '#696CFF',
            borderWidth: 1,
            borderTopWidth: 1,
            shadowColor: 'white',
            width: "70%",
            marginLeft: 59
          },
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});
