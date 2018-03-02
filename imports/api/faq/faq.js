import { Mongo } from 'meteor/mongo';

export const FAQs = new Mongo.Collection('faqs');

Meteor.methods({
  'faqCategory.remove'(id) {
    check(id, String);

    FAQs.remove(id);
  },
  'faqGroupItem.insert'(title) {
    FAQs.insert({title});
 },
 'faqItem.insert'(category, question, answer) {
   FAQs.insert({
     category,
     question,
     answer
   });
 },
 'faqItem.create'(category, question, answer) {
   console.log(category);
   console.log(question);
   console.log(answer);
   FAQs.insert({
     category,
     question,
     answer
   });
 },
 'faqItem.remove'(id){
   check(id, String);

   FAQs.remove(id);
 },
 'set.faqItem'(itemId, question, answer) {
   FAQs.update({_id: itemId}, { $set: { question: question, answer: answer }});
 },
});

//Publications
if (Meteor.isServer) {
  Meteor.publish('faqs', function tasksPublication() {
    return FAQs.find();
  });
  Meteor.publish('abc', function tasksPublication() {
    db.faqs.find({"category" : "KkrEzAYNdnj7LXXb3"});
  });

  Meteor.publish('questions', function( categoryId ){
    if ( categoryId ){
      return[
          FAQs.find( { '_id': categoryId } ),
          FAQs.find({ 'category': categoryId })
      ];
    } else {
      return null;
    }
  });
}
