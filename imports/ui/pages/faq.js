import { Template } from 'meteor/templating';
import { FAQs } from '../../api/faq/faq.js';
import './faq.html';

Template.faq.onCreated(function(){
  Meteor.subscribe('faqs');

  this.state = new ReactiveDict();
});

Template.faq.events({
  'click .c-category__toggle'(event, template){
    if(template.state.get(this._id)){
      template.state.delete(this._id);
    } else{
      template.state.set(this._id, true);
    }
  },
  'click .c-faq-meta__toggle--hideAll'(event, template) {
    Object.keys(template.state.keys).forEach(function(key) {
      template.state.delete(key);
    });
  },
  'click .c-faq-meta__toggle--showAll'(event, template) {
    const topPosts = FAQs.find({"category" : { "$exists" : false } });

    topPosts.forEach((post) => {
      template.state.set(post._id, true)
    });
  },
  'click .c-category__button--remove'(event, template){
    Meteor.call('faqCategory.remove', this._id);
  },
  'click .c-category__button--add'(event, template){
    Meteor.call('faqGroupItem.insert', $('.c-category__title--add').html());
    template.$('.c-category__title--add').html("");
  },
  'click .c-item__button--addQuestion'(event, template){
    Meteor.call('faqItem.insert', this._id, 'Frage', 'Antwort');
    console.log(template);
    console.log(event);
    console.log(template.find(".c-item__question-content").value);
    template.$('.c-item__question-content').html("");
  },
  'click .c-item__button--delete'(event, template){
    Meteor.call('faqItem.remove', this._id);
  },
  'click .c-item__button--edit'(event, template){
    const button = event.target;
    const question = template.$('#question-' + this._id);
    const answer  = template.$('#answer-' + this._id);

    if(button.text == "bearbeiten"){
      button.text = "bearbeiten beenden";
    } else{
      button.text = "bearbeiten";
    }


    if(question.is("[contenteditable]")){
      question.removeAttr("contenteditable");
    }else{
      question.attr('contenteditable', 'true');
    }

    if(answer.is("[contenteditable]")){
      answer.removeAttr("contenteditable");
    }else{
      answer.attr('contenteditable', 'true');
    }

    console.log(question.is("[contenteditable]"));
  },
  'click .c-item__button--save'(event, template){
    const question = template.$('#question-' + this._id);
    const answer  = template.$('#answer-' + this._id);

    console.log(question.html());
    console.log(answer.html());

    Meteor.call('set.faqItem', this._id, question.html(), answer.html());


  },
  'submit form'(event, template){
    event.preventDefault();
    var question = event.target.question;
    var answer = event.target.answer;

    Meteor.call('faqItem.insert', this._id, question.value, answer.value);
  },



  'click .c-category-title__button--removeCategory'() {
    Meteor.call('faqGroupItem.remove', this._id);
  },
  'click .c-category-title__button--addCategory'() {
    Meteor.call('faqGroupItem.insert', $('.c-category-title__content').html());
    $('.c-category-title__content').html("");
  },
  'click .c-category-title__button--addQuestion'(e, i){
    Meteor.call('faqItem.create', e.currentTarget.dataset.id, $('.c-question-title__content').html(), "");
    console.log(e.currentTarget.dataset.id);
  },
  'focus .c-category-title__content'(){
        $('.c-category-title__content').text("");
    console.log(this.inner);
  },
});

Template.faq.helpers({
  isVisible(){
    return Template.instance().state.get(this._id);
  },
  isSelected(){
   return Template.instance().state.get(this._id) ? 'c-category__toggle--visible' : '';
  },
  faqGroup() {
    return FAQs.find({"category": {$in: [null, false]}});
  },
  faqItems(categoryId) {
    return FAQs.find({ "category" : categoryId });
  },
});
