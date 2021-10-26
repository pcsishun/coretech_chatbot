
import line from '@line/bot-sdk';
import express from 'express';
import mysql from 'mysql';
// import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user = process.env.CLOUD_SQL_USERNAME
const pass = process.env.CLOUD_SQL_PASSWORD
const db = process.env.CLOUD_SQL_DATABASE_NAME
const socketPath = process.env.CLOUD_SQL_CONNECTION_NAME
const connection = process.env.CLOUD_SQL_CONNECTION_HOST

// console.log(`user --> ${user}`);
// console.log(`pass --> ${pass}`);
// console.log(`db --> ${db}`);
// console.log(`connection --> ${connection}`);
// console.log(`socketPath --> ${socketPath}`);

// create LINE SDK config from env variables
const config = {
  // channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  // channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: 'cO1iyreuV91L0UUTc+q2mCyQ42ZDXSSKB6W93/SBh2jvpj32CGUsMFR0UwiD9KerYVnrgFk5Bk7bQXYCTdpmh9YwAe6+GGAgfwAGg9hEETqsiue7WGTuTN0DW0GOMigPWocyZF0INoBN/D2PnX4vZAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '861ffd3753523b9a44922355ff2c7582'
};

// create LINE SDK client
const client = new line.Client(config);


app.post('/callback', async (request, response) => {
  // console.log('Start....')
  let userID = request.body.events[0].source.userId
  // console.log(`userID--> ${userID}`);
  let msgType = request.body.events[0].message.type;
  // console.log(`msgType--> ${msgType}`);
  let msgText = request.body.events[0].message.text;
  // console.log(`msgText---> ${msgText}`);
  let token = request.body.events[0].replyToken;
  // console.log(`replay token--> ${token}`);

  if (msgText === 'Dashboard') {
    const msgReply = getFlexMenu();
    const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };

    return client.replyMessage(token, echo);
  } 
  else if (msgText === "คำถามใน Thinking Log เพื่ออัด VDO")
  {
    const replyFlexOpenCam = openCam()
    const echo = {type: 'flex', altText: 'This is a Flex Message', contents: replyFlexOpenCam}
    return client.replyMessage(token, echo);
  }
  else if (msgText.includes('@gmail.com') || msgText.includes('@Gmail.com')) 
  {
    const conn = mysql.createConnection({
      host: connection,
      socketPath: socketPath,
      user: user,
      password: pass,
      database: db
    });

    conn.connect(function (err) {
      // if (err) throw console.log(err);
      const sql = `INSERT INTO collect_userid_email (email , uid) VALUES ('${msgText}', '${userID}')`;
      conn.query(sql, function (err, result) {
        if (err){
          console.log(err.message)
          const replyMsg = {type: 'text', contents: err.message}
          return client.replyMessage(token, replyMsg);
        }
        else{
          console.log('inserted')
          const replyMsg = {type: 'text', contents: 'ทำการบันทึก email ของท่านเรียบร้อยค่ะ'}
          return client.replyMessage(token, replyMsg)
        }
        
      });
    });
  }



});

// flex menu week selection // 
function getFlexMenu() {
  return {
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Select timing",
          "align": "center",
          "contents": []
        }
      ]
    },
    "hero": {
      "type": "image",
      "url": "https://vos.line-scdn.net/bot-designer-template-images/bot-designer-icon.png",
      "size": "full",
      "aspectRatio": "1.51:1",
      "aspectMode": "fit"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "Week1",
            "text": "Week1"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "Week2",
            "text": "Week2"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "Week3",
            "text": "Week3"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "Week4",
            "text": "Week4"
          }
        }
      ]
    }
  }
}



// flex msg before open cam // 
function openCam(){
  return {
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "ช่วงนี้การนอนของคุณเป็นอย่างไร",
          "align": "center",
          "gravity": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "เช่น นอนไม่ค่อยดีเลยงานเยอะมาก",
          "align": "center",
          "gravity": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "___________________________",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "หากพร้อมเชิญอัด video ได้เลยค่ะ",
          "align": "center",
          "contents": []
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "horizontal",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "Open Video",
            "uri": "https://line.me/R/nv/camera/" // API Line open cam https://line.me/R/nv/camera/
          },
          "color": "#C6CFEAFF"
        }
      ]
    }
  }
}






app.listen(port, () => {
  console.log(`serve run at port ${port}`)
});

