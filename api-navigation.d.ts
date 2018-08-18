/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   api-navigation.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-if.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-repeat.d.ts" />
/// <reference path="../polymer/types/lib/utils/render-status.d.ts" />
/// <reference path="../raml-aware/raml-aware.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../iron-collapse/iron-collapse.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../amf-helper-mixin/amf-helper-mixin.d.ts" />

declare namespace ApiElements {

  /**
   * `api-navigation`
   * A navigation for an API spec using AMF model.
   *
   * This element is to replace deprecated `raml-path-selector`.
   * It is lightweight and much less complex in comparision.
   *
   * The element works with [AMF](https://github.com/mulesoft/amf)
   * json/ld model. When the model is set it computes list of documentation
   * nodes, types, endpoints, mathods and security schemas.
   * As a result user can select any of the items in the UI and the application
   * is informed about user choice via custom event.
   *
   * The selection is a selected API shape `@id`. The application is responsible
   * for computing the model selected by the user.
   *
   * AMF model can be passed directly by setting `amfModel` property or by
   * setting `aware` property and by use `raml-aware` element. It allows
   * to communicate AMF data without having access to the element due to
   * shadow DOM restrictions.
   *
   * ```html
   * <raml-aware scope="api-console"></raml-aware>
   * <api-navigation aware="api-console"></api-navigation>
   * ```
   *
   * Once the `raml-aware` element receives some that they are instantly
   * transfered to `api-navigation`.
   *
   * Note, this element does not contain polyfills for Array platform features.
   * Use `arc-polyfills` to add support for IE and Safari 9.
   *
   * ## Passive navigation
   *
   * Passive navigation means that a navigation event occured but it wasn't
   * invoked by intentional user interaction. For example
   * `api-endpoint-documentation` component renders list of documentations for
   * HTTP methods. While scrolling through the list navigation context
   * changes (user reads documentation of a method) but the navigation never
   * was caused by user intentional interaction.
   * This event, annotated with `passive: true` property in the detail object
   * prohibits other element from taking a navigation action but some
   * may reflect the change in the UI.
   *
   * ## Styling
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--api-navigation` | Mixin applied to this element | `{}`
   * `--arc-font-common-base` | Mixin applied to section headers. Theme mixin | `{}`
   * `--arc-font-font1` | Mixin applied to the element. Theme mixin | `{}`
   * `--api-navigation-header-color` | Color of section title | `rgba(0, 0, 0, 0.84)`
   * `--api-navigation-section-title-background-color` | Background color of the section title | `inherit`
   * `--api-navigation-list-item-min-height` | Minimum heigtht of menu items. Note that each item has top and bottom padding set to 4px which cobines to default 48px. | `40px`
   * `--api-navigation-list-item-color` | Color of the menu items | `rgba(0, 0, 0, 0.84)`
   * `--api-navigation-list-item` | Mixin applied to the menu items | `{}`
   * `--api-navigation-list-item-selected-weight` | Font weight of selected menu item | `bold`
   * `--api-navigation-list-item-selected-background-color` | Background color of selected menu item | `--accent-color`
   * `--api-navigation-list-item-selected-color` | Color of selected menu item | `#fff`
   * `--api-navigation-list-item-selected` | Mixin applied to the selected item | `{}`
   * `--api-navigation-list-item-disabled-color` | Color of disabled menu item. Currently not in use. | `--disabled-text-color`
   * `--api-navigation-list-item-disabled` | Mixin applied to disabled menu item. Currently not in use. | `{}`
   * `--api-navigation-list-item-focused` |  Mixin applied to focused menu item. | `{}`
   * `--api-navigation-list-item-focused-before` | Mixin applied to the `:before` pseudo-element of focused item | `{}`
   * `--api-navigation-list-item-hovered` | Mixin applied to menu item when hovering and not focused. Note, you should not rely of hover states | `{}`
   * `--api-navigation-toggle-icon-color` | Color of the toggle button next to section title | `rgba(0, 0, 0, 0.74)`
   * `--api-navigation-toggle-icon-hover-color` | Color of the toggle button next to section title when hovering. | `--secondary-button-color` or `rgba(0, 0, 0, 0.88)`
   * `--api-navigation-endpoint-toggle-icon-color` | Colot of endpoint toggle button | `--api-navigation-toggle-icon-color` or `rgba(0, 0, 0, 0.74)`
   * `--api-navigation-endpoint-toggle-icon` | Mixin applied to endpoint toggle icon | `{}`
   * `--method-display-get-color` | Font color of the GET method label box | `rgb(0, 128, 0)`
   * `--method-display-post-color` | Font color of the POST method label box | `rgb(33, 150, 243)`
   * `--method-display-put-color` | Font color of the PUT method label box | `rgb(255, 165, 0)`
   * `--method-display-delete-color` | Font color of the DELETE method label box | `rgb(244, 67, 54)`
   * `--method-display-patch-color` | Font color of the PATCH method label box | `rgb(156, 39, 176)`
   * `--api-navigation-operation-item-padding-left` | Padding left of operation (method) label under endpoint | `20px`
   * `--api-navigation-operation-collapse` | Mixin applied to operation list collapsable element | ``
   * `--api-navigation-list-section-font-size` | Font size of toggable section label | `16px`
   * `--api-navigation-endpoint-font-size` | Font size applied to endpoint label | `15px`
   * `--api-navigation-operation-font-size` | Font size of operation (HTTP method) label | `14px`
   * `--api-navigation-summary-label` | Mixin applied top the summary label | `{}`
   * `--api-navigation-list-item-padding` | Padding of list a item | `4px 16px`
   * `--api-navigation-toggle-icon` | Mixin applied to toggle icon | `{}`
   * `--api-navigation-list-item-selected-passive` | Mixin applied to an item selected via "passive" navigation event" | `{}`
   * `--api-navigation-method-label-color` | Color of the HTTP method label | `#000`
   * `--api-navigation-method-label-background-color` | Background color of the HTTP method label | `transparent`
   * `--api-navigation-method-label-border-radius` | Border radius of HTTP method label | `3px`
   * `--method-display-font-weigth` | Font weight of HTTP label | `400`
   * `--method-label-VERB-background-color` | Background color of HTTP method label. Possible verbs are: `get`, `post`, `put`, `delete`, `patch` | `vary`
   * `--method-label-VERB-color` | Color of HTTP method label. Possible verbs are: `get`, `post`, `put`, `delete`, `patch` | `vary`
   * `--api-navigation-operation-endpoint-opened-background-color` | Background color of opened methods list | `inherit`
   */
  class ApiNavigation extends
    ApiElements.AmfHelperMixin(
    Polymer.Element) {

    /**
     * `raml-aware` scope property to use.
     */
    aware: string|null|undefined;

    /**
     * A model `@id` of selected documentation part.
     * Special case is for `summary` view. It's not part of an API
     * but most applications has some kins of summary view for the
     * API.
     */
    selected: string|null|undefined;

    /**
     * Type of the selected item.
     * One of `documentation`, `type`, `security`, `endpoint`, `method`
     * or `summary`.
     *
     * This property is set after `selected` property.
     */
    selectedType: string|null|undefined;

    /**
     * If set it renders `API summary` menu option.
     * It will allow to set `selected` and `selectedType` to `summary`
     * when this option is set.
     */
    summary: boolean|null|undefined;

    /**
     * A label for the `summary` section.
     */
    summaryLabel: string|null|undefined;

    /**
     * Computed list of documentatoin items in the API.
     */
    readonly docs: Array<object|null>|null;

    /**
     * Computed value, true when `docs` property is set with values
     */
    readonly hasDocs: object|null;

    /**
     * Determines and changes state of documentation panel.
     */
    docsOpened: boolean|null|undefined;

    /**
     * Computed list of "type" items in the API.
     */
    readonly types: Array<object|null>|null;

    /**
     * Computed value, true when `types` property is set with values
     */
    readonly hasTypes: object|null;

    /**
     * Determines and changes state of types panel.
     */
    typesOpened: boolean|null|undefined;

    /**
     * Computed list of Security schemes items in the API.
     */
    readonly security: Array<object|null>|null;

    /**
     * Computed value, true when `security` property is set with values
     */
    readonly hasSecurity: object|null;

    /**
     * Determines and changes state of security panel.
     */
    securityOpened: boolean|null|undefined;

    /**
     * Computed list of endpoint items in the API.
     */
    readonly endpoints: Array<object|null>|null;

    /**
     * Computed value, true when `endpoints` property is set with values
     */
    readonly hasEndpoints: object|null;

    /**
     * Determines and changes state of endpoints panel.
     */
    endpointsOpened: boolean|null|undefined;

    /**
     * If true, the element will not produce a ripple effect when interacted with via the pointer.
     */
    noink: boolean|null|undefined;

    /**
     * Filters list elements by this value when set.
     * Clear the value to reset the search.
     *
     * This is not currently exposed in element's UI due
     * to complexity of search and performance.
     */
    query: string|null|undefined;

    /**
     * Size of endpoint indentation for nested resources.
     * In pixels.
     */
    indentSize: number|null|undefined;

    /**
     * Ensures aria role atribute is in place.
     * Attaches element's listeners.
     */
    connectedCallback(): void;
    disconnectedCallback(): void;

    /**
     * Called by the Polymer change observer when `amfModel` property change.
     *
     * @param model AMF model
     */
    _amfChanged(model: any[]|object|null): void;

    /**
     * Collects the information about the API and creates data model
     * for the navigation element
     *
     * @returns Data model for the API navigation:
     * - documentation `Array` - List of documentation data models:
     *  - id `String` - Node `@id`
     *  - label `String` - Node label
     * - types `Array` - List of types data models:
     *  - id `String` - Node `@id`
     *  - label `String` - Node label
     * - securitySchemes `Array` - List of security schemes data models:
     *  - id `String` - Node `@id`
     *  - label `String` - Node label
     * - endpoints `Array` - List of endpoints data models:
     *  - id `String` - Node `@id`
     *  - label `String` - Node label
     *  - methods `Array` - List of methonds data models in an endpoint:
     *    - id `String` - Node `@id`
     *    - label `String` - Node label
     */
    _collectData(model: object|null): object|null;

    /**
     * Traverses the `http://raml.org/vocabularies/document#declares`
     * node to find types and security schemes.
     *
     * @param target Target object where to put data.
     */
    _traverseDeclarations(model: object|null, target: object|null): void;

    /**
     * Traverses the `http://raml.org/vocabularies/document#references`
     *
     * @param model AMF model
     * @param target Target object where to put data.
     */
    _traverseReferences(model: any[]|object|null, target: object|null): void;

    /**
     * Traverses the `http://raml.org/vocabularies/document#encodes`
     * node to find documentation and endpoints.
     *
     * @param target Target object where to put data.
     */
    _traverseEncodes(model: object|null, target: object|null): void;

    /**
     * Appends declaration of navigation data model to the target if
     * it matches documentation or security types.
     */
    _appendModelItem(item: object|null, target: object|null): void;

    /**
     * Appends "type" item to the results.
     *
     * @param item Type item declaration
     */
    _appendTypeItem(item: object|null, target: object|null): void;

    /**
     * Appends "security" item to the results.
     *
     * @param item Type item declaration
     */
    _appendSecurityItem(item: object|null, target: object|null): void;

    /**
     * Appends "documentation" item to the results.
     *
     * @param item Type item declaration
     */
    _appendDocumentationItem(item: object|null, target: object|null): void;

    /**
     * Appends "endpoint" item to the results.
     * This also iterates over methods to extract method data.
     *
     * @param item Type item declaration
     */
    _appendEndpointItem(item: object|null, target: object|null): void;

    /**
     * Computes a label for the last part of the path.
     *
     * @param paths List of path names
     */
    _computeLastPathName(paths: Array<String|null>|null): String|null;

    /**
     * Creates the view model for an opration.
     *
     * @param item Operation AMF model
     * @returns Method view model
     */
    _createOperationModel(item: object|null): object|null;

    /**
     * Click handler for section name item.
     * Toggles the view.
     */
    _toggleSection(e: ClickEvent|null): void;

    /**
     * Selectes new item in the menu.
     */
    _selectItem(node: Node|null): void;

    /**
     * Toggles selection state of a node that has `data-api-id` set to
     * `id`.
     *
     * @param id Selected node id.
     * @returns Type of selected node.
     */
    _addSelection(id: String|null): String|null;

    /**
     * Removes any current selection that may exist.
     */
    _clearSelection(): void;

    /**
     * Toggles endpoint operations list.
     *
     * @param id ID of the endpoint.
     */
    toggleOperations(id: String|null): void;

    /**
     * Updates the state of selected element when `selected` changes.
     *
     * @param current New selection
     */
    _selectedChangd(current: String|null): void;

    /**
     * Label check agains `query` function called by `dom-repeat` element.
     * This method uses `__effectiveQuery` property set by `_flushQuery()`
     * method.
     *
     * @param item Model item with `lable` property.
     */
    _labelFilter(item: object|null): Boolean|null;

    /**
     * Label and method check agains `query` function called by `dom-repeat`
     * element. This method uses `__effectiveQuery` property set by
     * `_flushQuery()` method.
     *
     * @param item Model item with `lable` property.
     */
    _methodFilter(item: object|null): Boolean|null;

    /**
     * When `query` property change it runs the filter function
     * in a debouncer set for ~50 ms.
     */
    _queryChanged(): void;

    /**
     * Calles `render()` function on each data repeater that have filterable
     * items.
     * It set's `__effectiveQuery` property on the element that is beyond
     * Polymer's data binding system so it skips 2 function calls each time
     * it is read. In a repeater filter function that can be a lot.
     *
     * Also the `__effectiveQuery` is transformed to perform text search.
     */
    _flushQuery(): void;

    /**
     * Hides the parent model when number of children is 0 or shows it
     * otherwise.
     */
    _methodsCountChanged(e: CustomEvent|null): void;

    /**
     * Dispatches `api-navigation-selection-changed` event on selection change.
     *
     * @param selected Selected id
     * @param selectedType Type of AMF shape
     */
    _selectionChnaged(selected: String|null, selectedType: String|null): void;

    /**
     * Navigation item click handler.
     * It used to be common function for all clicks inside the element
     * but in tests not all events were handled.
     */
    _itemClickHandler(e: ClickEvent|null): void;

    /**
     * Handler for `api-navigation-selection-changed`. Updates the selection
     * if dispatched from other element.
     */
    _navigationChangeHandler(e: CustomEvent|null): void;
    _handlePassiveNavigation(detail: any): void;
    _cleanPassiveSelection(): void;
    _selectMethodPassive(id: any): void;

    /**
     * Endpoint label click handler.
     * Toggles endpoint's methods list.
     */
    _toggleEndpoint(e: ClickEvent|null): void;

    /**
     * Computes `style` attribute value for endpoint item.
     * It sets padding-left property to indent resources.
     * See https://github.com/mulesoft/api-console/issues/571.
     *
     * @param factor Computed indent factor for the resource
     * @param size The size of indentation in pixels.
     * @returns Style attribute value for the item.
     */
    _computeEndpointPadding(factor: Number|null, size: Number|null): String|null;
    _computeMethodPadding(factor: any, size: any): any;

    /**
     * Computes operation list item left padding from CSS veriables.
     */
    _computeOperationPaddingLeft(): Number|null;

    /**
     * Computes endpoint list item left padding from CSS veriables.
     */
    _computeEndpointPaddingLeft(): Number|null;

    /**
     * Cancels space key down event when selecting a method with keyboard.
     * Without it the page would scroll down.
     */
    _spaceDownHandler(e: KeyboardEvent|null): void;

    /**
     * Selectes an item when space up event is detected.
     */
    _spaceUpHandler(e: KeyboardEvent|null): void;
  }
}

interface HTMLElementTagNameMap {
  "api-navigation": ApiElements.ApiNavigation;
}
