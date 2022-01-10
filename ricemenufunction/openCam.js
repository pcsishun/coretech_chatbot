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

export default openCam; 