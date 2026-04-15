import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function FeesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fee Status</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Total Pending</Text>
        <Text style={styles.amount}>$1,200.00</Text>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Tuition Fee</Text>
          <Text style={styles.rowValue}>$800.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Library Fee</Text>
          <Text style={styles.rowValue}>$200.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Transport Fee</Text>
          <Text style={styles.rowValue}>$200.00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  label: { fontSize: 14, color: '#64748b' },
  amount: { fontSize: 32, fontWeight: 'bold', color: '#1e293b', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel: { fontSize: 14, color: '#64748b' },
  rowValue: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },
  payButton: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
