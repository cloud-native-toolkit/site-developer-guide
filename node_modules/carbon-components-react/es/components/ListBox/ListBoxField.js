var _defaultTranslations;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
var prefix = settings.prefix;
export var translationIds = {
  'close.menu': 'close.menu',
  'open.menu': 'open.menu'
};
var defaultTranslations = (_defaultTranslations = {}, _defineProperty(_defaultTranslations, translationIds['close.menu'], 'Close menu'), _defineProperty(_defaultTranslations, translationIds['open.menu'], 'Open menu'), _defaultTranslations);
/**
 * `ListBoxField` is responsible for creating the containing node for valid
 * elements inside of a field. It also provides a11y-related attributes like
 * `role` to make sure a user can focus the given field.
 */

var ListBoxField = function ListBoxField(_ref) {
  var children = _ref.children,
      id = _ref.id,
      disabled = _ref.disabled,
      tabIndex = _ref.tabIndex,
      t = _ref.translateWithId,
      rest = _objectWithoutProperties(_ref, ["children", "id", "disabled", "tabIndex", "translateWithId"]);

  return React.createElement("div", _extends({
    role: rest['aria-expanded'] ? 'combobox' : rest.role || 'combobox',
    "aria-owns": rest['aria-expanded'] && "".concat(id, "__menu") || null,
    "aria-controls": rest['aria-expanded'] && "".concat(id, "__menu") || null,
    className: "".concat(prefix, "--list-box__field"),
    tabIndex: !disabled && tabIndex || -1
  }, rest, {
    "aria-label": rest['aria-expanded'] ? t('close.menu') : t('open.menu')
  }), children);
};

ListBoxField.propTypes = {
  /**
   * Provide the contents of your ListBoxField
   */
  children: PropTypes.node,

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify if the parent <ListBox> is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optional prop to specify the tabIndex of the <ListBox> trigger button
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * i18n hook used to provide the appropriate description for the given menu
   * icon. This function takes in an id defined in `translationIds` and should
   * return a string message for that given message id.
   */
  translateWithId: PropTypes.func.isRequired
};
ListBoxField.defaultProps = {
  translateWithId: function translateWithId(id) {
    return defaultTranslations[id];
  }
};
export default ListBoxField;