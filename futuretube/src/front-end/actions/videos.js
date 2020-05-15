import axios from 'axios';
import "firebase/firestore"

const baseURL = "https://us-central1-futuretube-projeto.cloudfunctions.net/futureTube"

export const setVideos = (allVideos) => ({
    type: "SET_VIDEOS",
    payload: {
        allVideos,
    }
})

export const getVideos = () => async (dispatch) => { 
    try {
        const response = await axios.get(`${baseURL}/getVideos`)
        dispatch(setVideos(response.data.videos.videos));

    } catch (error) {
        window.alert("erro")
    }
}

export const sendVideos = (url,title,description) => async (dispatch) => {
    const videoInformation = {
        url,
        title,
        description,
    }

    try{
        await axios.post(`${baseURL}/sendVideos`, videoInformation)
        dispatch(getVideos())
    }catch (err){
        window.alert("erro ao enviar videos")
    }
}

export const setRemoveVideo = (videoId) => ({
    type:"REMOVE_VIDEO",
    payload: {
        videoId,
    }
})

export const deleteVideo = (videoId) => async(dispatch) =>{
    try{
        await axios.delete(`${baseURL}/deleteVideo/${videoId}`)
        dispatch(getVideos())
    }catch(err){
        window.alert("erro ao deletar o video")
    } 
}

export const setVideoDetails = (videoDetails) =>({
    type: "SET_VIDEO_DETAILS",
    payload: {
        videoDetails,
    }
})

export const getVideosDetails = (videoId) => async (dispatch) => {   
    try {
        const response = await axios.get(`${baseURL}/videosDetails/${videoId}`)
        dispatch(setVideoDetails(response.data.videosDetails));
    } catch (error) {
        window.alert("erro")
    }
}

export const setVideoIdSelected = (videoIdSelected) => ({
    type: "SET_VIDEO_ID",
    payload: {
        videoIdSelected
    }
})

export const editVideo = (title,description,videoId) => async(dispatch)=>{
    const videoInformation = {
        title,
        description,
    }
    console.log("testando action change video", videoInformation)
    try{
        await axios.put(`${baseURL}/changeVideos/${videoId}`, videoInformation)
        dispatch(getVideos())
    }catch{
        window.alert("erro ao editar video")
    }
}  
