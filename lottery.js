String.prototype.isValidNumber = function(){
  if (this.match(/^[0-9]+$/)){
    return true;
  } else {
    return false;
  }
};

Array.prototype.copy = function(){
  return this.concat();
};
Array.prototype.remove = function(index){
  this.splice(index, 1);
};

var Lottery = function(size){
  if (!String(size).isValidNumber()) {
    throw "not nutural number";
  }
  this.winnerNumber = Number(size);
  this.member = [];
};
Lottery.prototype.isInMember = function(value){
  if (this.member.indexOf(value) === -1){
    return false;
  } else {
    return true;
  }
};
Lottery.prototype.add = function(name){
  if (this.isInMember(name)) return false;
  this.member.push(name);
  return true;
};
Lottery.prototype.getMembers = function(){
  return this.member;
};
Lottery.prototype.lottery = function(){
  var winners = [];
  var player = this.member.copy();
  for (var i = 0; i < this.winnerNumber; i++){
    var luckyNumber = Math.floor(Math.random() * player.length);
    winners.push(player[luckyNumber]);
    player.remove(luckyNumber);
  }
  return winners;
};
Lottery.prototype.getWinners = function(){
  if (this.winnerNumber === 0) return [];
  if (this.member.length === 0) return [];
  if (this.winnerNumber >= this.member.length) return this.member;
  return this.lottery();
};
