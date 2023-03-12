const level = (ordered, chatId) =>{
    ordered.sort((a,b) => {
        if ( a.total_correct < b.total_correct ){
          return -1;
        }
        if ( a.total_correct > b.total_correct ){
          return 1;
        }
        return 0;
      });
     
    return ordered.map((e, index)=>{
        if (e.id === chatId)
         return index
       })[1]
}



module.exports = {level}