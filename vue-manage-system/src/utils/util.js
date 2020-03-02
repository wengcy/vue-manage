import Cookies from 'js-cookie'
import config from '@/config/index'

export let setCookie = (name,value) => {
	Cookies.set(name, value, { expires: 7 });
}
export let getCookie = (name) => {
	return Cookies.get(name)
}
export let removeCookie = (name) => {
	return Cookies.remove(name)
}

export let isUndefined = value => {
	return typeof value == "undefined" ? true : false;
}
export let getWindowSize = () =>{
	let winWidth = 0; 
	let winHeight = 0; 
	
	//获取窗口宽度 
	if(window.innerWidth) {
		winWidth = window.innerWidth; 
	}
	else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth; 
	}

	//获取窗口高度 
	if (window.innerHeight){
		winHeight = window.innerHeight;
	}
	else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight; 
	}
	
	//通过深入Document内部对body进行检测，获取窗口大小 
	if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) { 
		winHeight = document.documentElement.clientHeight; 
		winWidth = document.documentElement.clientWidth; 
	}
	
	return {width:winWidth, height:winHeight}
}

export const getJoinUrl = ((params = {}) =>{
    let url = "";
    let len = Object.keys(params).length;
    if(len){
        url="?"
        for (let i in params) {
            url+=i +"="+params[i]+"&"
        }
        url = url.substring(0, url.length -1);
    }
    return url;

})
export const getReportUrl = (params = {}) => {
    let url = config.reportUrl;
    url += getJoinUrl(params);
    return url;
}