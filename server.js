
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
import activitiesScgedulingFunc from './intervantion/activitiesScheduling.js'
import activitiesSchedulingTwo from './intervantion/activitiesSchedulingTwo.js'
import relaxationTwo from './intervantion/relaxationTwo.js'
import relaxationOneAndThree from './intervantion/relaxationOneAndThree.js'
import notificationMoodActivity from './intervantion/notificationMoodActivity.js' 
import countingStar from './countStar/countingStar.js'

import openCam from './ricemenufunction/openCam.js'
import testsinglog from './ricemenufunction/testsinglog.js'
import cors from 'cors'
// import faqMsg from './ricemenufunction/faqMsg.js'

const app = express();
app.use(cors());
const port = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const user = process.env.CLOUD_SQL_USERNAME
// const pass = process.env.CLOUD_SQL_PASSWORD
// const db = process.env.CLOUD_SQL_DATABASE_NAME
// const socketPath = process.env.CLOUD_SQL_CONNECTION_NAME
// const connection = process.env.CLOUD_SQL_CONNECTION_HOST
// const bucket = store.bucket(process.env.GCLOUD_STORAGE_BUCKET);

const gCloud = new Storage({
  keyFilename: './testdeploy-330007-cfc853e977b1.json',
  projectId: 'testdeploy-330007'
});

const bucket = gCloud.bucket('scg_storage');

const datastore = new Datastore();


