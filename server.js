
import line from '@line/bot-sdk';
import express from 'express';
import mysql from 'mysql';
// import axios from 'axios';
import fs from 'fs';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { Storage } from '@google-cloud/storage';
import { format } from 'path';

// import multer from 'multer';

const app = express();
const port = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user = process.env.CLOUD_SQL_USERNAME
const pass = process.env.CLOUD_SQL_PASSWORD
const db = process.env.CLOUD_SQL_DATABASE_NAME
const socketPath = process.env.CLOUD_SQL_CONNECTION_NAME
const connection = process.env.CLOUD_SQL_CONNECTION_HOST
// const bucket = store.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const gCloud = new Storage({
  keyFilename: './testdeploy-330007-cfc853e977b1.json',
  projectId: 'testdeploy-330007'
});

const bucket = gCloud.bucket('scg_storage');

// console.log(`user --> ${user}`);
// console.log(`pass --> ${pass}`);
// console.log(`db --> ${db}`);
// console.log(`connection --> ${connection}`);
// console.log(`socketPath --> ${socketPath}`);

// create LINE SDK config from env variables
const config = {
  // channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  // channelSecret: process.env.CHANNEL_SECRET,

  // // Earth Debug;

  // CoreTech 
  // channelAccessToken: '',
  // channelSecret: ''

  //  MySleeplezz
  channelAccessToken: '',
  channelSecret: ''
};

// create LINE SDK client
const client = new line.Client(config);

