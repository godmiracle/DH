const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: "A", url: "https://www.acfun.cn/"},
    {logo: 'B', url: 'https://www.bilibili.com/'},
    {logo: 'C', url: 'https://csstriggers.com/'},
    {logo: 'D', url: 'https://deerchao.cn/tutorials/regex/regex.htm'},
    {logo: 'E', url: 'https://es6.ruanyifeng.com/#README'},
    {logo: 'F', url: 'https://fangyinghang.com/'}
]
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('www.', '').replace(/\/.*/, '').replace('http://', '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        console.log(index);
        const $li = $(`<li>
               
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                     <svg class="icon" >
                      <use xlink:href="#icon-cuowu"></use>
                   </svg>
                   </div>
                </div>
          
</li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        // 阻止冒泡
        $li.on('click', '.close', (e) => {
            console.log('zheli')
            e.stopPropagation()
            console.log(hashMap);
            hashMap.splice(index,1)
            render()
        })
    })
}
$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入要添加的网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
            console.log(url)
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            // logoType: 'text',
            url: url
        })
        render()
    })
render()
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    // 把对象变成字符串
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})