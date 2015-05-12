
var unseenMessages = _.shuffle([
  "Life is like a roller coaster, and I'm about to throw up.", 
  "Out of my mind. Back in five minutes.", 
  "I'd agree with you, but then we'd both be wrong.", 
  "I didn't attend the funeral, but I sent a nice letter saying I approved of it.", 
  "Always give 100%, except when giving blood.", 
  "The more I learn about people, the more I like my dog.", 
  "Money is not everything in life, but make enough money before thinking such nonsense.", 
  "I would challenge you to a battle of wits, but I see you are unarmed.", 
  "As far as intelligence is concerned, I think you are at the absolute top of the bell curve.", 
  "I never forget a face, but in your case I'll be glad to make an exception.", 
  "I'm not sure what's wrong... But it's probably your fault!", 
  "Whatever you do, don't congratulate yourself too much. You're not that good.", 
  "Angry people need hugs (or sharp objects).", 
  "Don't take life too seriously, you won't get out alive.",   
  "Light travels faster than sound. This is why some people appear bright until they speak.", 
  "Should vegetarians eat animal crackers?", 
  "You were looking good from afar.. now you're far from looking good.",  
  "Always remember that you are absolutely unique... Just like everyone else...", 
  "Dear Lord, there is a bug in your software...it's called #Monday, please fix it...", 
  "I bet you get bullied a lot.", 
  "I'm busy now. Can I ignore you some other time?", 
  "Zombies eat brains. You’re safe.", 
  "I don’t believe in plastic surgery, But in your case, Go ahead.", 
  "My mother never saw the irony in calling me a son-of-a-bitch.", 
  "Before I got married I had six theories about bringing up children; now I have six children and no theories.", 
  "Knowledge is knowing a tomato is a fruit; wisdom is not putting it in a fruit salad.", 
  "Instead of getting married again, I’m going to find a woman I don’t like and just give her a house.", 
  "If you can't have midnight snack, why do we have a light in the fridge??", 
  "Men have only two emotions: hungry and horny. If you see him without an erection, make him a sandwich."
]);

var seenMessages = [];
Session.set('currentMessage', unseenMessages[0]);

var changeMessage = function() {
  var oldMessage = unseenMessages.shift();
  seenMessages.push(oldMessage);

  if(unseenMessages.length === 0) {
    unseenMessages = _.shuffle(seenMessages);
    seenMessages = [];
  }

  Session.set('currentMessage', unseenMessages[0]);
}

var shakeAvailable = function() {
  return Meteor.Device.isPhone();
}

Meteor.startup(function() {
  if(shakeAvailable()) {
    var onShake = _.debounce(function onShake() {
      changeMessage();
    }, 750, true);
    shake.startWatch(onShake, 15);
  }
});

Template.eightBall.helpers({
  message: function () {      
    return Session.get('currentMessage');
  },
  shakeAvailable: function() {
    return shakeAvailable();
  }
});

Template.eightBall.events({
  'click a': function(e) {
    e.preventDefault();
    changeMessage();
  }
});

