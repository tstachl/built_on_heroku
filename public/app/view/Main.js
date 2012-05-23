Ext.define("BuiltOnHeroku.view.Main", {
  extend: 'Ext.form.Panel',
  requires: [
      'Ext.TitleBar',
      'Ext.form.FieldSet',
      'Ext.field.Text'
  ],
  config: {
    fullscreen: true,
    title: 'welcome',
    
    items: [{
      docked: 'top',
      xtype: 'titlebar',
      title: 'Built on Heroku'
    }, {
      xtype: 'fieldset',
      title: 'Enter a domain',
      items: {
        xtype: 'textfield',
        label: 'Domain',
        name: 'domain',
        placeHolder: 'startourspostcard.com',
        id: 'domain'
      }
    }, {
      docked: 'bottom',
      xtype: 'toolbar',
      items: [{
        xtype: 'spacer'
      }, {
        text: 'Check',
        ui: 'confirm',
        action: 'check'
      }]
    }]
  }
});
