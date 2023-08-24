import {ElMessage} from "element-plus";

export function getImagePath(img){
    return require('@/assets/' + img);
}
export function getAnimationDelay(index){
    const delay = 0.5;
    return `${index * delay}s`;
}

export function checkOnlyEngAndNumber(str){
    if (/^[a-zA-Z0-9]+$/.test(str)){
        return true
    }else {
        ElMessage.error("只能包含英文和数字")
    }
        return false
    }