// // create LINE SDK config from env variables
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
  console.log('Start....')
  let jsonfile = request.body; 
  let msgID = request.body.events[0].message.id;
  let userID = request.body.events[0].source.userId;
  let msgType = request.body.events[0].message.type;
  let msgText = request.body.events[0].message.text;
  let token = request.body.events[0].replyToken;
  console.log("start ===>",jsonfile)
 
  if(msgType === "text")
  {

    // if(msgText === "FAQ"){
    //   const msgReply = faqMsg();
    //   const echo = { type: 'flex', altText: 'This is a Flex Message', contents: msgReply };
    //   return client.replyMessage(token, echo);
    // }
    // for dev // 
    if(msgText === "!debugerTester!"){

      const debugMsg = relaxation();
      const msgDeploy = {
        type: "template",
        altText: "This is test msg!",
        template: debugMsg
      }

      console.log("debuger-tester")
      return client.pushMessage(userID, msgDeploy)
   
    } 
    else if(msgText.includes("--") === true)
    {
      const arraySplitWord = msgText.split('--');
      const lengthOfArrary = arraySplitWord.length; 

      if(lengthOfArrary === 2)
      {
          const arrayWord = msgText.split('--');
          const firstName = arrayWord[0];
          const lastName = arrayWord[1];
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

            const msgReply = "ได้รับข้อมูลเเล้วคะ"
            const echo = { type: 'text', text:msgReply};
            return client.replyMessage(token, echo);   
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
      const echo = { type: 'flex', altText: 'Dashboard', contents: msgReply };
      return client.replyMessage(token, echo);
    }
    else if (msgText === "คำถามใน Thinking Log เพื่ออัด VDO") {
      const replyFlexOpenCam = openCam()
      const echo = { type: 'flex', altText: 'เปิดกล้อง', contents: replyFlexOpenCam }
      return client.replyMessage(token, echo);
    }
    else if(msgText === "ดำเนินการ Muscle relaxation"){
      const msgReply = muscleRelaxation()
      const echo = {type: 'flex', altText: 'Muscle relaxation', contents: msgReply}
      return client.replyMessage(token, echo);
    }
    else if(msgText === "ดำเนินการ Deep slow breathing"){
      const msgReply = deepSlowBreathing()
      const echo = {type: 'flex', altText: 'Deep slow breathing', contents:msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "รายละเอียด Muscle relaxation"){
      const msgReply = "เพื่อการนอนหลับที่ผ่อนคลายในคืนนี้ เรามาผ่อนคลายกล้ามเนื้อกันนะคะ วิธีนี้เรียกว่า Progressive Muscle Relaxation คิดค้นโดยนายแพทย์ Edmund Jacobson ชาวอเมริกัน โดยใช้หลักการตั้งใจเกร็งกลุ่มกล้ามเนื้อมัดใหญ่ แล้วค่อยๆ ผ่อนคลายให้สอดคล้องกับการหายใจ เพื่อเป็นการลดสารแห่งความเครียด  ทำให้จิตใจสงบปล่อยวางความคิด ลดปฏิกริยาของร่างกายที่ตอบสนองต่อความเครียด ความกังวล ทำให้คุณภาพการนอนหลับดีขึ้นค่ะ  เรามาทำพร้อมๆ กันตาม clip ที่แนะนำได้เลยนะคะ และถ้าหากต้องการเสียงเพลงประกอบเพื่อการผ่อนคลายสามารถ click เลือกเพลงด้านล่างได้เลยค่ะ"
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
      const setDate = new Date();
      const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()

      const checkingData = datastore.createQuery("user_runninig_menu")
      .filter('userid', '=', userID)
      .order('id_log',{
        descending: true
      })
      .limit(1)
      const [tasks] = await datastore.runQuery(checkingData)
 
      let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
      const logId = setLogId
      
      const kind = "user_runninig_menu"
      const taskKey = datastore.key([kind]);
      const task = {
        key: taskKey,
        data: {
          id_log: logId,
          menu_selection: msgText,
          running_number: 0,
          user_reply: msgText,
          userid: userID,
          status: false,
          createdate: isDate}
        }
      
      await datastore.save(task)
 

      const msgReply = "Clip สาธิตการทำ Progressive Muscle Relaxation \n https://drive.google.com/file/d/1igBYZ9jknJhYmbbjdgMTX7AwaZnYH7OO/view?usp=sharing \n \n**หลังจากที่ผ่อนคลายแล้ว รู้สึกอย่างไรบ้าง อย่าลืมพิมพ์มาให้เรารู้ด้วยนะ**"
      const echo ={type:'text', text: msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "breathing Video"){
      const setDate = new Date();
      const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()

      const checkingData = datastore.createQuery("user_runninig_menu")
      .filter('userid', '=', userID)
      .order('id_log',{
        descending: true
      })
      .limit(1)
      const [tasks] = await datastore.runQuery(checkingData)
 
      let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
      const logId = setLogId
      
      const kind = "user_runninig_menu"
      const taskKey = datastore.key([kind]);
      const task = {
        key: taskKey,
        data: {
          id_log: logId,
          menu_selection: msgText,
          running_number: 0,
          user_reply: msgText,
          userid: userID,
          status: false,
          createdate: isDate}
        }
      
      await datastore.save(task)

      const msgReply = "Clip สาธิตการทำ deep-slow breathing \n https://drive.google.com/file/d/1hKHeB-V8MaER-dK6TW2K2XiVix5F6wIh/view?usp=sharing \n \n**หลังจากที่ผ่อนคลายแล้ว รู้สึกอย่างไรบ้าง อย่าลืมพิมพ์มาให้เรารู้ด้วยนะ**"
      const echo = {type:'text', text: msgReply}
      return client.replyMessage(token, echo)
    }
    else if(msgText === "Music Relax"){
      const setDate = new Date();
      const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()

      const checkingData = datastore.createQuery("user_runninig_menu")
      .filter('userid', '=', userID)
      .order('id_log',{
        descending: true
      })
      .limit(1)
      const [tasks] = await datastore.runQuery(checkingData)
 
      let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
      const logId = setLogId
      
      const kind = "user_runninig_menu"
      const taskKey = datastore.key([kind]);
      const task = {
        key: taskKey,
        data: {
          id_log: logId,
          menu_selection: msgText,
          running_number: 0,
          user_reply: msgText,
          userid: userID,
          status: false,
          createdate: isDate}
        }
      
      await datastore.save(task)

      const msgReply = "กรุณาเลือกเพลงได้ตามลิงก์ได้เลยคะ:\n 1.White Noise: https://www.youtube.com/watch?v=tjMOiabqK7A \n 2.Forest https://www.youtube.com/watch?v=1ZYbU82GVz4 \n 3.Music https://www.youtube.com/watch?v=hlWiI4xVXKY \n 4.Sea https://www.youtube.com/watch?v=PgkvwG971hw \n **หลังจากที่ผ่อนคลายแล้ว รู้สึกอย่างไรบ้าง อย่าลืมพิมพ์มาให้เรารู้ด้วยนะ**"
      const echo = {type: 'text', text: msgReply}
      return client.replyMessage(token, echo)
    }


    //  *************************  // 
    //  !! start intervention !!  // 
    //  *************************  // 


    else if(msgText.includes("สวัสดี mysleepless") === true || msgText === "ฉันทำเสร็จเเล้ว!!")
    {
      
      const setDate = new Date();
      const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()


      if(msgText.includes("สวัสดี mysleepless") === true)
      {
        const setMenuSelect = msgText.split(" ")  
        const menuSelect = setMenuSelect[2] 
        const settingMenu = menuSelect.split(":")
        const MenuIsSet = settingMenu[0]

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

          // console.log("3. Intervention ===> ", tasks)
          // console.log("3.1. Intervention ===> ", tasks.length)

          let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
          const logId = setLogId
          // console.log("logId ===> ", logId);
 
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

            // console.log("3. Intervention ===> ", "save data")

            const botReply = datastore.createQuery("relaxation_msg").filter('id_log', '=', 1)
            const [msgReplyTasks]  = await datastore.runQuery(botReply)
            // console.log("4. Intervention ===> ", msgReplyTasks[0].chatmsg)
            const echo = {type: 'text', text: msgReplyTasks[0].chatmsg}
            return client.replyMessage(token, echo)
        }
        /// End savoring ///
        /// Cognitive Restructuring ///  เรามีอะไรอยากปรึกษา cognitive
        else if(MenuIsSet === "เรามีอะไรอยากปรึกษา")
        {
          const setPattern = menuSelect.split(":");
          const convertMenu = "cognitive"
          const pattern = setPattern[1].length
          const isMenu = convertMenu+':'+pattern

            // console.log("2.cognitive ===> ", tasks)
            // console.log("3.cognitive ===> ", tasks.length)
            
            let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
            const logId = setLogId
            // console.log("4.cognitive logId ===> ", logId);
            // create //
            
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: logId,
                menu_selection: isMenu,
                running_number: 1,
                user_reply: msgText,
                userid: userID,
                status: false,
                createdate: isDate},
              };
          
            await datastore.save(task)
            // console.log("5.cognitive ===> ", "save data")
            const botReply = datastore.createQuery("cognitive_restructuring")
              .filter('id_log', '=', 1)
              .filter('Pattern', '=', pattern)
            
            const [msgReplyTasks]  = await datastore.runQuery(botReply)
            // console.log("6. cognitive ===> ", msgReplyTasks[0].chatmsg)
            const echo = {type: 'text', text: msgReplyTasks[0].chatmsg}
            return client.replyMessage(token, echo)
        }
        /// End Cognitive Restructuring /// 
        /// start Anxiety Model or unfinished_business ///  
        else if(MenuIsSet === "เรามีอะไรอยากปรึกษาหน่อย")
        {
          const setPattern = menuSelect.split(":");
          const convertMenu = "Anxiety"
          const pattern = setPattern[1].length
          const isMenu = convertMenu+':'+pattern

            // console.log("2.Anxiety ===> ", tasks)
            // console.log("3.Anxiety ===> ", tasks.length)
            
            let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
            const logId = setLogId
            // console.log("4.Anxiety logId ===> ", logId);
            // create //
            
            const kind = "user_runninig_menu"
            const taskKey = datastore.key([kind]);
            const task = {
              key: taskKey,
              data: {
                id_log: logId,
                menu_selection: isMenu,
                running_number: 1,
                user_reply: msgText,
                userid: userID,
                status: false,
                createdate: isDate},
              };
          
            await datastore.save(task)
            // console.log("5.Anxiety ===> ", "save data")
            const botReply = datastore.createQuery("unfinished_business")
              .filter('id_log', '=', 1)
              .filter('Pattern', '=', pattern)
            
            const [msgReplyTasks]  = await datastore.runQuery(botReply)
            // console.log("6. Anxiety ===> ", msgReplyTasks[0].chatmsg)
            const echo = {type: 'text', text: msgReplyTasks[0].chatmsg}
            return client.replyMessage(token, echo)
        }
        /// end Anxiety Model or unfinished_business /// 
      }
      if(msgText === "ฉันทำเสร็จเเล้ว!!")
      {
        const setDate = new Date();
        const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()

        const kind = "card_menu_select"
        const taskKey = datastore.key([kind]);
        const task = {
                key: taskKey,
                data: {
                  createDateTime: isDate,
                  menu_name: "Activities_Scheduling",
                  userid: userID
                },
              };

        await datastore.save(task)

        const finshTaskChat = datastore.createQuery("user_runninig_menu")
        .filter("userid",'=', userID)
        const finshTaskActive = datastore.createQuery("card_menu_select")
        .filter("userid",'=', userID)
    
        const [taskChat] = await datastore.runQuery(finshTaskChat)
        const [taskActive] = await datastore.runQuery(finshTaskActive)
        let countingStarChat = 0;
        let countingStarActive = 0;
    
        taskChat.forEach(element => {
            if(element['status'] === true)
            {
                countingStarChat += 1
            }
        });
    
        taskActive.forEach(element =>{
            if(element['menu_name'] === "Activities_Scheduling")
            {
                countingStarActive += 1
            }
        });
    
        const setInter = countingStarChat + countingStarActive;
        let setStar = ""
        for(let i = 0; i < setInter; i++){
            setStar += "\uDBC0\uDCB2"
        }
        const msgReply = "บันทึกข้อมูลเรียบร้อยคะ ขอให้วันนี้เป็นวันที่ดีสำหรับท่านนะคะ :) "+"\n\n คะเเนนสะสมของคุณในขณะนี้ค่ะ \n"+setStar
        const echo = {type:'text', text: msgReply}
        return client.replyMessage(token, echo)
      }
   
    }


    else
    {
      // console.log("else start to check check bot")
      const checkingData = datastore
      .createQuery("user_runninig_menu")
      .filter('userid', '=', userID)
      .order('id_log',{
        descending: true
      })
      .limit(1)

      const [tasksData]  = await datastore.runQuery(checkingData)
      const countingTask = tasksData.length 
      const chatStatus = tasksData[0].status
      const setMenu = tasksData[0].menu_selection
      let setIdCount = tasksData[0].id_log
      let menuRunning = tasksData[0].running_number
      const setDate = new Date();
      const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()

      if(countingTask === 0)
      {
        // console.log("countingTask === 0 ")
        const msgReply = {type: "text", text: "ขอโทษด้วยค่ะทางระบบเราไม่รู้จักคำดังกล่าว กรุณาใช้หน้าเมนูเพื่อเข้าสู่เนื้อหาด้วยค่ะ หรือตรวจสอบรูปแบบการส่งข้อมูลหากมีข้อสงสัยอื่นๆสามารถติดต่อได้ทางเบอร์ วิศวิน 0952512060, เวทินี 0994942426"}
        return client.replyMessage(token, msgReply)
      }
      else if(chatStatus === true)
      {
        // console.log("chatStatus === true ",chatStatus )
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

            const finshTaskChat = datastore.createQuery("user_runninig_menu")
              .filter("userid",'=', userID)
          
            const finshTaskActive = datastore.createQuery("card_menu_select")
              .filter("userid",'=', userID)
            
            const [setTasks] = await datastore.runQuery(replyBackIntervention)
            const [taskChat] = await datastore.runQuery(finshTaskChat)
            const [taskActive] = await datastore.runQuery(finshTaskActive)

            let countingStarChat = 0;
            let countingStarActive = 0;
          
            taskChat.forEach(element => {
                  if(element['status'] === true)
                  {
                      countingStarChat += 1
                  }
              });
          
            taskActive.forEach(element =>{
                  if(element['menu_name'] === "Activities_Scheduling")
                  {
                      countingStarActive += 1
                  }
              });
          
            const setInter = countingStarChat + countingStarActive;
            let setStar = ""
            for(let i = 0; i < setInter; i++){
              setStar += "\uDBC0\uDCB2"
            }

            
            // console.log("setTasks else ===> ",setTasks) 
            const echo = {type: 'text', text: setTasks[0].chatmsg+"\n\n คะเเนนสะสมของคุณในขณะนี้ค่ะ \n"+setStar}
            return client.replyMessage(token,echo)
          }
          else
          {
            setIdCount += 1
            menuRunning += 1
            // console.log("else menuRunning !== 4  ",menuRunning )
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
          
          if(msgReplyBack === "ฝันดีนะคะ" ||  msgReplyBack.includes("นะคะ ฝันดีค่ะ") === true)
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

            const finshTaskChat = datastore.createQuery("user_runninig_menu")
            .filter("userid",'=', userID)
            const finshTaskActive = datastore.createQuery("card_menu_select")
            .filter("userid",'=', userID)
        
            const [taskChat] = await datastore.runQuery(finshTaskChat)
            const [taskActive] = await datastore.runQuery(finshTaskActive)
            let countingStarChat = 0;
            let countingStarActive = 0;
        
            taskChat.forEach(element => {
                if(element['status'] === true)
                {
                    countingStarChat += 1
                }
            });
        
            taskActive.forEach(element =>{
                if(element['menu_name'] === "Activities_Scheduling")
                {
                    countingStarActive += 1
                }
            });
        
            const setInter = countingStarChat + countingStarActive;
            let setStar = ""
            for(let i = 0; i < setInter; i++){
                setStar += "\uDBC0\uDCB2"
            }

            const echo = {type: 'text', text: msgReplyBack+"\n\n คะเเนนสะสมของคุณในขณะนี้ค่ะ \n"+setStar}
            return client.replyMessage(token,echo)
          }
          else
          {
            setIdCount += 1
            // console.log("else menuRunning !== ฝันดีนะคะ  ",isMenuRunnining )
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
          
          if(msgReplyBack === "ฝันดีนะคะ" || msgReplyBack.includes("นะคะ ฝันดีค่ะ") === true)
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

            const finshTaskChat = datastore.createQuery("user_runninig_menu")
            .filter("userid",'=', userID)
            const finshTaskActive = datastore.createQuery("card_menu_select")
            .filter("userid",'=', userID)
        
            const [taskChat] = await datastore.runQuery(finshTaskChat)
            const [taskActive] = await datastore.runQuery(finshTaskActive)
            let countingStarChat = 0;
            let countingStarActive = 0;
        
            taskChat.forEach(element => {
                if(element['status'] === true)
                {
                    countingStarChat += 1
                }
            });
        
            taskActive.forEach(element =>{
                if(element['menu_name'] === "Activities_Scheduling")
                {
                    countingStarActive += 1
                }
            });
        
            const setInter = countingStarChat + countingStarActive;
            let setStar = ""
            for(let i = 0; i < setInter; i++){
                setStar += "\uDBC0\uDCB2"
            }
            const echo = {type: 'text', text: msgReplyBack+"\n\n คะเเนนสะสมของคุณในขณะนี้ค่ะ \n"+setStar}
            return client.replyMessage(token,echo)
          }
          else
          {
            setIdCount += 1
            // console.log("else menuRunning !== ฝันดีนะคะ  ",isMenuRunnining )
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
        else if(setMenu.includes("Muscle relax") === true || setMenu.includes("Music Relax") === true || setMenu.includes("breathing Video") === true)
        {
          setIdCount += 1
          const isMenuRunnining = menuRunning + 1

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
              status: true,
              createdate: isDate}
            }
          
            await datastore.save(task)

            const finshTaskChat = datastore.createQuery("user_runninig_menu")
            .filter("userid",'=', userID)
            const finshTaskActive = datastore.createQuery("card_menu_select")
            .filter("userid",'=', userID)
        
            const [taskChat] = await datastore.runQuery(finshTaskChat)
            const [taskActive] = await datastore.runQuery(finshTaskActive)
            let countingStarChat = 0;
            let countingStarActive = 0;
        
            taskChat.forEach(element => {
                if(element['status'] === true)
                {
                    countingStarChat += 1
                }
            });
        
            taskActive.forEach(element =>{
                if(element['menu_name'] === "Activities_Scheduling")
                {
                    countingStarActive += 1
                }
            });
        
            const setInter = countingStarChat + countingStarActive;
            let setStar = ""
            for(let i = 0; i < setInter; i++){
                setStar += "\uDBC0\uDCB2"
            }

            const echo = {type: 'text', text: "เราได้รับข้อมูลเเล้วค่ะ การเข้านอนเป็นอีกเรื่องหนึ่งที่เราทำได้เลย ณ ขณะนี้  ผ่อนคลายแล้วหลับตาลง นอนใต้ผ้าห่มอุ่นๆ นะคะ ฝันดีค่ะ"+"\n\n คะเเนนสะสมของคุณในขณะนี้ค่ะ \n"+setStar}
            return client.replyMessage(token,echo)
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
// iat web app api //
app.post("/savedata", async (req, res) => {
  const setDate = new Date();
  const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()
 
  const userEmail = req.body.userEmail
  const userName = req.body.userName
  const doTask = req.body.doTask
  const selection = req.body.selection
  const timer = req.body.timer

  const kind = "users_iat"
  const taskKey = datastore.key([kind]);
  const task = {
    key: taskKey,
    data: {
      doTask:doTask,
      isDate: isDate, 
      selection: selection,
      timer:timer,
      userEmail: userEmail,
      userName: userName
    }
    }
  
  await datastore.save(task)
  
  res.send(200)
})

// for data-sci using // 

// https://testdeploy-330007.as.r.appspot.com/dataout/userreply // 
app.get("/dataout/userreply", async (req, res) =>{
  const dataOut = datastore.createQuery("user_runninig_menu")
  const [tasks]  = await datastore.runQuery(dataOut)
  res.send(tasks)
})

// https://testdeploy-330007.as.r.appspot.com/dataout/usercard // 
app.get("/dataout/usercard", async (req, res) =>{
  const dataOut = datastore.createQuery("card_menu_select")
  const [tasks]  = await datastore.runQuery(dataOut)
  res.send(tasks)
})

// https://testdeploy-330007.as.r.appspot.com/menu/relaxation // 
app.get("/menu/relaxation", async (req, res) =>{
  const dataOut = datastore.createQuery("relaxation_msg")
  const [tasks]  = await datastore.runQuery(dataOut)
  res.send(tasks)
})

// https://testdeploy-330007.as.r.appspot.com/menu/cognitive // 
app.get("/menu/cognitive", async (req, res) =>{
  const dataOut = datastore.createQuery("cognitive_restructuring")
  const [tasks]  = await datastore.runQuery(dataOut)
  res.send(tasks)
})

// https://testdeploy-330007.as.r.appspot.com/menu/anxiety // 
app.get("/menu/anxiety", async (req, res) =>{
  const dataOut = datastore.createQuery("unfinished_business")
  const [tasks]  = await datastore.runQuery(dataOut)
  res.send(tasks)
})
 

app.get('/test/inter/:menu/:userid/:pattern', (req, res) => {
  const pattern = parseInt(req.params.pattern);
  const userid = req.params.userid
  const setMenu = parseInt(req.params.menu)
  if(setMenu === 0)
  {
    const msgPush = {
      type: "template",
      altText: "เเจ้งเตือน Intervention ค่ะ",
      template: relaxation()
    }

    client.pushMessage(userid, msgPush)
    console.log("push msg to ", userid, pattern)
    res.send("OK")
  }
  else if(setMenu === 1)
  {
    if(pattern === 1)
    {
      const msgPush = cognitivePattern1()
      const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
      client.pushMessage(userid,echo)
      console.log("push ok cognitivePattern1")
      res.send("OK")
    }
    else if(pattern === 2)
    {
      const msgPush = cognitivePattern2()
      const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
      client.pushMessage(userid,echo)
      console.log("push ok cognitivePattern1")
      res.send("OK")
    }
    else if(pattern === 3)
    {
      const msgPush = cognitivePattern3()
      const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
      client.pushMessage(userid,echo)
      console.log("push ok cognitivePattern1")
      res.send("OK")
    }
  }
  else if(setMenu === 2)
  {
    if(pattern === 1)
    {
      const msgPush = anxietyModelPattern1()
      const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
      client.pushMessage(userid,echo)
      console.log("push ok anxietyModelPattern1")
      res.send("OK")
    }
    else if(pattern === 2)
    {
      const msgPush = anxietyModelPattern2()
      const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
      client.pushMessage(userid,echo)
      console.log("push ok anxietyModelPattern1")
      res.send("OK")
    }
    else if(pattern === 3)
    {
      const msgPush = anxietyModelPattern3()
      const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
      client.pushMessage(userid,echo)
      console.log("push ok anxietyModelPattern1")
      res.send("OK")
    }
  }
  else if(setMenu === 4)
  {
      const msgPush = activitiesSchedulingTwo()
      const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
      client.pushMessage(userid,echo)
      console.log("push ok activitiesScgedulingFunc")
      res.send("OK")
  }
  else if(setMenu === 5)
  {
    const msgPush = activitiesScgedulingFunc()
    const echo = {type: 'flex', altText: 'เเจ้งเตือน Intervention ค่ะ', contents: msgPush}
    client.pushMessage(userid,echo)
    console.log("push ok activitiesScgedulingFunc")
    res.send("OK")
  }
  else if(setMenu ===6)
  {
    const msgPush = {
      type: "template",
      altText: "relaxation",
      template: relaxationTwo()
    }

    client.pushMessage(userid, msgPush)
    console.log("push ok relaxationTwo")
    res.send("OK")
  }
  else if(setMenu ===7)
  {
    const imageSend = {
      type: "image",
      originalContentUrl: "https://i.ibb.co/ryHgFz4/Q1.png",
      previewImageUrl: "https://i.ibb.co/ryHgFz4/Q1.png"
    }
    client.pushMessage(userid, imageSend)
    res.send("ok")
  }
  else if(setMenu ===8)
  {
    const userToken = [
      'U51fca2ec938022c69e9b151cef5edf35',
      'U2dbc1e671a33e8a5cabe0924be03c073',
    ]
    const imageSend = {
      type: "image",
      originalContentUrl: "https://i.ibb.co/jwgYcDs/Q2.png",
      previewImageUrl: "https://i.ibb.co/jwgYcDs/Q2.png"
    }
  
    client.multicast(userToken, imageSend)
    res.send("ok")
  }
  else if(setMenu === 9)
  {
    const setFlex = notificationMoodActivity()
    const setUserToken = ['U51fca2ec938022c69e9b151cef5edf35','U8fca26b624ea91100255bd2121537e50','U2dbc1e671a33e8a5cabe0924be03c073','U464e7ff02d83e76ecd3fb3081d21343d']
    const setMsg = {type: 'flex', altText: 'this is a Flex Message', contents: setFlex}
    client.multicast(setUserToken, setMsg)
    res.send('ok')
  }
  else if(setMenu === 10)
  {
    console.log('set menu',setMenu)
    const msgPush = {
      type: "template",
      altText: "relaxation",
      template: relaxationOneAndThree()
    }

    client.pushMessage(userid, msgPush)
    console.log("push ok relaxationTwo")
    res.send("OK")
  }
  else if(setMenu === 11)
  {
    const testMenu =  Math.floor(Math.random() * 3)
    const msgReply = {type: "text", text:`my set menu is ${testMenu}`}
    client.pushMessage(userid, msgReply)
    res.send("OK")
  }
  else if(setMenu === 12)
  {
    countingStar(userid)
    res.send("OK")
 
  }
})

 

// q1 //   U4551e58d8b384c3b5129281927ee970a  https://i.ibb.co/c3CgXmq/3-02.png
app.get("/once/q1", (req, res)=>{
  const userToken = ["U51fca2ec938022c69e9b151cef5edf35",
                    "Uc6604bf4f9659750e0caec4dd9776ca6",
                    'U1fc2587db1fedf8059e7af38886c6768',
                    'Ud5cfd4fd0279342c7764eee428947453',
                    'U0beb0ecbd2d0a2951f76dbaf629f0ecc',
                    'U84ec9a53698518ed84ac3c598c725c5f',
                    'Ueb815a96c38ec3829e166b18dd22f81f',
                    'U47b6099ed8408297f2070a3cfc3fb3db',
                    'U3b00d41609c9fb52e543d450de386373',
                    'Uf5d2750cd6074cadb875a16d42a4b391',
                    'Ud67028a74ad259f7af0b627ac21ba793',
                    'Ub45121a255e0c55c641c4c320f3bb68c',
                    'Ub4ce8f3d505f73a3aad1b1ee99130404',
                    'U46a233d655310067e87cfdd98ef16d6e',
                    'U31c6bdae5eeb3be87053099deedb0436',
                    'U455dad0a1990f64ef56f70d4dc120c3b',
                    'U53f1ae5ad9b8f120c01490dc32ff1052',
                    'U4119c1f79108bf8e66f9085d6d53ebc2',
                    'U108ab6f709ac68726e233d6c42317299',
                    'Ufacd5b50e912cd84aba9628fde69f58a',
                    'Udcc650d055214b78a1bfdc4d7a198fc8',
                    'Ua583ca34bf12625a18dc60996e994b67',
                    'U3f2d23d0355119654b49741c6297d7e5',
                    'U4551e58d8b384c3b5129281927ee970a',
                    'Ub4ce4ff562a58ef44876ae6aa1ca6a00',
                    'U2dbc1e671a33e8a5cabe0924be03c073',
                    'U464e7ff02d83e76ecd3fb3081d21343d'
                  ]

  const imageSend = {
    type: "image",
    originalContentUrl: "https://i.ibb.co/tqBdZ1P/1-01.png",
    previewImageUrl: "https://i.ibb.co/tqBdZ1P/1-01.png"
  }
  client.multicast(userToken, imageSend)
  res.send("ok")
})


app.get("/once/q2", (req, res)=>{
  const userToken = ["U51fca2ec938022c69e9b151cef5edf35",
                    "Uc6604bf4f9659750e0caec4dd9776ca6",
                    'U1fc2587db1fedf8059e7af38886c6768',
                    'Ud5cfd4fd0279342c7764eee428947453',
                    'U0beb0ecbd2d0a2951f76dbaf629f0ecc',
                    'U84ec9a53698518ed84ac3c598c725c5f',
                    'Ueb815a96c38ec3829e166b18dd22f81f',
                    'U47b6099ed8408297f2070a3cfc3fb3db',
                    'U3b00d41609c9fb52e543d450de386373',
                    'Uf5d2750cd6074cadb875a16d42a4b391',
                    'Ud67028a74ad259f7af0b627ac21ba793',
                    'Ub45121a255e0c55c641c4c320f3bb68c',
                    'Ub4ce8f3d505f73a3aad1b1ee99130404',
                    'U46a233d655310067e87cfdd98ef16d6e',
                    'U31c6bdae5eeb3be87053099deedb0436',
                    'U455dad0a1990f64ef56f70d4dc120c3b',
                    'U53f1ae5ad9b8f120c01490dc32ff1052',
                    'U4119c1f79108bf8e66f9085d6d53ebc2',
                    'U108ab6f709ac68726e233d6c42317299',
                    'Ufacd5b50e912cd84aba9628fde69f58a',
                    'Udcc650d055214b78a1bfdc4d7a198fc8',
                    'Ua583ca34bf12625a18dc60996e994b67',
                    'U3f2d23d0355119654b49741c6297d7e5',
                    'U4551e58d8b384c3b5129281927ee970a',
                    'Ub4ce4ff562a58ef44876ae6aa1ca6a00',
                    'U2dbc1e671a33e8a5cabe0924be03c073',
                    'U464e7ff02d83e76ecd3fb3081d21343d'
                  ]
                  
  const imageSend = {
    type: "image",
    originalContentUrl: "https://i.ibb.co/c3CgXmq/3-02.png",
    previewImageUrl: "https://i.ibb.co/c3CgXmq/3-02.png"
  }
  client.multicast(userToken, imageSend)
  res.send("ok")
})
 


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

// // add new user function // 
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
 
 



app.listen(port, () => {
  console.log(`serve run at port ${port}`)
});



 


 