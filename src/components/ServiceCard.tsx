import React from 'react';
import { router } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Service } from '../types';
import { colors } from '../theme/colors';
import { SaveButton } from './SaveButton';
export function ServiceCard({ service }: { service: Service }) {
  return <Pressable onPress={() => router.push({ pathname: '/services/[id]', params: { id: service.id } })} style={styles.serviceCard}>
    <View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{service.category === 'Pets' ? '🐾' : service.category === 'Education' ? '📚' : '🌿'}</Text></View>
    <View style={{ flex: 1, gap: 4 }}><Text style={styles.serviceTitle}>{service.serviceName}</Text><Text style={styles.serviceProvider}>{service.providerName} • {service.rating > 0 ? `⭐ ${service.rating.toFixed(1)}` : 'New provider'}</Text><Text style={styles.serviceBody}>{service.description}</Text><Text style={styles.serviceMeta}>{service.availability} • ${service.price}/session</Text><SaveButton kind="service" id={service.id} /></View>
  </Pressable>;
}

const styles = StyleSheet.create({ add: { backgroundColor: colors.primarySoft, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10 }, serviceCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 15, flexDirection: 'row', gap: 13 }, serviceIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, serviceIconText: { fontSize: 22 }, serviceTitle: { fontSize: 16, fontWeight: '900', color: colors.ink }, serviceProvider: { color: colors.primary, fontWeight: '800', fontSize: 12 }, serviceBody: { color: colors.muted, lineHeight: 18 }, serviceMeta: { color: colors.ink, fontSize: 12, fontWeight: '700' }, addText: { color: colors.primaryDark, fontWeight: '900', fontSize: 12 }, search: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, color: colors.ink }, chips: { gap: 8, paddingRight: 10 }, result: { fontSize: 12, color: colors.muted, fontWeight: '700' }, empty: { alignItems: 'center', padding: 45, gap: 8 }, emptyEmoji: { fontSize: 40 }, emptyTitle: { fontSize: 19, fontWeight: '900', color: colors.ink }, emptyBody: { textAlign: 'center', color: colors.muted } });
