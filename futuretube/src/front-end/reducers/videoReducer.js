const initialState = {
    allVideos:[],
    videoDetails:[],
    videoIdSelected:"",
}

const videosReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_VIDEOS":
            const videoList = action.payload.allVideos;
            return {...state, allVideos: videoList}   
        
        case "SET_VIDEO_DETAILS":
             const video = action.payload.videoDetails;
             return {...state, videoDetails: video}   
             
        case "SET_VIDEO_ID":
            const videoId = action.payload.videoIdSelected;
            return {...state, videoIdSelected: videoId}
            
        case "REMOVE_VIDEO":
             return state;

            default:
            return state;
    }
}

export default videosReducer    