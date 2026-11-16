import React from 'react';
import { Alert, Pressable, Text } from 'react-native';
import { useData } from '../context/DataContext';
import { colors } from '../theme/colors';
export function SaveButton({ kind, id }: { kind: 'listing' | 'service'; id: string }) {
 const { savedKeys, toggleSaved } = useData();
 const saved = savedKeys.includes(`${kind}:${id}`);
 return <Pressable accessibilityRole="button" accessibilityLabel={saved ? 'Remove from saved listings' : 'Save for later'} accessibilityState={{ selected: saved }} onPress={event => { event.stopPropagation(); try { toggleSaved(kind, id); } catch(error: any) { Alert.alert('Could not save', error.message); } }} style={{padding:12, alignSelf:'flex-start'}}><Text style={{color:colors.primary,fontWeight:'800'}}>{saved ? '★ Saved' : '☆ Save'}</Text></Pressable>;
}
