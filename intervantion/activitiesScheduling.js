function activitiesScgedulingFunc(){
    return{
        "type": "bubble",
        "direction": "ltr",
        "hero": {
          "type": "image",
          "url": "https://i.ibb.co/wsq3gsr/02.png",
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
              "text": "การยืดเส้น (stretching) ในยามเช้า",
              "align": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": "ตอนแสงแดดอุ่นๆ จะช่วยให้รู้สึก",
              "align": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": "กระปรี้กระเปร่าในระหว่างวันนะคะ",
              "align": "center",
              "contents": []
            },
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
                "label": "ฉันทำเสร็จเเล้ว",
                "text": "ฉันทำเสร็จเเล้ว!!"
              },
              "color": "#667DD2FF",
              "style": "primary"
            }
          ]
        }
      }
}

export default activitiesScgedulingFunc