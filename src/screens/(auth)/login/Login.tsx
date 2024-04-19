import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import BackPageButton from "../../../components/buttons/backPageButton";
import ButtonTwo from "../../../components/buttons/buttonTwo";
import { useLinkTo } from "@react-navigation/native";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { unauthorizedAPI } from "../../../utils/api";
import { storeData } from "../../../utils/storage";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const linkTo = useLinkTo();
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await unauthorizedAPI.post(`/auth/login`, data);
      const { access_token, refresh_token, user } = response.data;
      await Promise.all([
        storeData("token", access_token),
        storeData("token2", refresh_token),
        storeData("user", user),
      ]);
      linkTo("/main");
    } catch (error) {
      console.error("Error posting data:", error);
    }
    setLoading(false);
  };

  const onError: SubmitErrorHandler<FormData> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Image
        style={styles.imageBackground}
        source={require("../../../assets/authBg.png")}
      />
      <View style={styles.headerContainer}>
        <BackPageButton />
        <Text style={styles.headerText}>Welcome Back</Text>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.formField}>
            <Text style={styles.label}>E-mail</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType="email-address"
                  style={styles.input}
                  placeholder="peaceishimwem@gmail.com"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{
                required: "You must enter your email",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              }}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="* * * * * * * * "
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: "You must enter your password" }}
            />
          </View>
          <View style={styles.submitButtonContainer}>
            <ButtonTwo
              name="SIGN In"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </View>
          <View style={styles.socialLoginContainer}>
            <View style={styles.socialLoginDivider} />
            <Text style={styles.socialLoginText}>OR</Text>
            <View style={styles.socialLoginDivider} />
          </View>
          <View style={styles.socialButtonsContainer}>
            <Pressable style={styles.socialButton}>
              <Image
                source={require("../../../assets/googleIcon.png")}
                style={{ width: 25, height: 25 }}
              />
              <Text style={styles.socialButtonText}>Sign in with Google</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Don't have an account?</Text>
          <Pressable onPress={() => linkTo("/register")}>
            <Text style={styles.loginLink}>Signup</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EFFFEF",
  },
  imageBackground: {
    position: "absolute",
    // height: 600,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    paddingTop:40,
    paddingLeft:10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom:30,
  },
  headerText: {
    color: "#fff",
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
  },
  headerSubText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 3,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  agriNexa: {
    color: "#333",
    fontSize: 28,
    fontWeight: "bold",
  },
  formField: {
    marginTop: 20,
  },
  label: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  submitButtonContainer: {
    marginTop: 30,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    margin: 15,
    borderRadius: 15,
  },
  loginText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  loginLink: {
    color: "#34A853",
    fontSize: 18,
    marginLeft: 5,
  },
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  socialLoginDivider: {
    height: 1,
    backgroundColor: "#B3B3B3",
    width: "30%",
  },
  socialLoginText: {
    color: "#333",
    fontSize: 16,
    marginHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  socialButtonText: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Login;