app.post('/callback', async (request, response) => {
  // console.log('Start....')
  let msgID = request.body.events[0].message.id;
  let userID = request.body.events[0].source.userId;
  let msgType = request.body.events[0].message.type;
  let msgText = request.body.events[0].message.text;

  // console.log(`msgType--> ${msgType}`);
  // console.log(`msgText--> ${msgText}`);

  // try{
  //   const arraySplitWord = msgText.split('-');
  //   const lengthOfArrary = arraySplitWord.length;  
  // }catch(err){
  //   console.log(err.message + 'this massage is not greeting massage so system must pass this error.')
  // }



  let token = request.body.events[0].replyToken;
  // console.log(`replay token--> ${token}`);
  // console.log(`replay msgType--> ${msgType}`);
  // console.log(`replay msgText--> ${msgText}`);
  if(msgType === "text")
  {

    const arraySplitWord = msgText.split('-');
    const lengthOfArrary = arraySplitWord.length;  
    if(msgText === "FAQ"){
      const msgReply = faqMsg();
      const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
      return client.replyMessage(token, echo);
    }
    else if(msgText === "โครงการนี้เหมาะกับใคร?"){
      const textgen = "โครงการนี้เหมาะกับ ผู้ที่มีปัญหาเรื่องการนอน จนรู้สึกว่ากระทบกับการใช้ชีวิตประจำวันในช่วงนี้ โดยคาดหวังวิธีการที่ใช้การวิเคราะห์ข้อมูลเพื่อการปรับพฤติกรรมเป็นหลัก ไม่ใช่การทานยา"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ประโยชน์ที่คาดหวังจากการเข้าร่วม"){
      const textgen = "เนื่องจากโครงการนี้ มุ่งเน้นการใช้เทคโนโลยีและข้อมูลเพื่อออกแบบโปรแกรม ให้สอดคล้องกับการปรับพฤติกรรมเฉพาะเจาะจงต่อบริบทของผู้ใช้งานแต่ละคนเป็นหลัก และไม่มีการใช้ยาร่วมในโปรแกรม"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ผลิตภัณฑ์ที่ออกตลาด?"){
      const textgen = "เป็นผลิตภัณฑ์ในขั้นตอนการพัฒนา ซึ่งต้องอาศัยความร่วมมือจากผู้ใช้งาน เพื่อร่วมออกแบบวิธีการปรับพฤติกรรมให้เหมาะสมกับผู้ใช้งานแต่ละท่านร่วมกับการวิเคราะห์ข้อมูลรายบุคคล"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "สิ่งที่ผู้เข้าร่วมโครงการจะได้รับ"){
      const textgen = "1.กล่อง Sleepy Box ที่ประกอบด้วย Mi Band 6 เพื่อใช้เก็บข้อมูลขณะใช้ชีวิตประจำวัน ทั้งกลางวันและกลางคืน   2.โปรแกรมเพื่อช่วยปรับพฤติกรรมให้การนอนดีขึ้น ผ่านช่องทาง Line Chat"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ดูแลข้อมูลยังไง"){
      const textgen = "โดยจะมีการลบข้อมูลที่มีการระบุตัวตนทั้งหมด ภายในวันที่ 28 กุมภาพันธ์ 2565 และคงเหลือไว้เฉพาะข้อมูลที่เป็นนิรนามเพื่อการวิเคราะห์ในภายหลัง หมายเหตุทำการเข้ารหัส ชื่อ ที่ อยู่ และ ผู้ที่สามารถเข้าถึงข้อมูลมีเพียงแค่ผู้ดูแลโครงการเท่านั้น"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ขั้นตอนและกำหนดการ"){
      const textgen = "15-26 พย 64: เก็บข้อมูลอ้างอิง เพื่อสะท้อนกิจวัตรและคุณภาพการนอนปัจจุบัน ก่อนเริ่มโปรแกรมปรับพฤติกรรม || 18 พย 64: เวิร์คชอปในรูปแบบ online/offline เพื่อการคิดโซลูชั่นร่วมกัน (นัดหมายแยกสำหรับผู้ใช้งานรายที่ไม่สะดวก) || 3-15 มค 65: ผู้ใช้งานเริ่มเข้าโปรแกรมปรับพฤติกรรมเพื่อปรับปรุงการนอนที่ดีขึ้น || 31 มค 65: สรุปผลเพื่อปิดโครงการ และส่งกล่องSleepy Box กลับในรูปแบบชำระเงินปลายทาง"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ทีมพัฒนาน่าเชื่อถือมัย?"){
      const textgen = "ทีมพัฒนาประกอบด้วย: นักบำบัดความคิดและพฤติกรรม, นักออกแบบพฤติกรรม, นักออกแบบประสบการณ์, วิศวกรข้อมูล, นักวิเคราะห์ข้อมูล"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ประกาศผลผู้มีสิทธิ์เข้าร่วมเมื่อไร?"){
      const textgen = "ภายในวันศุกร์ ที่ 12 พ.ย. 64 "
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ต้องทำอะไรบ้าง?"){
      const textgen = "ใส่Mi Band 6 ในกิจวัตรในช่วงกลางวันและกลางคืนเพื่อเก็บข้อมูลที่จะนำไปวิเคราะห์และออกแบบโปรแกรมการปรับพฤติกรรมรายบุคคล ช่วงวันที่ 15 พย 64 ถึง 31 มค 65 เเละเข้าร่วมเวิร์ชอปเพื่อระดมสมองสร้างโซลูชันเพื่อการปรับพฤติกรรมในวันที่ 18 ธค 64 (สมารถเลือกได้ว่าเป็นแบบออนไลน์ หรือ ออฟไลน์)"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ยกเลิกการเข้าร่วมโครงการ?"){
      const textgen = "สามารถ แต่อยากขอความร่วมมือผู้ร่วมโครงการอยู่ในโครงการตั้งแต่ต้นจนจบ เพื่อการปรับปรุงคุณภาพการนอนให้มีประสิทธิภาพ ตามที่ได้ตั้งใจร่วมกันตั้งแต่เริ่มโครงการ"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ข้อมูลอะไรบ้าง?"){
      const textgen = "ข้อมูลส่วนตัวเพื่อระบุตัวตน เช่น ชื่อ นามสกุล ที่อยู่เพื่อการรับพัสดุ เเละข้อมูลสุขภาพรายบุคคลที่เก็บผ่าน Mi Band 6 และแอพพลิเคชั่นดังนี้ Health app, GoogleFit, Mifit"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ติดต่อสอบถาม"){
      const textgen = "วิศวิน 0952512060, เวทินี 0994942426"
      const replyMsg = {type: 'text', text: textgen};
      return client.replyMessage(token, replyMsg);
    }
    else if(msgText === "ดำเนินการถัดไป"){
      // console.log("In active collect data;");
      const msgReply = collectPersonalData();
      const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
      return client.replyMessage(token, echo);
    }
    else if (msgText === "เริ่มบันทึกข้อมูล")
    {
      const msgSet = "กรุณากรอกข้อมูลตามรูปแบบการกรอกข้อมูลคือ ชื่อ-นามสกุล เช่น สมยศ-สมคง";
      const replyMsg = {type:'text', text: msgSet}
      return client.replyMessage(token, replyMsg);
    }
    else if (lengthOfArrary === 2)
    {
      const conn = mysql.createConnection({
        host: connection,
        socketPath: socketPath,
        user: user,
        password: pass,
        database: db
      });
  
      if(lengthOfArrary === 2 )
      {
        conn.connect(function (err) {
          const arrayWord = msgText.split('-');
          const firstName = arrayWord[0];
          const lastName = arrayWord[1];
          // const email = arrayWord[2];
          // const address = arrayWord[3];
          // const tel = arrayWord[4];
          
      
          
          if(firstName === undefined || lastName === undefined)
          {
            // console.log("Error format insert!");
            const replyMsg = {type: 'text', text: "กรุณาตรวจสอบรูปแแบบการบันทึกข้อความให้อยู่ในรูปแบบ ชื่อ-นามสกุล"};
            return client.replyMessage(token, replyMsg);
          }
          else
          {
            const sql = `INSERT INTO collect_userid_email ( uid, firstname, lastname) VALUES ('${userID}', '${firstName}', '${lastName}')`;
            conn.query(sql, function (err, result) {
              if (err) {
                // console.log(err.message);
                const replyMsg = { type: 'text', text: err.message + "กรุณาตรวจสอบรูปแบบการส่งข้อมูล ชื่อ-นามสกุล"}
                return client.replyMessage(token, replyMsg);
              }else{
                // console.log('inserted');
                // const replyMsg = { type: 'text', text: 'ทางทีมงานได้รับข้อมูลเรียบร้อยค่ะ'}
                // return client.replyMessage(token, replyMsg);
 
                const msgConfirm = `ทางทีมงานได้รับข้อมูลเรียบร้อยค่ะ  ขั้นตอนถัดไปกรุณาตอบเเบบสอบถามเพื่อประเมิณระดับความรุนเเรงของอาการนอนไม่หลับตามลิงก์นี้ได้เลยค่ะ shorturl.at/efotD  กรุณาโปรดติดตามผู้ที่มีสิทธิ์จะได้เข้าโครงการผ่านช่อง line นี้`;

                const replyConfirm = {type: 'text', text: msgConfirm};
                return client.replyMessage(token, replyConfirm);

                // const msgReply = moodSurvey();
                // const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
                // arrayEcho.push(echo)
              }
            });
          }
        });
      }
      else
      {
        const replyMsg = {type: 'text', text: "กรุณาตรวจสอบรูปแบบการบันทึกให้อยู่ในรูปแบบ ชื่อ-นามสกุล"};
        return client.replyMessage(token, replyMsg);     
      }
    }
  
    else if (msgText === 'Dashboard') {
      const msgReply = getFlexMenu();
      const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
  
      return client.replyMessage(token, echo);
    }
    else if (msgText === "คำถามใน Thinking Log เพื่ออัด VDO") {
      const replyFlexOpenCam = openCam()
      const echo = { type: 'flex', altText: 'This is a Flex Message', contents: replyFlexOpenCam }
      return client.replyMessage(token, echo);
    }
    else{
      const msgReply = {type: "text", text: "ขอโทษด้วยค่ะทางระบบเราไม่รู้จักคำดังกล่าว กรุณาใช้หน้าเมนูเพื่อเข้าสู่เนื้อหาด้วยค่ะ หรือตรวจสอบรูปแบบการาส่งข้อมูลค่ะ"}
      return client.replyMessage(token, msgReply)
      }
  }

  else if (msgType === "video") {
    console.log("video path");
    const trackBackMsg = getVideo(msgID, config.channelAccessToken, userID);

    if (trackBackMsg === "Error") {
      const echo = { type: 'text', text: trackBackMsg }
      return client.replyMessage(token, echo);
    } else {
      const echo = { type: 'text', text: "บันทึกเรียบร้อยค่ะ" }
      return client.replyMessage(token, echo);
    }
    
  }else if(msgType === "image" || msgType === "Image" || msgType === "images" || msgType === "Images" || msgType === "picture" || msgType === "Picture"){
    const msgReply = {type: "text", text: "ขออภัยนะคะ ตอนนี้ระบบยังไม่สามารถรองรับรูปภาพได้  รบกวนใช้ฟังก์ชั่นการอัด video เพื่อบันทึก Thinking Log ค่ะ"}
    return client.replyMessage(token, msgReply)
  }

});

