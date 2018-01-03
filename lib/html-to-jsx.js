'use babel';

import { CompositeDisposable } from 'atom';
var HTMLtoJSX = require('htmltojsx');

export default {
  subscriptions: null,

  activate () {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace',
      {'html-to-jsx:toggle': () => this.convert()})
    )
  },

  deactivate () {
    this.subscriptions.dispose()
  },

  convert() {
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const selection = editor.getSelectedText()
      editor.insertText(this.processHtmlToJsx(selection));
    }
  },
  processHtmlToJsx(selection) {

    var converter = new HTMLtoJSX({
      createClass: false,
      outputClassName: 'AwesomeComponent'
    });

    const styleVarName = "st";
    selection = converter.convert(selection);
    const regex1 = /className=(["'])((?:(?!\1)[^\\]|(?:\\\\)*\\[^\\])*)\1/g;
    const regex2 = /className={(.*?)}/g;
    selection = selection.replace(regex1, "className={$2}").
      replace(regex2,
        function($1){
          console.log($1);
          return  $1.split('={').join('={'+ styleVarName +'.').split(" ").join(" "+ styleVarName +".")
        }
      );
    return selection;
  }
};
