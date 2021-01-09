import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { toolbarMenuItems } from './toolbar-menu.const';
@Directive({ selector: '[richeditor]' })
export class RichEditorDirective {
  constructor(elr: ElementRef) {
    // let's insert the toolbar,editor into the referenced element.
    const container = elr.nativeElement;
    container.classList.add('rich-editor-container');
    const toolbar = document.createElement('div');
    toolbar.classList.add('rich-editor-toolbar');
    container.appendChild(toolbar);
    // inserting toolbar items
    // bold,italics,bullet,subscript and superscript.
    toolbarMenuItems.forEach(item => {
      const menuItem = document.createElement('a');
      menuItem.classList.add(item.icon);
      menuItem.classList.add('fa');
      menuItem.classList.add('menu-item')
      menuItem.setAttribute('href', 'javascript:void(0)')
      menuItem.onclick = () => {
        document.execCommand(item.command, false, null)
      }
      toolbar.appendChild(menuItem);
    });
    const editor = document.createElement('div');
    editor.classList.add('rich-editor');
    editor.contentEditable = "true";
    // adjust the height,width of the editor
    const toolbarHeight = toolbar.offsetHeight;
    const containerHeight = container.offsetHeight;
    const editorHeight = containerHeight - toolbarHeight;
    editor.style.height = `${editorHeight}px`;
    editor.onpaste = (e) => {
      // Stop data actually being pasted into div
      const clipboardData = e.clipboardData;
      const pastedData = clipboardData.getData('Text');

      // handling html text.
      var doc = new DOMParser().parseFromString(pastedData, "text/html");
      const hasHtmlCopied = Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
      if (hasHtmlCopied) {
        e.stopPropagation();
        e.preventDefault();
        editor.innerHTML += pastedData;
      }
    }
    container.appendChild(editor);
  }
}
