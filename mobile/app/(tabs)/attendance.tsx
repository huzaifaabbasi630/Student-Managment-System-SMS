import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

export default function AttendanceScreen() {
  const attendanceData = [
    { id: '1', date: '2026-04-14', status: 'Present' },
    { id: '2', date: '2026-04-13', status: 'Present' },
    { id: '3', date: '2026-04-12', status: 'Absent' },
    { id: '4', date: '2026-04-11', status: 'Present' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance History</Text>
      <FlatList
        data={attendanceData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={[styles.status, { color: item.status === 'Present' ? '#10b981' : '#ef4444' }]}>
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  date: { fontSize: 16, color: '#1e293b' },
  status: { fontSize: 16, fontWeight: 'bold' },
});
