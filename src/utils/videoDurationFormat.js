
function videoDurationFormat(seconds){
    const hours = Math.floor(seconds/3600);
    const minutes = Math.floor((seconds%3600)/60);
    const secs = (seconds%3600)%60;

    return (hours > 0 ? (minutes < 10 ? hours + ":0" : hours + ":") : "") + minutes + ":" + (secs < 10 ? `0${secs}` : Math.round(secs))  
}

export default videoDurationFormat;