
import line from '@line/bot-sdk';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { Storage } from '@google-cloud/storage';
import {Datastore} from '@google-cloud/datastore';
import { format } from 'path';
import muscleRelaxation from './intervantion/muscleRelaxation.js'
import relaxation  from './intervantion/relaxation.js';
import deepSlowBreathing from './intervantion/deepSlowBreathing.js';
import {cognitivePattern1, cognitivePattern2, cognitivePattern3} from './intervantion/cognitive.js'
import {anxietyModelPattern1, anxietyModelPattern2, anxietyModelPattern3} from './intervantion/anxietyModel.js'

 
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

const datastore = new Datastore();


// create LINE SDK config from env variables
const config = {
  // channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  // channelSecret: process.env.CHANNEL_SECRET,

  //  MySleeplezz 
  channelAccessToken: 'UG1DCQe0wQvks4ba3LGXIbRzzaDkD2Tljv8+yvosfoMEyQa7mkIap06rMbbDrgNjtsVOlEmNpMdcmm9b7ibREvQzresLTnXOnehsClq0cVFvAUO2qYGK0LIr1c2Ava/BRMHYfFvB4DuZRQVH2rjyfgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '2d77e494b5df69802310eb1f1d1a933b'
};
 
// create LINE SDK client
const client = new line.Client(config);


