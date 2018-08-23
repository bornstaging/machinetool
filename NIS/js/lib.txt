$(document).ready(function(){
   // "use strict";
   var search = $('#main-search');
   var result = $('.search-content'); 
   var noresults = '<span class="placeholder">No results found</span>';
   var value;
   search.focus(); 

    var array = [
        { sName:"spindle", pName:"SPINDLE HEAD",    pModel: "BT40/THROUGH-SPINDLE",     pId:"27M10A", pType:"STANDARD", pdfLink:"pdf/27M-1204F-0611-R01-(a51)_in_USA-(1)-19-26.pdf" },
        { sName:"spindle", pName:"SPINDLE HEAD",    pModel: "HSK63/THROUGH-SP.",        pId:"27M11A", pType:"STANDARD AND HIGH SPEED", pdfLink:"pdf/27M-1204F-0611-R01-(a51)_in_USA-(1)-27-34.pdf" },
        { sName:"spindle", pName:"SPINDLE HEAD",    pModel: "BT40/THROUGH-SPINDLE",     pId:"27M12A", pType:"HIGH POWER", pdfLink:"pdf/27M-1204F-0611-R01-(a51)_in_USA-(1)-35-42.pdf" },
        { sName:"spindle", pName:"SPINDLE HEAD",    pModel: "HSK63/THROUGH-SPINDLE",    pId:"27M13A", pType:"HIGH POWER", pdfLink:"pdf/27M-1204F-0611-R01-(a51)_in_USA-(1)-43-50.pdf" },
        /*{ sName:"spindle", pName:"COLUMN",          pModel: "COLUMN",                   pId:"27M20B", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-51-53.pdf" },
        { sName:"spindle", pName:"TOOL MAGAZINE",   pModel: "TOOL MAGAZINE(A219)",      pId:"27M68A", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-113-132.pdf" },
        { sName:"spindle", pName:"BED",             pModel: "BED",                      pId:"27M30B", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-54-57.pdf" },
        { sName:"spindle", pName:"INDEX TABLE",     pModel: "INDEX TABLE",              pId:"27M50A", pType:"Pro3", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-59-62.pdf" },
        { sName:"spindle", pName:"INDEX TABLE",     pModel: "INDEX TABLE",              pId:"27M50A", pType:"Pro5", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-63-66.pdf" },
        { sName:"spindle", pName:"PALLET",          pModel: "PALLET",                   pId:"21M52A", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-71-72.pdf" },
        { sName:"spindle", pName:"ROTARY TABLE",    pModel: "ROTARY TABLE",             pId:"27M51A", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-67-70.pdf" },
        { sName:"spindle", pName:"SUB ARM",         pModel: "SUB ARM",                  pId:"27M61B", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-79-82.pdf" },*/
        { sName:"spindle", pName:"ATC ARM",         pModel: "ATC ARM(27M60B)",          pId:"27M60B", pType:"Pro3, Pro5", pdfLink:"web/viewer.html?file=27M-1204F-0611-R01-(a51)_in_USA-(1)-75-78-I.pdf", pdfLinkI:"27M-1204F-0611-R01-(a51)_in_USA-(1)-75-78-I.pdf",pdp:[
            {
                kNo:'9-2',
                partName:'ATC ASSEMBLY',
                vId:'00',
                thumb:'img/27M60B/9-2.jpg'
            },
            {
                kNo:'9-3',
                partName:'ATC ASSEMBLY',
                vId:'00',
                thumb:'img/27M60B/9-3.jpg'
            },
            {
                kNo:'17_1-13',
                partName:'BRACKET',
                vId:'00',
                thumb:'img/27M60B/17_1-13.jpg'
            },
            {
                kNo:'3-2',
                partName:'ATC FRAME',
                vId:'00',
                thumb:'img/27M60B/3-2.jpg'
            },
            {
                kNo:'17_1-8',
                partName:'COVER',
                vId:'00',
                thumb:'img/27M60B/17_1-8.jpg'
            },
            {
                kNo:'9-11',
                partName:'STRAGHT',
                vId:'00',
                thumb:'img/27M60B/9-11.jpg'
            },
            {
                kNo:'9-12',
                partName:'STRAGHT',
                vId:'00',
                thumb:'img/27M60B/9-12.jpg'
            },
            {
                kNo:'9-2_1',
                partName:'ATC ASSEMBLY',
                vId:'00',
                thumb:'img/27M60B/9-2_1.jpg'
            },
            {
                kNo:'9-3_1',
                partName:'ATC ASSEMBLY',
                vId:'00',
                thumb:'img/27M60B/9-3_1.jpg'
            },
            {
                kNo:'13-6',
                partName:'RING,RING.C,SHAFT',
                vId:'00',
                thumb:'img/27M60B/13-6.jpg'
            },
            {
                kNo:'17_2-2',
                partName:'COVER',
                vId:'00',
                thumb:'img/27M60B/17_2-2.jpg'
            },
        ] },

       /* { sName:"spindle", pName:"TOOL MAGAZINE",   pModel: "TOOL MAGAZINE(A40)",       pId:"27M62B", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-83-86.pdf"}, 
        { sName:"spindle", pName:"TOOL MAGAZINE",   pModel: "TOOL MAGAZINE(A60)",       pId:"27M63B", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-87-92.pdf" },
        { sName:"spindle", pName:"TOOL MAGAZINE",   pModel: "TOOL MAGAZINE(A134)",      pId:"27M67A", pType:"", pdfLink:"27M-1204F-0611-R01-(a51)_in_USA-(1)-93-112.pdf" }*/
    ];
    
    search.keyup (function (e) {
        value = $(this).val();
        if(value!=''){
            result.html(''); 
            len = value.length;
                console.log('----------------Search Start-------------')
                for(i=0; i<array.length; i++){ 
                    var rgxp = new RegExp(value.toLowerCase(), "g");

                    if(array[i].pName.toLowerCase().match(rgxp)!== null || array[i].pId.toLowerCase().match(rgxp)!== null){                    
                        console.log(array[i].pdfLink);
                        var html = '<div class="table-content" data-pdf="'+array[i].pdfLink+'"><div class="table-product-name-col"><span class="bullet">&bull;</span><span><img src="img/prod-img.png" alt="prod image"></span><span><h4>'+array[i].pName+'</h4><p>'+array[i].pModel+'</p></span></div><div class="table-product-id-col">'+array[i].pId+'</div><div class="table-product-capacity-col">'+array[i].pType+'</div></div>';
                        result.append(html);
                    } else{
                        if(array[i].pdp!==undefined){   
                            for(x=0;x<array[i].pdp.length;x++){
                                if(array[i].pdp[x].kNo.toLowerCase().match(rgxp)!== null){ 
                                    var html = '<div class="table-content" data-pdf="'+array[i].pdfLink+'#search='+value+'"><div class="table-product-name-col"><span class="bullet">&bull;</span><span><img src="img/prod-img.png" alt="prod image"></span><span><h4>'+array[i].pName+'</h4><p>'+array[i].pModel+'</p></span></div><div class="table-product-id-col">'+array[i].pId+'</div><div class="table-product-capacity-col">'+array[i].pType+'</div></div>';
                                    result.append(html);
                                }
                            }
                        } 
                    }
                }  
    }

    //web/viewer.html?file=27M-1204F-0611-R01-(a51)_in_USA-(1)-75-78-I.pdf#search=trace


    else{
        result.html(noresults); 
    }
    }); 

    $(document).on('click','.table-content', function(){
        var pdfName = $(this).attr('data-pdf');
        window.open(pdfName, '_blank');
    });

    
    if(document.location.search.length){
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var partNo = url[0].split('=')[1];
        var keyNo = url[1].split('=')[1];

        

        for(k=0; k<array.length; k++){
            
            if(partNo==array[k].pId){ 
                //console.log(partNo)
                if(array[k].pdp!==undefined){                    
                    for(p=0; p<array[k].pdp.length; p++){
                        if(keyNo==array[k].pdp[p].kNo){
                            var html = '<div class="key-word"><span><p>Key No</p></span><span><p>'+array[k].pdp[p].kNo+'</p></span></div><div class="key-word"><span><p>Part No</p></span><span><p>'+array[k].pId+'</p></span></div> <div class="key-word"><span><p>Part Name</p></span><span><p>'+array[k].pdp[p].partName+'</p></span></div><div class="key-word"><span><p>Vendor Item No</p></span><span><p>'+array[k].pdp[p].vId+'</p></span></div>';
                            $('#pdp').html(html);
                            $('.pop-rig > h3').html(array[k].pName);
                            $('.prod-img').html('<img src='+array[k].pdp[p].thumb+'>');
                            $('.rhs h3').html(array[k].pName);
                            $('.rhs p').html(array[k].pId);
                            $('.lhs h4').html(array[k].pModel);
                            $('.lhs p').html(array[k].pType);
                        } 
                    }
                }
            }
            if(partNo=='27M60B'&&keyNo==undefined){
                //console.log(keyNo)
                $('.prod-img').html('<img src=img/product-img-1.jpg>');
                var html = '<div class="key-word"><span><p>Machine Name</p></span><span><p>ATC ARM</p></span></div><div class="key-word"><span><p>Part No</p></span><span><p>27M60B</p></span></div> <div class="key-word"><span><p>Part Name</p></span><span><p>ATC ARM(27M60B)</p></span></div><div class="key-word"><span><p>Vendor Item No</p></span><span><p>000</p></span></div>';
                $('#pdp').html(html);
                $('.pop-rig > h3').html('ATC ARM');
                $('.rhs h3').html('ATC ARM');
                $('.rhs p').html('ATC ARM(27M60B)');
                $('.lhs h4').html('27M60B');
                $('.lhs p').html('Pro3, Pro5');
            }
        }
    }

    


});