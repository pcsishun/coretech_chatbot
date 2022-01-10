function notificationMoodActivity(){
    return{
        "type": "bubble",
        "direction": "ltr",
        "header": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "Notification",
              "weight": "bold",
              "align": "center",
              "contents": []
            }
          ]
        },
        "hero": {
          "type": "image",
          "url": "https://i.ibb.co/f4yp4bK/set.png",
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
              "text": "เเจ้งเตือน อย่าลืมทำ Activity log ",
              "align": "center",
              "contents": []
            },
            {
              "type": "text",
              "text": "เเละ Mood log ด้วยนะคะ",
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
                "label": "Activity log ",
                "uri": "https://forms.gle/tD21zfY57AtF5kFN6"
              },
              "color": "#667DD2FF",
              "style": "primary"
            },
            {
              "type": "button",
              "action": {
                "type": "uri",
                "label": "Mood log",
                "uri": "https://emotionalgalaxywebapp.web.app"
              },
              "color": "#29593DFF",
              "style": "primary"
            }
          ]
        }
      }
}

export default notificationMoodActivity;