app.post('/callback', async (request, response) => {
  // console.log('Start....')
  let jsonfile = request.body; 
  let msgID = request.body.events[0].message.id;
  let userID = request.body.events[0].source.userId;
  let msgType = request.body.events[0].message.type;
  let msgText = request.body.events[0].message.text;

  console.log('jsonfile ---> '+ JSON.stringify(jsonfile));

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
    // else if(msgText === "โครงการนี้เหมาะกับใคร?"){
    //   const textgen = "โครงการนี้เหมาะกับ ผู้ที่มีปัญหาเรื่องการนอน จนรู้สึกว่ากระทบกับการใช้ชีวิตประจำวันในช่วงนี้ โดยคาดหวังวิธีการที่ใช้การวิเคราะห์ข้อมูลเพื่อการปรับพฤติกรรมเป็นหลัก ไม่ใช่การทานยา"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ประโยชน์ที่คาดหวังจากการเข้าร่วม"){
    //   const textgen = "เนื่องจากโครงการนี้ มุ่งเน้นการใช้เทคโนโลยีและข้อมูลเพื่อออกแบบโปรแกรม ให้สอดคล้องกับการปรับพฤติกรรมเฉพาะเจาะจงต่อบริบทของผู้ใช้งานแต่ละคนเป็นหลัก และไม่มีการใช้ยาร่วมในโปรแกรม"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ผลิตภัณฑ์ที่ออกตลาด?"){
    //   const textgen = "เป็นผลิตภัณฑ์ในขั้นตอนการพัฒนา ซึ่งต้องอาศัยความร่วมมือจากผู้ใช้งาน เพื่อร่วมออกแบบวิธีการปรับพฤติกรรมให้เหมาะสมกับผู้ใช้งานแต่ละท่านร่วมกับการวิเคราะห์ข้อมูลรายบุคคล"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "สิ่งที่ผู้เข้าร่วมโครงการจะได้รับ"){
    //   const textgen = "1.กล่อง Sleepy Box ที่ประกอบด้วย Mi Band 6 เพื่อใช้เก็บข้อมูลขณะใช้ชีวิตประจำวัน ทั้งกลางวันและกลางคืน   2.โปรแกรมเพื่อช่วยปรับพฤติกรรมให้การนอนดีขึ้น ผ่านช่องทาง Line Chat"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ดูแลข้อมูลยังไง"){
    //   const textgen = "โดยจะมีการลบข้อมูลที่มีการระบุตัวตนทั้งหมด ภายในวันที่ 28 กุมภาพันธ์ 2565 และคงเหลือไว้เฉพาะข้อมูลที่เป็นนิรนามเพื่อการวิเคราะห์ในภายหลัง หมายเหตุทำการเข้ารหัส ชื่อ ที่ อยู่ และ ผู้ที่สามารถเข้าถึงข้อมูลมีเพียงแค่ผู้ดูแลโครงการเท่านั้น"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ขั้นตอนและกำหนดการ"){
    //   const textgen = "15-26 พย 64: เก็บข้อมูลอ้างอิง เพื่อสะท้อนกิจวัตรและคุณภาพการนอนปัจจุบัน ก่อนเริ่มโปรแกรมปรับพฤติกรรม || 18 พย 64: เวิร์คชอปในรูปแบบ online/offline เพื่อการคิดโซลูชั่นร่วมกัน (นัดหมายแยกสำหรับผู้ใช้งานรายที่ไม่สะดวก) || 3-15 มค 65: ผู้ใช้งานเริ่มเข้าโปรแกรมปรับพฤติกรรมเพื่อปรับปรุงการนอนที่ดีขึ้น || 31 มค 65: สรุปผลเพื่อปิดโครงการ และส่งกล่องSleepy Box กลับในรูปแบบชำระเงินปลายทาง"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ทีมพัฒนาน่าเชื่อถือมัย?"){
    //   const textgen = "ทีมพัฒนาประกอบด้วย: นักบำบัดความคิดและพฤติกรรม, นักออกแบบพฤติกรรม, นักออกแบบประสบการณ์, วิศวกรข้อมูล, นักวิเคราะห์ข้อมูล"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ประกาศผลผู้มีสิทธิ์เข้าร่วมเมื่อไร?"){
    //   const textgen = "ภายในวันศุกร์ ที่ 12 พ.ย. 64 "
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ต้องทำอะไรบ้าง?"){
    //   const textgen = "ใส่Mi Band 6 ในกิจวัตรในช่วงกลางวันและกลางคืนเพื่อเก็บข้อมูลที่จะนำไปวิเคราะห์และออกแบบโปรแกรมการปรับพฤติกรรมรายบุคคล ช่วงวันที่ 15 พย 64 ถึง 31 มค 65 เเละเข้าร่วมเวิร์ชอปเพื่อระดมสมองสร้างโซลูชันเพื่อการปรับพฤติกรรมในวันที่ 18 ธค 64 (สมารถเลือกได้ว่าเป็นแบบออนไลน์ หรือ ออฟไลน์)"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ยกเลิกการเข้าร่วมโครงการ?"){
    //   const textgen = "สามารถ แต่อยากขอความร่วมมือผู้ร่วมโครงการอยู่ในโครงการตั้งแต่ต้นจนจบ เพื่อการปรับปรุงคุณภาพการนอนให้มีประสิทธิภาพ ตามที่ได้ตั้งใจร่วมกันตั้งแต่เริ่มโครงการ"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ข้อมูลอะไรบ้าง?"){
    //   const textgen = "ข้อมูลส่วนตัวเพื่อระบุตัวตน เช่น ชื่อ นามสกุล ที่อยู่เพื่อการรับพัสดุ เเละข้อมูลสุขภาพรายบุคคลที่เก็บผ่าน Mi Band 6 และแอพพลิเคชั่นดังนี้ Health app, GoogleFit, Mifit"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ติดต่อสอบถาม"){
    //   const textgen = "วิศวิน 0952512060, เวทินี 0994942426"
    //   const replyMsg = {type: 'text', text: textgen};
    //   return client.replyMessage(token, replyMsg);
    // }
    // else if(msgText === "ดำเนินการถัดไป"){
    //   // console.log("In active collect data;");
    //   const msgReply = collectPersonalData();
    //   const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
    //   return client.replyMessage(token, echo);
    // }
    // else if (msgText === "เริ่มบันทึกข้อมูล")
    // {
    //   const msgSet = "กรุณากรอกข้อมูลตามรูปแบบการ กรอกข้อมูลคือ ชื่อ-นามสกุล เช่น สมยศ-สมคง";
    //   const replyMsg = {type:'text', text: msgSet}
    //   return client.replyMessage(token, replyMsg);
    // }
    // for dev // 
    else if(msgText === "!debugerTester!"){

      const debugMsg = relaxation();
      const msgDeploy = {
        type: "template",
        altText: "This is test msg!",
        template: debugMsg
      }

      console.log("debuger-tester")

        // const msgReply = debugtext();
        // const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
        // console.log(echo)
        // const echo = {type: 'text', text: "Hi developer team :)"}
        // return client.replyMessage(token, echo);
        return client.pushMessage(userID, msgDeploy)
   
    } 
    else if (lengthOfArrary === 2)
    {

      // const conn = mysql.createConnection({
      //   host: connection,
      //   socketPath: socketPath,
      //   user: user,
      //   password: pass,
      //   database: db
      // });
  
      if(lengthOfArrary === 2 )
      {
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
            // conn.end();
            return client.replyMessage(token, replyMsg);
          }
          else
          {
            addFireStorage(userID, firstName, lastName);

            const msgReply = moodSurvey();
            const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
            return client.replyMessage(token, echo);   

            // const sql = `INSERT INTO collect_userid_email ( uid, firstname, lastname) VALUES ('${userID}', '${firstName}', '${lastName}')`;
            // conn.query(sql, function (err, result) {
            //   if (err) {
            //     // console.log(err.message);
            //     const replyMsg = { type: 'text', text: err.message + "กรุณาตรวจสอบรูปแบบการส่งข้อมูล ชื่อ-นามสกุล"}
            //     // conn.end();
            //     return client.replyMessage(token, replyMsg);
            //   }else{
            //     // console.log('inserted');
            //     // const replyMsg = { type: 'text', text: 'ทางทีมงานได้รับข้อมูลเรียบร้อยค่ะ'}
            //     // return client.replyMessage(token, replyMsg);
 
            //     // const msgConfirm = `ทางทีมงานได้รับข้อมูลเรียบร้อยค่ะ  ขั้นตอนถัดไปกรุณาตอบเเบบสอบถามเพื่อประเมิณระดับความรุนเเรงของอาการนอนไม่หลับตามลิงก์นี้ได้เลยค่ะ shorturl.at/efotD  กรุณาโปรดติดตามผู้ที่มีสิทธิ์จะได้เข้าโครงการผ่านช่อง line นี้`;
            //     // const replyConfirm = {type: 'text', text: msgConfirm};
            //     // return client.replyMessage(token, replyConfirm);

            //     const msgReply = moodSurvey();
            //     const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
            //     // conn.end();
            //     return client.replyMessage(token, echo);

        
            //   }
            // });
          }
      }
      else
      {
        const replyMsg = {type: 'text', text: "กรุณาตรวจสอบรูปแบบการบันทึกให้อยู่ในรูปแบบ ชื่อ-นามสกุล"};
        // conn.end();
        return client.replyMessage(token, replyMsg);     
      }
    }
    else if(msgText === "ตอบเเบบสอบถามความรุนเเรงเสร็จสิ้น"){
      const msgConfirm = "สวัสดีคะ ขอต้อนรับเข้าสู่ My Sleeplezz\n\nเพื่อร่วมออกแบบ Solution การนอนหลับที่ดีไปด้วยกัน เราจะเริ่มมาทำความรู้จักกับบริบทรอบ ๆ ตัวคุณในแต่ละวัน ซึ่งทางทีมงานจะส่ง Sleepy box ไปให้คุณถึงบ้าน เมื่อเปิดกล่องคุณจะพบกับ Device ซึ่งเป็นอุปกรณ์ในการทำความเข้าใจรูปแบบการนอนและคำแนะนำเพื่อร่วมเปิดประสบการณ์ใหม่ไปด้วยกัน โดยเราจะร่วมใช้ Device ไปพร้อม ๆ กันตั้งแต่วันที่ 15 พ.ย.-26 พ.ย.64 \nในแต่ละสัปดาห์ทางทีมงานจะประมวลผลข้อมูลการนอนในการใช้ชีวิตประจำวันของคุณให้ทราบผ่านทาง Line OA นี้ค่ะ \nเมื่อพอทราบรูปแบบการใช้ชีวิตและการนอนการคุณแล้วทางทีมทางจะเชิญคุณเข้าร่วมออกแบบ Solution ที่เฉพาะตัว อีกครั้งนะคะ \n\nก่อนอื่นรบกวนตอบแบบสอบถามเพื่อเติมดังนี้ค่ะ https://forms.gle/JS7zY9NdaQUtzUyi8";
      const replyConfirm = {type: 'text', text: msgConfirm};
      return client.replyMessage(token, replyConfirm);
    }
  
    else if (msgText === 'Dashboard') {
      // console.log('Dashboard-->', userID);
      const msgReply = testsinglog(userID);
      const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
      return client.replyMessage(token, echo);
    }
    else if (msgText === "คำถามใน Thinking Log เพื่ออัด VDO") {
      const replyFlexOpenCam = openCam()
      const echo = { type: 'flex', altText: 'This is a Flex Message', contents: replyFlexOpenCam }
      return client.replyMessage(token, echo);
    }
    else if(msgText === "ดำเนินการ Muscle relaxation"){
      const msgReply = muscleRelaxation()
      const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgReply}
      return client.replyMessage(token, echo);
    }
    else if(msgText === "ดำเนินการ Deep slow breathing"){
      const msgReply = deepSlowBreathing()
      const echo = {type: 'flex', altText: 'this is Flex Message', contents:msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "รายละเอียด Muscle relaxation"){
      const msgReply = "เพื่อการนอนหลับที่ผ่อนคลายในคืนนี้ เรามาผ่อนคลายกล้ามเนื้อกันนะคะ วิธีนี้เรียกว่า Progressive Muscle Relaxation โดยใช้หลักการตั้งใจเกร็งกลุ่มกล้ามเนื้อมัดใหญ่ แล้วค่อยๆ ผ่อนคลายให้สอดคล้องกับการหายใจ เพื่อเป็นการลดสารแห่งความเครียด  ทำให้จิตใจสงบปล่อยวางความคิด ลดปฏิกริยาของร่างกายที่ตอบสนองต่อความเครียด ความกังวล ทำให้คุณภาพการนอนหลับดีขึ้นค่ะ  เรามาทำพร้อมๆ กันตาม clip ที่แนะนำได้เลยนะคะ และถ้าหากต้องการเสียงเพลงประกอบเพื่อการผ่อนคลายสามารถ click เลือกเพลงด้านล่างได้เลยค่ะ"
      const echo = {type: 'text', text:msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "รายละเอียด Deep slow breathing"){
      const msgReply = "การหายใจเข้าออกลึก ๆ จะทำให้เราหลับสบายขึ้นค่ะ เพราะจะช่วยลดความดันโลหิตได้ด้วยการทำให้กล้ามเนื้อผ่อนคลาย เพิ่มการหมุนเวียนเลือด และควบคุมการเต้นของหัวใจให้เป็นปกติ ทำได้ง่ายและสร้างสมาธิได้ด้วย  เรามาทำพร้อมๆ กันตาม clip ที่แนะนำได้เลยนะคะ และถ้าหากต้องการเสียงเพลงประกอบเพื่อการผ่อนคลายสามารถ click เลือกเพลงด้านล่างได้เลยค่ะ"
      const echo = {type:'text', text: msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "รายละเอียด Savoring"){
      const msgReply = "การนึกถึงเรื่องราวที่เกิดขึ้นระหว่างวันเป็นการทบทวนสิ่งที่เกิดขึ้นจะช่วยให้เชื่อมโยงเหตุการณ์ต่างๆ ที่เราสามารถเรียนรู้และปรับตัวได้ เป็นปัจจัยหนึ่งที่ทำให้เรามีความสุขกับชีวิตในความเป็นจริงค่ะ  เราลองมานึกถึงเรื่องราวในวันนี้พร้อมกันนะคะ"
      const echo = {type: 'text', text:msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "Muscle relax"){
      const msgReply = "Introduce progressive muscle relaxation:\n https://www.youtube.com/watch?v=GFh-L8YKh3k"
      const echo ={type:'text', text: msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "breathing Video"){
      const msgReply = "Introduce deep-slow breathing: \n https://drive.google.com/file/d/1MWpKICah8GhYA5H4AMujucm1xMx5o24L/view"
      const echo = {type:'text', text: msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "Music Relax"){
      const msgReply = "กรุณาเลือกเพลงได้ตามลิงก์ได้เลยคะ:\n 1.White Noise: https://www.youtube.com/watch?v=tjMOiabqK7A \n 2.Forest https://www.youtube.com/watch?v=1ZYbU82GVz4 \n 3.Music https://www.youtube.com/watch?v=hlWiI4xVXKY \n 4.Sea https://www.youtube.com/watch?v=PgkvwG971hw"
      const echo = {type: 'text', text: msgReply}
      return client.replyMessage(token, echo)
    }


    //  *************************  // 
    //  !! start intervention !!  // 
    //  *************************  // 


    else if(msgText.includes("สวัสดี mysleepless") === true)
    {
      const setMenuSelect = msgText.split(" ")
      console.log("1. Intervention ===> ", setMenuSelect)
      const menuSelect = setMenuSelect[2]
      console.log("2. Intervention ===> ", menuSelect)
      const setDate = new Date();
      const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+setDate.getHours()+":" + setDate.getMinutes()+":"+setDate.getSeconds()
      console.log("isDate chatStatus ===> ", isDate)

      if(msgText.includes("สวัสดี mysleepless") === true)
      {
        const checkingData = datastore
        .createQuery("user_runninig_menu")
        .filter('userid', '=', userID)
        .order('id_log',{
            descending: true
          })
        .limit(1)

        const [tasks] = await datastore.runQuery(checkingData)
        /// savoring ///
        if(menuSelect === "savoring")
        {

          console.log("3. Intervention ===> ", tasks)
          console.log("3.1. Intervention ===> ", tasks.length)

          let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
          const logId = setLogId
          console.log("logId ===> ", logId);
 
              // create //
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
                      key: taskKey,
                      data: {
                        id_log: logId,
                        menu_selection: menuSelect,
                        running_number: 1,
                        user_reply: msgText,
                        userid: userID,
                        status: false,
                        createdate: isDate
                      },
                    };

            await datastore.save(task)

            console.log("3. Intervention ===> ", "save data")

            const botReply = datastore.createQuery("relaxation_msg").filter('id_log', '=', 1)
            const [msgReplyTasks]  = await datastore.runQuery(botReply)
            console.log("4. Intervention ===> ", msgReplyTasks[0].chatmsg)
            const echo = {type: 'text', text: msgReplyTasks[0].chatmsg}
            return client.replyMessage(token, echo)
        }
        /// End savoring ///
        /// Cognitive Restructuring /// 
        else if(menuSelect.includes("cognitive") === true)
        {
          const setPattern = menuSelect.split(":");
          const pattern = parseInt(setPattern[1])

            console.log("2.cognitive ===> ", tasks)
            console.log("3.cognitive ===> ", tasks.length)
            
            let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
            const logId = setLogId
            console.log("4.cognitive logId ===> ", logId);
            // create //
            
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: logId,
                menu_selection: menuSelect,
                running_number: 1,
                user_reply: msgText,
                userid: userID,
                status: false,
                createdate: isDate},
              };
          
            await datastore.save(task)
            console.log("5.cognitive ===> ", "save data")
            const botReply = datastore.createQuery("cognitive_restructuring")
              .filter('id_log', '=', 1)
              .filter('Pattern', '=', pattern)
            
            const [msgReplyTasks]  = await datastore.runQuery(botReply)
            console.log("6. cognitive ===> ", msgReplyTasks[0].chatmsg)
            const echo = {type: 'text', text: msgReplyTasks[0].chatmsg}
            return client.replyMessage(token, echo)
        }
        /// End Cognitive Restructuring /// 
        /// start Anxiety Model or unfinished_business /// 
        else if(menuSelect.includes("Anxiety") === true)
        {
          const setPattern = menuSelect.split(":");
          const pattern = parseInt(setPattern[1])

            console.log("2.Anxiety ===> ", tasks)
            console.log("3.Anxiety ===> ", tasks.length)
            
            let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
            const logId = setLogId
            console.log("4.Anxiety logId ===> ", logId);
            // create //
            
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: logId,
                menu_selection: menuSelect,
                running_number: 1,
                user_reply: msgText,
                userid: userID,
                status: false,
                createdate: isDate},
              };
          
            await datastore.save(task)
            console.log("5.Anxiety ===> ", "save data")
            const botReply = datastore.createQuery("unfinished_business")
              .filter('id_log', '=', 1)
              .filter('Pattern', '=', pattern)
            
            const [msgReplyTasks]  = await datastore.runQuery(botReply)
            console.log("6. Anxiety ===> ", msgReplyTasks[0].chatmsg)
            const echo = {type: 'text', text: msgReplyTasks[0].chatmsg}
            return client.replyMessage(token, echo)
        }
        /// end Anxiety Model or unfinished_business /// 
      }
 
    }


    else
    {
      console.log("else start to check check bot")
      const checkingData = datastore
      .createQuery("user_runninig_menu")
      .filter('userid', '=', userID)
      .order('id_log',{
        descending: true
      })
      .limit(1)

      const [tasksData]  = await datastore.runQuery(checkingData)
      // console.log("tasksData else ===>",tasksData)

      const countingTask = tasksData.length 
      // console.log("countingTask else ===>",countingTask)

      const chatStatus = tasksData[0].status
      // console.log("chatStatus else ===>",chatStatus)

      const setMenu = tasksData[0].menu_selection
      // console.log("setMenu else ===>",setMenu)

      let setIdCount = tasksData[0].id_log
      console.log("setIdCount else ===>",setIdCount)

      let menuRunning = tasksData[0].running_number
      // console.log("setIdCount else ===>",menuRunning)

      const setDate = new Date();
      const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+setDate.getHours()+":" + setDate.getMinutes()+":"+setDate.getSeconds()
      // console.log("isDate chatStatus ===> ", isDate)

      if(countingTask === 0)
      {
        console.log("countingTask === 0 ")
        const msgReply = {type: "text", text: "ขอโทษด้วยค่ะทางระบบเราไม่รู้จักคำดังกล่าว กรุณาใช้หน้าเมนูเพื่อเข้าสู่เนื้อหาด้วยค่ะ หรือตรวจสอบรูปแบบการส่งข้อมูลหากมีข้อสงสัยอื่นๆสามารถติดต่อได้ทางเบอร์ วิศวิน 0952512060, เวทินี 0994942426"}
        return client.replyMessage(token, msgReply)
      }
      else if(chatStatus === true)
      {
        console.log("chatStatus === true ",chatStatus )
        const replyMsg = "สำหรับวันนี้เสร็จเรียบร้อยเเล้วค่ะหากมีคำถามหรือปัญหาใด ๆ สามารถติดต่อสอบถามได้ทาง วิศวิน 0952512060, เวทินี 0994942426"
        const echo = {type: 'text', text: replyMsg}
        return client.replyMessage(token, echo)
      }
      else if(countingTask !== 0)
      {
        console.log("countingTask !== 0 ")
        if(setMenu === "savoring")
        {
          if(menuRunning === 4)
          {
            setIdCount += 1
            menuRunning += 1
            console.log("else menuRunning === 5 ",menuRunning )
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: setIdCount,
                menu_selection: setMenu,
                running_number: 0,
                user_reply: msgText,
                userid: userID,
                status: true,
                createdate: isDate}
              }
            await datastore.save(task)
            const replyBackIntervention = datastore.createQuery("relaxation_msg")
              .filter("id_log","=", menuRunning)

            const [setTasks] = await datastore.runQuery(replyBackIntervention)
            // console.log("setTasks else ===> ",setTasks) 
            const echo = {type: 'text', text: setTasks[0].chatmsg}
            return client.replyMessage(token,echo)
          }
          else
          {
            setIdCount += 1
            menuRunning += 1
            console.log("else menuRunning !== 4  ",menuRunning )
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: setIdCount,
                menu_selection: setMenu,
                running_number: menuRunning,
                user_reply: msgText,
                userid: userID,
                status: false,
                createdate: isDate}
              }
            await datastore.save(task)
            const replyBackIntervention = datastore.createQuery("relaxation_msg")
              .filter("id_log","=", menuRunning)

            const [setTasks] = await datastore.runQuery(replyBackIntervention)
            // console.log("setTasks else ===> ",setTasks) 
            const echo = {type: 'text', text: setTasks[0].chatmsg}
            return client.replyMessage(token,echo)
          }
        }  
        else if(setMenu.includes("cognitive") === true)
        {
          const setPattern = setMenu.split(":")
          const isPattern = parseInt(setPattern[1])
          const isMenuRunnining = menuRunning + 1
          
          const setMsg = datastore.createQuery("cognitive_restructuring")
            .filter("Pattern","=",isPattern)
            .filter("id_log", "=", isMenuRunnining)

          const [setTasks] = await datastore.runQuery(setMsg)
          const msgReplyBack = setTasks[0].chatmsg
          
          if(msgReplyBack === "ฝันดีนะคะ")
          {
            setIdCount += 1
            console.log("else menuRunning === ฝันดีนะคะ ",isMenuRunnining )
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: setIdCount,
                menu_selection: setMenu,
                running_number: 0,
                user_reply: msgText,
                userid: userID,
                status: true,
                createdate: isDate}
              }
            await datastore.save(task)

            const echo = {type: 'text', text: msgReplyBack}
            return client.replyMessage(token,echo)
          }
          else
          {
            setIdCount += 1
            console.log("else menuRunning !== ฝันดีนะคะ  ",isMenuRunnining )
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: setIdCount,
                menu_selection: setMenu,
                running_number: isMenuRunnining,
                user_reply: msgText,
                userid: userID,
                status: false,
                createdate: isDate}
              }
            await datastore.save(task)

            // console.log("setTasks else ===> ",setTasks) 
            const echo = {type: 'text', text: msgReplyBack}
            return client.replyMessage(token,echo)
          }
        }
        else if(setMenu.includes("Anxiety") === true)
        {
          const setPattern = setMenu.split(":")
          const isPattern = parseInt(setPattern[1])
          const isMenuRunnining = menuRunning + 1
          
          const setMsg = datastore.createQuery("unfinished_business")
            .filter("Pattern","=",isPattern)
            .filter("id_log", "=", isMenuRunnining)

          const [setTasks] = await datastore.runQuery(setMsg)
          const msgReplyBack = setTasks[0].chatmsg
          
          if(msgReplyBack === "ฝันดีนะคะ")
          {
            setIdCount += 1
            console.log("else menuRunning === ฝันดีนะคะ ",isMenuRunnining )
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: setIdCount,
                menu_selection: setMenu,
                running_number: 0,
                user_reply: msgText,
                userid: userID,
                status: true,
                createdate: isDate}
              }
            await datastore.save(task)

            const echo = {type: 'text', text: msgReplyBack}
            return client.replyMessage(token,echo)
          }
          else
          {
            setIdCount += 1
            console.log("else menuRunning !== ฝันดีนะคะ  ",isMenuRunnining )
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: setIdCount,
                menu_selection: setMenu,
                running_number: isMenuRunnining,
                user_reply: msgText,
                userid: userID,
                status: false,
                createdate: isDate}
              }
            await datastore.save(task)

            // console.log("setTasks else ===> ",setTasks) 
            const echo = {type: 'text', text: msgReplyBack}
            return client.replyMessage(token,echo)
          }
        }
      }
      
    }

