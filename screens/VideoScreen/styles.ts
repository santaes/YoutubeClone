import{StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    videoPlayer: {
        width: '100%',
        aspectRatio: 16/9,
    },
    title:{
        color:'white',
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 10,


    },
    tags:{
        color:'white',
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 5,


    },
    subtitle:{
        color:'grey',
        fontSize: 14,
        fontWeight: "500",

    },

    videoInfoContainer:{
        margin: 10,
        


    },
    actionListContainer:{
        
        marginVertical: 10,

    },
    actionText:{
        color: 'white',
    },
    actionListItem:{
        justifyContent:'space-around',
        alignItems:'center',
        width: 70,
        height: 60,
        

    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 25,
    }

});

export default styles;