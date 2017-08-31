if(!Array.prototype.indexOf){
    Array.prototype.indexOf = function(needle, start){
        for(var i = (start || 0); i < this.length ; i++){
            if(this[i] === needle){
                return i;
            }
        }

        return -1;
    }
}