const BAD_RESPONSE = {
  "result": {
    "range": "'Volleyball Current'!A1:Z1000",
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
        "Loading..."
      ]
    ]
  },
  "body": "{\n  \"range\": \"'Volleyball Current'!A1:Z1000\",\n  \"majorDimension\": \"ROWS\",\n  \"values\": [\n    [\n      \"Start\",\n      \"End\",\n      \"Opponent\",\n      \"Time\",\n      \"Timezone\",\n      \"Where\",\n      \"Status\",\n      \"Summary\",\n      \"Sport\"\n    ],\n    [\n      \"Loading...\"\n    ]\n  ]\n}\n",
  "headers": {
    "cache-control": "private",
    "content-encoding": "gzip",
    "content-length": "182",
    "content-type": "application/json; charset=UTF-8",
    "date": "Wed, 26 Aug 2020 17:33:30 GMT",
    "server": "ESF",
    "vary": "Origin, X-Origin, Referer"
  },
  "status": 200,
  "statusText": null
}