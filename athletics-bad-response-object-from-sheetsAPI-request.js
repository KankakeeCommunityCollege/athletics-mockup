//    THIS FILE IS DOCUMENTATION OF THE ATHLETICS WEBSITE'S GOOGLE SHEETS API
//  WHILE ATTEMPTING TO FETCH THE ENTIRE SEASON SCHEDULE (AS CALCULATED FROM 
//  THE `All Current` TAB IN THE ATHLETICS SCHEDULES SHEET)
//
//   THIS "BUG" MANIFESTS ITSELF BY THE UPCOMING GAMES WIDGET DISPLAYING THE 
//  "NO GAMES...CHECK BACK LATER" MESSAGE, WHEN THERE ARE GAMES.
//
//  THE "BAD" RESPONSE OBJECT CONTAINS EVERYTHING THE NORMAL REPONSE FROM A 
//  GOOGLE SHEETS API SHOULD HAVE IN IT.
//  THE ONLY PROBLEM IS THAT THE BODY OF THE TABLE (I.E. ALL OF OUR SCHEDULE DATA) 
//  IS RETURNED AS "#N/A"
//
//  MY SUSPICION IS THAT THE GOOGLE SHEET IS STILL CALCULATING/SORTING/QUERYING 
//  THE TABLE'S DATA BUT THE RESPONSE IS BEING SENT BACK BEFOR IT FINISHES COMPUTING 
//  THE CURRENT GAMES SCHEDULE

const BAD_GOOGLE_SHEETS_API_RESPONSE = {
  "result": {
    "range": "'All Current'!A1:Z1000",
    "majorDimension": "ROWS",
    "values": [
      [  // Array item 0
        "Start",
        "End",
        "Opponent",
        "Time",
        "Timezone",
        "Where",
        "Status",
        "Summary",
        "Sport"
      ],
      [  // Array item 1
        "#N/A"
      ]
    ]
  },
  "body": "{\n  \"range\": \"'All Current'!A1:Z1000\",\n  \"majorDimension\": \"ROWS\",\n  \"values\": [\n    [\n      \"Start\",\n      \"End\",\n      \"Opponent\",\n      \"Time\",\n      \"Timezone\",\n      \"Where\",\n      \"Status\",\n      \"Summary\",\n      \"Sport\"\n    ],\n    [\n      \"#N/A\"\n    ]\n  ]\n}\n",
  "headers": {
    "cache-control": "private",
    "content-encoding": "gzip",
    "content-length": "171",
    "content-type": "application/json; charset=UTF-8",
    "date": "Thu, 13 Aug 2020 14:56:04 GMT",
    "server": "ESF",
    "vary": "Origin, X-Origin, Referer"
  },
  "status": 200,
  "statusText": null
}

