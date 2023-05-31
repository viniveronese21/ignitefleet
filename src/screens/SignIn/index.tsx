import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { Container, Slogan, Title } from "./styles";

import Background from "../../assets/background.png";

import { Button } from "../../components/Button";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [_, response, googleSignin] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  function handleGoogleSign() {
    setIsAuthenticating(true);

    googleSignin().then((response) => {
      if (response.type !== "success") {
        setIsAuthenticating(false);
      }
    });
  }

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication?.idToken) {
      } else {
        Alert.alert(
          "Entrar",
          "Não foi possivel conectar-se a sua conta Google!"
        );
        setIsAuthenticating(false);
      }
    }
  }, [response]);

  return (
    <Container source={Background}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veiculos</Slogan>
      <Button
        title="Entrar com Google"
        onPress={handleGoogleSign}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}
