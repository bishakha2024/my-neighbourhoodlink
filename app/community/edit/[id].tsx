import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../../../src/components/Screen';
import { AppHeader } from '../../../src/components/AppHeader';
import { useData } from '../../../src/context/DataContext';
import { useAuth } from '../../../src/context/AuthContext';
import { colors } from '../../../src/theme/colors';
import type { CommunityPost } from '../../../src/types';

export default function EditCommunityPost() {
 const { id } = useLocalSearchParams<{id:string}>();
 const { posts, loading } = useData();
 const { user } = useAuth();
 const post = posts.find(item => item.id === id);
 if (loading) return <Screen><AppHeader title="Edit post" back /><Text>Loading your post…</Text></Screen>;
 if (!post || post.userId !== user?.id) return <Screen><AppHeader title="Edit post" back /><Text>This post is unavailable or you do not have permission to edit it.</Text></Screen>;
 return <Editor key={post.id} post={post} />;
}
function Editor({post}:{post:CommunityPost}) {
 const { updatePost, posts } = useData();
 const [title,setTitle]=useState(post.title);
 const [content,setContent]=useState(post.content);
 const [saving,setSaving]=useState(false);
 const [error,setError]=useState('');
 const dirty=title!==post.title || content!==post.content;
 const save=async()=>{
  if(saving) return;
  if(!title.trim() || !content.trim()){setError('Please enter a title and message before saving.');return;}
  setSaving(true);setError('');
  try {
   const latest=posts.find(item=>item.id===post.id);
   if(!latest) throw new Error('This post is no longer available.');
   await updatePost({...latest,title:title.trim(),content:content.trim()});
   router.back();
  }catch(e:any){setError(e.message || 'Could not save your changes. Please try again.');}
  finally{setSaving(false);}
 };
 const cancel=()=>{
  if(!dirty){router.back();return;}
  Alert.alert('Discard changes?', 'Your unsaved edits will be lost.',[{text:'Keep editing',style:'cancel'},{text:'Discard',style:'destructive',onPress:()=>router.back()}]);
 };
 return <Screen><AppHeader title="Edit community post" />
  <Text style={styles.intro}>Update your announcement</Text>
  <Text style={styles.helper}>Make a correction or share new details. Your existing likes and comments stay with this post.</Text>
  <View style={styles.form}>
   <Text style={styles.label}>Title</Text>
   <TextInput accessibilityLabel="Post title" inputAccessoryViewID="screen-keyboard-toolbar" editable={!saving} value={title} onChangeText={setTitle} placeholder="Give your post a clear title" style={styles.input} />
   <Text style={styles.label}>Message</Text>
   <TextInput accessibilityLabel="Post message" inputAccessoryViewID="screen-keyboard-toolbar" editable={!saving} value={content} onChangeText={setContent} placeholder="What would you like your neighbours to know?" multiline style={[styles.input,styles.message]} />
   <Text style={styles.meta}>Neighbourhood: {post.location}</Text>
  </View>
  {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
  <Pressable accessibilityRole="button" accessibilityState={{disabled:saving || !dirty}} disabled={saving || !dirty} onPress={save} style={[styles.save,(saving || !dirty)&&{opacity:.5}]}><Text style={styles.saveText}>{saving?'Saving changes…':'Save changes'}</Text></Pressable>
  <Pressable accessibilityRole="button" disabled={saving} onPress={cancel} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
 </Screen>;
}
const styles=StyleSheet.create({intro:{fontSize:23,fontWeight:'900',color:colors.ink},helper:{color:colors.muted,lineHeight:21},form:{backgroundColor:colors.card,padding:18,borderRadius:18,borderWidth:1,borderColor:colors.line,gap:12},label:{fontSize:13,fontWeight:'800',color:colors.ink},input:{borderWidth:1,borderColor:colors.line,borderRadius:12,padding:14,color:colors.ink,backgroundColor:colors.background,fontSize:15},message:{minHeight:180,textAlignVertical:'top',lineHeight:22},meta:{fontSize:12,color:colors.muted},error:{color:colors.danger,lineHeight:20},save:{backgroundColor:colors.primary,padding:16,borderRadius:14,alignItems:'center'},saveText:{color:colors.white,fontWeight:'800'},cancel:{padding:15,alignItems:'center',borderWidth:1,borderColor:colors.line,borderRadius:14},cancelText:{color:colors.ink,fontWeight:'700'}});
