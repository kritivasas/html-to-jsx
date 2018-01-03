'use babel';
// InputDialog = require '@aki77/atom-input-dialog'
import { workspace } from 'atom';

export default class HtmlToJsxView {

  createInputBox() {
    // const span = document.createElement('h1');
    // span.classList.add('input-group-addon');
    // span.textContent = "style variable name";
    //
    // const line_edit_model = workspace.buildTextEditor(mini: true)
    // line_edit_model.setText('my text')
    // line_edit = atom.views.getView(line_edit_model)
    // root.appendChild(line_edit)

    const inputGroup = document.createElement('div');
    // inputGroup.classList.add('input-group');
    // inputGroup.classList.add('native-key-bindings');
    //
    // inputGroup.appendChild(span);
    // inputGroup.appendChild(line_edit);
    return inputGroup;
  }

  constructor() {
    // Create root element
    // this.element = document.createElement('div');
    // this.element.classList.add('html-to-jsx');
    //
    //
    // // Create message element
    // const message = document.createElement('div');
    // const span = document.createElement('span');
    // span.textContent = 'style variable name: ';
    // span.style.float = 'left';
    // message.appendChild(span);
    // const input = document.createElement('input');
    // input.classList.add('input');
    // input.style.float = 'left';
    // message.classList.add('message');
    // this.element.appendChild(message);
    // this.element.appendChild(input);
    const inputGroup = this.createInputBox();
    this.msg = document.createElement('dialog');
    this.msg.appendChild(inputGroup);
    document.body.appendChild(this.msg)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.msg.remove();
  }

  toggle() {
    this.msg.style.display = ( this.msg.style.display === "block" ) ? "none" : "block";
  }
  getElement() {

    this.msg.showModal();
    // return this.element;
  }

}
