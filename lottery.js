String.prototype.isValidNumber = function(){
  if (this.match(/^[0-9]+$/)){
    return true;
  } else {
    return false;
  }
};

Array.prototype.remove = function(value){
  return this.filter(function(element){
    if (element !== value) return element
  });
};

var Lottery = function(size){
  if (!String(size).isValidNumber()) {
    throw "size is not nutural number";
  }
  this.prizeCount = Number(size);
  this.members = [];
};

// public methods
Lottery.prototype.add = function(name, weight){
  if (this.isInMembers(name)) return false;
  if (!String(weight).isValidNumber()) {
    throw "weight is not nutural number";
  }
  this.members.push({
    'name': name,
    'weight': weight
  });
  return true;
};
Lottery.prototype.lottery = function(){
  var winners = [];
  var membersWithWeight = this.getMembersWithWeight();
  for (var i = 0; i < this.prizeCount; i++){
    var luckyNumber = Math.floor(Math.random() * membersWithWeight.length);
    winners.push(membersWithWeight[luckyNumber]);
    membersWithWeight = membersWithWeight.remove(membersWithWeight[luckyNumber]);
  }
  return winners;
};
Lottery.prototype.getMembers = function(){
  return this.members.map(function(member){
    return member.name
  });
};
Lottery.prototype.getWinners = function(){
  if (this.prizeCount === 0) return [];
  if (this.members.length === 0) return [];
  if (this.prizeCount >= this.members.length) return this.getMembers();
  return this.lottery();
};

// private methods
Lottery.prototype.isInMembers = function(value){
  if (this.members.every(function(member){return member.name !== value})){
    return false;
  } else {
    return true;
  }
};
Lottery.prototype.getMembersWithWeight = function(){
  var list = [];
  this.members.map(function(member){
    for(var i = 0; i < member.weight; i++){
      list.push(member.name);
    }
  })
  return list;
};
