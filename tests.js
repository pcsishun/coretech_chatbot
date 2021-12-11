let tasks = [{id_log: 10}]
let setLogId = (tasks.length === 0 || tasks.length === undefined)? 0 : tasks[0].id_log  + 1
console.log(setLogId);

const setDate = new Date();
const getDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+setDate.getHours()+":" + setDate.getMinutes()+":"+setDate.getSeconds()
console.log(getDate)


     // else if(msgText.includes("bot:") === true|| msgText.includes("bot:") === true || msgText.includes("Bot:")=== true || msgText.includes("บอท:")=== true ||  msgText.includes("บอท")=== true)
      // {
      //   console.log("bot start action")
      //   const checkLastMenu = datastore.createQuery("user_runninig_menu")
      //   .filter("userid", "=", userID) 
      //   .order('id_log',{
      //     descending: true
      //   })
      //   .limit(1)

      //   console.log("start set query")

      //   const [setMenuInter] = await datastore.runQuery(checkLastMenu)
      //   const setIsMenu = setMenuInter[0].menu_selection
      //   console.log("query data")
      //   console.log("bot SetMenuInter ===> ", setMenuInter)
      //   console.log("bot setIsMenu ===> ", setIsMenu)

      //   if(setIsMenu === "savoring"){
          
      //     const checkingData = datastore
      //       .createQuery("user_runninig_menu")
      //       .filter('userid', '=', userID)
      //       .filter('menu_selection', '=', setIsMenu)
      //       .order('id_log',{
      //         descending: true
      //       })
      //     const [setTasks] = await datastore.runQuery(checkingData)
      //     console.log("tasks savoring ===>", setTasks)
      //     const idMsgReply = setTasks[0].running_number + 1
      //     console.log("idMsgReply savoring ===>", idMsgReply)
      //     const idCount = setTasks[0].id_log + 1
      //     console.log("idCount savoring ===>", idCount)
      //     const statusCheck = setTasks[0].status
      //     console.log("statusCheck savoring ===>", idCount)
          
      //     if(idMsgReply === 5){

      //       const kind = "user_runninig_menu"
      //       const taskKey = datastore.key([kind]);
      //           const task = {
      //           key: taskKey,
      //           data: {
      //             id_log: idCount,
      //             menu_selection: setIsMenu,
      //             running_number: 0,
      //             user_reply: msgText,
      //             userid: userID,
      //             status: true
      //           }}
          
      //       await datastore.save(task)
      //       const replyBackIntervention = datastore.createQuery("relaxation_msg")
      //       .filter("id_log","=", idMsgReply)

      //       const [setTasks] = await datastore.runQuery(replyBackIntervention)
      //       const echo = {type: 'text', text: setTasks[0].chatmsg}

      //       return client.replyMessage(token,echo)

      //     }
      //     else if(statusCheck === true)
      //     {
      //       const replyMsg = "สำหรับวันนี้เสร็จเรียบร้อยเเล้วค่ะหากมีคำถามหรือปัญหาใด ๆ สามารถติดต่อสอบถามได้ทาง วิศวิน 0952512060, เวทินี 0994942426"
      //       const echo = {type: 'text', text: replyMsg}
      //       return client.replyMessage(token, echo)
      //     }
      //     else
      //     {
      //       const kind = "user_runninig_menu"
      //       const taskKey = datastore.key([kind]);
      //           const task = {
      //           key: taskKey,
      //           data: {
      //             id_log: idCount,
      //             menu_selection: setIsMenu,
      //             running_number: idMsgReply,
      //             user_reply: msgText,
      //             userid: userID,
      //             status: false
      //           }}
          
      //       await datastore.save(task)

      //       const replyBackIntervention = datastore.createQuery("relaxation_msg")
      //       .filter("id_log","=", idMsgReply)
      //       const [setTasks] = await datastore.runQuery(replyBackIntervention)
      //       console.log("setTasks else ===> ",setTasks) 
      //       const echo = {type: 'text', text: setTasks[0].chatmsg}
      //       return client.replyMessage(token,echo)

      //     }
      //   }
      // }