//  *************************  // 
// ************ END ************  // 
//  *************************  // 
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

// ********************************* //
// ********* triggerActive ********* // 
// ********************************* //

/// ***************  ***************//
// test push random msg cognitive // 
/// ***************  ***************//

app.get('/test/earth', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U51fca2ec938022c69e9b151cef5edf35"
  if(randNum === 0)
  {
    const msgPush = cognitivePattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = cognitivePattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = cognitivePattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern3")
    res.send("OK")
  }

})


app.get('/test/peak', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "Ub4ce4ff562a58ef44876ae6aa1ca6a00"
  if(randNum === 0)
  {
    const msgPush = cognitivePattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = cognitivePattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = cognitivePattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern3")
    res.send("OK")
  }

})


app.get('/test/proud', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U4551e58d8b384c3b5129281927ee970a"
  if(randNum === 0)
  {
    const msgPush = cognitivePattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = cognitivePattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = cognitivePattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern3")
    res.send("OK")
  }

})


app.get('/test/furt', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U8fca26b624ea91100255bd2121537e50"
  if(randNum === 0)
  {
    const msgPush = cognitivePattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = cognitivePattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = cognitivePattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern3")
    res.send("OK")
  }

})


app.get('/test/ploy', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U2dbc1e671a33e8a5cabe0924be03c073"
  if(randNum === 0)
  {
    const msgPush = cognitivePattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = cognitivePattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = cognitivePattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok cognitivePattern3")
    res.send("OK")
  }

})