// get video //
function getVideo(id, channelAccessToken, users) {

 
    let url = 'https://api-data.line.me/v2/bot/message/' + id + '/content';

    const genDate = new Date();
    const genFileName = `${genDate.getDate()}-${genDate.getMonth()}-${genDate.getFullYear()}--${users}.mp4`
    const blob = bucket.file(genFileName)
  
      try{
        fetch(url, {
          'headers': {
            'Authorization': 'Bearer ' + channelAccessToken,
          },
          'method': 'get',
        }).then(res =>{
          new Promise((resolve, reject)=>{
            res.body.pipe(blob.createWriteStream({
              resumable:true,
            })).on('finish', ()=>{
              const publicUrl = format(`https://storage.googleapis.com/storage/browser/${bucket.name}/${blob.name}`);
              res.status(200).send(publicUrl)
            });
          })
        })
      }catch(err){
        console.log(err.message)
        const errorMsg = "Error";
        return errorMsg;
      }
}

 


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
function openCam() {
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
          "text": "เช่น สงสัยกังวลเยอะเลยนอนไม่หลับ",
          "align": "center",
          "gravity": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ถ้านอนไม่ดีแบบนี้กลัวกระทบงานจัง",
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
          "color": "#8DE2E9FF"
        }
      ]
    }
  }
}

