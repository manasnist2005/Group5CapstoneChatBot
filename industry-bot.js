var loadingMsgIndex,
    botui = new BotUI('industry-bot'),
    country = 'Country_01',
    local = 'Local_01',
	gender = 'Male',
	isection = 'Metal',
	eType = 'Employee',
    API = 'https://api.github.com/repos/'	;

botui.message
  .bot('Select your country :')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, 
      action: [{
        text: 'Country_01',
        value: 'Country_01'
      }, {
        text: 'Country_02',
        value: 'Country_02'
      }, {
        text: 'Country_03',
        value: 'Country_03'
      }]
    })
}).then(function (res) {
   
    botui.message.human({
      delay: 500,
      content: res.value
    });
	country = res.value;
	askLocal();
  
});

var askLocal = function () {
	
if(country == 'Country_01'){
	botui.message
  .bot('Select your Local :')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, 
      action: [{
        text: 'Local_01',
        value: 'Local_01'
      }, {
        text: 'Local_03',
        value: 'Local_03'
      }, {
        text: 'Local_04',
        value: 'Local_04'
      }
	  , {
        text: 'Local_06',
        value: 'Local_06'
      }, {
        text: 'Local_11',
        value: 'Local_11'
      }]
    })
}).then(function (res) {
   
    botui.message.human({
      delay: 500,
      content: res.value
    });
	local = res.value;
	askIndustrySection();
});
	}
else if(country == 'Country_02'){
	botui.message
  .bot('Select your Local :')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, 
      action: [{
        text: 'Local_02',
        value: 'Local_02'
      }, {
        text: 'Local_05',
        value: 'Local_05'
      }, {
        text: 'Local_07',
        value: 'Local_07'
      }
	  , {
        text: 'Local_08',
        value: 'Local_08'
      }, {
        text: 'Local_09',
        value: 'Local_09'
      }, {
        text: 'Local_12',
        value: 'Local_12'
      }
	  ]
    })
}).then(function (res) {
   
    botui.message.human({
      delay: 500,
      content: res.value
    });
	local = res.value;
	askIndustrySection();
});
}

else{
	botui.message
  .bot('Select your Local :')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, 
      action: [{
        text: 'Local_10',
        value: 'Local_10'
      }]
    })
}).then(function (res) {
   
    botui.message.human({
      delay: 500,
      content: res.value
    });
	local = res.value;
	askIndustrySection();
  
});
}

}

var askIndustrySection = function () {
	botui.message
  .bot('Select your Industry Section :')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, 
      action: [{
        text: 'Mining',
        value: 'Mining'
      },{
        text: 'Metals',
        value: 'Metals'
      },{
        text: 'others',
        value: 'others'
      }]
    })
}).then(function (res) {
   
    botui.message.human({
      delay: 500,
      content: res.value
    });
	isection = res.value;
	askEType();
});

}

var askEType = function () {
	botui.message
  .bot('Select your Employee Type :')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, 
      action: [{
        text: 'Employee',
        value: 'Employee'
      },{
        text: 'Third Party',
        value: 'Third Party'
      },{
        text: 'Third Party (Remote)',
        value: 'Third Party (Remote)'
      }]
    })
}).then(function (res) {
   
    botui.message.human({
      delay: 500,
      content: res.value
    });
	eType = res.value;
	askGender();
	
});

}



var askGender = function () {
	botui.message
  .bot('Select your Gender :')
  .then(function () {
    return botui.action.button({
      delay: 1000,
      addMessage: false, 
      action: [{
        text: 'Male',
        value: 'Male'
      },{
        text: 'Female',
        value: 'Female'
      }]
    })
}).then(function (res) {
   
    botui.message.human({
      delay: 500,
      content: res.value
    });
	gender = res.value;
	init();
});
}

function sendXHR(repo, cb) {
  var xhr = new XMLHttpRequest();
  var self = this;
  xhr.open('GET', API + repo);
  xhr.onload = function () {
    var res = JSON.parse(xhr.responseText)
    cb(res.stargazers_count);
  }
  xhr.send();
}

function init() {
  botui.message
  .bot({
    delay: 1000,
    content: 'Enter the keyword to find the accident level:'
  })
  .then(function () {
    return botui.action.text({
      delay: 1000,
      action: {
        value: 'pulley',
        placeholder: 'pulley'
      }
    })
  }).then(function (res) {
    loadingMsgIndex = botui.message.bot({
      delay: 200,
      loading: true
    }).then(function (index) {
      loadingMsgIndex = index;
      sendXHR1(res.value)
    });
  });
}

function showStars(stars) {
  botui.message
  .update(loadingMsgIndex, {
    content: 'it has !(star) ' + (stars || "0") + ' stars.'
  })
  .then(init); // ask again for repo. Keep in loop.
}


function sendXHR1(key) {
  var alvl = LoadJson(key);
  showAccidentLevel(alvl);
}

function LoadJson(key){
	var url = "url?data=" + encodeURIComponent(JSON.stringify({"country": country, "local": local, "gender": gender, "isection": isection, "eType": eType}));
	console.log(url);
	var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://localhost:7071/json1.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
return(json[key]);
console.log(json[key]);
}

function showAccidentLevel(lvl) {
  botui.message
  .update(loadingMsgIndex, {
    content: 'Accident Level :' + (lvl || "Not found")  
  })
  .then(init); // ask again for repo. Keep in loop.
}



