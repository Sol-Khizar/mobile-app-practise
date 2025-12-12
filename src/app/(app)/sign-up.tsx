import * as React from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';


export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        console.log(emailAddress, password)

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture code
            setPendingVerification(true)
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (pendingVerification) {
        return (
            <>
                <Text>Verify your email</Text>
                <TextInput
                    value={code}
                    placeholder="Enter your verification code"
                    onChangeText={(code) => setCode(code)}
                />
                <TouchableOpacity onPress={onVerifyPress}>
                    <Text>Verify</Text>
                </TouchableOpacity>
            </>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"} className='flex-1'>
            <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">

                <View className='flex-1 px-6'>
                    <View className='flex-1 justify-center'>
                        <View className='items-center mb-8'>


                            <LinearGradient
                                colors={['#2563EB', '#9333EA']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 16,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 16,
                                }}
                            >
                                <Ionicons name='fitness' size={40} color='white' />
                            </LinearGradient>

                            <Text className='text-3xl font-bold text-gray-900 mb-2 '>
                                Join FiTracker
                            </Text>
                            <Text className='text-lg text-gray-600 text-center '>
                                Start your journey {'\n'} and achieved your goals

                            </Text>
                        </View>



                    </View>
                </View>



                {/* <Text className="text-3xl font-bold text-center mb-10 text-gray-800">
                    Sign Up
                </Text>

                <TextInput
                    className="w-full h-14 bg-white rounded-xl px-4 mb-4 border border-gray-300 text-base"
                    autoCapitalize="none"
                    placeholder="Enter email"
                    placeholderTextColor="#888"
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                />

                <TextInput
                    className="w-full h-14 bg-white rounded-xl px-4 mb-4 border border-gray-300 text-base"
                    placeholder="Enter password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    onPress={onSignUpPress}
                    className="bg-blue-600 py-4 rounded-xl mt-2 shadow-md active:opacity-80"
                >
                    <Text className="text-center text-white text-lg font-semibold">
                        Continue
                    </Text>
                </TouchableOpacity>

                <View className="flex-row justify-center mt-5">
                    <Text className="text-gray-700">Already have an account? </Text>
                    <Link href="/sign-in">
                        <Text className="text-blue-600 font-semibold">Sign in</Text>
                    </Link>
                </View> */}

            </SafeAreaView>
        </KeyboardAvoidingView >
    )
}