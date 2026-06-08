import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '@/utils/authContext';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const palette = {
  background: '#FAF8FF',
  card: '#FFFFFF',
  field: '#FAF8FF',
  primary: '#B22312',
  primaryBright: '#E94B35',
  secondary: '#50643F',
  text: '#141B2C',
  brown: '#5A403C',
  muted: '#8F706B',
  outline: '#E3BEB8',
  surfaceHigh: '#DBE2F9',
  navy: '#293042',
  white: '#FFFFFF',
};

export default function SignupScreen() {
  const authContext = React.useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState<string | null>(null);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const strengthText = useMemo(() => {
    if (passwordScore >= 4) return 'Very strong password.';
    if (passwordScore >= 3) return 'Strong password.';
    if (passwordScore >= 2) return 'Keep going...';
    return 'Use at least 8 characters with numbers.';
  }, [passwordScore]);

  const handleSignUp = async () => {
    if (!acceptedTerms) {
      setLocalErrorMessage('Accept the terms before creating an account.');
      return;
    }

    setLocalErrorMessage(null);

    try {
      await authContext.signUp(fullName, email, password);
    } catch {
      // AuthContext owns the Firebase-facing error message.
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', default: undefined })}
      style={{ flex: 1, backgroundColor: palette.background }}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Math.max(insets.top, 24) + 28,
          paddingBottom: Math.max(insets.bottom, 24) + 18,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ alignItems: 'center', marginBottom: 28 }}>
          <Ionicons name="restaurant" color={palette.primary} size={48} />
          <Text
            selectable
            style={{
              color: palette.primary,
              fontFamily: 'Inter_900Black',
              fontSize: 34,
              lineHeight: 42,
              marginTop: 8,
            }}
          >
            krave
          </Text>
        </View>

        <View style={{ alignItems: 'center', gap: 8, marginBottom: 28 }}>
          <Text
            selectable
            style={{
              color: palette.text,
              fontFamily: 'Inter_900Black',
              fontSize: 28,
              lineHeight: 34,
              textAlign: 'center',
            }}
          >
            Join the community
          </Text>
          <Text
            selectable
            style={{
              color: palette.brown,
              fontFamily: 'Inter_400Regular',
              fontSize: 18,
              lineHeight: 26,
              textAlign: 'center',
              maxWidth: 320,
            }}
          >
            Personalized cravings, delivered to your screen.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: palette.card,
            borderColor: 'rgba(227, 190, 184, 0.55)',
            borderWidth: 1,
            borderRadius: 24,
            borderCurve: 'continuous',
            padding: 24,
            gap: 16,
            boxShadow: '0 4px 20px rgba(56, 63, 81, 0.05)',
          }}
        >
          <SignupField
            icon="person-outline"
            label="Full Name"
            onChangeText={(value) => {
              authContext.clearError();
              setLocalErrorMessage(null);
              setFullName(value);
            }}
            placeholder="Alex Rivera"
            textContentType="name"
            value={fullName}
          />
          <SignupField
            icon="mail-outline"
            keyboardType="email-address"
            label="Email"
            onChangeText={(value) => {
              authContext.clearError();
              setLocalErrorMessage(null);
              setEmail(value);
            }}
            placeholder="name@example.com"
            textContentType="emailAddress"
            value={email}
          />
          <SignupField
            icon="lock-closed-outline"
            label="Password"
            onChangeText={(value) => {
              authContext.clearError();
              setLocalErrorMessage(null);
              setPassword(value);
            }}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            textContentType="password"
            value={password}
            trailing={
              <Pressable
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                hitSlop={8}
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons
                  color={palette.muted}
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                />
              </Pressable>
            }
          />

          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {[1, 2, 3, 4].map((step) => (
                <View
                  key={step}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor:
                      passwordScore >= step
                        ? passwordScore >= 3
                          ? palette.secondary
                          : '#FFB4A7'
                        : palette.surfaceHigh,
                  }}
                />
              ))}
            </View>
            <Text
              selectable
              style={{
                color: passwordScore >= 3 ? palette.secondary : palette.brown,
                fontFamily: 'Inter_500Medium',
                fontSize: 14,
                lineHeight: 20,
              }}
            >
              {strengthText}
            </Text>
          </View>

          <Pressable
            onPress={() => setAcceptedTerms((accepted) => !accepted)}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 14,
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: palette.outline,
                backgroundColor: acceptedTerms ? palette.primaryBright : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 2,
              }}
            >
              {acceptedTerms ? (
                <Ionicons name="checkmark" color={palette.white} size={17} />
              ) : null}
            </View>
            <Text
              selectable
              style={{
                flex: 1,
                color: palette.brown,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                lineHeight: 24,
              }}
            >
              I agree to the{' '}
              <Text style={{ color: palette.primary }}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={{ color: palette.primary }}>Privacy Policy</Text>
            </Text>
          </Pressable>

          <Pressable
            disabled={authContext.isLoading}
            onPress={handleSignUp}
            style={({ pressed }) => ({
              height: 58,
              borderRadius: 16,
              borderCurve: 'continuous',
              backgroundColor: authContext.isLoading
                ? palette.outline
                : palette.primaryBright,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
              transform: [{ scale: pressed ? 0.98 : 1 }],
              boxShadow: '0 8px 20px rgba(56, 63, 81, 0.12)',
            })}
          >
            <Text
              selectable
              style={{
                color: palette.white,
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
                lineHeight: 22,
              }}
            >
              {authContext.isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </Pressable>

          {localErrorMessage || authContext.errorMessage ? (
            <Text
              selectable
              style={{
                color: palette.primary,
                fontFamily: 'Inter_600SemiBold',
                fontSize: 14,
                lineHeight: 20,
                textAlign: 'center',
              }}
            >
              {localErrorMessage ?? authContext.errorMessage}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 24,
            marginTop: 34,
            marginBottom: 24,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: palette.outline }} />
          <Text
            selectable
            style={{
              color: palette.brown,
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Or sign up with
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: palette.outline }} />
        </View>

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <SocialButton iconLabel="G" label="Google" />
          <SocialButton iconLabel="Apple" label="Apple" />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            marginTop: 44,
          }}
        >
          <Text
            selectable
            style={{
              color: palette.brown,
              fontFamily: 'Inter_400Regular',
              fontSize: 18,
              lineHeight: 26,
            }}
          >
            Already have an account?
          </Text>
          <Link href="/login" asChild>
            <Pressable hitSlop={8}>
              <Text
                selectable
                style={{
                  color: palette.primary,
                  fontFamily: 'Inter_700Bold',
                  fontSize: 18,
                  lineHeight: 26,
                }}
              >
                Log In
              </Text>
            </Pressable>
          </Link>
        </View>

        <View style={{ flex: 1, minHeight: 78 }} />

        <Text
          selectable
          style={{
            color: palette.muted,
            fontFamily: 'Inter_500Medium',
            fontSize: 14,
            lineHeight: 20,
            textAlign: 'center',
          }}
        >
          (c) 2024 krave AI. All rights reserved.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SignupField({
  icon,
  keyboardType,
  label,
  onChangeText,
  placeholder,
  secureTextEntry,
  textContentType,
  trailing,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  keyboardType?: 'default' | 'email-address';
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  textContentType?: 'emailAddress' | 'name' | 'password';
  trailing?: React.ReactNode;
  value: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text
        selectable
        style={{
          color: palette.brown,
          fontFamily: 'Inter_700Bold',
          fontSize: 16,
          lineHeight: 22,
          paddingLeft: 6,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          minHeight: 58,
          borderRadius: 12,
          borderCurve: 'continuous',
          backgroundColor: palette.field,
          borderColor: palette.outline,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: trailing ? 10 : 16,
          gap: 12,
        }}
      >
        <Ionicons name={icon} color={palette.muted} size={22} />
        <TextInput
          autoCapitalize={textContentType === 'emailAddress' ? 'none' : 'words'}
          autoComplete={textContentType === 'emailAddress' ? 'email' : undefined}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          secureTextEntry={secureTextEntry}
          style={{
            flex: 1,
            color: palette.text,
            fontFamily: 'Inter_400Regular',
            fontSize: 16,
            paddingVertical: 0,
          }}
          textContentType={textContentType}
          value={value}
        />
        {trailing}
      </View>
    </View>
  );
}

function SocialButton({
  iconLabel,
  label,
}: {
  iconLabel: string;
  label: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => ({
        flex: 1,
        height: 56,
        borderRadius: 16,
        borderCurve: 'continuous',
        backgroundColor: palette.background,
        borderColor: palette.outline,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View
        style={{
          width: 24,
          height: 24,
          backgroundColor: iconLabel === 'Apple' ? '#050914' : '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          selectable
          style={{
            color: iconLabel === 'Apple' ? '#FFFFFF' : '#4285F4',
            fontFamily: 'Inter_700Bold',
            fontSize: iconLabel === 'Apple' ? 10 : 13,
          }}
        >
          {iconLabel}
        </Text>
      </View>
      <Text
        selectable
        style={{
          color: palette.text,
          fontFamily: 'Inter_700Bold',
          fontSize: 16,
          lineHeight: 22,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
