import { Tabs } from "expo-router"
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

function Layout() {
    return (
        <Tabs>
            <Tabs.Screen name="index"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }} />
            <Tabs.Screen name="exercises"
                options={{
                    headerShown: false,
                    title: 'Exercise',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="dumbbell" size={size} color={color} />

                    )
                }} />
            <Tabs.Screen name="active-workout"
                options={{
                    headerShown: false,
                    title: 'Add Workout',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="plus-circle" size={size} color={color} />
                    )
                }} />
            <Tabs.Screen name="history"
                options={{
                    headerShown: false,
                    title: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="clock" size={size} color={color} />
                    )
                }} />
            <Tabs.Screen name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }} />


        </Tabs>
    )
}

export default Layout