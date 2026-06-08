import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: '#556943',
        tabBarInactiveTintColor: '#5A403C',

        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,

          height: 78,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 22 : 14,
          paddingHorizontal: 16,

          backgroundColor: '#FFFDF7',

          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderTopWidth: 0,

          shadowColor: '#383F51',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.05,
          shadowRadius: 20,

          elevation: 8,
        },

        tabBarItemStyle: {
          borderRadius: 999,
          marginHorizontal: 2,
          paddingVertical: 0,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'compass' : 'compass-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'bookmark' : 'bookmark-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'people' : 'people-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}