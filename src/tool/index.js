export const say = function(type){
    console.log('type: ', type);
}
export async function invoke_post(url,params={}){
    axios.defaults.withCredentials=true;
    axios.defaults.crossDomain=true;
    try{
        let result = await axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url,
            data: params,
        })
        return result;
    }catch(error){
        console.error('---invoke_post_error---: ', error);
        return {}
    }
}

export const handlePicUrl = function(url, width, height, type = 'C', webpType) {
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

