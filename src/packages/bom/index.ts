import * as curry from "./curry/curry";
import * as forEach from "./forEach/forEach";
import * as clone from "./clone/clone";
import * as isFunction from "./isFunction/isFunction";
import * as clamp from "./clamp/clamp";
import * as isDate from "./isDate/isDate";
import * as add from "./add/add";
import * as countBy from "./countBy/countBy";
import * as values from "./values/values";
import * as filter from "./filter/filter";
import * as map from "./map/map";
import * as constant from "./constant/constant";
import * as when from "./when/when";
import * as isString from "./isString/isString";
import * as isNumber from "./isNumber/isNumber";
import * as isNullish from "./isNullish/isNullish";
import * as isTruthy from "./isTruthy/isTruthy";
import * as conditional from "./conditional/conditional";
import * as subtract from "./subtract/subtract";
import * as sum from "./sum/sum";
import * as prop from "./prop/prop";
import * as reduce from "./reduce/reduce";
import * as pipe from "./pipe/pipe";
import * as groupBy from "./groupBy/groupBy";
import * as entries from "./entries/entries";
import * as isNot from "./isNot/isNot";
import * as isNotNull from "./isNotNull/isNotNull";
import * as isEmpty from "./isEmpty/isEmpty";
import * as partition from "./partition/partition";

export const Bom = {
  ...curry,
  ...forEach,
  ...clone,
  ...isFunction,
  ...clamp,
  ...isDate,
  ...add,
  ...countBy,
  ...values,
  ...filter,
  ...map,
  ...constant,
  ...when,
  ...isString,
  ...isNumber,
  ...isNullish,
  ...isTruthy,
  ...conditional,
  ...subtract,
  ...sum,
  ...prop,
  ...reduce,
  ...pipe,
  ...groupBy,
  ...entries,
  ...isNot,
  ...isNotNull,
  ...isEmpty,
  ...partition,
} as const;
