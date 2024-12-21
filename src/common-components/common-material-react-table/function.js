export function ScrollTableData(elementId,FetchData){
    const scrollTable=document.getElementById(elementId);
    if(scrollTable)
     scrollTable?.addEventListener('scroll',()=>{
       if(scrollTable.scrollHeight-scrollTable.scrollTop===scrollTable.clientHeight){
        console.log('End')
         FetchData();
       }
   
     });

  }