/// ***************  ***************//
// end push random msg cognitive // 
/// ***************  ***************//

/// ***************  ***************//
// test push random msg anxietyModel // 
/// ***************  ***************//


app.get('/test2/earth', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U51fca2ec938022c69e9b151cef5edf35"
  if(randNum === 0)
  {
    const msgPush = anxietyModelPattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = anxietyModelPattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = anxietyModelPattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern3")
    res.send("OK")
  }

})

app.get('/test2/peak', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "Ub4ce4ff562a58ef44876ae6aa1ca6a00"
  if(randNum === 0)
  {
    const msgPush = anxietyModelPattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = anxietyModelPattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = anxietyModelPattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern3")
    res.send("OK")
  }

})

app.get('/test2/proud', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U4551e58d8b384c3b5129281927ee970a"
  if(randNum === 0)
  {
    const msgPush = anxietyModelPattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = anxietyModelPattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = anxietyModelPattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern3")
    res.send("OK")
  }

})

app.get('/test2/furt', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U8fca26b624ea91100255bd2121537e50"
  if(randNum === 0)
  {
    const msgPush = anxietyModelPattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = anxietyModelPattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = anxietyModelPattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern3")
    res.send("OK")
  }

})

app.get('/test2/ploy', async (req, res) => {
  console.log('test cognitive random msg');
  const randNum = parseInt(Math.random() * 3);
  const userToken = "U2dbc1e671a33e8a5cabe0924be03c073"
  if(randNum === 0)
  {
    const msgPush = anxietyModelPattern1()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern1")
    res.send("OK")
  }
  else if(randNum === 1)
  {
    const msgPush = anxietyModelPattern2()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern2")
    res.send("OK")
  }
  else if(randNum  === 2)
  {
    const msgPush = anxietyModelPattern3()
    const echo = {type: 'flex', altText: 'this is a Flex Message', contents: msgPush}
    client.pushMessage(userToken,echo)
    console.log("push ok anxietyModelPattern3")
    res.send("OK")
  }

})

