import axios from 'axios'
import cheerio from 'cheerio'

const getHTML = async () => {
  const response = await axios.get('https://www.easycamp.com.tw/Push_Camp_4_21_0.html')
  const $ = cheerio.load(response.data)
  for (let i = 0; i < $('.col-md-6.col-sm-12.col-xs-12 h3').length; i++) {
    console.log($('.col-md-6.col-sm-12.col-xs-12 h3').eq(i).text())
  }
}

getHTML()
