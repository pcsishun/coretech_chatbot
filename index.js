
import line from '@line/bot-sdk';
import express from 'express';
import mysql from 'mysql';
// import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// create LINE SDK config from env variables
const config = {
    // channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    // channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: 'XP9ou/4jtHzuPuy4Ww+zXTT+DELHkUeggzoAPTrcU1Zft+0ScJqNlyGjyAafq6mXJnS82G2M4Len5HcSXBsZ12AMT7QYL4/aCiS3gBsecmc4YFgytS8ZO1d2qvHc9Xu37jdofGCNSB/YsCRbQdpEGQdB04t89/1O/w1cDnyilFU=',
    channelSecret:'be0800f53454016519d9635928b1c87e'
  };
  
  // create LINE SDK client
  const client = new line.Client(config);


let menu_once;

app.post('/callback', async(request, response) => {
    console.log('Start....')
    let userID = request.body.events[0].source.userId
    console.log(`userID--> ${userID}`);
    let msgType = request.body.events[0].message.type;
    console.log(`msgType--> ${msgType}`);
    let msgText = request.body.events[0].message.text;
    console.log(`msgText---> ${msgText}`);
    let token = request.body.events[0].replyToken;
    console.log(`replay token--> ${token}`);

    if(msgText === 'Dashboard'){
        const msgReply = getFlexMenu();
        const echo = {type: 'flex',altText:'This is a Flex Message' ,contents:msgReply};

        return client.replyMessage(token, echo);
    }else if(msgText.includes('@gmail.com') || msgText.includes('@Gmail.com')){
        const conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "chatbot_scg"
        });

        conn.connect(function(err){
            if (err) throw err;
            const sql = `INSERT INTO collect_userid_email (email , uid) VALUES ('${msgText}', '${userID}')`;
            conn.query(sql, function(err, result){
                if(err) throw err;
                console.log('inserted')
            });
        });
    }

   
    
});


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
                "type": "uri",
                "label": "Week1",
                "uri": "https://linecorp.com"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Week2",
                "uri": "https://linecorp.com"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Week3",
                "uri": "https://linecorp.com"
              }
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Week4",
                "uri": "https://linecorp.com"
              }
            }
          ]
        }
      }
}

app.listen(port, ()=> {
    console.log(`serve run at port ${port}`)
});
  
 