/// ***************  ***************//
// end push random msg anxietyModel // 
/// ***************  ***************//

/// ***************  ***************//
// start push random msg relax // 
/// ***************  ***************//



app.get('/jobs/earth', async (req, res) => {
 
  console.log("trigger running Earth")

  const userToken = "U51fca2ec938022c69e9b151cef5edf35"
  const msgPush = {
    type: "template",
    altText: "relaxation",
    template: relaxation()
  }

  client.pushMessage(userToken, msgPush)
  console.log("push msg to ", userToken)
  res.send("OK")

})


app.get('/jobs/peak', async (req, res) => {

 
  console.log("trigger running")

  const userToken = "Ub4ce4ff562a58ef44876ae6aa1ca6a00"
  const msgPush = {
    type: "template",
    altText: "relaxation",
    template: relaxation()
  }

  client.pushMessage(userToken, msgPush)
  console.log("push msg to ", userToken)
  res.send("OK")
  

})


app.get('/jobs/proud', async (req, res) => {

  
  console.log("trigger running")

  const userToken = "U4551e58d8b384c3b5129281927ee970a"
  const msgPush = {
    type: "template",
    altText: "relaxation",
    template: relaxation()
  }

  client.pushMessage(userToken, msgPush)
  console.log("push msg to ", userToken)
  res.send("OK")

})

