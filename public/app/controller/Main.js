Ext.define('BuiltOnHeroku.controller.Main', {
  extend: 'Ext.app.Controller',
  
  config: {
    control: {
      'button[action=check]': {
        tap: 'doCheck'
      }
    }
  },
  
  doCheck: function() {
    Ext.Viewport.setMasked(true);
    var a      = document.createElement('a'),
        domain = Ext.getCmp('domain').getValue();
    
    if (domain.indexOf('http') !== 0) {
      domain = 'http://' + domain;
    }
    a.href = domain;
    
    if (a.hostname) {
      Ext.Ajax.request({
        url: '/',
        method: 'POST',
        params: {
          domain: a.hostname
        },
        success: function(r){
          delete a;
          r = Ext.decode(r.responseText);
          Ext.Viewport.unmask();
          var html;
          if (r.success === true) {
            html = [
              '<h1>Hooray!</h1>',
              '<p>The domain (' + Ext.getCmp('domain').getValue() + ') is providing ',
              'you with an application built on <a href="http://heroku.com">Heroku</a>.</p>',
              '<p>Give it a try and build your own app ...</p>'
            ];
          } else if (r.success === false) {
            html = [
              '<h1>Too bad!</h1>',
              '<p>This domain (' + Ext.getCmp('domain').getValue() + ') doesn\'t seem to be ',
              'providing an application built on <a href="http://heroku.com">Heroku</a>.</p>',
              '<p>Why don\'t you give it a go and build one ...</p>'
            ];
          } else {
            html = [
              '<h1>Sorry!</h1>',
              '<p>Something went wrong ...</p>',
              '<p>We are unable to provide you with a decisive answer ',
              'about this domain (' + Ext.getCmp('domain').getValue() + ') at the moment.</p>',
              '<p>Why don\'t you try it again later ...</p>'
            ];
          }
          
          Ext.Viewport.add({
            xtype: 'panel',
            modal: true,
            hideOnMaskTap: true,
            showAnimation: {
              type: 'popIn',
              duration: 250,
              easing: 'ease-out'
            },
            hideAnimation: {
              type: 'popOut',
              duration: 250,
              easing: 'ease-out'
            },
            centered: true,
            width: Ext.os.deviceType == 'Phone' ? 260 : 400,
            height: Ext.os.deviceType == 'Phone' ? 220 : 400,
            styleHtmlContent: true,
            html: html.join(''),
            items: {
              docked: 'top',
              xtype: 'toolbar',
              title: Ext.getCmp('domain').getValue()
            }
          });
        }
      });
    }
  }
});