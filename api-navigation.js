import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@api-components/raml-aware/raml-aware.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@api-components/http-method-label/http-method-label-common-styles.js';
/* eslint-disable max-len */
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
 * `--api-navigation-path-label-font-size` | Path label font size | `13px`
 * `--api-navigation-path-label-color` | Path label font color | `#616161`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin AmfHelperMixin
 */
class ApiNavigation extends AmfHelperMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="http-method-label-common-styles"></style>
    <style>
    :host {
      display: block;
      background-color: inherit;
      color: inherit;
      overflow: auto;
      position: relative;
      @apply --arc-font-body1;
      @apply --api-navigation;
    }

    h3,
    .list-item.summary {
      @apply --arc-font-common-base;
      font-size: var(--api-navigation-list-section-font-size, 16px);
      font-weight: 500;
      line-height: 24px;
      color: var(--api-navigation-header-color, rgba(0, 0, 0, 0.84));
      @apply --layout-flex;
      padding: 0;
      margin: 0;
    }

    .list-item.summary {
      padding: 12px 16px;
      @apply --api-navigation-summary-label;
    }

    .list-item.endpoint {
      font-weight: 500;
      font-size: var(--api-navigation-endpoint-font-size, 15px);
      user-select: none;
      font-weight: normal;
      @apply --layout-horizontal;
    }

    .list-item.endpoint:first-of-type {
      margin-top: 0px;
    }

    .path-details {
      @apply --layout-flex;
    }

    .path-name,
    .endpoint-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .path-name {
      font-size: var(--api-navigation-path-label-font-size, 13px);
      color: var(--api-navigation-path-label-color, #616161);
    }

    *[hidden] {
      display: none !important;
    }

    .children {
      background-color: inherit;
    }

    .section-title {
      @apply --layout-horizontal;
      @apply --layout-center;
      cursor: pointer;
      padding: var(--api-navigation-section-title-padding, 4px 16px);
      background-color: var(--api-navigation-section-title-background-color, inherit);
      user-select: none;
      min-height: 40px;
    }

    .list-item {
      display: block;
      position: relative;
      min-height: var(--api-navigation-list-item-min-height, 40px);
      padding: var(--api-navigation-list-item-padding, 4px 16px);
      border:none;
      outline: none;
      background-color: inherit;
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      cursor: pointer;
      word-break: break-all;
      color: var(--api-navigation-list-item-color, rgba(0, 0, 0, 0.84));
      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --api-navigation-list-item;
    }

    .list-item.iron-selected {
      font-weight: var(--api-navigation-list-item-selected-weight, bold);
      background-color: var(--api-navigation-list-item-selected-background-color, var(--accent-color));
      color: var(--api-navigation-list-item-selected-color, #fff);
      @apply --api-navigation-list-item-selected;
    }

    .list-item.passive-selected {
      font-weight: var(--api-navigation-list-item-selected-weight, bold);
      @apply --api-navigation-list-item-selected-passive;
    }

    .list-item[disabled] {
      color: var(--api-navigation-list-item-disabled-color, var(--disabled-text-color));
      @apply --api-navigation-list-item-disabled;
    }

    .list-item:focus {
      position: relative;
      outline: 0;
      @apply --api-navigation-list-item-focused;
    }

    .list-item:focus:before {
      @apply --layout-fit;
      background: currentColor;
      content: '';
      opacity: var(--dark-divider-opacity);
      pointer-events: none;
      @apply --api-navigation-list-item-focused-before;
    }

    .list-item:hover:not(.iron-selected) {
      @apply --api-navigation-list-item-hovered;
    }

    .toggle-button,
    .endpoint-toggle-button {
      transform: rotateZ(0deg);
      transition: color 0.25s ease-in-out, transform 0.3s ease-in-out;
    }

    .toggle-button {
      color: var(--api-navigation-toggle-icon-color, rgba(0, 0, 0, 0.74));
      @apply --api-navigation-toggle-icon;
    }

    .endpoint-toggle-button {
      color: var(--api-navigation-endpoint-toggle-icon-color, var(--api-navigation-toggle-icon-color, rgba(0, 0, 0, 0.74)));
      transform: rotateZ(0deg);
      transition: color 0.25s ease-in-out, transform 0.3s ease-in-out;
      @apply --api-navigation-toggle-icon;
      @apply --api-navigation-endpoint-toggle-icon;
    }

    .toggle-button:hover {
      color: var(--api-navigation-toggle-icon-hover-color, var(--secondary-button-color, rgba(0, 0, 0, 0.88)));
    }

    .endpoint-toggle-button:hover {
      color: var(--api-navigation-endpoint-toggle-icon-hover-color, var(--api-navigation-toggle-icon-hover-color, var(--secondary-button-color, rgba(0, 0, 0, 0.88))));
    }

    [data-opened] .toggle-button,
    [endpoint-opened] .endpoint-toggle-button {
      transform: rotateZ(-180deg);
    }

    .method-label {
      margin-bottom: 0;
      white-space: nowrap;
    }

    .list-item.iron-selected .method-label[data-method] {
      color: var(--method-display-selected-color, #fff);
    }

    .operation {
      padding-left: var(--api-navigation-operation-item-padding-left, 24px);
      font-size: var(--api-navigation-operation-font-size, 14px);
    }

    .operation-collapse {
      @apply --api-navigation-operation-collapse;
    }

    [endpoint-opened] {
      background-color: var(--api-navigation-operation-endpoint-opened-background-color, inherit);
    }
    </style>
    <template is="dom-if" if="[[aware]]">
      <raml-aware raml="{{amfModel}}" scope="[[aware]]"></raml-aware>
    </template>
    <template is="dom-if" if="[[_renderSummary]]">
      <section class="summary">
        <div class="list-item summary" role="option" tabindex="0" data-api-id="summary" data-shape="summary" on-click="_itemClickHandler">[[summaryLabel]]</div>
      </section>
    </template>

    <template is="dom-if" if="[[hasEndpoints]]">
      <section class="endpoints" data-opened\$="[[endpointsOpened]]">
        <div class="section-title" data-section="endpoints" on-click="_toggleSection" title="Toggle endpoints list">
          <h3>Endpoints</h3>
          <paper-icon-button class="toggle-button" icon="arc:keyboard-arrow-down" noink="[[noink]]"></paper-icon-button>
        </div>
        <iron-collapse opened="[[endpointsOpened]]">
          <div class="children">
            <template is="dom-repeat" items="[[endpoints]]">
              <div class="list-item endpoint" hidden\$="[[item.hidden]]" data-endpoint-id\$="[[item.id]]" data-endpoint-path\$="[[item.path]]" on-click="_toggleEndpoint" title="Toggle endpoint documentation" style\$="[[_computeEndpointPadding(item.indent, indentSize)]]">
                <div class="path-details">
                  <div class="endpoint-name">[[item.label]]</div>
                  <template is="dom-if" if="[[_computeRenderParth(allowPaths, item.renderPath)]]">
                    <div class="path-name">[[item.path]]</div>
                  </template>
                </div>
                <paper-icon-button class="endpoint-toggle-button" icon="arc:keyboard-arrow-down" noink="[[noink]]"></paper-icon-button>
              </div>
              <iron-collapse class="operation-collapse" hidden\$="[[item.hidden]]" data-api-id\$="[[item.id]]">
                <div class="list-item operation" role="option" tabindex="0" data-api-id\$="[[item.id]]" data-shape="endpoint" on-click="_itemClickHandler" on-keyup="_spaceUpHandler" on-keydown="_spaceDownHandler" style\$="[[_computeMethodPadding(item.indent, indentSize)]]">
                  Overview
                </div>
                <template is="dom-repeat" items="[[item.methods]]" data-query="" as="methodItem" on-rendered-item-count-changed="_methodsCountChanged" filter="_methodFilter" observe="method label">
                  <div class="list-item operation" role="option" tabindex="0" data-api-id\$="[[methodItem.id]]" data-parent-id\$="[[item.id]]" data-shape="method" on-click="_itemClickHandler" on-keyup="_spaceUpHandler" on-keydown="_spaceDownHandler" style\$="[[_computeMethodPadding(item.indent, indentSize)]]">
                    <span class="method-label" data-method\$="[[methodItem.method]]">[[methodItem.method]]</span>
                    [[methodItem.label]]
                  </div>
                </template>
              </iron-collapse>
            </template>
          </div>
        </iron-collapse>
      </section>
    </template>

    <template is="dom-if" if="[[hasDocs]]">
      <section class="documentation" data-opened\$="[[docsOpened]]">
        <div class="section-title" data-section="docs" on-click="_toggleSection" title="Toggle documentation list">
          <h3>Documentation</h3>
          <paper-icon-button class="toggle-button" icon="arc:keyboard-arrow-down" noink="[[noink]]" on-click="_itemClickHandler"></paper-icon-button>
        </div>
        <iron-collapse opened="[[docsOpened]]">
          <div class="children">
            <template is="dom-repeat" items="[[docs]]" filter="_labelFilter" observe="label" data-query="">
              <div class="list-item" role="option" tabindex="0" data-api-id\$="[[item.id]]" data-shape="documentation" on-click="_itemClickHandler">[[item.label]]</div>
            </template>
          </div>
        </iron-collapse>
      </section>
    </template>
    <template is="dom-if" if="[[hasTypes]]">
      <section class="types" data-opened\$="[[typesOpened]]">
        <div class="section-title" data-section="types" on-click="_toggleSection" title="Toggle types list">
          <h3>Types</h3>
          <paper-icon-button class="toggle-button" icon="arc:keyboard-arrow-down" noink="[[noink]]"></paper-icon-button>
        </div>
        <iron-collapse opened="[[typesOpened]]">
          <div class="children">
            <template is="dom-repeat" items="[[types]]" filter="_labelFilter" observe="label" data-query="">
              <div class="list-item" role="option" tabindex="0" data-api-id\$="[[item.id]]" data-shape="type" on-click="_itemClickHandler">[[item.label]]</div>
            </template>
          </div>
        </iron-collapse>
      </section>
    </template>
    <template is="dom-if" if="[[hasSecurity]]">
      <section class="security" data-opened\$="[[securityOpened]]">
        <div class="section-title" data-section="security" on-click="_toggleSection" title="Toggle security list">
          <h3>Security</h3>
          <paper-icon-button class="toggle-button" icon="arc:keyboard-arrow-down" noink="[[noink]]"></paper-icon-button>
        </div>
        <iron-collapse opened="[[securityOpened]]">
          <div class="children">
            <template is="dom-repeat" items="[[security]]" filter="_labelFilter" observe="label" data-query="">
              <div class="list-item" role="option" tabindex="0" data-api-id\$="[[item.id]]" data-shape="security" on-click="_itemClickHandler">[[item.label]]</div>
            </template>
          </div>
        </iron-collapse>
      </section>
    </template>
`;
  }

  static get is() {
    return 'api-navigation';
  }
  static get properties() {
    return {
      /**
       * `raml-aware` scope property to use.
       */
      aware: String,
      /**
       * A model `@id` of selected documentation part.
       * Special case is for `summary` view. It's not part of an API
       * but most applications has some kins of summary view for the
       * API.
       */
      selected: {
        type: String,
        notify: true,
        observer: '_selectedChangd'
      },
      /**
       * Type of the selected item.
       * One of `documentation`, `type`, `security`, `endpoint`, `method`
       * or `summary`.
       *
       * This property is set after `selected` property.
       */
      selectedType: {
        type: String,
        notify: true
      },
      /**
       * If set it renders `API summary` menu option.
       * It will allow to set `selected` and `selectedType` to `summary`
       * when this option is set.
       */
      summary: Boolean,
      /**
       * A label for the `summary` section.
       */
      summaryLabel: {
        type: String,
        value: 'Summary'
      },
      /**
       * Computed list of documentatoin items in the API.
       *
       * @type {Array<Object>}
       */
      docs: {
        type: Array,
        readOnly: true
      },
      /**
       * Computed value, true when `docs` property is set with values
       *
       * @type {Object}
       */
      hasDocs: {
        type: Boolean,
        readOnly: true,
        computed: '_computeHasArrayValue(docs)'
      },
      /**
       * Determines and changes state of documentation panel.
       */
      docsOpened: Boolean,
      /**
       * Computed list of "type" items in the API.
       *
       * @type {Array<Object>}
       */
      types: {
        type: Array,
        readOnly: true
      },
      /**
       * Computed value, true when `types` property is set with values
       *
       * @type {Object}
       */
      hasTypes: {
        type: Boolean,
        readOnly: true,
        computed: '_computeHasArrayValue(types)'
      },
      /**
       * Determines and changes state of types panel.
       */
      typesOpened: Boolean,
      /**
       * Computed list of Security schemes items in the API.
       *
       * @type {Array<Object>}
       */
      security: {
        type: Array,
        readOnly: true
      },
      /**
       * Computed value, true when `security` property is set with values
       *
       * @type {Object}
       */
      hasSecurity: {
        type: Boolean,
        readOnly: true,
        computed: '_computeHasArrayValue(security)'
      },
      /**
       * Determines and changes state of security panel.
       */
      securityOpened: Boolean,
      /**
       * Computed list of endpoint items in the API.
       *
       * @type {Array<Object>}
       */
      endpoints: {
        type: Array,
        readOnly: true
      },
      /**
       * Computed value, true when `endpoints` property is set with values
       *
       * @type {Object}
       */
      hasEndpoints: {
        type: Boolean,
        readOnly: true,
        computed: '_computeHasArrayValue(endpoints)'
      },
      /**
       * Determines and changes state of endpoints panel.
       */
      endpointsOpened: Boolean,
      /**
       * If true, the element will not produce a ripple effect when interacted with via the pointer.
       */
      noink: Boolean,
      /**
       * Filters list elements by this value when set.
       * Clear the value to reset the search.
       *
       * This is not currently exposed in element's UI due
       * to complexity of search and performance.
       */
      query: {
        type: String,
        observer: '_queryChanged'
      },
      /**
       * Size of endpoint indentation for nested resources.
       * In pixels.
       */
      indentSize: {
        type: Number,
        value: 8
      },
      /**
       * Flag set when passed AMF model is a RAML fragment.
       */
      _isFragment: {
        type: Boolean,
        value: false
      },
      /**
       * Computed value. True when summary should be rendered.
       * Summary should be rendered only when `summary` is set and
       * current model is not a RAML fragment.
       */
      _renderSummary: {
        type: Boolean,
        computed: '_computeRenderSummary(summary, _isFragment)'
      },
      /**
       * When set it renders full path below endpoint name if the endpoint has
       * a name (different than the path).
       * This is not always recommended to use this option as some complex APIs
       * may render this component difficult to understand.
       */
      allowPaths: Boolean
    };
  }

  static get observers() {
    return [
      '_amfChanged(amfModel)',
      '_selectionChnaged(selected, selectedType)'
    ];
  }

  constructor() {
    super();
    this._navigationChangeHandler = this._navigationChangeHandler.bind(this);
  }

  /**
   * Ensures aria role atribute is in place.
   * Attaches element's listeners.
   */
  connectedCallback() {
    super.connectedCallback();
    if (!this.getAttribute('role')) {
      this.setAttribute('role', 'navigation');
    }
    window.addEventListener('api-navigation-selection-changed', this._navigationChangeHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('api-navigation-selection-changed', this._navigationChangeHandler);
  }
  /**
   * Called by the Polymer change observer when `amfModel` property change.
   * @param {Array|Object} model AMF model
   */
  _amfChanged(model) {
    if (!model) {
      return;
    }
    if (model instanceof Array) {
      model = model[0];
    }
    let data = {};
    let isFragment = true;
    const moduleKey = this._getAmfKey(this.ns.raml.vocabularies.document + 'Module');
    if (this._hasType(model, this.ns.raml.vocabularies.document + 'Document')) {
      isFragment = false;
      model = this._ensureAmfModel(model);
      data = this._collectData(model);
    } else if (this._hasType(model, this.ns.raml.vocabularies.document + 'SecuritySchemeFragment')) {
      data = this._collectSecurityData(model);
      this.securityOpened = true;
    } else if (this._hasType(model, this.ns.raml.vocabularies.document + 'UserDocumentation')) {
      data = this._collectDocumentationData(model);
      this.docsOpened = true;
    } else if (this._hasType(model, this.ns.raml.vocabularies.document + 'DataType')) {
      data = this._collectTypeData(model);
      this.typesOpened = true;
    } else if (moduleKey === model['@type'][0]) {
      data = this._collectData(model);
    }
    if (this._isFragment !== isFragment) {
      this._isFragment = isFragment;
    }
    this._setDocs(data.documentation);
    this._setTypes(data.types);
    this._setSecurity(data.securitySchemes);
    this._setEndpoints(data.endpoints);
    afterNextRender(this, () => {
      this._selectedChangd(this.selected);
    });
  }

  /**
   * Collects the information about the API and creates data model
   * for the navigation element
   *
   * @param {Object} model
   * @return {Object} Data model for the API navigation:
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
  _collectData(model) {
    const result = {
      documentation: [],
      types: [],
      securitySchemes: [],
      endpoints: []
    };
    if (!model) {
      return result;
    }
    result._typeIds = [];
    result._basePaths = [];
    this._traverseDeclarations(model, result);
    this._traverseReferences(model, result);
    this._traverseEncodes(model, result);
    delete result._typeIds;
    delete result._basePaths;
    return result;
  }
  /**
   * Collects the data from the security fragment
   * @param {Object} model Security fragment model
   * @return {Object}
   */
  _collectSecurityData(model) {
    const result = {
      securitySchemes: []
    };
    let encodes = this._computeEncodes(model);
    if (!encodes) {
      return;
    }
    this._appendSecurityItem(encodes, result);
    return result;
  }
  /**
   * Collects the data from the documentation fragment
   * @param {Object} model Documentation fragment model
   * @return {Object}
   */
  _collectDocumentationData(model) {
    const result = {
      documentation: []
    };
    let encodes = this._computeEncodes(model);
    if (!encodes) {
      return;
    }
    this._appendDocumentationItem(encodes, result);
    return result;
  }
  /**
   * Collects the data from the type fragment
   * @param {Object} model Type fragment model
   * @return {Object}
   */
  _collectTypeData(model) {
    const result = {
      types: [],
      _typeIds: []
    };
    let encodes = this._computeEncodes(model);
    if (!encodes) {
      return;
    }
    this._appendTypeItem(encodes, result);
    delete result._typeIds;
    return result;
  }
  /**
   * Traverses the `http://raml.org/vocabularies/document#declares`
   * node to find types and security schemes.
   *
   * @param {Object} model
   * @param {Object} target Target object where to put data.
   */
  _traverseDeclarations(model, target) {
    const declares = this._computeDeclares(model);
    if (!declares) {
      return;
    }
    declares.forEach((item) => this._appendModelItem(item, target));
  }
  /**
   * Traverses the `http://raml.org/vocabularies/document#references`
   *
   * @param {Array|Object} model AMF model
   * @param {Object} target Target object where to put data.
   */
  _traverseReferences(model, target) {
    const refs = this._computeReferences(model);
    if (!refs) {
      return;
    }
    refs.forEach((item) => {
      if (!this._hasType(item, this.ns.raml.vocabularies.document + 'Module')) {
        return;
      }
      this._traverseDeclarations(item, target);
    });
  }
  /**
   * Traverses the `http://raml.org/vocabularies/document#encodes`
   * node to find documentation and endpoints.
   *
   * @param {Object} model
   * @param {Object} target Target object where to put data.
   */
  _traverseEncodes(model, target) {
    const data = this._computeWebApi(model);
    if (!data) {
      return;
    }
    const ekey = this._getAmfKey(this.ns.raml.vocabularies.http + 'endpoint');
    const endpoint = this._ensureArray(data[ekey]);
    if (endpoint) {
      endpoint.forEach((item) => this._appendModelItem(item, target));
    }
    const dkey = this._getAmfKey(this.ns.schema.doc);
    const documentation = this._ensureArray(data[dkey]);
    if (documentation) {
      documentation.forEach((item) => this._appendModelItem(item, target));
    }
  }
  /**
   * Appends declaration of navigation data model to the target if
   * it matches documentation or security types.
   *
   * @param {Object} item
   * @param {Object} target
   */
  _appendModelItem(item, target) {
    if (this._hasType(item, this.ns.w3.shacl.shape)) {
      this._appendTypeItem(item, target);
    } else if (this._hasType(item, this.ns.raml.vocabularies.security + 'SecurityScheme')) {
      this._appendSecurityItem(item, target);
    } else if (this._hasType(item, this.ns.schema.creativeWork)) {
      this._appendDocumentationItem(item, target);
    } else if (this._hasType(item, this.ns.raml.vocabularies.http + 'EndPoint')) {
      this._appendEndpointItem(item, target);
    }
  }
  /**
   * Appends "type" item to the results.
   *
   * @param {Object} item Type item declaration
   * @param {Object} target
   */
  _appendTypeItem(item, target) {
    const w3name = this._getValue(item, this.ns.w3.shacl.name + 'name');
    if (w3name && w3name.indexOf('amf_inline_type') === 0) {
      // https://www.mulesoft.org/jira/browse/APIMF-972
      return;
    }
    let name = this._getValue(item, this.ns.schema.schemaName);
    if (!name && w3name) {
      name = w3name;
    } else if (!name) {
      return;
    }
    const id = item['@id'];
    if (!id) {
      return;
    }
    const rfIdKey = this._getAmfKey(this.ns.raml.vocabularies.document + 'reference-id');
    const compareId = item['@id'].toLowerCase();
    const refNode = this._ensureArray(item[rfIdKey]);
    const refId = refNode ? refNode[0]['@id'].toLowerCase() : undefined;
    const idIndex = target._typeIds.indexOf(compareId);
    const refIndex = refId ? target._typeIds.indexOf(refId) : -1;
    if (idIndex === -1 && refIndex === -1) {
      target._typeIds[target._typeIds.length] = id;
      if (refId) {
        target._typeIds[target._typeIds.length] = refId;
      }
      target.types.push({
        label: name,
        id: id
      });
    }
  }
  /**
   * Appends "security" item to the results.
   *
   * @param {Object} item Type item declaration
   * @param {Object} target
   */
  _appendSecurityItem(item, target) {
    let name = this._getValue(item, this.ns.schema.displayName);
    if (!name) {
      name = this._getValue(item, this.ns.raml.vocabularies.security + 'name');
    }
    if (!name) {
      name = this._getValue(item, this.ns.raml.vocabularies.security + 'type');
    }
    const id = item['@id'];
    target.securitySchemes.push({
      label: name,
      id: id
    });
  }
  /**
   * Appends "documentation" item to the results.
   *
   * @param {Object} item Type item declaration
   * @param {Object} target
   */
  _appendDocumentationItem(item, target) {
    const name = this._getValue(item, this.ns.schema.title);
    const id = item['@id'];
    target.documentation.push({
      label: name,
      id: id
    });
  }
  /**
   * Appends "endpoint" item to the results.
   * This also iterates over methods to extract method data.
   *
   * @param {Object} item Type item declaration
   * @param {Object} target
   */
  _appendEndpointItem(item, target) {
    const result = {};

    let name = this._getValue(item, this.ns.schema.schemaName);
    const path = this._getValue(item, this.ns.raml.vocabularies.http + 'path');
    result.path = path;

    let tmpPath = path;
    if (tmpPath[0] === '/') {
      tmpPath = tmpPath.substr(1);
    }
    const parts = tmpPath.split('/');
    let indent = 0;
    target._basePaths[target._basePaths.length] = path;
    if (parts.length > 1) {
      let lowerParts = parts.slice(0, parts.length - 1);
      if (lowerParts.length) {
        for (let i = lowerParts.length - 1; i >= 0; i--) {
          const currentPath = '/' + lowerParts.slice(0, i + 1).join('/');
          if (target._basePaths.indexOf(currentPath) !== -1) {
            indent++;
          }
        }
      }
    }
    if (!name) {
      result.renderPath = false;
      if (indent > 0) {
        try {
          name = this._computePathName(path, parts, indent, target._basePaths);
        } catch (_) {
          name = path;
        }
      } else {
        name = path;
      }
    } else {
      result.renderPath = true;
    }
    const id = item['@id'];
    const key = this._getAmfKey(this.ns.w3.hydra.supportedOperation);
    const operations = this._ensureArray(item[key]) || [];
    const methods = operations.map((op) => this._createOperationModel(op));
    result.label = name;
    result.id = id;
    result.indent = indent;
    result.methods = methods;
    target.endpoints.push(result);
  }
  /**
   * Computes label for an endpoint when name is missing and the endpoint
   * is indented, hence name should be truncated.
   * @param {String} currentPath Endpoint's path
   * @param {Array<String>} parts Path parts
   * @param {Number} indent Endpoint indentation
   * @param {Array<String>} basePaths List of base paths already used.
   * @return {String} Name of the path to render.
   */
  _computePathName(currentPath, parts, indent, basePaths) {
    let path = '';
    for (let i = 0, len = parts.length; i < len; i++) {
      path += '/' + parts[i];
      if (basePaths.indexOf(path) !== -1) {
        indent--;
      }
      if (indent === 0) {
        break;
      }
    }
    return currentPath.replace(path, '');
  }
  /**
   * Creates the view model for an opration.
   *
   * @param {Object} item Operation AMF model
   * @return {Object} Method view model
   */
  _createOperationModel(item) {
    let name = this._getValue(item, this.ns.schema.schemaName);
    const methodKey = this.ns.w3.hydra.core + 'method';
    const id = item['@id'];
    const method = this._getValue(item, methodKey);
    return {
      label: name,
      id: id,
      method: method
    };
  }
  /**
   * Click handler for section name item.
   * Toggles the view.
   *
   * @param {ClickEvent} e
   */
  _toggleSection(e) {
    const path = e.composedPath();
    let node;
    while (true) {
      node = path.shift();
      if (!node) {
        return;
      }
      if (node.dataset && node.dataset.section) {
        break;
      }
    }
    const section = node.dataset.section;
    const openedKey = section + 'Opened';
    this[openedKey] = !this[openedKey];
  }
  /**
   * Selectes new item in the menu.
   *
   * @param {Node} node
   */
  _selectItem(node) {
    const id = node.dataset.apiId;
    const shape = node.dataset.shape;
    this.selectedType = undefined; // cancels event fireing
    this.selected = id;
    this.selectedType = shape; // now fire event
  }
  /**
   * Toggles selection state of a node that has `data-api-id` set to
   * `id`.
   *
   * @param {String} id Selected node id.
   * @return {String} Type of selected node.
   */
  _addSelection(id) {
    if (!this.shadowRoot) {
      return;
    }
    let node = this.shadowRoot.querySelector(`[data-api-id="${id}"]`);
    if (!node) {
      return;
    }
    if (node.nodeName === 'IRON-COLLAPSE') {
      node = this.shadowRoot.querySelector(`.operation[data-api-id="${id}"]`);
    }
    if (!node) {
      return;
    }
    node.classList.add('iron-selected');
    let collapse;
    switch (node.dataset.shape) {
      case 'method':
      case 'endpoint':
        collapse = node.parentElement;
        break;
      case 'type':
      case 'documentation':
      case 'security':
        collapse = node.parentElement.parentElement;
        break;
    }
    if (collapse && !collapse.opened) {
      collapse.opened = true;
      collapse.setAttribute('endpoint-opened', true);
    }
    return node.dataset.shape;
  }
  /**
   * Removes any current selection that may exist.
   */
  _clearSelection() {
    if (!this.shadowRoot) {
      return;
    }
    const nodes = this.shadowRoot.querySelectorAll('.iron-selected');
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove('iron-selected');
    }
  }
  /**
   * Toggles endpoint operations list.
   *
   * @param {String} id ID of the endpoint.
   */
  toggleOperations(id) {
    let selector = `.operation-collapse[data-api-id="${id}"]`;
    const collapse = this.shadowRoot.querySelector(selector);
    if (!collapse) {
      return;
    }
    collapse.opened = !collapse.opened;
    selector = `.list-item.endpoint[data-endpoint-id="${id}"]`;
    const label = this.shadowRoot.querySelector(selector);
    if (!label) {
      console.warn('Expected label for ', id);
      return;
    }
    if (collapse.opened) {
      label.setAttribute('endpoint-opened', true);
      collapse.setAttribute('endpoint-opened', true);
    } else {
      label.removeAttribute('endpoint-opened');
      collapse.removeAttribute('endpoint-opened');
    }
  }
  /**
   * Updates the state of selected element when `selected` changes.
   *
   * @param {String} current New selection
   */
  _selectedChangd(current) {
    this._clearSelection();
    this._cleanPassiveSelection();
    if (current) {
      this._addSelection(current);
    }
  }
  /**
   * Label check agains `query` function called by `dom-repeat` element.
   * This method uses `__effectiveQuery` property set by `_flushQuery()`
   * method.
   *
   * @param {Object} item Model item with `lable` property.
   * @return {Boolean}
   */
  _labelFilter(item) {
    if (!this.__effectiveQuery) {
      return true;
    }
    return item.label.indexOf(this.__effectiveQuery) !== -1;
  }
  /**
   * Label and method check agains `query` function called by `dom-repeat`
   * element. This method uses `__effectiveQuery` property set by
   * `_flushQuery()` method.
   *
   * @param {Object} item Model item with `lable` property.
   * @return {Boolean}
   */
  _methodFilter(item) {
    if (!this.__effectiveQuery) {
      return true;
    }
    return (item.label || '').toLowerCase().indexOf(this.__effectiveQuery) !== -1 ||
      item.method.indexOf(this.__effectiveQuery) !== -1;
  }
  /**
   * When `query` property change it runs the filter function
   * in a debouncer set for ~50 ms.
   */
  _queryChanged() {
    if (this.__queryDebouncer) {
      return;
    }
    this.__queryDebouncer = true;
    afterNextRender(this, () => {
      this._flushQuery();
      this.__queryDebouncer = false;
    });
  }
  /**
   * Calles `render()` function on each data repeater that have filterable
   * items.
   * It set's `__effectiveQuery` property on the element that is beyond
   * Polymer's data binding system so it skips 2 function calls each time
   * it is read. In a repeater filter function that can be a lot.
   *
   * Also the `__effectiveQuery` is transformed to perform text search.
   */
  _flushQuery() {
    let q = this.query;
    if (q) {
      q = q.toLowerCase();
    }
    this.__effectiveQuery = q;
    const repeaters = this.shadowRoot.querySelectorAll('dom-repeat[data-query]');
    for (let i = 0, len = repeaters.length; i < len; i++) {
      repeaters[i].render();
    }
  }
  /**
   * Hides the parent model when number of children is 0 or shows it
   * otherwise.
   *
   * @param {CustomEvent} e
   */
  _methodsCountChanged(e) {
    const state = e.model.get('item.hidden');
    if (e.detail.value === 0 && this.__effectiveQuery) {
      if (!state) {
        e.model.set('item.hidden', true);
      }
    } else {
      if (state) {
        e.model.set('item.hidden', false);
      }
    }
  }
  /**
   * Dispatches `api-navigation-selection-changed` event on selection change.
   *
   * @param {String} selected Selected id
   * @param {String} selectedType Type of AMF shape
   */
  _selectionChnaged(selected, selectedType) {
    if (!selectedType || this.__cancelNavigationEvent) {
      return;
    }
    let endpointId;
    if (selectedType === 'method' && selected) {
      const node = this.shadowRoot.querySelector(`.operation[data-api-id="${selected}"]`);
      if (node) {
        endpointId = node.dataset.parentId;
      }
      if (!endpointId) {
        console.warn(`Expecting endpointId to be set on the event.`);
      }
    }
    const e = new CustomEvent('api-navigation-selection-changed', {
      bubbles: true,
      composed: true,
      detail: {
        selected: selected,
        type: selectedType,
        endpointId
      }
    });
    this.dispatchEvent(e);
  }
  /**
   * Navigation item click handler.
   * It used to be common function for all clicks inside the element
   * but in tests not all events were handled.
   *
   * @param {ClickEvent} e
   */
  _itemClickHandler(e) {
    let target;
    if (e.currentTarget) {
      target = e.currentTarget;
    } else {
      if (e.target.classList.contains('method-label')) {
        target = e.target.parentNode;
      } else {
        target = e.target;
      }
    }
    this._selectItem(target);
  }
  /**
   * Handler for `api-navigation-selection-changed`. Updates the selection
   * if dispatched from other element.
   * @param {CustomEvent} e
   */
  _navigationChangeHandler(e) {
    if (e.composedPath()[0] === this) {
      return;
    }
    this._cleanPassiveSelection();
    if (e.detail.passive === true) {
      this._handlePassiveNavigation(e.detail);
      return;
    }
    if (this.selected !== e.detail.selected) {
      this.__cancelNavigationEvent = true;
      this.selected = e.detail.selected;
      this.selectedType = e.detail.type;
      this.__cancelNavigationEvent = false;
    }
  }

  _handlePassiveNavigation(detail) {
    switch (detail.type) {
      case 'method':
        this._selectMethodPassive(detail.selected);
        break;
    }
  }

  _cleanPassiveSelection() {
    // Very simpole optimization to not query local DOM if we are sure
    // that there's no selection.
    if (!this.__hasPassiveSelection) {
      return;
    }
    const nodes = this.shadowRoot.querySelectorAll('.passive-selected');
    for (let i = 0, len = nodes.length; i < len; i++) {
      nodes[i].classList.remove('passive-selected');
    }
    this.__hasPassiveSelection = false;
  }

  _selectMethodPassive(id) {
    const selector = `[data-api-id="${id}"]`;
    const node = this.shadowRoot.querySelector(selector);
    if (!node) {
      return;
    }
    node.classList.add('passive-selected');
    this.__hasPassiveSelection = true;
    if (!node.parentElement.opened) {
      node.parentElement.opened = true;
    }
  }
  /**
   * Endpoint label click handler.
   * Toggles endpoint's methods list.
   *
   * @param {ClickEvent} e
   */
  _toggleEndpoint(e) {
    const path = e.composedPath();
    while (true) {
      const node = path.shift();
      if (!node) {
        return;
      }
      if (node.nodeType !== 1) {
        continue;
      }
      if (!node.dataset.endpointId) {
        continue;
      }
      this.toggleOperations(node.dataset.endpointId);
      break;
    }
  }
  /**
   * Computes `style` attribute value for endpoint item.
   * It sets padding-left property to indent resources.
   * See https://github.com/mulesoft/api-console/issues/571.
   *
   * @param {Number} factor Computed indent factor for the resource
   * @param {Number} size The size of indentation in pixels.
   * @return {String} Style attribute value for the item.
   */
  _computeEndpointPadding(factor, size) {
    const padding = this._computeEndpointPaddingLeft();
    if (factor < 1) {
      return `padding-left: ${padding}px`;
    }
    const result = (factor * size) + padding;
    return `padding-left: ${result}px`;
  }

  _computeMethodPadding(factor, size) {
    const padding = this._computeOperationPaddingLeft();
    if (factor < 1) {
      return `padding-left: ${padding}px`;
    }
    const result = (factor * size) + padding;
    return `padding-left: ${result}px`;
  }
  /**
   * Computes operation list item left padding from CSS veriables.
   * @return {Number}
   */
  _computeOperationPaddingLeft() {
    let paddingLeft;
    const prop = '--api-navigation-operation-item-padding-left';
    const defaultPadding = 24;
    if (window.ShadyCSS) {
      paddingLeft = window.ShadyCSS.getComputedStyleValue(this, prop);
    } else {
      paddingLeft = getComputedStyle(this).getPropertyValue(prop);
    }
    if (!paddingLeft) {
      return defaultPadding;
    }
    paddingLeft = paddingLeft.replace('px', '').trim();
    if (isNaN(paddingLeft)) {
      return defaultPadding;
    }
    return Number(paddingLeft);
  }
  /**
   * Computes endpoint list item left padding from CSS veriables.
   * @return {Number}
   */
  _computeEndpointPaddingLeft() {
    let padding;
    const prop = '--api-navigation-list-item-padding';
    const defaultPadding = 16;
    if (window.ShadyCSS) {
      padding = window.ShadyCSS.getComputedStyleValue(this, prop);
    } else {
      padding = getComputedStyle(this).getPropertyValue(prop);
    }
    if (!padding) {
      return defaultPadding;
    }
    const parts = padding.split(' ');
    let paddingLeftValue;
    switch (parts.length) {
      case 1: paddingLeftValue = parts[0]; break;
      case 2: paddingLeftValue = parts[1]; break;
      case 3: paddingLeftValue = parts[2]; break;
      case 4: paddingLeftValue = parts[2]; break;
    }
    if (!paddingLeftValue) {
      return defaultPadding;
    }
    paddingLeftValue = paddingLeftValue.replace('px', '').trim();
    if (isNaN(paddingLeftValue)) {
      return defaultPadding;
    }
    return Number(paddingLeftValue);
  }
  /**
   * Cancels space key down event when selecting a method with keyboard.
   * Without it the page would scroll down.
   * @param {KeyboardEvent} e
   */
  _spaceDownHandler(e) {
    if (!(e.code === 'Space' || e.keyCode === 32)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  }
  /**
   * Selectes an item when space up event is detected.
   * @param {KeyboardEvent} e
   */
  _spaceUpHandler(e) {
    if (!(e.code === 'Space' || e.keyCode === 32)) {
      return;
    }
    e.target.click();
  }
  /**
   * Computes value for `_renderSummary` property
   * @param {Boolean} summary Current value of `summary` property
   * @param {Boolean} isFragment Current value of `_isFragment` property
   * @return {Boolean}
   */
  _computeRenderSummary(summary, isFragment) {
    return !!(summary && !isFragment);
  }
  /**
   * Computes condition value to render path label.
   * @param {Boolean} allowPaths Component configuration property.
   * @param {Boolean} renderPath Endpoint property
   * @return {Boolean} True if both arguments are trully.
   */
  _computeRenderParth(allowPaths, renderPath) {
    return !!(allowPaths && renderPath);
  }
  /**
   * Dispatched when navigation occurrs.
   * It ensures that `type` property is always set when selection changes
   * (selection type changes later than the selection but within the same
   * microtask).
   *
   * @event api-navigation-selection-changed
   * @param {String} selected `@id` of selected AMF shape
   * @param {?String} endpointId Available only if `type` is `method`.
   * It is parent endpoint ID.
   * @param {String} type The type of selected shape. It can be one of
   * `documentation`, `type`, `security`, `endpoint`, `method` or `summary`.
   * Summary is a special case not included in AMF model but means that the
   * user requested API summary view (start screen).
   * @param {Boolean} passive If true then the event wasn't caused by user
   * intentional interaction and regular navigation action should not occurr.
   */
}
window.customElements.define(ApiNavigation.is, ApiNavigation);