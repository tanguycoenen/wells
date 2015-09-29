/**
 * Created by tanguycoenen on 20/09/15.
 */

d3.csv('file.csv', function(error,JSON_feature_data) {
    var multiline_data = [];
    JSON_feature_data = JSON_create_date_ISO(JSON_feature_data,'date');
    var features_data = MG.convert.date(JSON_feature_data, 'date', '%Y-%m-%dT%H:%M:%SZ');
    JSON_normalize(features_data," rMSSD");
    JSON_normalize(features_data," HF");
    JSON_normalize(features_data," LFHF");
    JSON_normalize(features_data," pNN50");
    multiline_data.push(JSON_extract(features_data, " rMSSD"));
    multiline_data.push(JSON_extract(features_data, " HF"));
    multiline_data.push(JSON_extract(features_data, " pNN50"));
//    multiline_data.push(JSON_extract(features_data, " LFHF"));
    var multiline_data_JSON = JSON.stringify(multiline_data);
        d3.csv('labels.csv', function(error,JSON_label_data) {
            if (error) return console.warn(error);
            labels_data = JSON_create_date_ISO(JSON_label_data,'date');
            labels_data = JSON_create_label_key(labels_data);
            labels_data = MG.convert.date(labels_data, 'date', '%Y-%m-%dT%H:%M:%SZ');
            d3.csv('hr.csv', function(error,JSON_hr_data) {
                if (error) return console.warn(error);
                hr_data = JSON_create_date_ISO(JSON_hr_data,'date');
                hr_data = JSON_create_label_key(hr_data);
                JSON_normalize(hr_data," heart rate");
                hr_data = MG.convert.date(hr_data, 'date', '%Y-%m-%dT%H:%M:%SZ');
//                MG.data_graphic({
//                    title: "rMSSD",
//                    data: features_data,
//                    width: 2200,
//                    height: 300,
//                    right: 40,
//                    markers:labels_data,
//                    area:false,
//                    animate_on_load:true,
//                    target: '#graph1',
//                    x_accessor: 'date',
//                    y_accessor: ' rMSSD'
//                });
//                MG.data_graphic({
//                    title: "HF",
//                    data: features_data,
//                    width: 2200,
//                    height: 300,
//                    right: 40,
//                    markers:labels_data,
//                    area:false,
//                    animate_on_load:true,
//                    target: '#graph2',
//                    x_accessor: 'date',
//                    y_accessor: ' HF'
//                });
//                MG.data_graphic({
//                    title: "LFHF",
//                    data: features_data,
//                    width: 2200,
//                    height: 300,
//                    right: 40,
//                    markers:labels_data,
//                    area:false,
//                    animate_on_load:true,
//                    target: '#graph4',
//                    x_accessor: 'date',
//                    y_accessor: ' LFHF'
//                });
//                MG.data_graphic({
//                    title: "pNN50",
//                    data: features_data,
//                    width: 2200,
//                    height: 300,
//                    right: 40,
//                    markers:labels_data,
//                    area:false,
//                    animate_on_load:true,
//                    target: '#graph3',
//                    x_accessor: 'date',
//                    y_accessor: ' pNN50'
//                });
//                MG.data_graphic({
//                    title: "HR",
//                    data: hr_data,
//                    width: 2200,
//                    height: 300,
//                    right: 40,
//                    markers:labels_data,
//                    area:false,
//                    animate_on_load:true,
//                    target: '#graph5',
//                    x_accessor: 'date',
//                    y_accessor: ' heart rate'
//                });
                MG.data_graphic({
                    data: multiline_data,
                    width: 1700,
                    height: 600,
                    right: 40,
                    markers:labels_data,
                    area:false,
                    animate_on_load:true,
                    target: '#graph6',
                    legend: ['rMSSD','HF','pNN50'],
                    legend_target: '.legend'
                });
            });
        });
});

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
    date = old_format_date.slice(0,10);
    time = old_format_date.slice(11,19);
    new_format_date = date+"T"+time+"Z";
    return new_format_date;
}

/*
Replaces 'annotation' keys by 'label' keys
 */
function JSON_create_label_key(JSON_object) {
    for (var i = 0; i < JSON_object.length; i++){
        JSON_object[i]['label'] = JSON_object[i][' annotation'];
        delete JSON_object[i][' annotation'];
    }
    return JSON_object;
}

/*
Divides the value in field by the maximum value in the field and multiplies by 100
 */
function JSON_normalize(JSON_object,field) {
    var maxValArray = getMax(JSON_object,field);
    var maxVal = maxValArray[field];
    for (var i=0 ; i<JSON_object.length ; i++) {
        JSON_object[i][field] = (JSON_object[i][field]/maxVal)*100;
    }
}

/*
Gets the maximum value in the array
 */
function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

/*
Pulls one data and value pair out of a more complex JSON object
 */
function JSON_extract(JSON_object,field){
    var output= [];
    for (var i=0 ; i<JSON_object.length ; i++) {
          var dataPoint = [];
        var dataPoint = {
            'date':JSON_object[i]['date'],
            'value':JSON_object[i][field]
        };

        output.push(dataPoint);
    }
    return output;
}
