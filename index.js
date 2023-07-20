const creatorOptions = {
    showLogicTab: true,
    isAutoSave: true
};

const defaultJson = {
    pages: [{
        name: "Name",
        elements: [{
            name: "FirstName",
            title: "Enter your first name:",
            type: "text"
        }, {
            name: "LastName",
            title: "Enter your last name:",
            type: "text"
        }]
    }]
};

const creator = new SurveyCreator.SurveyCreator(creatorOptions);
creator.text = window.localStorage.getItem("survey-json") || JSON.stringify(defaultJson);
// creator.text = JSON.stringify(defaultJson);
creator.saveSurveyFunc = (saveNo, callback) => { 
    window.localStorage.setItem("survey-json", creator.text);
    callback(saveNo, true);
    saveSurveyJson(
        "www.yourwebiste.com/endpoint",
        creator.JSON,
        saveNo,
        callback
    );
};

document.addEventListener("DOMContentLoaded", function() {
    creator.render("surveyCreator");
});

function saveSurveyResults(url, json) {
    var saveData = $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "text",
        success: function(resultData) { alert("Save Complete") }
  });
  saveData.error(function() { alert("Something went wrong"); });
}

function saveSurveyJson(url, json, saveNo, callback) {
    var saveData = $.ajax({
        type: 'POST',
        url: url,
        data: json,
        dataType: "text",
        success: function (resultData) {
            // alert("Save Complete");
            callback(saveNo, true);
        }
  });
    // const request = new XMLHttpRequest();
    // request.open('POST', url);
    // request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // request.addEventListener('load', () => {
    //     callback(saveNo, true);
    // });
    // request.addEventListener('error', () => {
    //     callback(saveNo, false);
    // });
    // request.send(JSON.stringify(json));
}
