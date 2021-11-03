import React, {useState} from 'react'
import { View, Text, TextInput, Pressable, Dimensions } from 'react-native'
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import VideoComment from '../VideoComment';
import { Ionicons } from '@expo/vector-icons';
import { DataStore, Auth } from 'aws-amplify';
import { Comment, User } from '../../src/models';
// Add this line to your `index.js`
import 'react-native-get-random-values'


interface VideoCommentsProps {
    comments : Comment[];
    videoID: string;
}


const VideoComments = ({comments, videoID} : VideoCommentsProps) => {
    const [newComment, setNewComment] = useState('');
    

    const sendComment = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userSub = userInfo.attributes.sub;
        const user = (await DataStore.query(User)).find(user => user.sub === userSub);
        if (!user) {
            console.error("User not found");
            return;
        } else if  (!newComment.trim()) {
            
            return;
          }

        await  DataStore.save(new Comment({
          comment: newComment,
          likes: 0,
          dislikes:0,
          replies: 0,
          videoID,
          userID: user.id,

        }));
        setNewComment("");
    
    };


    return (
        <View style={{backgroundColor: '#141414', flex: 1}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <TextInput
                    placeholder=" comment this video "
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholderTextColor="#858585"
                    style={{backgroundColor:"#313131",padding:10,color:'#ffffff', width: Dimensions.get('screen').width,}}
                    returnKeyType='done'
                    
                />
                <Ionicons name="ios-send-outline" size={24} color="#ffffff" onPress={sendComment} style={{position:'absolute',right:10,}} />
            
            </View>
            
            <BottomSheetFlatList
             data={comments} 
             renderItem={({item}) => <VideoComment  comment={item}/>}
             style={{backgroundColor:'#141414',borderBottomWidth:0.5,borderBottomColor:'#3b3b3b'}}
            
            /> 
            
        </View>
    )
}

export default VideoComments;
