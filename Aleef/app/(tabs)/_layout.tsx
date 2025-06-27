import { Tabs } from 'expo-router';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/components/colors';
import Toast from 'react-native-toast-message';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary || '#8BAA91',
        tabBarInactiveTintColor: Colors.textSecondary || '#6B6B6B',
        tabBarStyle: {
          backgroundColor: Colors.background || '#FAF9F7',
          borderTopColor: Colors.border || '#E0DDD6',
        },
        tabBarLabelStyle: {
          fontFamily: 'tajawal-medium',
          fontSize: 12,
        },
        headerShown: false,
        animation: "shift",
      }}
    >
      <Tabs.Screen
        name="Reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="paw" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Clinics"
        options={{
          title: 'Clinics',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medical-bag" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Articles"
        options={{
          title: 'Articles',
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
  <Toast />
}
