import React, {useState, useEffect} from 'react';
import{View,StyleSheet,FlatList} from 'react-native';
import VideoListItem from '../components/VideoListItem';
import { DataStore } from 'aws-amplify';
import { Video } from '../src/models';


const HomeScreen = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        // fetch videos

        
        DataStore.query(Video).then(setVideos)
       
    }, [])


    return(
        <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={videos}
              renderItem={({item})=> <VideoListItem video={item}/>}
            />    
        </View>             
    )
}
const styles = StyleSheet.create({
    
});

export default HomeScreen;
