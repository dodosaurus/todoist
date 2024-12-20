import { Colors } from "@/constants/Colors";
import { tokenCache } from "@/utils/cache";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const IntialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const pathName = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    console.log("segements", segments);
    console.log("pathName", pathName);

    const inAuthGroup = segments[0] === "(authenticated)";

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/today");
    } else if (!isSignedIn && pathName === "/") {
      router.replace("/");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <IntialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
