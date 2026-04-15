import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.name}>{user?.name}</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Attendance</Text>
          <Text style={styles.statValue}>92%</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>GPA</Text>
          <Text style={styles.statValue}>3.8</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Upcoming Exams</Text>
      <View style={styles.examCard}>
        <Text style={styles.examName}>Mathematics Final</Text>
        <Text style={styles.examDate}>April 25, 2026</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  header: { marginBottom: 30, marginTop: 40 },
  welcome: { fontSize: 16, color: '#64748b' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  statsGrid: { flexDirection: 'row', gap: 15, marginBottom: 30 },
  statCard: { flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  statLabel: { fontSize: 12, color: '#64748b', textTransform: 'uppercase' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#2563eb', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1e293b' },
  examCard: { backgroundColor: '#fff', padding: 20, borderRadius: 15, borderLeftWidth: 4, borderLeftColor: '#2563eb' },
  examName: { fontSize: 16, fontWeight: 'bold' },
  examDate: { fontSize: 14, color: '#64748b', marginTop: 5 },
});
