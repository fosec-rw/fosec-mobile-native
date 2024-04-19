import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useForm, Controller, SubmitErrorHandler } from "react-hook-form";
import { useLinkTo } from "@react-navigation/native";
import BackPageButton from "../../../components/buttons/backPageButton";
import ButtonTwo from "../../../components/buttons/buttonTwo";
import axios from "axios";
import { storeData } from "../../../utils/storage";
import { unauthorizedAPI } from "../../../utils/api";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
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
    // setLoading(true);
    // try {
    //   const response = await unauthorizedAPI.post(`/auth/register`, data);
    //   const { access_token, refresh_token, user } = response.data;
    //   await Promise.all([
    //     storeData("token", access_token),
    //     storeData("token2", refresh_token),
    //     storeData("user", user),
    //   ]);
    //   linkTo("/addaddress");
    // } catch (error) {
    //   console.error("Error posting data:", error);
    // }
    // setLoading(false);
    console.log("Clicked")
    linkTo("/project")
  };

  const onError: SubmitErrorHandler<FormData> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        style={styles.imageBackground}
        source={require("../../../assets/authBg.png")}
      />
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={styles.headerContainer}>
        <BackPageButton />
        <Text style={styles.headerText}>Create Account</Text>
      </View>
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.pageHeader}>Personal Information</Text>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/stepper.png")}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}>Full names</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  placeholder="ex: John Doe"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="name"
              rules={{ required: "You must enter your name" }}
            />
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>E-mail</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  keyboardType="email-address"
                  style={styles.input}
                  placeholder="johndoe@gmail.com"
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
              name="NEXT"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
            />
          </View>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Pressable onPress={() => linkTo("/login")}>
            <Text style={styles.loginLink}>Login</Text>
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
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 40,
    paddingLeft: 20,
    marginBottom:40
  },
  headerText: {
    color: "#fff",
    fontSize: 37,
    marginTop: 20,
    fontWeight: "bold",
  },
  pageHeader: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop:5
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
    color: "#333",
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
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Register;