app.get('/jobs/furt', async (req, res) => {

 
  console.log("trigger running")

  const userToken = "U8fca26b624ea91100255bd2121537e50"
  const msgPush = {
    type: "template",
    altText: "relaxation",
    template: relaxation()
  }

  client.pushMessage(userToken, msgPush)
  console.log("push msg to ", userToken)
  res.send("OK")

})

app.get('/jobs/ploy', async (req, res) => {

 
  console.log("trigger running")

  const userToken = "U2dbc1e671a33e8a5cabe0924be03c073"
  const msgPush = {
    type: "template",
    altText: "relaxation",
    template: relaxation()
  }

  client.pushMessage(userToken, msgPush)
  console.log("push msg to ", userToken)
  res.send("OK")

})
/// ***************  ***************//
// end push random msg relax // 
/// ***************  ***************//


// ******************************** //
// ********* End trigger ********* //
// ******************************** //

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

// add new user function // 
async function addFireStorage(userID,firstName, lastName){
  
    const kind = 'Collect_Uid';

    const taskKey = datastore.key([kind]);
    const task = {
      key: taskKey,
      data: {
        Uid: userID,
        FirstName: firstName,
        LastName: lastName
      },
    };

  await datastore.save(task);
}
 
 

// flex menu week selection // 

function getFlexMenu(uid) {
  return {
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "กำลังพัฒนา",
          "align": "center",
          "contents": []
        }
      ]
    },
    "hero": {
      "type": "image",
      "url": "https://cdn-icons.flaticon.com/png/512/294/premium/294968.png?token=exp=1636695070~hmac=36151095def36b2029f213c740c2ab61",
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
            "text": `https://storage.googleapis.com/scg_storage/demo/U55b053c3f77d8a2ac431ec34c4114539-week1.html`
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
            "uri": "https://line.me/R/nv/camera/"  
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
            "label": "ดำเนินการต่อ",
            "text": "เริ่มบันทึกข้อมูล"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ข้อสงสัยที่พบบ่อย",
            "text": "FAQ"
          }
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ติดต่อสอบถาม",
            "text": "ติดต่อสอบถาม"
        }  
      }
      ]
    },
  }
}

