import {ElMessage} from "element-plus";

export function buildQueryURL(endpoint, params) {
    let url = endpoint + '?';
    const keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = params[key];
        url += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        if (i !== keys.length - 1) {
            url += '&';
        }
    }
    return url;
}
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

export function getDisabledDate(date,validDates){
    return !validDates.value.includes(getGMTTimeToStrISO8601(date));
}

export function getGMTTimeToStrISO8601(date){
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}

export function checkMeteoElementsNotNull(val,number){
    const chineseNumerals = {
        1: '一',
        2: '两',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八'
    }
    ElMessage.warning("必须选择"+chineseNumerals[number]+"个气象要素")
    return [val]
}

export function extractLabels(valuesArray, originalArray) {
    let labels = [];
    valuesArray.forEach(function(value) {
        let item = originalArray.find(function(obj) {
            return obj.value === value;
        });
        if (item) {
            labels.push(item.label);
        }
    });
    labels.unshift("采集时间")
    return labels;
}

export function convertToObjectArrayFrom2DArray(Array2D, labelArray) {
    let objectsArray = [];
    Array2D.forEach(function(data) {
        let object = {};
        data.forEach(function(value, index) {
            let label = labelArray[index];
            object[label] = value;
        });
        objectsArray.push(object);
    });
    return objectsArray;
}

export function getPageData(tableData,total){
    return {
        size:tableData.value.length,
        count:String(Math.round(total.value/10))
    }
}

export function notEmptyValues(obj) {
    return Object.keys(obj).every(key => {
        const value = obj[key];
        return value !== null && value !== undefined && value !== '';
    });
}

export function getFutureDates(startDate, numDays) {
    const futureDates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < numDays; i++) {
        const futureDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
        const year = futureDate.getFullYear();
        const month = String(futureDate.getMonth() + 1).padStart(2, '0');
        const day = String(futureDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        futureDates.push(dateString);
    }

    return futureDates;
}

export function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
