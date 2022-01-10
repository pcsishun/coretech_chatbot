function muscleRelaxation(){
    return  {
        "type": "bubble",
        "direction": "ltr",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Progressive - Muscle relaxation",
              "weight": "bold",
              "align": "center",
              "contents": []
            }
          ]
        },
        "hero": {
          "type": "image",
          "url": "https://i.ibb.co/qJqkYHz/progressive1-02.png",
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
              "text": "มาเริ่มผ่อนคลายตามขั้นตอนนึ้ได้เลยค่ะ",
              "weight": "bold",
              "align": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": ".",
              "color": "#FFFFFFFF",
              "align": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": "1. Clip สาธิตบอกวิธีการทำ progressive",
              "align": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": " muscle relaxation",
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
              "type": "text",
              "text": "2. เลือกเปิดเพลง 20 นาที",
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
                "label": "ดู Clip สาธิต",
                "text": "Muscle relax"
              },
              "color": "#667DD2FF",
              "style": "primary"
            },
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "เลือกเพลง",
                "text": "Music Relax"
              },
              "color": "#567B54FF",
              "style": "primary"
            }
          ]
        }
      }
}

export default muscleRelaxation; 