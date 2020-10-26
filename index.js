// import linebot from 'linebot'
// import dotenv from 'dotenv'
// import MRT from './MRTdata.js'
// import axios from 'axios'

// // const MRTinfo = []

// // dotenv.config()

// // const bot = linebot({
// //   channelId: process.env.CHANNEL_ID,
// //   channelSecret: process.env.CHANNEL_SECRET,
// //   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
// // })

// // const exit = ''
// // bot.on('message', async event => {
// //   try {
// // for (const data of MRT) {
// //   const lat1 = data.features[0].properties.經度
// //   const lon1 = data.features[0].properties.緯度
// //   console.log(lon1)
//   // const lat2 = event.message.latitude
//   // const lon2 = event[0].message.longitude
//   // let reply = 0
//   // console.log(event.message.latitude)

//   // for (const data of MRT) {
//   //   const lat1 = data.features[0].properties.經度
//   //   const lon1 = data.features[0].properties.緯度

//   //   function distance (lat1, lon1, lat2, lon2) {
//   //     var R = 6371 // Radius of the earth in km
//   //     var dLat = deg2rad(lat2 - lat1) // deg2rad below
//   //     var dLon = deg2rad(lon2 - lon1)
//   //     var a =
//   //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//   //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//   //     Math.sin(dLon / 2) * Math.sin(dLon / 2)

//   //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//   //     var d = R * c // Distance in km
//   //     return d
//   //   }

//   //   function deg2rad (deg) {
//   //     return deg * (Math.PI / 180)
//   //   }

//   // if (data.title === text) {
//   //   reply = data.showInfo[0].locationName
//   //   break
//   // }
// // }
// //     reply = (reply.length === 0) ? '找不到資料' : reply
// //     event.reply(reply)
// //   } catch (error) {
// //     event.reply('發生錯誤')
// //   }
// // })
// 
// // 監聽
// bot.listen('/', process.env.PORT, () => {
//   console.log('機器人已啟動')
// })
// 引用 line 機器人套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'
// 引用 axios 套件
import axios from 'axios'
// 引用 node-schedule
// import schedule from 'node-schedule'

let exhubitions = []

const updateData = async () => {
  const response = await axios.get('https://cloud.culture.tw/frontsite/trans/')
  exhubitions = response.data
}
// schedule.scheduleJob('* * 0 * * *', () => {
//   updateData()
// })

updateData()

// 讀取 .env
dotenv.config()

// 設定機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async event => {
  try {
    let reply
    const text = event.message.text
    if (text === 'flex') {
      reply = {
        type: 'flex',
        altText: 'Flex',
        contents: {
          type: 'carousel',
          contents: [
            {
              type: 'bubble',
              hero: {
                type: 'image',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
                size: 'full',
                aspectRatio: '20:13',
                aspectMode: 'cover',
                action: {
                  type: 'uri',
                  uri: 'http://linecorp.com/'
                }
              },
              body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'Brown Cafe',
                    weight: 'bold',
                    size: 'xl'
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    margin: 'md',
                    contents: [
                      {
                        type: 'icon',
                        size: 'sm',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'sm',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'sm',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'sm',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                      },
                      {
                        type: 'icon',
                        size: 'sm',
                        url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                      },
                      {
                        type: 'text',
                        text: '4.0',
                        size: 'sm',
                        color: '#999999',
                        margin: 'md',
                        flex: 0
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'lg',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'Place',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 1
                          },
                          {
                            type: 'text',
                            text: 'Miraina Tower, 4-1-6 Shinjuku, Tokyo',
                            wrap: true,
                            color: '#666666',
                            size: 'sm',
                            flex: 5
                          }
                        ]
                      },
                      {
                        type: 'box',
                        layout: 'baseline',
                        spacing: 'sm',
                        contents: [
                          {
                            type: 'text',
                            text: 'Time',
                            color: '#aaaaaa',
                            size: 'sm',
                            flex: 1
                          },
                          {
                            type: 'text',
                            text: '10:00 - 23:00',
                            wrap: true,
                            color: '#666666',
                            size: 'sm',
                            flex: 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              footer: {
                type: 'box',
                layout: 'vertical',
                spacing: 'sm',
                contents: [
                  {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                      type: 'uri',
                      label: 'CALL',
                      uri: 'https://linecorp.com'
                    }
                  },
                  {
                    type: 'button',
                    style: 'link',
                    height: 'sm',
                    action: {
                      type: 'uri',
                      label: 'WEBSITE',
                      uri: 'https://linecorp.com'
                    }
                  },
                  {
                    type: 'spacer',
                    size: 'sm'
                  }
                ],
                flex: 0
              }
            }
          ]
        }
      }
    } else {
      for (const data of exhubitions) {
        if (data.title === text) {
          reply = data.showInfo[0].locationName
          break
        }
      }
      reply = (reply.length === 0) ? '找不到資料' : reply
    }
    event.reply(reply)
  } catch (error) {
    event.reply('發生錯誤')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
