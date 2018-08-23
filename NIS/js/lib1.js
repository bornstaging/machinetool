$(document).ready(function(){ 

    /*$(document).on('click','.fetch', function(){

        var filteredText = [];

        $.getJSON( "json/HD2900006_010E.pdf.json", function( data ) { 
            var color = '@color';
            var text= "#text";
            var items = [];
                $.each( data, function( key, val ) { 

                    for(i=0; i<val.page.row.length; i++){

                        for(ii=0; ii<val.page.row[i].column.length; ii++){
                            //console.log(val.page.row[i].column[ii].text[color])
                            if(val.page.row[i].column[ii].text[color] != undefined && val.page.row[i].column[ii].text[color] == "#FFFFFF"){
                                filteredText.push(val.page.row[i].column[ii].text[text]);
                            }
                        }
                        
                    } 
            });

            console.log('filteredText',filteredText) 

        });
    });*/

    var filteredText = [];
    var finaltext = {};
    var tfiles;
    n=0;
    var filterdata = function(data){
        
        var naming = 'pdf'+n;
        var color = '@color';
        var text= "#text";
        var items = [];
        filteredText = [];
            $.each( data, function( key, val ) { 

                for(i=0; i<val.page.row.length; i++){

                    for(ii=0; ii<val.page.row[i].column.length; ii++){ 

                        if(val.page.row[i].column[ii].text[color] != undefined && val.page.row[i].column[ii].text[color] == "#FFFFFF"){
                            filteredText.push(val.page.row[i].column[ii].text[text]);

                            //finaltext[naming].push(val.page.row[i].column[ii].text[text])
                        }

                        textsplit = val.page.row[i].column[ii].text[text];

                        if(textsplit !== undefined){
                            textsplit = textsplit
                            if(textsplit.split(' ')[0]=="Model"){
                                filteredText.push(textsplit.split(' ')[2]);
                                //finaltext[naming].push(textsplit.split(' ')[2])
                            }
                            if(textsplit.split(' ')[0]=="Article"){
                                filteredText.push(textsplit.split(' ')[2]);

                                //finaltext[naming].push(textsplit.split(' ')[2])
                            }
                           
                        }
                    }
                    
                } 
        });

        console.log('filteredText',filteredText)  
        

        finaltext[naming] =  filteredText;
        console.log('finaltext',finaltext) 

        n++;
    }

    JsonObj = null

    function handleFileSelect(evt) {
        $('.excel').hide();

    var files = evt.target.files; 

        tfiles = files.length

        console.log(files.length)

        for(a=0; a<files.length; a++){

        f = files[a];

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {  
                JsonObj = JSON.parse(e.target.result);
                filterdata(JsonObj);  
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsText(f);
    }
    }

    document.getElementById('files').addEventListener('change', handleFileSelect, false);

    var excelData = [];
    
    var defaults = { 
        'VendorCode'  :'HD2900006_087E',
        'EDescription' :'Product Card - 925 Series Brushed Nickel',   
        'FDescription' :'Affiche descriptive - Série 925 Nickel brossé',   
        'LanguageCode' :'English',   
        'Vendor'  :'LOTA CORP',
        'IBGCode' :'ePOP',
        'Classification' :'Signage', 
        'MinOrderableQuantity'  :'1',  
        'EMailGroupCode':'Marrisha Williams',  
        'ProjectType' :'ePOP',
        'EMessage' :'Product Card - 925 Series Brushed Nickel - Specialty',   
        'FMessage' :'Affiche descriptive - Série 925 Nickel brossé - Spécial',   
        'POGName' :'D29B-Faucets-SignPOG',
        'ModelNumber' :'67156-1004', 
        'ArticleNumber' :'1000711274',  
        'HDCostType':'Signs',  
        'Consumable':'No',  
        'Prepaid':'No'
    }


    $('.fetch').click(function(){
        var totalLength = filteredText.length;

       //console.log(finaltext.pdf0[0]);
       $('.search-content').html('')

        for(y=0; y<tfiles; y++){ 
                c = 'pdf'+y; 
                var obj = {};
                var html = '<div class="new-row"><div class="table-product-capacity-col">'+finaltext[c][0]+'</div><div class="table-product-capacity-col">'+finaltext[c][1]+'</div> <div class="table-product-capacity-col">'+finaltext[c][2]+'</div><div class="table-product-capacity-col">'+finaltext[c][5]+'</div><div class="table-product-capacity-col">'+finaltext[c][3]+'</div><div class="table-product-capacity-col">'+finaltext[c][4]+'</div></div>';
                $('.search-content').append(html);

                $.each(defaults, function(index, value){
                    if(index=='EDescription'){
                        obj[index] = 'Product Card - '+ finaltext[c][0] + ' ' + finaltext[c][1];
                    }else if(index=='FDescription'){
                        obj[index] = 'Affiche descriptive - '+ finaltext[c][0] + ' ' + finaltext[c][1];
                    }else if(index=='Vendor'){
                        obj[index] = finaltext[c][5];
                    }else if(index=='EMessage'){
                        obj[index] = 'Product Card - '+ finaltext[c][0] + ' ' + finaltext[c][1];
                    }else if(index=='FMessage'){
                        obj[index] = 'Product Card - '+ finaltext[c][0] + ' ' + finaltext[c][1];
                    }else if(index=='ModelNumber'){
                        obj[index] = finaltext[c][3]
                    }else if(index=='ArticleNumber'){
                        obj[index] = finaltext[c][4]
                    }
                    else{
                        obj[index]=value;
                    }
                    
                });  

                

                excelData.push(obj);
        }

        $('.excel').show();

        console.log('excelData',excelData)
    }); 

    $('.excel').click(function(){ 
        JSONToCSVConvertor(excelData, "NIS Report", true);
    });
    

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        
        var CSV = '';    
        //Set Report title in first row or line
        
        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";
            
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);
            
            //append Label row with line break
            CSV += row + '\r\n';
        }
        
        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);
            
            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {        
            alert("Invalid data");
            return;
        }   
        
        //Generate a file name
        var fileName = "Report_";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g,"_");   
        
        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    
        
        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");    
        link.href = uri;
        
        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


});