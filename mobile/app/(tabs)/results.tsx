import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

export default function ResultsScreen() {
  const resultsData = [
    { id: '1', subject: 'Mathematics', marks: '85/100', grade: 'A' },
    { id: '2', subject: 'Physics', marks: '78/100', grade: 'B' },
    { id: '3', subject: 'Chemistry', marks: '92/100', grade: 'A+' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exam Results</Text>
      <FlatList
        data={resultsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.marks}>{item.marks}</Text>
            </View>
            <View style={styles.gradeContainer}>
              <Text style={styles.grade}>{item.grade}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  subject: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  marks: { fontSize: 14, color: '#64748b', marginTop: 2 },
  gradeContainer: { backgroundColor: '#eff6ff', padding: 10, borderRadius: 8 },
  grade: { fontSize: 18, fontWeight: 'bold', color: '#2563eb' },
});
