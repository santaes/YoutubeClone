import React, {useState, useEffect} from 'react';
import {View,Text,Image,Pressable} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import { Video } from '../../src/models';
import moment from 'moment';
import {Storage, Analytics} from 'aws-amplify';


type VideoListItemProps = {
        video: Video
}
const VideoListItem = (props: VideoListItemProps)=> {
    const {video} = props;
    const [image, setImage] = useState<string | null>(null);

    const navigation = useNavigation();

    useEffect(() => {
      if (video.thumbnail.startsWith('http')) {
        setImage(video.thumbnail);
      } else {
        Storage.get(video.thumbnail).then(setImage);
      }
      
    }, [video]);

    const minutes = Math.floor(video.duration / 60);
    const seconds = video.duration % 60;

    let viewString = video.views.toString();
      if (video.views > 1000000){
          viewString = (video.views / 1000000).toFixed(1) + 'm'
      } else if (video.views > 1000) {
          viewString = (video.views / 1000).toFixed(1) + 'k'
      };
      
      const openVideoPage = () => {
        Analytics.record({name: "VideoListItemClick"});
        navigation.navigate('VideoScreen',{ id: video.id}) ;

      };
    

    return( 
            <Pressable onPress={openVideoPage} style={styles.videoCard} >
              {/* Tumbnail*/}
            <View>
            <Image style={styles.thumbnail} source={{uri: image || ""}}/>
             <View style={styles.timeContainer}>
              <Text style={styles.time}>{minutes}:{seconds  < 10 ? '0' : ''}{seconds}</Text>            
             </View>
            </View>
             {/* Title row*/}
             <View style={styles.titleRow}>
                 {/*Avatar*/}
                 <Image style={styles.avatar} source={{uri:video.User?.image}}/>

                 {/* Middle container: Title, Subtitle, etc.*/}
                 <View style={styles.midleContainer}>
                  <Text style={styles.title}>{video.title}</Text>
                  <Text style={styles.subtitle}>{video.User?.name || 'no name'} {viewString} {moment(video.createdAt).fromNow()}</Text>

                 </View>

                 {/*Icon*/}
                 <Entypo name="dots-three-vertical" size={16} color="white" />
             </View>
        </Pressable>           
    )
}

export default VideoListItem;
