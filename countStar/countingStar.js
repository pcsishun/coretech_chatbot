import {Datastore} from '@google-cloud/datastore';
import line from '@line/bot-sdk';
const datastore = new Datastore();
 
const config = {
 
    channelAccessToken: 'UG1DCQe0wQvks4ba3LGXIbRzzaDkD2Tljv8+yvosfoMEyQa7mkIap06rMbbDrgNjtsVOlEmNpMdcmm9b7ibREvQzresLTnXOnehsClq0cVFvAUO2qYGK0LIr1c2Ava/BRMHYfFvB4DuZRQVH2rjyfgdB04t89/1O/w1cDnyilFU=',
    channelSecret: '2d77e494b5df69802310eb1f1d1a933b'
  };
   
 
const client = new line.Client(config);

//  start counting 	 5ac21a18040ab15980c9b43e  215//
async function countingStar(userUid){
    const userid = userUid;
    const finshTaskChat = datastore.createQuery("user_runninig_menu")
    .filter("userid",'=', userid)

    const finshTaskActive = datastore.createQuery("card_menu_select")
    .filter("userid",'=', userid)

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

    const msgReply = {
      type: 'text',
      text: "your score = " + setStar,
    }
    client.pushMessage(userid, msgReply)
    
}

export default countingStar;