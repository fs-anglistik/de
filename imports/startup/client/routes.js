import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/index.html';
import '../../ui/layouts/footer.html';
import '../../ui/layouts/footer.scss';
import '../../ui/pages/HomePage.html';
import '../../ui/pages/faq.html';
import '../../ui/pages/faq.scss';
import '../../ui/pages/event/event.html';
import '../../ui/pages/event/event.scss';
import '../../ui/pages/faq.js';
import '../../ui/pages/imprint/imprint.html';
import '../../ui/pages/imprint/imprint.scss';
import '../../ui/pages/imprint/imprint.js';
import '../../ui/pages/test/test.html';
import '../../ui/pages/test/test.scss';
import '../../ui/components/navigation/Navigation.html';
import '../../ui/components/navigation/navigation.js';
import '../../ui/components/navigation/navigation.scss';
import '../../ui/components/navigation/layout-navigation.scss';
import '../../ui/components/cover/cover.html';
import '../../ui/components/cover/layout.scss';
import '../../ui/components/cover/font.scss';
import '../../ui/components/cover/cover.scss';
import '../../ui/components/cover/cover.js';
import '../../ui/components/quickinfo/quickinfo.html';
import '../../ui/components/quickinfo/quickinfo.scss';
import '../../ui/components/quickinfo/layout.scss';
import '../../ui/components/quickinfo/quickinfo.js';
import '../../ui/components/event/event.html';
import '../../ui/components/event/event.scss';
import '../../ui/components/event/event.js';



FlowRouter.route( '/', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { layout: 'HomePage' } );
  },
  name: 'home'
});

FlowRouter.route( '/event', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { layout: 'Event' } );
  },
  name: 'event'
});

FlowRouter.route( '/faq', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { layout: 'faq' } );
  },
  name: 'faq'
});

FlowRouter.route( '/impressum', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { layout: 'Imprint' } );
  },
  name: 'imprint'
});

FlowRouter.route( '/test', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { layout: 'Test' } );
  },
  name: 'test'
});
