import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, FlatList, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { deleteData, getData } from "../../utils/storage";
import { authorizedAPI } from "../../utils/api";
import { useLinkTo } from "@react-navigation/native";

const Dashboard = () => {
  const pageRef = useRef<PagerView | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [page, setPage] = useState<{ fields: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const linkTo = useLinkTo();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 0 && pageNumber <= 2) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await authorizedAPI.get("/dashboard");
        setPage(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getData("user");
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const goToNextPage = () => {
    if (currentPage < 2) {
      handlePageChange(currentPage + 1);
      pageRef.current?.setPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
      pageRef.current?.setPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hello, {user?.name} 🌿</Text>
        <Pressable onPress={()=>{
          deleteData("token")
          deleteData("token2")
          deleteData("user")
        }} style={styles.settingsButton}>
          <Ionicons name="settings" size={28} color="#0DFF4D" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: 20,
    backgroundColor: "#F5FDFB",
    height: "100%",
  },
  container: {
    // height: "15vh",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    color: "#111111",
    fontSize: 21,
    maxWidth: "70%",
    fontWeight: "bold",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#F3F9F6",
  },
});

export default Dashboard;
