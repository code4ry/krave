import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  firebaseAuth,
  firestoreDb,
  isFirebaseConfigured,
} from '@/utils/firebase';

SplashScreen.preventAutoHideAsync();

type AuthState = {
  errorMessage: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  isReady: boolean;
  user: User | null;
  clearError: () => void;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  signUp: (displayName: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  errorMessage: null,
  isLoading: false,
  isLoggedIn: false,
  isReady: false,
  user: null,
  clearError: () => {},
  logIn: async () => {},
  logOut: async () => {},
  signUp: async () => {},
});

function getAuthErrorMessage(error: unknown) {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return 'Something went wrong. Please try again.';
  }

  const code = String(error.code);

  if (code.includes('invalid-email')) return 'Enter a valid email address.';
  if (code.includes('invalid-credential')) return 'Email or password is incorrect.';
  if (code.includes('email-already-in-use')) return 'That email is already in use.';
  if (code.includes('weak-password')) return 'Use a stronger password.';
  if (code.includes('missing-password')) return 'Enter your password.';
  if (code.includes('network-request-failed')) return 'Check your connection and try again.';

  return 'Authentication failed. Please try again.';
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const clearError = () => setErrorMessage(null);

  const ensureFirebaseReady = () => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      throw new Error(
        'Firebase is missing config. Add EXPO_PUBLIC_FIREBASE_* values.'
      );
    }
  };

  const logIn = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      ensureFirebaseReady();
      await signInWithEmailAndPassword(firebaseAuth!, email.trim(), password);
      router.replace('/');
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message.includes('EXPO_PUBLIC')
          ? error.message
          : getAuthErrorMessage(error)
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      ensureFirebaseReady();
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth!,
        email.trim(),
        password
      );
      const trimmedDisplayName = displayName.trim();

      if (trimmedDisplayName) {
        await updateProfile(credential.user, { displayName: trimmedDisplayName });
      }

      if (firestoreDb) {
        await setDoc(
          doc(firestoreDb, 'users', credential.user.uid),
          {
            displayName: trimmedDisplayName,
            dietaryRestrictions: [],
            email: credential.user.email,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }

      router.replace('/');
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message.includes('EXPO_PUBLIC')
          ? error.message
          : getAuthErrorMessage(error)
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      ensureFirebaseReady();
      await signOut(firebaseAuth!);
      router.replace('/login');
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isFirebaseConfigured || !firebaseAuth) {
      setUser(null);
      setIsReady(true);
      setErrorMessage('Firebase is missing config. Add EXPO_PUBLIC_FIREBASE_* values.');
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
      setIsReady(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        isLoading,
        isLoggedIn: Boolean(user),
        isReady,
        user,
        clearError,
        logIn,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
