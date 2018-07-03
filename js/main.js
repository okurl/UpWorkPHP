var siteURL = "https://tatacommunications.sharepoint.com/sites/projectmarketplace_v1";


function getTokens() {
    var userId = localStorage.getItem('userId');
    var _url = siteURL + "/_api/web/lists/getbytitle('UpWorkTokens')/items?&$select=*";
    var filter = "&$filter=EmployeeName/ID eq " + userId;
    $.ajax({
        url: _url + filter,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            console.log('UPWork Token data', data.d.results);
            if (data.d.results.length > 0) {
                $("#msg").empty();
                $("#msg").append("Login successfully. window will close automatically.");
                window.close();
            }
            else {
                saveUpWorkTokens();
            }
        },
        error: function (error) {
            console.log('Error in UPWork Tokens: ', error);
        }
    });
}

function saveUpWorkTokens() {
    var listName = 'UpWorkTokens';
    var url = "/_api/Web/Lists/getByTitle('" + listName + "')/items";
    var metaType = listName.split(" ").join("_x0020_");

    var values = {
        "__metadata": {
            type: "SP.Data." + metaType + "ListItem"
        },
        'EmployeeNameId': localStorage.getItem('userId'),
        'UpWorkToken': localStorage.getItem('access_token'),
        'UpWorkTokenSecret': localStorage.getItem('access_secret')
    }

    var _url = siteURL + "/_api/web/lists/getbytitle('UpWorkTokens')/items";

    $.ajax({
        url: _url,
        type: "POST",
        data: JSON.stringify(values),
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": localStorage.getItem('sitetoken'),
            "content-Type": "application/json;odata=verbose"
        },
        success: function (data) {
            $("#msg").empty();
            $("#msg").append("Login successfully. window will close automatically.");
            $window.close();
        },
        error: function (error) {
            console.log('Error in Add Token success: ', error);
        }
    });
}