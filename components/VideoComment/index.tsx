import React, {useEffect, useState} from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Comment, User } from '../../src/models';
import {DataStore} from 'aws-amplify';



interface VideoCommentProps {
    comment: Comment;
}

const VideoComment = ({comment}: VideoCommentProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      DataStore.query(User, comment.userID as string).then(setUser);
    }, []);



    return (
        <View style={{flexDirection:'column',borderBottomWidth:0.5,  borderColor:'#3b3b3b', }}>
                <View style={{flexDirection:'row',alignItems:'center', marginVertical: 10,marginLeft:10,}}>
                    <Image style={{width: 35,height:35,borderRadius:20}} source={{ uri: user?.image}} />
                    <View style={{}}>
                        <Text style={{fontSize:18,marginLeft:10,color:'#858585',}}>{user?.name}</Text>
                        <Text style={{fontSize:18,marginLeft:20,color:'#ffffff',marginRight:80}}>{comment.comment}</Text>
                    </View>
                    
                    
                </View>
                
                <View style={{flexDirection:'row',marginLeft:30,}}>
                    <Pressable style={{flexDirection:'row'}} onPress={() => console.warn('likes')}>
                        <AntDesign name="like1" size={16} color="#ffffff" style={{marginLeft:35,marginBottom:10}}/> 
                        <Text style={{fontSize:12,marginLeft:5,color:'#ffffff'}}>{comment.likes}</Text>  
                    </Pressable>
                    <Pressable style={{flexDirection:'row'}} onPress={() => console.warn('dislikes')}>
                        <AntDesign name="dislike2" size={16} color="#ffffff" style={{marginLeft:45,marginBottom:10}}/>
                        <Text style={{fontSize:12,marginLeft:5,color:'#ffffff'}}>{comment.dislikes}</Text>
                    </Pressable>
                    <Pressable style={{flexDirection:'row'}} onPress={() => console.warn('reply')}>
                        <MaterialCommunityIcons name="comment-text-outline" size={16} color="#ffffff" style={{marginLeft:55,marginBottom:10}} /> 
                        <Text style={{fontSize:12,marginLeft:5,color:'#ffffff'}}>{comment.replies}</Text>  
                    </Pressable>
                    <Pressable onPress={() => console.warn('menu')}>
                        <MaterialCommunityIcons name="dots-vertical" size={16} color="#ffffff" style={{marginLeft:100,marginBottom:10}} />
                    </Pressable>
                    
                </View>
                
               
                
              </View>
    )
}

export default VideoComment;
