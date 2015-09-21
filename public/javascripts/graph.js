/**
 * Created by tanguycoenen on 20/09/15.
 */

d3.csv('file.csv', function(error,JSON_feature_data) {
    JSON_feature_data = JSON_create_date_ISO(JSON_feature_data,'date');
    features_data = MG.convert.date(JSON_feature_data, 'date', '%Y-%m-%dT%H:%M:%SZ');
    console.log(features_data);
    d3.csv('labels.csv', function(error,JSON_label_data) {
        if (error) return console.warn(error);
        labels_data = JSON_create_date_ISO(JSON_label_data,'date');
        labels_data = JSON_create_label_key(labels_data);
        labels_data = MG.convert.date(labels_data, 'date', '%Y-%m-%dT%H:%M:%SZ');
        MG.data_graphic({
            title: "rMSSD",
            data: features_data,
            width: 2200,
            height: 300,
            right: 40,
            markers:labels_data,
//            linked:true,
            area:false,
            animate_on_load:true,
            target: '#graph1',
            x_accessor: 'date',
            y_accessor: ' rMSSD'
        });
        MG.data_graphic({
            title: "HF",
            data: features_data,
            width: 2200,
            height: 300,
            right: 40,
            markers:labels_data,
//            linked:true,
            area:false,
            animate_on_load:true,
            target: '#graph2',
            x_accessor: 'date',
            y_accessor: ' HF'
        });
        MG.data_graphic({
            title: "LFHF",
            data: features_data,
            width: 2200,
            height: 300,
            right: 40,
            markers:labels_data,
//            linked:true,
            area:false,
            animate_on_load:true,
            target: '#graph3',
            x_accessor: 'date',
            y_accessor: ' LFHF'
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
