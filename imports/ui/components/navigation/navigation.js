Template.Navigation2.events({
    'click .navigation-toggle': function(event, template){
      template.$('.navigation-toggle').toggleClass('is-active');

      if ($(".navigation-menu").hasClass("slide-in")) {
        $('.navigation-menu').toggleClass('slide-out');
      } else {
        $('.navigation-menu').toggleClass('slide-in');
      }
    },
    'click li.drop-down': function(event, template){
      template.$('li.drop-down').toggleClass('is-active');
    },
    'click .login': function(event, template){
      template.$('.login-box').toggleClass('is-active');
    }
});
