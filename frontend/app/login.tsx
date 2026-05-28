import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '@/utils/authContext';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
  background: '#F9FAEA',
  primary: '#B22312',
  primaryBright: '#E94B35',
  navy: '#293042',
  text: '#141B2C',
  brown: '#5A403C',
  mutedBrown: '#8F706B',
  sage: '#50643F',
  outline: '#E3BEB8',
  white: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.58)',
};

export default function LoginScreen() {
  const authContext = React.useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', default: undefined })}
      style={{ flex: 1, backgroundColor: palette.background }}
    >
      <StatusBar style="dark" />
      <View style={{ position: 'absolute', inset: 0 }}>
        <DotPattern />
        <RadarAccent />
        <View
          style={{
            position: 'absolute',
            left: -24,
            right: -24,
            bottom: -116,
            height: 258,
            borderTopLeftRadius: 88,
            borderTopRightRadius: 88,
            backgroundColor: palette.glass,
            boxShadow: '0 -18px 44px rgba(56, 63, 81, 0.06)',
          }}
        />
      </View>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Math.max(insets.top, 24) + 28,
          paddingBottom: Math.max(insets.bottom, 24) + 28,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ alignItems: 'center', marginBottom: 44 }}>
          <View
            style={{
              width: 74,
              height: 74,
              borderRadius: 22,
              borderCurve: 'continuous',
              backgroundColor: palette.primary,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ rotate: '3deg' }],
              boxShadow: '0 12px 24px rgba(178, 35, 18, 0.22)',
            }}
          >
            <Ionicons name="restaurant" color={palette.white} size={40} />
          </View>

          <Text
            selectable
            style={{
              marginTop: 18,
              color: palette.primary,
              fontFamily: 'Inter_900Black',
              fontSize: 48,
              lineHeight: 56,
            }}
          >
            krave
          </Text>
          <Text
            selectable
            style={{
              color: palette.brown,
              fontFamily: 'Inter_500Medium',
              fontSize: 22,
              lineHeight: 30,
            }}
          >
            Welcome back
          </Text>
        </View>

        <View style={{ gap: 20 }}>
          <LoginField
            icon="mail-outline"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="chef@kraveapp.com"
            textContentType="emailAddress"
            value={email}
          />

          <LoginField
            icon="lock-closed-outline"
            label="Password"
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!isPasswordVisible}
            textContentType="password"
            value={password}
            trailing={
              <Pressable
                accessibilityLabel={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  color={palette.brown}
                  size={25}
                />
              </Pressable>
            }
          />
        </View>

        <Pressable
          style={{ alignSelf: 'flex-end', marginTop: 20 }}
          hitSlop={8}
        >
          <Text
            selectable
            style={{
              color: palette.sage,
              fontFamily: 'Inter_700Bold',
              fontSize: 18,
              lineHeight: 24,
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>

        <Pressable
          onPress={authContext.logIn}
          style={({ pressed }) => ({
            height: 94,
            borderRadius: 22,
            borderCurve: 'continuous',
            backgroundColor: palette.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 34,
            transform: [{ scale: pressed ? 0.98 : 1 }],
            boxShadow: '0 10px 22px rgba(56, 63, 81, 0.12)',
          })}
        >
          <Text
            selectable
            style={{
              color: palette.white,
              fontFamily: 'Inter_700Bold',
              fontSize: 34,
              lineHeight: 40,
            }}
          >
            Log In
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 24,
            marginTop: 48,
            marginBottom: 34,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: palette.outline }} />
          <Text
            selectable
            style={{
              color: palette.brown,
              fontFamily: 'Inter_400Regular',
              fontSize: 16,
            }}
          >
            Or continue with
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: palette.outline }} />
        </View>

        <View style={{ gap: 24 }}>
          <AuthButton
            icon={
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: '#050914',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  selectable
                  style={{
                    color: '#4285F4',
                    fontFamily: 'Inter_700Bold',
                    fontSize: 13,
                  }}
                >
                  G
                </Text>
              </View>
            }
            label="Continue with Google"
            variant="light"
          />
          <AuthButton
            icon={
              <Text
                selectable
                style={{
                  color: palette.white,
                  fontFamily: 'Inter_900Black',
                  fontSize: 18,
                }}
              >
                iOS
              </Text>
            }
            label="Continue with Apple"
            variant="dark"
          />
        </View>

        <View style={{ flex: 1, minHeight: 194 }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            paddingBottom: 8,
          }}
        >
          <Text
            selectable
            style={{
              color: palette.brown,
              fontFamily: 'Inter_400Regular',
              fontSize: 18,
              lineHeight: 24,
            }}
          >
            {"Don't have an account?"}
          </Text>
          <Pressable hitSlop={8}>
            <Text
              selectable
              style={{
                color: palette.primary,
                fontFamily: 'Inter_700Bold',
                fontSize: 18,
                lineHeight: 24,
              }}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function LoginField({
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
  textContentType?: 'emailAddress' | 'password';
  trailing?: React.ReactNode;
  value: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text
        selectable
        style={{
          color: '#000000',
          fontFamily: 'Inter_700Bold',
          fontSize: 20,
          lineHeight: 26,
          paddingLeft: 6,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          minHeight: 84,
          borderRadius: 16,
          borderCurve: 'continuous',
          backgroundColor: palette.white,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 24,
          paddingRight: trailing ? 12 : 24,
          gap: 18,
          boxShadow: '0 4px 20px rgba(56, 63, 81, 0.05)',
        }}
      >
        <Ionicons name={icon} color={palette.brown} size={30} />
        <TextInput
          autoCapitalize="none"
          autoComplete={textContentType === 'emailAddress' ? 'email' : 'password'}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={palette.mutedBrown}
          secureTextEntry={secureTextEntry}
          style={{
            flex: 1,
            color: palette.brown,
            fontFamily: 'Inter_500Medium',
            fontSize: 24,
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

function AuthButton({
  icon,
  label,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  variant: 'dark' | 'light';
}) {
  const isDark = variant === 'dark';

  return (
    <Pressable
      style={({ pressed }) => ({
        height: 84,
        borderRadius: 18,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: isDark ? palette.navy : palette.outline,
        backgroundColor: isDark ? palette.navy : palette.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      {icon}
      <Text
        selectable
        style={{
          color: isDark ? palette.white : palette.text,
          fontFamily: 'Inter_700Bold',
          fontSize: 20,
          lineHeight: 26,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function RadarAccent() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 116,
        right: -42,
        width: 228,
        height: 228,
        opacity: 0.12,
        transform: [{ rotate: '12deg' }],
      }}
    >
      {[216, 150, 84].map((size) => (
        <View
          key={size}
          style={{
            position: 'absolute',
            left: (228 - size) / 2,
            top: (228 - size) / 2,
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1,
            borderColor: palette.navy,
          }}
        />
      ))}
      <View
        style={{
          position: 'absolute',
          left: 76,
          top: 12,
          width: 76,
          height: 170,
          backgroundColor: palette.primaryBright,
          opacity: 0.14,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 109,
          top: 14,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: palette.navy,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: 24,
          top: 156,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: palette.navy,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 24,
          top: 156,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: palette.navy,
        }}
      />
    </View>
  );
}

function DotPattern() {
  const dots = Array.from({ length: 96 }, (_, index) => index);

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        inset: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 23,
        padding: 3,
        opacity: 0.035,
      }}
    >
      {dots.map((dot) => (
        <View
          key={dot}
          style={{
            width: 1,
            height: 1,
            borderRadius: 0.5,
            backgroundColor: palette.primaryBright,
          }}
        />
      ))}
    </View>
  );
}
