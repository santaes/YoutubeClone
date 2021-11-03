import React, {useRef, useState, useEffect} from 'react';
import { 
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    FlatList,
    Pressable,
    ActivityIndicator,
     
} from 'react-native';
import  {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';
import styles from './styles';


import videos from '../../assets/data/videos.json';
import { DataStore, Storage } from 'aws-amplify';

import VideoListItem from '../../components/VideoListItem';
import { AntDesign } from '@expo/vector-icons';
import VideoPlayer from '../../components/VideoPlayer';
import VideoComments from '../../components/VideoComments';

import VideoComment from '../../components/VideoComment';
import { Video, Comment } from '../../src/models';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

const VideoScreen = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [video, setVideo] = useState<Video  | undefined>(undefined);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const route = useRoute();
    const videoId = route.params?.id;

    useEffect(() => {
       DataStore.query(Video, videoId).then(setVideo);


    }, [videoId]);

    useEffect(() => {
        if (!video) {
            return;
        }
        if (video?.videoUrl.startsWith('http')) {
          setVideoUrl(video.videoUrl);
        } else {
          Storage.get(video.videoUrl).then(setVideoUrl);
        }
        
            if (video.thumbnail.startsWith('http')) {
              setImage(video.thumbnail);
            } else {
              Storage.get(video.thumbnail).then(setImage);
            }
            
          }, [video]);
        
      

    useEffect(() => {

        const fetchComments = async () => {
            if (!video) {return}
            const videoComments =(await DataStore.query(Comment))
            .filter(comment => comment.videoID === video.id);
            setComments(videoComments);
            
        }
        fetchComments();
        
    }, [video]);



    const commentsSheetRef = useRef<BottomSheetModal>(null);



      const openComments = () =>{
        commentsSheetRef.current?.present(); 

      };

      if (!video) {
          return <ActivityIndicator/>
      };
      

      let viewString = video.views.toString();
      if (video.views > 1000000){
          viewString = (video.views / 1000000).toFixed(1) + 'm'
      } else if (video.views > 1000) {
          viewString = (video.views / 1000).toFixed(1) + 'k'
      };

    return (
        <View style={{flex:1}}>

            {/* Video Player */}
            <VideoPlayer videoURI={videoUrl} thumbnailURI={video.thumbnail}/>
            <View style={{flex:1}}>
            


            {/* Video Info */}
            <View style={styles.videoInfoContainer}>
                  <Text style={styles.tags}>{video.tags}</Text>
                  <Text style={styles.title}>{video.title}</Text>
                  <Text style={styles.subtitle}>{video.User?.name} {viewString} {moment(video.createdAt).fromNow()}</Text>

                 </View>


             {/* Action List */}
             <View style={styles.actionListContainer}>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                 <View style={styles.actionListItem}>
                     <AntDesign name="like1" size={24} color="white" />
                     <Text style={styles.actionText}>{video.likes}</Text>

                 </View>

                 <View style={styles.actionListItem}>
                     <AntDesign name="dislike2" size={24} color="white" />
                     <Text style={styles.actionText}>{video.dislikes}</Text>

                 </View>

                 <View style={styles.actionListItem}>
                     <AntDesign name="wechat" size={24} color="white" />
                     <Text style={styles.actionText}>{video.dislikes}</Text>

                 </View>
                 <View style={styles.actionListItem}>
                     <AntDesign name="download" size={24} color="white" />
                     <Text style={styles.actionText}>{video.dislikes}</Text>

                 </View>
                 <View style={styles.actionListItem}>
                     <AntDesign name="info" size={24} color="white" />
                     <Text style={styles.actionText}>{video.dislikes}</Text>

                 </View>
                 <View style={styles.actionListItem}>
                     <AntDesign name="bars" size={24} color="white" />
                     <Text style={styles.actionText}>{video.dislikes}</Text>

                 </View>
             </ScrollView>
             </View>

            {/* User Info */}
            <View style={{flexDirection:'row',alignItems:'center', padding: 10,borderColor:'#3b3b3b',borderTopWidth:0.5,borderBottomWidth:0.5}}>
                <Image style={styles.avatar} source={{ uri: video.User?.image}} />

                <View style={{marginHorizontal:10, flex:1}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color:'white'}}>{video.User?.name}</Text>
                    <Text style={{color: 'gray',fontSize:18}}>{video.User?.subscribers} Subscribers</Text>
                </View>
                <Pressable onPress={() => console.warn('subscribe')}>
                <Text style={{color:'#f73e0f',fontSize:18,fontWeight:'500',padding:10,left:10,}}>SUBSCRIBE</Text>
                </Pressable>
            </View>


            {/* Comments */}
            <Pressable onPress={openComments} style={{padding:5,}}>
            <Text style={{color:'white',}}>Comments 333</Text>
            {comments.length > 0 && <VideoComment comment={comments[0]} /> }

            </Pressable>

            {/* all comments*/}
            <BottomSheetModal 
                ref={commentsSheetRef} 
                snapPoints={['70%']} 
                index={0}
                backgroundComponent={({style}) => <View style={[style, {backgroundColor:'#6a6a6a'}]}/>}
            >
            <VideoComments comments={comments} videoID={video.id}/>
            </BottomSheetModal>
        </View>        
            
        </View>
    )
};
const VideoScreenWithRecommendation = () => {
    return (
        <SafeAreaView style={{backgroundColor:'#141414', flex:1, }}>
            <BottomSheetModalProvider>
              <FlatList
                data={videos}
                renderItem={({item})=> <VideoListItem video={item}/>}
                ListHeaderComponent={VideoScreen}
              />  
            </BottomSheetModalProvider>
            
            </SafeAreaView>
    )
}

export default VideoScreenWithRecommendation;
