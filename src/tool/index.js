import axios from "axios";
const checkStatus = async response => {
    if (response.status >= 200 && response.status < 300) {
        return response.data
    } else {
        var error = new Error((response && response.statusText) || 'text')
        error.response = response
        throw error
    }
}
const checkData = async data => {
    let newdata
    if (typeof data == 'string') {
        newdata = JSON.parse(data.substring(data.indexOf('}{') + 1))
    } else {
        newdata = data
    }

    let ResponseStatus = newdata.ResponseStatus
    if (ResponseStatus) {
        if (ResponseStatus && ResponseStatus.Ack && ResponseStatus.Ack == 'Success') {
            return newdata
        } else {
            let error = new Error(
                (Array.isArray(ResponseStatus.Errors) && ResponseStatus.Errors && ResponseStatus.Errors.length > 0 && ResponseStatus.Errors[0] && ResponseStatus.Errors[0].Message) || 'errors'
            )
            return error
        }
    }
}
export async function invoke_post({
    serviceCode = 14966,
    serviceName,
    params = {},
    locale = 'en-US',
    currency = 'USD',
    ENV = "PROD",
}) {
    try {
        let url = `https://www.trip.com/restapi/soa2/${serviceCode}/${serviceName}`;
        if(ENV != "PROD")  url =  `https://www.uat.tripcorp.com/restapi/soa2/${serviceCode}/${serviceName}`;
        let result = await axios({
            withCredentials: true,
            url,
            method: "post",
            data: {
                ...params,
                head: {
                    cver: "3.0",
                    extension: [{
                        name: 'locale',
                        value: locale,
                    }, {
                        name: 'platform',
                        value: 'Online',
                    }, {
                        name: 'currency',
                        value: currency,
                    }]
                }
            },
        }).then(checkStatus).then(checkData)
        return result
    } catch (error) {
        console.error('invoke_post: ', error);
        return {};
    }
    return {};
}

export const handlePicUrl = function (url, width, height, type = 'C', webpType) {
    url += ''
    let imgurlArr = url.split('?')
    let other = (imgurlArr && imgurlArr[1]) || ''
    let urlArray = (imgurlArr && imgurlArr[0] && imgurlArr[0].split('/')) || []
    let lastPath = urlArray.pop() || ''
    let nameArray = lastPath.split('.')
    let path = nameArray[0] + `_${type}_${width}_${height}`
    nameArray[0] = path
    if (webpType) {
        nameArray[1] += '_.webp'
    }
    urlArray.push(nameArray.join('.'))
    let res = urlArray.join('/')
    if (other != '') {
        res += `?${other}`
    }
    return res
}

export function thousandBitSeparator(num) {
    return num && num.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
}
/**
 * 替换shark的关键字
 * @param {string} str shark变量
 * @param {string} key 要填充的变量
 */
export function replaceAll(str, key) {
    if (!str || str == '') {
      return key || null
    }
    return str.replace(/\%1\$s/g, key)
  }

