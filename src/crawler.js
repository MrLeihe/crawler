const https = require('https');
const path = require('path');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio')

const url = 'https://movie.douban.com/cinema/nowplaying/beijing/'

function crawlerDoubanImage() {
    https.get(url, (res => {
        let rawData = ''
        res.setEncoding('utf8');
        // 监听 data 事件
        res.on('data', (chunk) => {
            rawData += chunk
        })
        // 数据加载完成
        res.on('end', () => {
            const $ = cheerio.load(rawData)
            // 解析数据
            $('img').each(function (index, el) {
                downloadFile($(el).attr('src'))
            })
            fs.writeFile(path.resolve(__dirname, '../static/douban.txt'), rawData, 'utf8', (err) => {
                console.log(err)
            })

        })
    })).on('error', (e) => {
        console.log('error', e)
    })
}

function downloadFile(imageSrc) {
    const filename = path.basename(imageSrc)
    const filePath = path.resolve(__dirname, `../images/${filename}`)
    request(imageSrc).pipe(fs.createWriteStream(filePath))
}

module.exports = crawlerDoubanImage