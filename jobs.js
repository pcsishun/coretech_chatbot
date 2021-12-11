// import cron from 'node-cron';
// import line from '@line/bot-sdk';
// import relaxation from './intervantion/relaxation.js'

// // export declare type TemplateMessage = MessageCommon & {
// //     type: "template";
// //     /**
// //      * Alternative text (Max: 400 characters)
// //      */
// //     altText: string;
// //     /**
// //      * Carousel template content
// //      */
// //     template: TemplateContent;
// // };





// function triggerSchedule()
// {
//     const relaxationTemplate =  relaxation()

//     const jobs = [
//         // {
//         //     username:"peak",
//         //     intervation: 'sample',
//         //     type:'text',
//         //     altText:'relaxation card',
//         //     text: "bot: ทดลอง card msg intervantion relaxation ครับ",
//         //     token:"Ub4ce4ff562a58ef44876ae6aa1ca6a00",
//         //     scheduleSet:'00 00 19 * * *'
//         // },
//         {
//             username:"peak",
//             intervation: 'relaxation',
//             type:'template',
//             altText:'relaxation card',
//             text: relaxationTemplate,
//             token:"U51fca2ec938022c69e9b151cef5edf35",
//             // scheduleSet:'00 31 19 * * *'
//             scheduleSet:'* * * * * *'
//         },
//         // {
//         //     username:"Proud",
//         //     intervation: 'sample',
//         //     type:'text',
//         //     altText:'relaxation card',
//         //     text: "bot: ทดลอง card msg intervantion relaxation ครับ",
//         //     token:"U4551e58d8b384c3b5129281927ee970a",
//         //     scheduleSet:'00 05 19 * * *'
//         // },
//         // {
//         //     username:"Proud",
//         //     intervation: 'relaxation',
//         //     type:'template',
//         //     altText:'relaxation card',
//         //     text: relaxationTemplate,
//         //     token:"U4551e58d8b384c3b5129281927ee970a",
//         //     scheduleSet:'00 06 19 * * *'
//         // },
//         // {
//         //     username:"Furt",
//         //     intervation: 'sample',
//         //     type:'text',
//         //     altText:'relaxation card',
//         //     text: "bot: ทดลอง card msg intervantion relaxation ครับ",
//         //     token:"U8fca26b624ea91100255bd2121537e50",
//         //     scheduleSet:'00 10 19 * * *'
//         // },
//         // {
//         //     username:"Furt",
//         //     intervation: 'relaxation',
//         //     type:'template',
//         //     altText:'relaxation card',
//         //     text: relaxationTemplate,
//         //     token:"U8fca26b624ea91100255bd2121537e50",
//         //     scheduleSet:'00 11 19 * * *'
//         // },
//         // {
//         //     username:"ploy",
//         //     intervation: 'sample',
//         //     type:'text',
//         //     altText:'relaxation card',
//         //     text: "bot: ทดลอง card msg intervantion relaxation ครับ",
//         //     token:"U2dbc1e671a33e8a5cabe0924be03c073",
//         //     scheduleSet:'00 15 19 * * *'
//         // },
//         // {
//         //     username:"ploy",
//         //     intervation: 'relaxation',
//         //     type:'template',
//         //     altText:'relaxation card',
//         //     text: relaxationTemplate,
//         //     token:"U2dbc1e671a33e8a5cabe0924be03c073",
//         //     scheduleSet:'00 16 19 * * *'
//         // },
//         // {
//         //     username:"Earth",
//         //     intervation: 'relaxation',
//         //     type:'template',
//         //     altText:'relaxation card',
//         //     text: relaxationTemplate,
//         //     token:"U51fca2ec938022c69e9b151cef5edf35",
//         //     scheduleSet:'00 19 * * * *'
//         // },
//         // {
//         //     username:"Earth",
//         //     intervation: 'sample',
//         //     type:'text',
//         //     altText:'relaxation card',
//         //     text: "Hello World",
//         //     token:"U51fca2ec938022c69e9b151cef5edf35",
//         //     scheduleSet:'00 10 * * * *'
//         // },
    
//     ]    

//     const client = new line.Client({
//         channelAccessToken: 'UG1DCQe0wQvks4ba3LGXIbRzzaDkD2Tljv8+yvosfoMEyQa7mkIap06rMbbDrgNjtsVOlEmNpMdcmm9b7ibREvQzresLTnXOnehsClq0cVFvAUO2qYGK0LIr1c2Ava/BRMHYfFvB4DuZRQVH2rjyfgdB04t89/1O/w1cDnyilFU='
//       });


//       const userToken = "U51fca2ec938022c69e9b151cef5edf35"
//       const msgPush = {
//         type: "template",
//         altText: "relaxation",
//         template: relaxation()
//       }

//       client.pushMessage(userToken, msgPush)
    
//     // console.log('Trigger active!')
     
//     // jobs.forEach(job => {

//     //     let message = null;

//     //     if(job.intervation === "relaxation"){
//     //         const replySet = {
//     //             type:  job.type,
//     //             altText: job.altText,
//     //             template: job.text
//     //         };
//     //         message = replySet
//     //     }
//     //     else if(job.intervation === "sample"){
//     //         const replySet = {
//     //             type:  job.type,
//     //             text: job.text
//     //         };
//     //         message = replySet
//     //     }
    
//     //     cron.schedule(job.scheduleSet, () => {
    
//     //         client.pushMessage(job.token, message)
//     //         .then(() => {
//     //             console.log('msg sending ', job.token);
//     //         })
//     //         .catch((err) => {
//     //             console.log(err)
//     //         },{
//     //             scheduled: true,
//     //             timezone: "Asia/Bangkok"
//     //         });
    
//     //     }).start();
//     // });

// }

// triggerSchedule();
// // export default triggerSchedule;

  