
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

export default moodSurvey;