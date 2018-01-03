'use babel';

import HtmlToJsx from '../lib/html-to-jsx';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('HtmlToJsx', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('html-to-jsx');
  });

  describe('when the html-to-jsx:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.html-to-jsx')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'html-to-jsx:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.html-to-jsx')).toExist();

        let htmlToJsxElement = workspaceElement.querySelector('.html-to-jsx');
        expect(htmlToJsxElement).toExist();

        let htmlToJsxPanel = atom.workspace.panelForItem(htmlToJsxElement);
        expect(htmlToJsxPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'html-to-jsx:toggle');
        expect(htmlToJsxPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.html-to-jsx')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'html-to-jsx:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let htmlToJsxElement = workspaceElement.querySelector('.html-to-jsx');
        expect(htmlToJsxElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'html-to-jsx:toggle');
        expect(htmlToJsxElement).not.toBeVisible();
      });
    });
  });
});
