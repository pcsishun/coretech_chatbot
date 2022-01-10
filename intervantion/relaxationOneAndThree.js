function relaxationOneAndThree(){
    return{
      "type": "carousel",
      "columns": [
          {
            "thumbnailImageUrl": "https://i.ibb.co/6tTfWY4/progessive-02.png",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Muscle relaxation",
            "text": "มาผ่อนคลายกล้ามเนื้อกันด้วย Progressive Muscle Relaxation",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "https://i.ibb.co/6tTfWY4/progessive-02.png"
            },
            "actions": [
                {
                    "type": "message",
                    "label": "ดำเนินการ",
                    "text": "ดำเนินการ Muscle relaxation"
                },
                {
                    "type": "message",
                    "label": "รายละเอียด",
                    "text": "รายละเอียด Muscle relaxation"
                }
            ]
          },
          {
            "thumbnailImageUrl": "https://i.ibb.co/sH3VbFB/chatbot-chatbot.png",
            "imageBackgroundColor": "#000000",
            "title": "Talk with Chat bot",
            "text":"นึกถึงเรื่องราวที่เกิดขึ้นระหว่างวันทบทวนสิ่งที่เกิดขึ้น",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "https://i.ibb.co/sH3VbFB/chatbot-chatbot.png"
            },
            "actions": [
                {
                    "type": "message",
                    "label": "เริ่มต้นพูดคุย",
                    "text": "สวัสดี mysleepless savoring"
                },
                {
                    "type": "message",
                    "label": "รายละเอียด",
                    "text": "รายละเอียด Savoring"
                }
            ]
          },
      ],
      "imageAspectRatio": "rectangle",
      "imageSize": "cover"
    }
}

export default  relaxationOneAndThree; 