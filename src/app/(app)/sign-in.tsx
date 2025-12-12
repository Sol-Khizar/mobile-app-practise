import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import GoogleSignIn from "../components/GoogleSignIn";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return;

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/");
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">

                <View className="flex-1 px-6 ">
                    <View className="flex-1 justify-center">
                        <View className="items-center mb-8">




                            <LinearGradient
                                colors={['#2563EB', '#9333EA']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{

                                    borderRadius: 16,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}
                                className="w-20 h-20    rounded-2xl items-center justify-center mb-4 shadow-lg mt-3"
                            >
                                <Ionicons name='fitness' size={40} color='black' />
                            </LinearGradient>

                            <Text className="text-3xl font-bold text-gray-900 mb-2 ">
                                FitTracker
                            </Text>
                            <Text className="text-lg text-gray-600 text-center">
                                Track your fitness journey {"\n"} and reach your goals
                            </Text>
                        </View>
                    </View>

                    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <Text className="text-2xl font-bold text-gray-900 mb-6 ">
                            Welcome Back
                        </Text>
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Email
                            </Text>
                            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200 ">
                                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                                <TextInput
                                    autoCapitalize="none"
                                    value={emailAddress}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9CA3AF"
                                    onChangeText={setEmailAddress}
                                    className="flex-1 ml-3 text-gray-900"
                                    editable={!isLoading}
                                />
                            </View>
                        </View>

                        <View className="mb-6">
                            <Text className="text-sm font-medium text-gray-700 mb-2 ">
                                Password
                            </Text>
                            <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200 ">
                                <Ionicons name="lock-closed-outline" size={20} color="6B7280" />
                                <TextInput
                                    secureTextEntry={true}
                                    value={password}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9CA3AF"
                                    onChangeText={setPassword}
                                    className="flex-1 ml-3 text-gray-900"
                                    editable={!isLoading}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={onSignInPress}
                        disabled={isLoading}
                        className={`rounded-xl py-4 shadow-sm mb-4 ${isLoading ? "bg-gray-400" : "bg-blue-600"
                            }`}
                        activeOpacity={0.8}
                    >
                        <View className="flex-row items-center justify-center ">
                            {isLoading ? (
                                <Ionicons name="refresh" size={20} color="white" />
                            ) : (
                                <Ionicons name="log-in-outline" size={20} color="white" />
                            )}
                            <Text className="text-white font-semibold text-lg ml-2">
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View className="flex-row items-center my-4">
                        <View className="flex-1 h-px bg-gray-200" />
                        <Text className="px-4 text-gray-500 text-sm  ">or</Text>
                        <View className="flex-1 h-px bg-gray-200" />
                    </View>

                    <GoogleSignIn />

                    <View className="flex-row justify-center items-center mt-4">
                        <Text className="text-gray-600 ">
                            Don't have an account?
                        </Text>
                        <Link href='/sign-up' asChild>
                            <TouchableOpacity >
                                <Text className="text-blue-600 font-semibold">
                                    Sign Up
                                </Text>

                            </TouchableOpacity>
                        </Link>

                    </View>



                    <View className="pt-8 pb-3">
                        <Text className="text-center text-gray-500 text-sm">
                            Start your fitness journey today
                        </Text>
                    </View>
                </View>

            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