function testsinglog(uid){
  return{
    "type": "bubble",
    "direction": "ltr",
    "header": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "Dashboard",
          "align": "center",
          "contents": []
        }
      ]
    },
    "hero": {
      "type": "image",
      "url": "https://www.i-pic.info/i/mezQ90052.png", //"https://cdn-icons-png.flaticon.com/512/2329/2329093.png"
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
            "label": "สัปดาห์ที่1",
            "uri": `https://storage.googleapis.com/scg_storage/demo/${uid}-week1.html`  
          }
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "สัปดาห์ที่2",
            "uri": `https://storage.googleapis.com/scg_storage/demo/${uid}-week2.html`  
          }
        }
      ]
    }
  }
}

function debugtext(){
  return{

  }
}

function moodSurvey(){
  return{
    "type": "bubble",
    "direction": "ltr",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "ทางทีมงานได้รับข้อมูลเรียบร้อยค่ะ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ขั้นตอนถัดไปกรุณาตอบ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "เเบบสอบถามเพื่อประเมินระดับ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ความรุนเเรงของอาการนอน",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "ไม่หลับตามปุ่มด้านล่างได้เลยค่ะ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "ตอบเเบบสอบถาม",
            "uri": "https://docs.google.com/forms/d/e/1FAIpQLScTseorD6Q0R6gcRRh5VKZNeybHI-OL-7dyULW1QBd6H3xqrQ/viewform"
          }
        },
        {
          "type": "text",
          "text": ".",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "หลังจากตอบเเบบสอบถามเสร็จเเล้ว",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "text",
          "text": "กรุณากดปุ่มดำเนินการถัดไปด้วยค่ะ",
          "weight": "bold",
          "align": "center",
          "contents": []
        },
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "ดำเนินการถัดไป",
            "text": "ตอบเเบบสอบถามความรุนเเรงเสร็จสิ้น"
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
          "text": "____________",
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



 


 