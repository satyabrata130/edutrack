import { e as createLucideIcon, y as o, J as clsx, r as reactExports, K as useParams, M as useStudentReport, j as jsxRuntimeExports, m as LoadingSpinner, L as Link, B as BookOpen } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { U as User } from "./user-B3wdaSJn.js";
import { T as TrendingUp } from "./trending-up-Noa0hL3t.js";
import { i as isFunction, D as Dot, f as findAllByType, E as ErrorBar, a as Layer, b as filterProps, c as Curve, A as Animate, d as interpolateNumber, e as isEqual, g as isNil, h as hasClipDot, j as LabelList, k as getValueByDataKey, u as uniqueId, G as Global, l as getCateCoordinateOfLine, m as generateCategoricalChart, X as XAxis, Y as YAxis, n as formatAxisMap, R as ResponsiveContainer, C as CartesianGrid, T as Tooltip, L as Legend } from "./generateCategoricalChart-DpPC91G4.js";
import { C as CircleCheck } from "./circle-check-D7JXkIIF.js";
import { C as CircleX } from "./circle-x-Djam-pEa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
var _excluded = ["type", "layout", "connectNulls", "ref"], _excluded2 = ["key"];
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray(o2, minLen);
  var n = Object.prototype.toString.call(o2).slice(8, -1);
  if (n === "Object" && o2.constructor) n = o2.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o2);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o2, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o2, e) {
  return o2 = _getPrototypeOf(o2), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o2, e || [], _getPrototypeOf(t).constructor) : o2.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o2, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf(o2, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Line = /* @__PURE__ */ function(_PureComponent) {
  function Line2() {
    var _this;
    _classCallCheck(this, Line2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Line2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: true,
      totalLength: 0
    });
    _defineProperty(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
      return "".concat(length, "px ").concat(totalLength - length, "px");
    });
    _defineProperty(_this, "getStrokeDasharray", function(length, totalLength, lines) {
      var lineLength = lines.reduce(function(pre, next) {
        return pre + next;
      });
      if (!lineLength) {
        return _this.generateSimpleStrokeDasharray(totalLength, length);
      }
      var count = Math.floor(length / lineLength);
      var remainLength = length % lineLength;
      var restLength = totalLength - length;
      var remainLines = [];
      for (var i = 0, sum = 0; i < lines.length; sum += lines[i], ++i) {
        if (sum + lines[i] > remainLength) {
          remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
          break;
        }
      }
      var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
      return [].concat(_toConsumableArray(Line2.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function(line) {
        return "".concat(line, "px");
      }).join(", ");
    });
    _defineProperty(_this, "id", uniqueId("recharts-line-"));
    _defineProperty(_this, "pathRef", function(node) {
      _this.mainCurve = node;
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      _this.setState({
        isAnimationFinished: true
      });
      if (_this.props.onAnimationEnd) {
        _this.props.onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      _this.setState({
        isAnimationFinished: false
      });
      if (_this.props.onAnimationStart) {
        _this.props.onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(Line2, _PureComponent);
  return _createClass(Line2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      this.setState({
        totalLength
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      if (totalLength !== this.state.totalLength) {
        this.setState({
          totalLength
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function getTotalLength() {
      var curveDom = this.mainCurve;
      try {
        return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
      } catch (err) {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar(needClip, clipPathId) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, points = _this$props.points, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, layout = _this$props.layout, children = _this$props.children;
      var errorBarItems = findAllByType(children, ErrorBar);
      if (!errorBarItems) {
        return null;
      }
      var dataPointFormatter = function dataPointFormatter2(dataPoint, dataKey) {
        return {
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          errorVal: getValueByDataKey(dataPoint.payload, dataKey)
        };
      };
      var errorBarProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ o.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
        return /* @__PURE__ */ o.cloneElement(item, {
          key: "bar-".concat(item.props.dataKey),
          data: points,
          xAxis,
          yAxis,
          layout,
          dataPointFormatter
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props2 = this.props, dot = _this$props2.dot, points = _this$props2.points, dataKey = _this$props2.dataKey;
      var lineProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, lineProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          value: entry.value,
          dataKey,
          payload: entry.payload,
          points
        });
        return Line2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ o.createElement(Layer, _extends({
        className: "recharts-line-dots",
        key: "dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderCurveStatically",
    value: function renderCurveStatically(points, needClip, clipPathId, props) {
      var _this$props3 = this.props, type = _this$props3.type, layout = _this$props3.layout, connectNulls = _this$props3.connectNulls;
      _this$props3.ref;
      var others = _objectWithoutProperties(_this$props3, _excluded);
      var curveProps = _objectSpread(_objectSpread(_objectSpread({}, filterProps(others, true)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
        points
      }, props), {}, {
        type,
        layout,
        connectNulls
      });
      return /* @__PURE__ */ o.createElement(Curve, _extends({}, curveProps, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function renderCurveWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props4 = this.props, points = _this$props4.points, strokeDasharray = _this$props4.strokeDasharray, isAnimationActive = _this$props4.isAnimationActive, animationBegin = _this$props4.animationBegin, animationDuration = _this$props4.animationDuration, animationEasing = _this$props4.animationEasing, animationId = _this$props4.animationId, animateNewValues = _this$props4.animateNewValues, width = _this$props4.width, height = _this$props4.height;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, totalLength = _this$state.totalLength;
      return /* @__PURE__ */ o.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepData = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            if (animateNewValues) {
              var _interpolatorX = interpolateNumber(width * 2, entry.x);
              var _interpolatorY = interpolateNumber(height / 2, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: _interpolatorX(t),
                y: _interpolatorY(t)
              });
            }
            return _objectSpread(_objectSpread({}, entry), {}, {
              x: entry.x,
              y: entry.y
            });
          });
          return _this2.renderCurveStatically(stepData, needClip, clipPathId);
        }
        var interpolator = interpolateNumber(0, totalLength);
        var curLength = interpolator(t);
        var currentStrokeDasharray;
        if (strokeDasharray) {
          var lines = "".concat(strokeDasharray).split(/[,\s]+/gim).map(function(num) {
            return parseFloat(num);
          });
          currentStrokeDasharray = _this2.getStrokeDasharray(curLength, totalLength, lines);
        } else {
          currentStrokeDasharray = _this2.generateSimpleStrokeDasharray(totalLength, curLength);
        }
        return _this2.renderCurveStatically(points, needClip, clipPathId, {
          strokeDasharray: currentStrokeDasharray
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function renderCurve(needClip, clipPathId) {
      var _this$props5 = this.props, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points))) {
        return this.renderCurveWithAnimation(needClip, clipPathId);
      }
      return this.renderCurveStatically(points, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props6 = this.props, hide = _this$props6.hide, dot = _this$props6.dot, points = _this$props6.points, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, top = _this$props6.top, left = _this$props6.left, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, id = _this$props6.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-line", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ o.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ o.createElement("defs", null, /* @__PURE__ */ o.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ o.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ o.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ o.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(needClip, clipPathId), (hasSinglePoint || dot) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "repeat",
    value: function repeat(lines, count) {
      var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
      var result = [];
      for (var i = 0; i < count; ++i) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
      }
      return result;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;
      if (/* @__PURE__ */ o.isValidElement(option)) {
        dotItem = /* @__PURE__ */ o.cloneElement(option, props);
      } else if (isFunction(option)) {
        dotItem = option(props);
      } else {
        var key = props.key, dotProps = _objectWithoutProperties(props, _excluded2);
        var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
        dotItem = /* @__PURE__ */ o.createElement(Dot, _extends({
          key
        }, dotProps, {
          className
        }));
      }
      return dotItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(Line, "displayName", "Line");
_defineProperty(Line, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !Global.isSsr,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: false,
  label: false
});
_defineProperty(Line, "getComposedData", function(_ref4) {
  var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var points = displayedData.map(function(entry, index) {
    var value = getValueByDataKey(entry, dataKey);
    if (layout === "horizontal") {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isNil(value) ? null : yAxis.scale(value),
        value,
        payload: entry
      };
    }
    return {
      x: isNil(value) ? null : xAxis.scale(value),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  return _objectSpread({
    points,
    layout
  }, offset);
});
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
const CHART_COLORS = [
  "oklch(var(--chart-1))",
  "oklch(var(--chart-2))",
  "oklch(var(--chart-3))",
  "oklch(var(--chart-4))",
  "oklch(var(--chart-5))"
];
function StudentReportPage() {
  const { studentId } = useParams({ from: "/reports/$studentId" });
  const id = BigInt(studentId);
  const { data: report, isLoading } = useStudentReport(id);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-24",
        "data-ocid": "student_report.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
      }
    );
  }
  if (!report) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-24", "data-ocid": "student_report.error_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 40, className: "text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Report not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "This student's report could not be loaded." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/reports",
          className: "text-primary text-sm hover:underline",
          "data-ocid": "student_report.back_link",
          children: "← Back to Reports"
        }
      )
    ] });
  }
  const examNames = [...new Set(report.performances.map((p) => p.examName))];
  const subjectNames = [
    ...new Set(report.performances.map((p) => p.subjectName))
  ];
  const chartData = examNames.map((examName) => {
    const entry = { exam: examName };
    for (const sub of subjectNames) {
      const perf = report.performances.find(
        (p) => p.examName === examName && p.subjectName === sub
      );
      if (perf) {
        entry[sub] = Number(perf.marksObtained);
      }
    }
    return entry;
  });
  const totalExams = examNames.length;
  const passedCount = report.performances.filter((p) => p.passed).length;
  const totalPerformances = report.performances.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", "data-ocid": "student_report.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/reports",
        "data-ocid": "student_report.back_link",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
          " Back to Reports"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "card-elevated rounded-lg p-6",
        "data-ocid": "student_report.info.card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xl font-bold", children: report.studentName.charAt(0) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: report.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-0.5", children: [
              "Roll: ",
              report.rollNumber,
              " · Class ",
              report.className
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold font-mono text-foreground", children: [
              report.averageScore.toFixed(1),
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: report.overallPassed ? "success" : "destructive",
                className: "mt-1",
                children: report.overallPassed ? "Overall Pass" : "Overall Fail"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-3 gap-4",
        "data-ocid": "student_report.summary.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-elevated rounded-lg p-4",
              "data-ocid": "student_report.summary.exams_taken",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Exams Taken" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-mono text-foreground", children: totalExams })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-elevated rounded-lg p-4",
              "data-ocid": "student_report.summary.average_score",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Average Score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold font-mono text-foreground", children: [
                  report.averageScore.toFixed(1),
                  "%"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-elevated rounded-lg p-4",
              "data-ocid": "student_report.summary.pass_rate",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Pass Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold font-mono text-foreground", children: [
                  totalPerformances > 0 ? Math.round(passedCount / totalPerformances * 100) : 0,
                  "%"
                ] })
              ]
            }
          )
        ]
      }
    ),
    chartData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg p-6",
        "data-ocid": "student_report.chart.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-primary" }),
            "Performance Trend Across Exams"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            LineChart,
            {
              data: chartData,
              margin: { top: 4, right: 8, left: -20, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "oklch(var(--border))"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "exam",
                    tick: { fontSize: 12, fill: "oklch(var(--muted-foreground))" },
                    tickLine: false,
                    axisLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 12, fill: "oklch(var(--muted-foreground))" },
                    tickLine: false,
                    axisLine: false,
                    domain: [0, 100]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    contentStyle: {
                      backgroundColor: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "oklch(var(--foreground))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: "12px" } }),
                subjectNames.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: sub,
                    stroke: CHART_COLORS[i % CHART_COLORS.length],
                    strokeWidth: 2.5,
                    dot: { r: 4, strokeWidth: 2 },
                    activeDot: { r: 6 }
                  },
                  sub
                ))
              ]
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg p-10 text-center",
        "data-ocid": "student_report.chart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrendingUp,
            {
              size: 36,
              className: "text-muted-foreground mx-auto mb-3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No performance data yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Marks will appear here once recorded for this student." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg overflow-hidden",
        "data-ocid": "student_report.results.table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-2 bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 15, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Detailed Results" }),
            totalPerformances > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
              passedCount,
              "/",
              totalPerformances,
              " passed"
            ] })
          ] }),
          report.performances.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-10 text-center text-muted-foreground text-sm",
              "data-ocid": "student_report.empty_state",
              children: "No performance records available for this student."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Exam" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Subject" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Marks" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Max" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Result" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: report.performances.map((p, i) => {
              const pct = Number(p.maxMarks) > 0 ? Math.round(
                Number(p.marksObtained) / Number(p.maxMarks) * 100
              ) : 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "bg-card hover:bg-muted/20 transition-colors",
                  "data-ocid": `student_report.result.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: p.examName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.subjectName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold text-foreground", children: p.marksObtained.toString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono text-muted-foreground", children: p.maxMarks.toString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: pct >= 60 ? "text-chart-2" : pct >= 40 ? "text-chart-4" : "text-chart-5",
                        children: [
                          pct,
                          "%"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: p.passed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-chart-2 text-xs font-semibold", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 13 }),
                      "Pass"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-chart-5 text-xs font-semibold", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 13 }),
                      "Fail"
                    ] }) })
                  ]
                },
                `${p.examName}-${p.subjectName}`
              );
            }) })
          ] })
        ]
      }
    )
  ] });
}
export {
  StudentReportPage as default
};