// collectPersonalData // 
function collectPersonalData(){
  return{
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "MySleepLess",
          "size": "xl",
          "color": "#070B5BFF",
          "align": "center",
          "contents": []
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "ขอต้อนรับเข้าสู่ My Sleeplezz ",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "เพื่อร่วมออกแบบ Solution ",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "การนอนหลับที่ดีไปด้วยกัน",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ก่อนอื่นรบกวนกรอกข้อมูลตาม",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "รูปแบบดังต่อไปนี้ด้วยคะ",
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
            "type": "message",
            "label": "ดำเนินการต่อ",
            "text": "เริ่มบันทึกข้อมูล"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ข้อสงสัย",
            "text": "FAQ"
          }        
        }
      ]
    }
  }
}


function moodSurvey(){
  return{
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "เเบบประเมิณการนอน",
          "weight": "bold",
          "align": "center",
          "contents": []
        }
      ]
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "ขั้นตอนถัดไปกรุณาตอบเเบบสอบถาม", // ขั้นตอนถัดไปกรุณาตอบเเบบสอบถามเพื่อประเมิณระดับความรุนเเรงของอาการนอนไม่หลับ https://forms.gle/cymKXwZDW13sEnhHA
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "เพื่อประเมิณระดับความรุนเเรง",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ของอาการนอนไม่หลับ",
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
            "label": "ดำเนินการ",
            "uri": "https://forms.gle/cymKXwZDW13sEnhHA"
          }
        }
      ]
    }
  }
}


function faqMsg(){
  return{
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "FAQ",
          "weight": "bold",
          "align": "center",
          "contents": []
        }
      ]
    },
    "hero": {
      "type": "image",
      "url": "https://cdn-icons.flaticon.com/png/512/2058/premium/2058146.png?token=exp=1636565583~hmac=0064784b47de1576829bc36f8eb35afc",
      "size": "full",
      "aspectRatio": "1.51:1",
      "aspectMode": "fit"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "โครงการนี้เหมาะกับใคร?",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "โครงการนี้เหมาะกับใคร?"
          },
 
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ประโยชน์ที่คาดหวังจากการเข้าร่วม",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "โครงการที่ต่างจากการไปพบแพทย์",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ประโยชน์ที่คาดหวังจากการเข้าร่วม"
          },
 
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "โครงการนี้เป็นผลิตภัณฑ์ที่ออกตลาด",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "แล้วหรือยัง?",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ผลิตภัณฑ์ที่ออกตลาด?"
          },
   
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "สิ่งที่ผู้เข้าร่วมโครงการจะได้รับ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "สิ่งที่ผู้เข้าร่วมโครงการจะได้รับ"
          },
         
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "มีการดูแลความปลอดภัยของข้อมูล",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ผู้ร่วมโครงการอย่างไร",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ดูแลข้อมูลยังไง"
          },
   
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ขั้นตอนและกำหนดการ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ขั้นตอนและกำหนดการ"
          },
     
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ความน่าเชื่อถือของทีมพัฒนา",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ทีมพัฒนาน่าเชื่อถือมัย?"
          },
 
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ประกาศผลผู้มีสิทธิ์เข้าร่วมเมื่อไร?",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ประกาศผลผู้มีสิทธิ์เข้าร่วมเมื่อไร?"
          },
 
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ต้องทำอะไรบ้างในระหว่าง",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "เข้าร่วมโครงการ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ต้องทำอะไรบ้าง?"
          },
 
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "สามารถยกเลิกการเข้าร่วมโครงการ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ระหว่างการดำเนินโครงการได้ไหม?",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ยกเลิกการเข้าร่วมโครงการ?"
          },
     
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ข้อมูลอะไรบ้างที่ต้องยินยอมแชร์",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "เพื่อการเข้าร่วมโครงการ?",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ตอบคำถาม",
            "text": "ข้อมูลอะไรบ้าง?"
          },
       
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ติดต่อสอบถาม",
            "text": "ติดต่อสอบถาม"
          },
        
        },        
      ]
    }
  }
}

app.listen(port, () => {
  console.log(`serve run at port ${port}`)
});

