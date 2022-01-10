function testsinglog(uid){
    return{
      "type": "bubble",
      "direction": "ltr",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "Dashboard",
            "align": "center",
            "contents": []
          }
        ]
      },
      "hero": {
        "type": "image",
        "url": "https://www.i-pic.info/i/mezQ90052.png", //"https://cdn-icons-png.flaticon.com/512/2329/2329093.png"
        "size": "full",
        "aspectRatio": "1.51:1",
        "aspectMode": "fit"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "สัปดาห์ที่1",
              "uri": `https://storage.googleapis.com/scg_storage/demo/${uid}-week1N.html`  
            }
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "สัปดาห์ที่2",
              "uri": `https://storage.googleapis.com/scg_storage/demo/${uid}-week2N.html`  
            }
          }
        ]
      }
    }
  }

export default testsinglog