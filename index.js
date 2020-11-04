import linebot from 'linebot'
import dotenv from 'dotenv'
import MRT from './MRTdata.js'
import axios from 'axios'

const MRTinfo = []

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})
function distance (lat1, lon1, lat2, lon2, unit) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0
  } else {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == 'K') { dist = dist * 1.609344 }
    if (unit == 'N') { dist = dist * 0.8684 }
    return dist
  }
}

bot.on('message', async event => {
  try {
    const lat2 = event.message.latitude
    const lon2 = event.message.longitude

    let reply = ''
    const a = MRT.features
    let b = distance(a[0].properties.緯度, a[0].properties.經度, lat2, lon2, 'K')
    let exit = a[0].properties.出入口名稱
    let lat3 = a[0].properties.緯度
    let lon3 = a[0].properties.經度
    let exitNumber = a[0].properties.出入口編號
    let walkTime = 0

    for (let i = 0; i < a.length; i++) {
      const lat1 = a[i].properties.緯度
      const lon1 = a[i].properties.經度

      const dis = distance(lat1, lon1, lat2, lon2, 'K')

      if (dis < b) {
        b = dis
        exit = a[i].properties.出入口名稱
        lat3 = a[i].properties.緯度
        lon3 = a[i].properties.經度
        exitNumber = a[i].properties.出入口編號
        walkTime = Math.round( b * 1000 / 80 ).toString()
      }
    }
    b = Math.ceil(b * 1000).toString()
    
    reply = {
      type: 'flex',
      altText: 'Flex',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            header: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: '離地點最近的捷運出口是...',
                  color: '#91989F',
                  size: 'sm'
                },
                {
                  type: 'text',
                  text: exit,
                  size: 'xxl',
                  weight: 'bold',
                  color: '#B1B479',
                  style: 'normal',
                  decoration: 'none',
                  align: 'start',
                  margin: '13px'
                },
                {
                  type: 'text',
                  text: exitNumber + '號出口',
                  margin: '20px',
                  color: '#373C38'
                },
                {
                  type: 'text',
                  text: '距離' + b + '公尺',
                  color: '#91989F'
                  margin: '10px'
                },
                {
                  type: 'text',
                  text: '徒步約' + walkTime + '分鐘',
                  color: '#91989F'
                }
              ],
              position: 'relative',
              height: '180px'
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'button',
                  action: {
                    type: 'uri',
                    label: '開啟地圖',
                    uri: 'https://www.google.com.tw/maps/search/' + lat3 + ',' + lon3
                  },
                  style: 'primary',
                  color: '#86A697',
                  height: 'md',
                  margin: '10px'
                }
              ]
            },
            styles: {
              header: {
                separator: true
              }
            }
          }
        ]
      }
    }
    reply = (reply.length === 0) ? '找不到資料' : reply
    console.log(exit)
    event.reply(reply)
  } catch (error) {
    console.log(error)
    event.reply('發生錯誤')
  }
})

// 監聽
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
