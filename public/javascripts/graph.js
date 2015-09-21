/**
 * Created by tanguycoenen on 20/09/15.
 */

$(document).ready ( function(){
    var request = new XMLHttpRequest();
    request.open("GET", "file.json", false);
    request.send(null)
    var my_JSON_object = JSON.parse(request.responseText);
    my_JSON_object = JSON_create_date_ISO(my_JSON_object,'date');
    data = MG.convert.date(my_JSON_object, 'date', '%Y-%m-%dT%H:%M:%SZ');
    d3.csv('labels.csv', function(error,JSON_data) {
        if (error) return console.warn(error);
        labels_data = JSON_create_date_ISO(JSON_data,'date');
        labels_data = JSON_create_label_key(labels_data);
        labels_data = MG.convert.date(labels_data, 'date', '%Y-%m-%dT%H:%M:%SZ');
        console.log(labels_data);
        MG.data_graphic({
            title: "rMSSD",
            data: data,
            width: 1200,
            height: 400,
            right: 40,
            markers:labels_data,
    //        linked:true,
            area:false,
            target: '#graph1',
            x_accessor: 'date',
            y_accessor: ' rMSSD'
        });
        MG.data_graphic({
            title: "HF",
            data: data,
            width: 1200,
            height: 400,
            right: 40,
            markers:labels_data,
    //        linked:true,
            area:false,
            target: '#graph2',
            x_accessor: 'date',
            y_accessor: ' HF'
        });
    });

})
/*
Enumerates over a JSON array and gets all the elements of a certain key
 */
function JSON_create_date_ISO(JSON_object,key){
    for (var i = 0; i < JSON_object.length; i++){
        JSON_object[i][key] = date_splitter(JSON_object[i][key]);
    }
    return JSON_object;
}

/*
Returns ISO 8601 formatted time
 */
function date_splitter(old_format_date){
    console.log(old_format_date);
    date = old_format_date.slice(0,10);
    time = old_format_date.slice(11,19);
    new_format_date = date+"T"+time+"Z";
    return new_format_date;
}

function JSON_create_label_key(JSON_object) {
    for (var i = 0; i < JSON_object.length; i++){
        JSON_object[i]['label'] = JSON_object[i][' annotation'];
        delete JSON_object[i][' annotation'];
    }
    return JSON_object;
}