const GOOD_GOOGLE_SHEETS_API_RESPONSE = {
  "result": {
    "range": "'All Current'!A1:Z1000",
    "majorDimension": "ROWS",
    "values": [
      [
        "Start",
        "End",
        "Opponent",
        "Time",
        "Timezone",
        "Where",
        "Status",
        "Summary",
        "Sport"
      ],
      [
        "9/15/2020",
        "",
        "Olivet Nazarene University",
        "3:00 pm",
        "CST",
        "Bourbonnais",
        "",
        "",
        "Baseball"
      ],
      [
        "9/19/2020",
        "",
        "*Danville Area C.C.",
        "12:00 pm",
        "CST",
        "Danville",
        "",
        "",
        "Baseball"
      ],
      [
        "9/22/2020",
        "",
        "South Suburban College",
        "2:30 pm",
        "CST",
        "South Holland",
        "",
        "",
        "Baseball"
      ],
      [
        "9/23/2020",
        "",
        "Olivet Nazarene University",
        "3:00 pm",
        "CST",
        "Home",
        "",
        "",
        "Baseball"
      ],
      [
        "9/26/2020",
        "",
        "*Sluggers Travel Team",
        "12:30 pm",
        "CST",
        "Home",
        "",
        "",
        "Baseball"
      ],
      [
        "9/29/2020",
        "",
        "South Suburban College",
        "2:30 pm",
        "CST",
        "Home",
        "",
        "",
        "Baseball"
      ],
      [
        "10/3/2020",
        "",
        "*Olivet Nazarene University",
        "11:00 am",
        "CST",
        "Bourbonnais",
        "",
        "",
        "Baseball"
      ],
      [
        "10/9/2020",
        "",
        "*Parkland College",
        "2:00 pm",
        "CST",
        "Home",
        "",
        "",
        "Baseball"
      ],
      [
        "1/23/2021",
        "",
        "Kiswaukee C.C. ",
        "TBA",
        "CST",
        "TBA",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "1/30/2021",
        "",
        "Highland C.C.",
        "1:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/2/2021",
        "",
        "College of Dupage",
        "",
        "CST",
        "Dupage",
        "",
        "",
        "women's Basketball"
      ],
      [
        "2/4/2021",
        "",
        "Parkland College",
        "",
        "CST",
        "Champaign",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/6/2021",
        "",
        "Waubonsee C.C. ",
        "1:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/10/2021",
        "",
        "Prairie State University",
        "5:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/13/2021",
        "",
        "Sauk Valley C.C.",
        "",
        "CST",
        "Dixon",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/16/2021",
        "",
        "Rock Valley College",
        "1:00 PM",
        "CST",
        "Rockford",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/20/2021",
        "",
        "Bryant & Stratton",
        "1:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/25/2021",
        "",
        "Triton College",
        "5:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "2/27/2021",
        "",
        "Lake County College",
        "1:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "3/6/2021",
        "",
        "Moraine Valley C.C.",
        "",
        "CST",
        "Palos Hills",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "3/9/2021",
        "",
        "Illinois Central College",
        "5:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "3/13/2021",
        "",
        "Morton College",
        " ",
        "CST",
        "Cicero",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "3/18/2021",
        "",
        "South Suburban College",
        "5:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "3/20/2021",
        "",
        "Highland C.C.",
        "1:00 PM",
        "CST",
        "Freeport",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "3/23/2021",
        "",
        "Blackhawk College",
        "5:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ],
      [
        "3/25/2021",
        "",
        "Oakton C.C.",
        "5:00 PM",
        "CST",
        "Home",
        "",
        "",
        "Women's Basketball"
      ]
    ]
  },
  "body": "{\n  \"range\": \"'All Current'!A1:Z1000\",\n  \"majorDimension\": \"ROWS\",\n  \"values\": [\n    [\n      \"Start\",\n      \"End\",\n      \"Opponent\",\n      \"Time\",\n      \"Timezone\",\n      \"Where\",\n      \"Status\",\n      \"Summary\",\n      \"Sport\"\n    ],\n    [\n      \"9/15/2020\",\n      \"\",\n      \"Olivet Nazarene University\",\n      \"3:00 pm\",\n      \"CST\",\n      \"Bourbonnais\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"9/19/2020\",\n      \"\",\n      \"*Danville Area C.C.\",\n      \"12:00 pm\",\n      \"CST\",\n      \"Danville\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"9/22/2020\",\n      \"\",\n      \"South Suburban College\",\n      \"2:30 pm\",\n      \"CST\",\n      \"South Holland\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"9/23/2020\",\n      \"\",\n      \"Olivet Nazarene University\",\n      \"3:00 pm\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"9/26/2020\",\n      \"\",\n      \"*Sluggers Travel Team\",\n      \"12:30 pm\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"9/29/2020\",\n      \"\",\n      \"South Suburban College\",\n      \"2:30 pm\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"10/3/2020\",\n      \"\",\n      \"*Olivet Nazarene University\",\n      \"11:00 am\",\n      \"CST\",\n      \"Bourbonnais\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"10/9/2020\",\n      \"\",\n      \"*Parkland College\",\n      \"2:00 pm\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Baseball\"\n    ],\n    [\n      \"1/23/2021\",\n      \"\",\n      \"Kiswaukee C.C. \",\n      \"TBA\",\n      \"CST\",\n      \"TBA\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"1/30/2021\",\n      \"\",\n      \"Highland C.C.\",\n      \"1:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/2/2021\",\n      \"\",\n      \"College of Dupage\",\n      \"\",\n      \"CST\",\n      \"Dupage\",\n      \"\",\n      \"\",\n      \"women's Basketball\"\n    ],\n    [\n      \"2/4/2021\",\n      \"\",\n      \"Parkland College\",\n      \"\",\n      \"CST\",\n      \"Champaign\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/6/2021\",\n      \"\",\n      \"Waubonsee C.C. \",\n      \"1:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/10/2021\",\n      \"\",\n      \"Prairie State University\",\n      \"5:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/13/2021\",\n      \"\",\n      \"Sauk Valley C.C.\",\n      \"\",\n      \"CST\",\n      \"Dixon\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/16/2021\",\n      \"\",\n      \"Rock Valley College\",\n      \"1:00 PM\",\n      \"CST\",\n      \"Rockford\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/20/2021\",\n      \"\",\n      \"Bryant & Stratton\",\n      \"1:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/25/2021\",\n      \"\",\n      \"Triton College\",\n      \"5:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"2/27/2021\",\n      \"\",\n      \"Lake County College\",\n      \"1:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"3/6/2021\",\n      \"\",\n      \"Moraine Valley C.C.\",\n      \"\",\n      \"CST\",\n      \"Palos Hills\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"3/9/2021\",\n      \"\",\n      \"Illinois Central College\",\n      \"5:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"3/13/2021\",\n      \"\",\n      \"Morton College\",\n      \" \",\n      \"CST\",\n      \"Cicero\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"3/18/2021\",\n      \"\",\n      \"South Suburban College\",\n      \"5:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"3/20/2021\",\n      \"\",\n      \"Highland C.C.\",\n      \"1:00 PM\",\n      \"CST\",\n      \"Freeport\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"3/23/2021\",\n      \"\",\n      \"Blackhawk College\",\n      \"5:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ],\n    [\n      \"3/25/2021\",\n      \"\",\n      \"Oakton C.C.\",\n      \"5:00 PM\",\n      \"CST\",\n      \"Home\",\n      \"\",\n      \"\",\n      \"Women's Basketball\"\n    ]\n  ]\n}\n",
  "headers": {
    "cache-control": "private",
    "content-encoding": "gzip",
    "content-length": "704",
    "content-type": "application/json; charset=UTF-8",
    "date": "Thu, 13 Aug 2020 15:03:39 GMT",
    "server": "ESF",
    "vary": "Origin, X-Origin, Referer"
  },
  "status": 200,
  "statusText": null
}

